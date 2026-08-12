#!/usr/bin/env node
/**
 * Marvel United — Comic Accuracy Relations Lookup
 *
 * Offline CLI over co-appearances.json (run build.js first to refresh).
 *
 * Usage:
 *   node relations.js "Iron Man"
 *   node relations.js "Dark Phoenix" "Cyclops"
 *   npm run relations -- "Dark Phoenix" "Miles Morales"
 *
 * One name  → ranked partner list
 * Two names → sharedComics between them (0 if none / uncovered)
 */

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function normalise(name) {
  let s = String(name)
    .split('/')[0]
    .replace(/\(.*?\)/g, '')
    .replace(/\[.*?\]/g, '')
    .trim();

  if (s.includes(',')) {
    const [last, ...rest] = s.split(',');
    const first = rest.join(' ').trim();
    s = first ? `${first} ${last.trim()}` : last.trim();
  }

  return s
    .replace(/[^a-z0-9\s]/gi, ' ')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();
}

/** Parse CLI args into character name tokens (strips stray commas). */
function parseNames(argv) {
  const flags = new Set();
  const names = [];
  let limit = 25;
  let min = 0;
  let json = false;

  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--json') {
      json = true;
      continue;
    }
    if (a === '--limit') {
      limit = parseInt(argv[++i], 10) || 25;
      continue;
    }
    if (a.startsWith('--limit=')) {
      limit = parseInt(a.slice('--limit='.length), 10) || 25;
      continue;
    }
    if (a === '--min') {
      min = parseInt(argv[++i], 10) || 0;
      continue;
    }
    if (a.startsWith('--min=')) {
      min = parseInt(a.slice('--min='.length), 10) || 0;
      continue;
    }
    if (a.startsWith('-')) {
      flags.add(a);
      continue;
    }
    // Allow: "Dark Phoenix", "Miles Morales"  or  Dark Phoenix, Miles Morales
    for (const part of a.split(',')) {
      const t = part.trim();
      if (t) names.push(t);
    }
  }

  return { names, limit, min, json, flags };
}

function loadData() {
  const raw = readFileSync(path.join(__dirname, 'co-appearances.json'), 'utf8');
  return JSON.parse(raw);
}

/**
 * Resolve a user-typed name to an exact MU key in the dataset.
 * Returns { key, status: 'matched'|'unmatched'|'ambiguous'|'unknown', candidates? }
 */
