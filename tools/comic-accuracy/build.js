#!/usr/bin/env node
/**
 * Marvel United — Comic Accuracy Co-Appearance Builder
 *
 * Standalone tool. NOT part of the MUR app.
 *
 * Sources:
 *   - MU characters : OscarGarPer/Marvel-United-Json-Database (en/*.json)
 *   - Co-appearance data: Marvel Universe Social Network (1961–2002)
 *     via melaniewalsh/sample-social-network-datasets
 *     Originally: Rosselló, Alberich & Miro (2002), from Russ Chappell's Marvel Chronology Project
 *
 * Output:
 *   co-appearances.json  — consultable lookup for crossover accuracy research
 *
 * Coverage note:
 *   The dataset covers ~327 characters who appeared together in 13,000+ comics (1961–2002).
 *   Characters introduced after 2002 (e.g. America Chavez, Kamala Khan, Miles Morales)
 *   will appear in the `unmatched` list. That is expected, not a bug.
 *
 * Usage:
 *   node build.js
 */

import https from 'node:https';
import http from 'node:http';
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ─── Sources ─────────────────────────────────────────────────────────────────

const EDGES_URL =
  'https://raw.githubusercontent.com/melaniewalsh/sample-social-network-datasets/master/sample-datasets/marvel/marvel-unimodal-edges.csv';

const MU_BOX_URLS = [
  'https://raw.githubusercontent.com/OscarGarPer/Marvel-United-Json-Database/main/en/mun-ultimate.json',
  'https://raw.githubusercontent.com/OscarGarPer/Marvel-United-Json-Database/main/en/mun-uncanny.json',
  'https://raw.githubusercontent.com/OscarGarPer/Marvel-United-Json-Database/main/en/mun-spidergeddon.json',
  'https://raw.githubusercontent.com/OscarGarPer/Marvel-United-Json-Database/main/en/mun-omniverse.json',
  'https://raw.githubusercontent.com/OscarGarPer/Marvel-United-Json-Database/main/en/mun-pr02.json',
];

// ─── Manual overrides ─────────────────────────────────────────────────────────
// MU display name → exact dataset node Id
// Used when auto-matching fails or is ambiguous.
const OVERRIDES = {
  'Adam Warlock':         'Warlock Ii / Adam Warl',
  'Ghost Rider':          'Ghost Rider Ii / Johnn',   // Johnny Blaze
  'Ghost Rider (Johnny Blaze)': 'Ghost Rider Ii / Johnn',
  'Human Torch':          'Human Torch / Johnny S',   // Johnny Storm (not the Android)
  'Ant-Man':              'Ant-man / Dr. Henry J.',   // Hank Pym
  'Ant-man':              'Ant-man / Dr. Henry J.',
  'Captain Marvel':       'Captain Marvel / Capta',   // Monica Rambeau era entry; Carol arc starts post-2002
  'Ms. Marvel':           'Captain Marvel Ii / Mo',
  'Black Widow':          'Black Widow / Natasha',
  'Black Panther':        "Black Panther / T'chal",
  'Dr. Strange':          'Dr. Strange / Stephen',
  'Doctor Strange':       'Dr. Strange / Stephen',
  'Dr. Doom':             'Dr. Doom / Victor Von',
  'Doctor Doom':          'Dr. Doom / Victor Von',
  'Nick Fury':            'Fury, Col. Nicholas',
  'Nick Fury, Sr.':       'Fury, Col. Nicholas',
  'Namor':                'Sub-mariner / Namor Ma',
  'Sub-Mariner':          'Sub-mariner / Namor Ma',
  'Iron Fist':            'Iron Fist / Daniel Ran',
  'Luke Cage':            'Cage, Luke / Carl Luca',
  'Power Man':            'Cage, Luke / Carl Luca',
  'Punisher':             'Punisher Ii / Frank Ca',
  'The Punisher':         'Punisher Ii / Frank Ca',
  'Red Skull':            'Red Skull / Johann Sch',
  'Green Goblin':         'Green Goblin / Norman',
  'Doc Ock':              'Dr. Octopus / Otto Oct',
  'Doctor Octopus':       'Dr. Octopus / Otto Oct',
  'Silver Surfer':        'Silver Surfer / Norrin',
  'Galactus':             'Galactus / Galan',
  'Kingpin':              'Kingpin / Wilson Fisk',
  'White Queen':          'White Queen / Emma Fro',
  'Emma Frost':           'White Queen / Emma Fro',
  'Emma Frost (Phoenix Five)': 'White Queen / Emma Fro',
  'Apocalypse':           'Apocalypse / En Sabah',
  'Mr. Sinister':         'Mr. Sinister / Nathan',
  'Mister Sinister':      'Mr. Sinister / Nathan',
  'Ka-Zar':               'Ka-zar / Kevin Plunder',
  'Deadpool':             'Deadpool / Jack / Wade W',
  'Sabretooth':           'Sabretooth / Victor Cr',
  'Domino':               'Domino Iii / Beatrice / ',
  // Fantastic Four aliases
  'The Thing':            'Thing / Benjamin J. Gr',
  'Mister Fantastic':     'Mr. Fantastic / Reed R',
  'Mr. Fantastic':        'Mr. Fantastic / Reed R',
  'Invisible Woman':      'Invisible Woman / Sue',
  // X-Men aliases
  'Jean Grey':            'Marvel Girl / Jean Grey',
  'Colossus':             'Colossus Ii / Peter Ra',
  'Colossus (Phoenix Five)': 'Colossus Ii / Peter Ra',
  'Kitty Pryde':          'Shadowcat / Katherine',
  'Shadowcat':            'Shadowcat / Katherine',
  'Magneto':              'Magneto / Magnus / Eric',
  // Avengers / other
  'War Machine':          'Iron Man Iv / James R.',
  'U.S. Agent':           'Usagent / Captain John',
  'Songbird':             'Screaming Mimi / Melis',
  'Moonstone':            'Moonstone Ii / Karla S',
  'Namor (Phoenix Five)': 'Sub-mariner / Namor Ma',
  'Logan':                'Wolverine / Logan',
};

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

