#!/usr/bin/env node
/**
 * Marvel United — Top Villain-Centric Groups Generator
 *
 * Standalone tool. NOT part of the MUR app.
 *
 * Reads co-appearances.json (pre-built by build.js) + fetches MU box JSONs to
 * identify which characters are heroes vs villains. For each villain (or group
 * of villains that share the same hero enemies), finds the strongest groups of
 * 3–5 heroes by total comic co-appearances.
 *
 * Output: TOP-GROUPS.md
 *
 * Scoring:
 *   score = Σ byCharacter[villain][hero]  for each hero in the group
 *   For villain groups, connections are averaged across all villains before summing.
 *
 * Villain grouping heuristic:
 *   Two villains are merged when ≥2 of their top-3 hero connections overlap
 *   AND they co-appeared together in >20 comics.
 *
 * Usage:
 *   node generate-groups.js
 */

import https from 'node:https';
import http from 'node:http';
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const MU_BOX_URLS = [
  'https://raw.githubusercontent.com/OscarGarPer/Marvel-United-Json-Database/main/en/mun-ultimate.json',
  'https://raw.githubusercontent.com/OscarGarPer/Marvel-United-Json-Database/main/en/mun-uncanny.json',
  'https://raw.githubusercontent.com/OscarGarPer/Marvel-United-Json-Database/main/en/mun-spidergeddon.json',
  'https://raw.githubusercontent.com/OscarGarPer/Marvel-United-Json-Database/main/en/mun-omniverse.json',
  'https://raw.githubusercontent.com/OscarGarPer/Marvel-United-Json-Database/main/en/mun-pr02.json',
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fetchText(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    client.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetchText(res.headers.location).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
      }
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
      res.on('error', reject);
    }).on('error', reject);
  });
}