function resolveName(query, data) {
  const allKeys = [
    ...Object.keys(data.matchedNames ?? {}),
    ...(data.unmatched ?? []),
  ];
  const byNorm = new Map();
  for (const k of allKeys) {
    const n = normalise(k);
    if (!byNorm.has(n)) byNorm.set(n, []);
    byNorm.get(n).push(k);
  }

  // Exact
  if (data.byCharacter?.[query] || data.matchedNames?.[query]) {
    return { key: query, status: 'matched' };
  }
  if ((data.unmatched ?? []).includes(query)) {
    return { key: query, status: 'unmatched' };
  }

  const qn = normalise(query);
  if (!qn) return { key: query, status: 'unknown', candidates: [] };

  // Exact normalised
  if (byNorm.has(qn)) {
    const keys = byNorm.get(qn);
    const matched = keys.filter((k) => data.matchedNames?.[k]);
    if (matched.length === 1) return { key: matched[0], status: 'matched' };
    if (matched.length > 1) {
      // Prefer shortest non-parenthetical
      const preferred = matched.sort((a, b) => {
        const ap = /\(/.test(a) ? 1 : 0;
        const bp = /\(/.test(b) ? 1 : 0;
        if (ap !== bp) return ap - bp;
        return a.length - b.length || a.localeCompare(b);
      })[0];
      return { key: preferred, status: 'matched', aliases: matched };
    }
    return { key: keys[0], status: 'unmatched' };
  }

  // Fuzzy contains
  const candidates = allKeys.filter((k) => {
    const kn = normalise(k);
    return kn.includes(qn) || qn.includes(kn) || k.toLowerCase().includes(query.toLowerCase());
  });

  const matchedCands = candidates.filter((k) => data.matchedNames?.[k]);
  if (matchedCands.length === 1) return { key: matchedCands[0], status: 'matched' };
  if (candidates.length === 1) {
    const k = candidates[0];
    return {
      key: k,
      status: data.matchedNames?.[k] ? 'matched' : 'unmatched',
    };
  }
  if (candidates.length > 1) {
    return { key: query, status: 'ambiguous', candidates: candidates.slice(0, 12) };
  }

  return { key: query, status: 'unknown', candidates: [] };
}

function sharedComics(data, a, b) {
  return data.byCharacter?.[a]?.[b] ?? data.byCharacter?.[b]?.[a] ?? 0;
}

function printPartners(data, key, { limit, min, json }) {
  const partners = Object.entries(data.byCharacter?.[key] ?? {})
    .filter(([, w]) => w >= min)
    .slice(0, limit);

  const datasetId = data.matchedNames[key];

  if (json) {
    console.log(
      JSON.stringify(
        {
          character: key,
          datasetId,
          partnerCount: Object.keys(data.byCharacter?.[key] ?? {}).length,
          partners: Object.fromEntries(partners),
        },
        null,
        2
      )
    );
    return;
  }

  console.log(`${key}  →  ${datasetId}`);
  console.log(`Coverage: ${data.meta?.datasetCoverage ?? '1961–2002'}`);
  const total = Object.keys(data.byCharacter?.[key] ?? {}).length;
  console.log(`${total} partners` + (min ? ` (showing sharedComics ≥ ${min})` : ''));
  console.log('');
  if (!partners.length) {
    console.log('(no partners above threshold)');
    return;
  }
  console.log(' #  Partner                              Comics');
  console.log('──  ───────────────────────────────────  ──────');
  partners.forEach(([name, w], i) => {
    const n = String(i + 1).padStart(2);
    const p = name.padEnd(37).slice(0, 37);
    console.log(`${n}  ${p}  ${String(w).padStart(6)}`);
  });
}

function printPair(data, a, b, { json }) {
  const aRes = resolveName(a, data);
  const bRes = resolveName(b, data);

  if (aRes.status === 'ambiguous') {
    console.error(`Ambiguous: "${a}". Did you mean: ${aRes.candidates.join(', ')}`);
    process.exit(1);
  }
  if (bRes.status === 'ambiguous') {
    console.error(`Ambiguous: "${b}". Did you mean: ${bRes.candidates.join(', ')}`);
    process.exit(1);
  }
  if (aRes.status === 'unknown') {
    console.error(`Unknown character: "${a}"`);
    process.exit(1);
  }
  if (bRes.status === 'unknown') {
    console.error(`Unknown character: "${b}"`);
    process.exit(1);
  }

  const uncovered = [];
  if (aRes.status === 'unmatched') uncovered.push(aRes.key);
  if (bRes.status === 'unmatched') uncovered.push(bRes.key);

  const value =
    aRes.status === 'matched' && bRes.status === 'matched'
      ? sharedComics(data, aRes.key, bRes.key)
      : null;

  if (json) {
    console.log(
      JSON.stringify(
        {
          hero1: aRes.key,
          hero2: bRes.key,
          sharedComics: value,
          uncovered,
          note:
            value === null
              ? 'One or both characters have no 1961–2002 dataset coverage'
              : undefined,
        },
        null,
        2
      )
    );
    return;
  }

  if (uncovered.length) {
    console.log(`${aRes.key}  ↔  ${bRes.key}`);
    console.log(`sharedComics: n/a`);
    console.log(
      `No dataset coverage for: ${uncovered.join(', ')} ` +
        `(post-2002 or below the top-327 threshold — relations cannot be inferred without another source).`
    );
    process.exitCode = 2;
    return;
  }

  console.log(`${aRes.key}  ↔  ${bRes.key}`);
  console.log(`sharedComics: ${value}`);
  if (value === 0) {
    console.log('(no documented co-appearance in the 1961–2002 dataset)');
  }
}

function main() {
  const { names, limit, min, json } = parseNames(process.argv.slice(2));

  if (!names.length || names[0] === '--help' || names[0] === '-h') {
    console.log(`Usage:
  node relations.js <character> [--limit N] [--min N] [--json]
  node relations.js <characterA> <characterB> [--json]

Examples:
  npm run relations -- "Iron Man"
  npm run relations -- "Dark Phoenix" "Cyclops"
  npm run relations -- "Dark Phoenix" "Miles Morales"`);
    process.exit(names.length ? 0 : 1);
  }

  const data = loadData();

  if (names.length === 1) {
    const res = resolveName(names[0], data);
    if (res.status === 'ambiguous') {
      console.error(`Ambiguous: "${names[0]}". Did you mean:\n  - ${res.candidates.join('\n  - ')}`);
      process.exit(1);
    }
    if (res.status === 'unknown') {
      console.error(`Unknown character: "${names[0]}"`);
      process.exit(1);
    }
    if (res.status === 'unmatched') {
      console.log(`${res.key}`);
      console.log('Status: unmatched');
      console.log(
        'No 1961–2002 co-appearance data (introduced after 2002 or below dataset threshold).'
      );
      process.exitCode = 2;
      return;
    }
    printPartners(data, res.key, { limit, min, json });
    return;
  }

  if (names.length === 2) {
    printPair(data, names[0], names[1], { json });
    return;
  }

  console.error('Pass one character (partner list) or two (pair lookup).');
  process.exit(1);
}

main();