function parseCSV(text) {
  const lines = text.split('\n').filter(Boolean);
  const header = lines[0].split(',').map((h) => h.replace(/^"|"$/g, '').trim());
  return lines.slice(1).map((line) => {
    const cols = [];
    let inQuote = false;
    let cur = '';
    for (const ch of line) {
      if (ch === '"') { inQuote = !inQuote; continue; }
      if (ch === ',' && !inQuote) { cols.push(cur); cur = ''; continue; }
      cur += ch;
    }
    cols.push(cur);
    return Object.fromEntries(header.map((h, i) => [h, (cols[i] ?? '').trim()]));
  });
}

/** Normalise a name to its primary alias for fuzzy matching. */
function normalise(name) {
  return name
    .split('/')[0]          // take alias part
    .split(',')[0]          // take first part if "Lastname, Firstname" format
    .replace(/\[.*?\]/g, '') // strip [inhuman], [asgardian] etc.
    .replace(/[^a-z0-9\s]/gi, ' ')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();
}

/** Find the best dataset node Id for a given MU character name. */
function findMatch(muName, datasetNormMap) {
  // 1. Manual override wins
  if (OVERRIDES[muName]) return OVERRIDES[muName];

  const target = normalise(muName);

  // 2. Exact normalised match
  if (datasetNormMap.has(target)) return datasetNormMap.get(target);

  // 3. Starts-with match (longest wins)
  let best = null;
  let bestLen = 0;
  for (const [norm, original] of datasetNormMap) {
    if (norm.startsWith(target) || target.startsWith(norm)) {
      if (norm.length > bestLen) {
        bestLen = norm.length;
        best = original;
      }
    }
  }
  return best;
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  console.log('⬇  Fetching co-appearance edges…');
  const edgesText = await fetchText(EDGES_URL);
  const edges = parseCSV(edgesText);
  console.log(`   ${edges.length} edges loaded.`);

  // Build a Set of all dataset node names
  const datasetNames = new Set();
  for (const e of edges) {
    datasetNames.add(e.Source);
    datasetNames.add(e.Target);
  }

  // Normalised → original map for matching
  const datasetNormMap = new Map();
  for (const name of datasetNames) {
    datasetNormMap.set(normalise(name), name);
  }

  console.log(`\n⬇  Fetching Marvel United box JSONs (${MU_BOX_URLS.length} boxes)…`);
  const muCharacters = new Map(); // display name → dataset Id (or null)

  for (const url of MU_BOX_URLS) {
    const boxName = url.split('/').pop();
    process.stdout.write(`   ${boxName}… `);
    const json = JSON.parse(await fetchText(url));
    const chars = (json.characters ?? []).filter(
      (c) => c.name?.text && !['hidden', 'other'].includes(c.loyalty)
    );
    for (const c of chars) {
      const name = c.name.text.trim();
      if (!muCharacters.has(name)) {
        muCharacters.set(name, findMatch(name, datasetNormMap));
      }
    }
    console.log(`${chars.length} chars`);
  }

  // ── Stats ──────────────────────────────────────────────────────────────────
  const matched = [...muCharacters.entries()].filter(([, v]) => v !== null);
  const unmatched = [...muCharacters.entries()].filter(([, v]) => v === null).map(([k]) => k);

  console.log(`\n✓  ${muCharacters.size} unique MU characters`);
  console.log(`   ${matched.length} matched to dataset`);
  console.log(`   ${unmatched.length} unmatched (likely post-2002 or niche)`);
  if (unmatched.length) console.log(`   Unmatched: ${unmatched.join(', ')}`);

  // ── Build reverse lookup: datasetId → MU display name ─────────────────────
  const datasetIdToMu = new Map(matched.map(([mu, ds]) => [ds, mu]));

  // ── Build co-appearance lookup filtered to MU characters only ─────────────
  const coAppearances = {};

  for (const { Source, Target, Weight } of edges) {
    const muA = datasetIdToMu.get(Source);
    const muB = datasetIdToMu.get(Target);
    if (!muA || !muB) continue;

    const w = parseInt(Weight, 10);
    if (!coAppearances[muA]) coAppearances[muA] = {};
    if (!coAppearances[muB]) coAppearances[muB] = {};
    coAppearances[muA][muB] = w;
    coAppearances[muB][muA] = w;
  }

  // Sort inner objects by count descending for readability
  for (const key of Object.keys(coAppearances)) {
    coAppearances[key] = Object.fromEntries(
      Object.entries(coAppearances[key]).sort(([, a], [, b]) => b - a)
    );
  }

  // ── Build flat list sorted by weight descending ────────────────────────────
  const pairs = [];
  const seen = new Set();
  for (const [a, targets] of Object.entries(coAppearances)) {
    for (const [b, w] of Object.entries(targets)) {
      const key = [a, b].sort().join('||');
      if (!seen.has(key)) {
        seen.add(key);
        pairs.push({ hero1: a, hero2: b, sharedComics: w });
      }
    }
  }
  pairs.sort((a, b) => b.sharedComics - a.sharedComics);

  // ── Output ─────────────────────────────────────────────────────────────────
  const output = {
    meta: {
      generated: new Date().toISOString().split('T')[0],
      datasetCoverage: '1961–2002',
      datasetSource:
        'Marvel Universe Social Network — Rosselló, Alberich & Miro (2002), ' +
        'via melaniewalsh/sample-social-network-datasets (unimodal, top 327 characters)',
      muBoxes: MU_BOX_URLS.map((u) => u.split('/').pop()),
      totalMuCharacters: muCharacters.size,
      matchedCharacters: matched.length,
      unmatchedCharacters: unmatched.length,
      note:
        'Unmatched characters were introduced after 2002 or appear fewer than 5 times ' +
        'in the dataset. sharedComics = number of individual comic issues both characters appeared in.',
    },
    matchedNames: Object.fromEntries(matched),
    unmatched: unmatched.sort(),
    pairs,
    byCharacter: coAppearances,
  };

  const outPath = path.join(__dirname, 'co-appearances.json');
  writeFileSync(outPath, JSON.stringify(output, null, 2), 'utf8');
  console.log(`\n✅  Written to ${outPath}`);
  console.log(`   ${pairs.length} MU-relevant pairs`);
}

main().catch((err) => {
  console.error('Error:', err.message);
  process.exit(1);
});
