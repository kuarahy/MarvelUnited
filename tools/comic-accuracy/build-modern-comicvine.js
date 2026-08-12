#!/usr/bin/env node
/**
 * Marvel United — Modern Co-Appearance Builder (Comic Vine, 2003+)
 *
 * Fetches post-2002 issue appearances from Comic Vine for MU-roster characters
 * and writes modern-co-appearances.json.
 *
 * Prerequisites:
 *   1. Export COMIC_VINE_API_KEY (free key: https://comicvine.gamespot.com/api/)
 *   2. Populate cv-ids.json: run --resolve to get CV name suggestions first.
 *
 * Usage:
 *   node build-modern-comicvine.js                  # full build (all non-null CV IDs)
 *   node build-modern-comicvine.js --spike 20       # spike: first N unmatched chars only
 *   node build-modern-comicvine.js --resolve        # search CV for nulls, update cv-ids.json
 *   node build-modern-comicvine.js --resolve --dry-run  # print suggestions only, no write
 *
 * Caching:
 *   Per-character issue lists are cached in cache/ (gitignored) so reruns are fast.
 *   Delete a cache file to force a fresh fetch for that character.
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import https from 'node:https';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ─── Config ───────────────────────────────────────────────────────────────────

const MODERN_CUTOFF = '2003-01-01';
const RATE_LIMIT_MS = 1200;  // ~1 req/sec; CV free tier allows ~200/hour
const CV_BASE = 'https://comicvine.gamespot.com/api';
const CACHE_DIR = path.join(__dirname, 'cache');
const COMMENT_KEYS = new Set(['_comment', '_scope']);

// ─── HTTP ─────────────────────────────────────────────────────────────────────

function fetchJSON(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          return fetchJSON(res.headers.location).then(resolve).catch(reject);
        }
        if (res.statusCode !== 200) {
          return reject(new Error(`HTTP ${res.statusCode} — ${url}`));
        }
        const chunks = [];
        res.on('data', (c) => chunks.push(c));
        res.on('end', () => {
          try {
            resolve(JSON.parse(Buffer.concat(chunks).toString('utf8')));
          } catch (e) {
            reject(new Error(`JSON parse error: ${e.message}`));
          }
        });
        res.on('error', reject);
      })
      .on('error', reject);
  });
}

function sleep(ms) {
  return new Promise((res) => setTimeout(res, ms));
}

// ─── Cache ────────────────────────────────────────────────────────────────────

function cachePath(cvId) {
  return path.join(CACHE_DIR, `cv-${cvId}-modern.json`);
}

function loadCache(cvId) {
  const f = cachePath(cvId);
  if (!existsSync(f)) return null;
  try {
    return JSON.parse(readFileSync(f, 'utf8'));
  } catch {
    return null;
  }
}

function saveCache(cvId, issueIds) {
  if (!existsSync(CACHE_DIR)) mkdirSync(CACHE_DIR, { recursive: true });
  writeFileSync(cachePath(cvId), JSON.stringify(issueIds), 'utf8');
}

// ─── Comic Vine API ───────────────────────────────────────────────────────────

/**
 * Fetch all issue IDs for a CV character that have cover_date >= MODERN_CUTOFF.
 *
 * Uses the /api/issues/ endpoint with a character_ids + cover_date filter so
 * only modern issues are fetched, paginated at 100 per call.
 *
 * Results are cached per-character in cache/ to avoid repeated network calls.
 */
async function fetchModernIssueIds(cvId, apiKey) {
  const cached = loadCache(cvId);
  if (cached) {
    process.stdout.write(`[cache] `);
    return new Set(cached);
  }

  const ids = new Set();
  let offset = 0;
  const limit = 100;
  let total = null;

  while (true) {
    const url =
      `${CV_BASE}/issues/?api_key=${apiKey}&format=json` +
      `&filter=character_ids:${cvId},cover_date:${MODERN_CUTOFF}|2099-12-31` +
      `&field_list=id,cover_date&limit=${limit}&offset=${offset}`;

    await sleep(RATE_LIMIT_MS);
    const data = await fetchJSON(url);

    if (data.error !== 'OK') {
      throw new Error(`CV API error "${data.error}" for CV:${cvId}`);
    }

    const results = data.results ?? [];
    for (const issue of results) {
      if (issue.cover_date >= MODERN_CUTOFF) ids.add(issue.id);
    }

    if (total === null) total = data.number_of_total_results ?? 0;
    process.stdout.write('.');
    offset += limit;

    if (offset >= total || results.length < limit) break;
  }

  const arr = [...ids];
  saveCache(cvId, arr);
  return ids;
}