// Union-Find for villain grouping
function makeUF(keys) {
  const parent = new Map(keys.map((k) => [k, k]));
  function find(k) {
    if (parent.get(k) !== k) parent.set(k, find(parent.get(k)));
    return parent.get(k);
  }
  function union(a, b) {
    parent.set(find(a), find(b));
  }
  return { find, union };
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  // Read pre-built co-appearance data
  const data = JSON.parse(
    readFileSync(path.join(__dirname, 'co-appearances.json'), 'utf8')
  );
  const { byCharacter } = data;

  // ── Identify heroes and villains from MU box JSONs ────────────────────────
  console.log('⬇  Fetching MU box JSONs to identify heroes and villains…');
  const muVillains = new Set();
  const muHeroes = new Set();

  for (const url of MU_BOX_URLS) {
    const boxName = url.split('/').pop();
    process.stdout.write(`   ${boxName}… `);
    const json = JSON.parse(await fetchText(url));
    const chars = (json.characters ?? []).filter(
      (c) => c.name?.text && !['hidden', 'other'].includes(c.loyalty)
    );
    for (const c of chars) {
      const name = c.name.text.trim();
      if (c.loyalty === 'villain') muVillains.add(name);
      else if (c.loyalty === 'hero') muHeroes.add(name);
    }
    console.log(`${chars.length} chars`);
  }

  // Filter to characters that have co-appearance data
  const villainsWithData = [...muVillains].filter((v) => byCharacter[v]);
  const heroSet = new Set([...muHeroes].filter((h) => byCharacter[h]));

  console.log(`\n   ${villainsWithData.length} villains with co-appearance data`);
  console.log(`   ${heroSet.size} heroes with co-appearance data`);
  console.log(`   Villains: ${villainsWithData.sort().join(', ')}`);

  // ── Build ranked hero connections per villain ─────────────────────────────
  // villain → [ [heroName, sharedComics], ... ] sorted desc
  const villainRanks = new Map();
  for (const v of villainsWithData) {
    const ranked = Object.entries(byCharacter[v] ?? {})
      .filter(([name]) => heroSet.has(name))
      .sort(([, a], [, b]) => b - a);
    if (ranked.length >= 3) villainRanks.set(v, ranked);
  }

  // ── Detect villain groups via Union-Find ──────────────────────────────────
  // Criteria: ≥2 shared top-3 heroes AND >20 mutual co-appearances
  const villainList = [...villainRanks.keys()];
  const { find, union } = makeUF(villainList);

  // Top-3 hero fingerprint per villain
  const fp = new Map();
  for (const [v, ranked] of villainRanks) {
    fp.set(v, new Set(ranked.slice(0, 3).map(([name]) => name)));
  }

  for (let i = 0; i < villainList.length; i++) {
    for (let j = i + 1; j < villainList.length; j++) {
      const vA = villainList[i];
      const vB = villainList[j];
      const fpA = fp.get(vA);
      const fpB = fp.get(vB);
      const overlap = [...fpB].filter((h) => fpA.has(h)).length;
      const mutual = byCharacter[vA]?.[vB] ?? 0;
      if (overlap >= 2 && mutual > 20) union(vA, vB);
    }
  }

  // Collect villain groups
  const groupMap = new Map();
  for (const v of villainList) {
    const root = find(v);
    if (!groupMap.has(root)) groupMap.set(root, []);
    groupMap.get(root).push(v);
  }

  console.log('\n   Villain groups:');
  for (const [, g] of groupMap) {
    if (g.length > 1) console.log(`   → ${g.sort().join(' + ')}`);
  }

  // ── Build table entries ───────────────────────────────────────────────────
  const entries = [];

  for (const [, villains] of groupMap) {
    villains.sort();

    // Merge hero connections across villain group members, then average
    const combined = {};
    for (const v of villains) {
      for (const [h, w] of villainRanks.get(v) ?? []) {
        combined[h] = (combined[h] ?? 0) + w;
      }
    }
    const ranked = Object.entries(combined)
      .map(([h, w]) => [h, Math.round(w / villains.length)])
      .sort(([, a], [, b]) => b - a);

    if (ranked.length < 3) continue;

    // Emit an entry for each group size (3, 4, 5)
    for (const size of [3, 4, 5]) {
      if (ranked.length < size) break;
      const group = ranked.slice(0, size);
      const minLink = group[group.length - 1][1];
      if (minLink < 8) break; // weakest link too thin — stop growing
      const score = group.reduce((s, [, w]) => s + w, 0);
      entries.push({
        villains,
        heroes: group.map(([name]) => name),
        score,
        minLink,
      });
    }
  }

  // Sort by score descending
  entries.sort((a, b) => b.score - a.score);

  // Deduplicate exact (villain-set, hero-set) duplicates
  const seen = new Set();
  const deduped = entries.filter((e) => {
    const key = e.villains.join('|') + '|||' + e.heroes.join('|');
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  const top = deduped.slice(0, 100);

  // ── Build Markdown ────────────────────────────────────────────────────────
  const rows = top.map((e, i) => {
    const group = e.heroes.join(', ');
    const villain = e.villains.join(' + ');
    return `| ${i + 1} | ${group} | ${villain} | ${e.score} |`;
  });

  const md = [
    '# Top Comic Co-Appearance Groups (Villain-Centric)',
    '',
    'Groups of 3–5 Marvel United heroes ranked by combined comic co-appearances with their villain (1961–2002).  ',
    'Source: [co-appearances.json](./co-appearances.json) — generated from the Marvel Chronology Project via Rosselló, Alberich & Miro (2002).',
    '',
    '> **How to read this:** `Shared Comics` = sum of each hero\'s individual co-appearance count with the villain(s).',
    '> For villain groups the connections are averaged across members before summing.',
    '> Higher = stronger comic-book justification for the matchup.',
    '',
    '| # | Group | Villain(s) | Shared Comics |',
    '|---|---|---|---|',
    ...rows,
    '',
    '---',
    '',
    '*Data covers comics published 1961–2002. Characters introduced after 2002 do not appear in this list.*  ',
    '*Villain groups are formed when two or more villains share ≥2 of their top-3 hero connections and co-appeared together in >20 comics.*  ',
    '*To regenerate: `node generate-groups.js` from this directory.*',
  ].join('\n');

  const outPath = path.join(__dirname, 'TOP-GROUPS.md');
  writeFileSync(outPath, md, 'utf8');
  console.log(`\n✅  Written to ${outPath}`);
  console.log(`   ${top.length} entries written`);
}

main().catch((err) => {
  console.error('Error:', err.message);
  process.exit(1);
});