/**
 * Search Comic Vine for a character by name and return the top 5 candidates.
 */
async function searchCharacter(name, apiKey) {
  const url =
    `${CV_BASE}/search/?api_key=${apiKey}&format=json` +
    `&resources=character&query=${encodeURIComponent(name)}` +
    `&field_list=id,name,aliases,deck&limit=5`;

  await sleep(RATE_LIMIT_MS);
  const data = await fetchJSON(url);
  return (data.results ?? []).map((r) => ({
    id: r.id,
    name: r.name,
    deck: r.deck ?? '',
    aliases: r.aliases ?? '',
  }));
}

// ─── Resolve mode ─────────────────────────────────────────────────────────────

async function runResolve(cvIds, apiKey, dryRun) {
  const nullEntries = Object.entries(cvIds).filter(([, v]) => v === null);
  if (!nullEntries.length) {
    console.log('All entries in cv-ids.json already have IDs.');
    return;
  }
  console.log(`Searching Comic Vine for ${nullEntries.length} unresolved names…`);
  console.log('⚠   Auto-resolved IDs need human verification — wrong character versions are common.\n');

  const suggestions = {};

  for (const [name] of nullEntries) {
    process.stdout.write(`  "${name}"… `);
    let candidates;
    try {
      candidates = await searchCharacter(name, apiKey);
    } catch (e) {
      console.log(`ERROR: ${e.message}`);
      continue;
    }

    if (!candidates.length) {
      console.log('no results');
      continue;
    }

    const top = candidates[0];
    const topDesc = [top.deck, top.aliases].filter(Boolean).join(' | ') || 'no description';
    console.log(`→ CV:${top.id} "${top.name}" — ${topDesc}`);

    for (const c of candidates.slice(1)) {
      const desc = [c.deck, c.aliases].filter(Boolean).join(' | ') || '';
      console.log(`       alt CV:${c.id} "${c.name}" — ${desc}`);
    }

    suggestions[name] = top.id;
  }

  if (dryRun) {
    console.log('\n--dry-run: cv-ids.json not modified. Update manually from suggestions above.');
    return;
  }

  let updated = 0;
  for (const [name, id] of Object.entries(suggestions)) {
    if (cvIds[name] === null) {
      cvIds[name] = id;
      updated++;
    }
  }

  // Rehydrate comment keys before writing
  const outObj = {
    _comment: 'MU display name → Comic Vine character ID. null = not yet mapped. Run: node build-modern-comicvine.js --resolve',
    _scope:
      'Priority scope: 126 unmatched characters from co-appearances.json. Add matched MU characters to compute cross-era pairs.',
    ...cvIds,
  };
  const outPath = path.join(__dirname, 'cv-ids.json');
  writeFileSync(outPath, JSON.stringify(outObj, null, 2), 'utf8');
  console.log(`\n✅  cv-ids.json updated: ${updated} new IDs written.`);
  console.log('⚠   Review each auto-resolved ID before running the full build.');
}

// ─── Build mode ───────────────────────────────────────────────────────────────

async function runBuild(cvIds, coAppearances, apiKey, spikeN) {
  const unmatched = new Set(coAppearances.unmatched ?? []);

  let targets = Object.entries(cvIds)
    .filter(([, v]) => v !== null)
    .map(([name, id]) => ({ name, id }));

  if (!targets.length) {
    console.error('No characters with CV IDs in cv-ids.json. Run --resolve first.');
    process.exit(1);
  }

  if (spikeN > 0) {
    // Spike mode: prefer unmatched characters (the primary gap) then pad with others
    const unmatchedTargets = targets.filter((t) => unmatched.has(t.name));
    const matchedTargets = targets.filter((t) => !unmatched.has(t.name));
    targets = [...unmatchedTargets, ...matchedTargets].slice(0, spikeN);
    console.log(`Spike mode: ${targets.length} chars (${unmatchedTargets.slice(0, spikeN).length} unmatched-priority)`);
  }

  console.log(`Fetching modern issues (cover_date ≥ ${MODERN_CUTOFF}) for ${targets.length} characters…\n`);

  const issuesByChar = new Map();
  for (const { name, id } of targets) {
    process.stdout.write(`  ${name} (CV:${id}): `);
    let issues;
    try {
      issues = await fetchModernIssueIds(id, apiKey);
    } catch (e) {
      console.log(`SKIPPED — ${e.message}`);
      continue;
    }
    console.log(` → ${issues.size} modern issues`);
    issuesByChar.set(name, issues);
  }

  console.log('\nComputing pairwise intersections…');

  const names = [...issuesByChar.keys()];
  const pairs = [];
  const byCharacter = {};

  for (let i = 0; i < names.length; i++) {
    for (let j = i + 1; j < names.length; j++) {
      const a = names[i];
      const b = names[j];
      const setA = issuesByChar.get(a);
      const setB = issuesByChar.get(b);

      let count = 0;
      // Iterate the smaller set for efficiency
      const [smaller, larger] = setA.size <= setB.size ? [setA, setB] : [setB, setA];
      for (const id of smaller) {
        if (larger.has(id)) count++;
      }

      if (count > 0) {
        pairs.push({ hero1: a, hero2: b, modernSharedComics: count });
        if (!byCharacter[a]) byCharacter[a] = {};
        if (!byCharacter[b]) byCharacter[b] = {};
        byCharacter[a][b] = count;
        byCharacter[b][a] = count;
      }
    }
  }

  pairs.sort((a, b) => b.modernSharedComics - a.modernSharedComics);
  for (const key of Object.keys(byCharacter)) {
    byCharacter[key] = Object.fromEntries(
      Object.entries(byCharacter[key]).sort(([, a], [, b]) => b - a)
    );
  }

  const output = {
    meta: {
      generated: new Date().toISOString().split('T')[0],
      source: 'comicvine',
      dateWindow: `cover_date >= ${MODERN_CUTOFF}`,
      charactersProcessed: issuesByChar.size,
      pairsFound: pairs.length,
      spikeMode: spikeN > 0,
      note:
        'modernSharedComics = individual issues (cover_date >= 2003) in which both characters appear. ' +
        'Only characters in cv-ids.json with a confirmed non-null ID are included. ' +
        'Run build-modern-comicvine.js to regenerate.',
    },
    pairs,
    byCharacter,
  };

  const outPath = path.join(__dirname, 'modern-co-appearances.json');
  writeFileSync(outPath, JSON.stringify(output, null, 2), 'utf8');
  console.log(`\n✅  Written to ${outPath}`);
  console.log(`   ${pairs.length} modern pairs across ${issuesByChar.size} characters`);
}

// ─── Entry point ──────────────────────────────────────────────────────────────

async function main() {
  const argv = process.argv.slice(2);
  const doResolve = argv.includes('--resolve');
  const dryRun = argv.includes('--dry-run');
  const spikeIdx = argv.indexOf('--spike');
  const spikeN = spikeIdx >= 0 ? (parseInt(argv[spikeIdx + 1], 10) || 20) : 0;

  const apiKey = process.env.COMIC_VINE_API_KEY;
  if (!apiKey) {
    console.error(
      'COMIC_VINE_API_KEY is not set.\n' +
        'Get a free key at https://comicvine.gamespot.com/api/ then:\n' +
        '  export COMIC_VINE_API_KEY=your_key_here\n' +
        '  node build-modern-comicvine.js --resolve'
    );
    process.exit(1);
  }

  const cvIdsPath = path.join(__dirname, 'cv-ids.json');
  const rawCvIds = JSON.parse(readFileSync(cvIdsPath, 'utf8'));
  // Strip pseudo-comment keys before processing
  const cvIds = Object.fromEntries(
    Object.entries(rawCvIds).filter(([k]) => !COMMENT_KEYS.has(k))
  );

  if (doResolve) {
    await runResolve(cvIds, apiKey, dryRun);
    return;
  }

  const coAppPath = path.join(__dirname, 'co-appearances.json');
  const coAppearances = JSON.parse(readFileSync(coAppPath, 'utf8'));
  await runBuild(cvIds, coAppearances, apiKey, spikeN);
}

main().catch((err) => {
  console.error('Error:', err.message);
  process.exit(1);
});
