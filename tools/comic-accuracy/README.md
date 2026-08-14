# Comic Accuracy — Co-Appearance Lookup

Standalone research tool. **Not part of the Marvel United Randomizer app.**

Answers one question: *"Have character A and character B actually shared panel time in the comics?"*  
Use it to flag cross-comically accurate (or inaccurate) pairings when building custom MU crossovers.

**Requirements:** Node.js ≥ 18. No npm install needed — zero external dependencies.

| Script | Command | Purpose |
|---|---|---|
| Relations CLI | `npm run relations -- …` | Offline partner list / pair lookup (legacy + modern) |
| Build (legacy) | `npm run build` / `node build.js` | Refresh `co-appearances.json` from upstream (1961–2002) |
| Build (modern) | `npm run build-modern` | Refresh `modern-co-appearances.json` from Comic Vine (2003+) |
| Resolve CV IDs | `npm run resolve` | Search Comic Vine for null entries in `cv-ids.json` |
| Groups | `node generate-groups.js` | Write villain-centric `TOP-GROUPS.md` |

---

## Relations CLI (offline)

Reads the committed [`co-appearances.json`](./co-appearances.json) and [`modern-co-appearances.json`](./modern-co-appearances.json) — **no network**. Rebuild only if you need fresher data.

```bash
cd tools/comic-accuracy

# Ranked partners for one character
npm run relations -- "Iron Man"
npm run relations -- "Iron Man" --top 100
npm run relations -- "Iron Man" --top 10 --min 20

# Shared comics between two characters
npm run relations -- "Dark Phoenix" "Cyclops"
npm run relations -- "Dark Phoenix" "Miles Morales"

# Machine-readable
npm run relations -- "Iron Man" --json
npm run relations -- "Dark Phoenix" "Cyclops" --json
```

| Mode | Args | Output |
|---|---|---|
| Partners | one name | Ranked table of MU partners (legacy + modern if available) |
| Pair | two names | `legacySharedComics` + `modernSharedComics`, or `n/a` if absent |

**Flags:** `--top N` / `-n N` (default 25), `--min N` (min sharedComics to show), `--json`.

> npm steals `--limit` (it's an npm config key), so use `--top` when calling via `npm run`. Direct `node relations.js … --limit 100` still works.

Names resolve with exact match, hyphen/space-insensitive compact match (`Spiderman` → `Spider-Man`), then fuzzy match. Ambiguous queries print candidates and exit `1`. Unmatched characters with no coverage in either source exit `2`.

Example pair output:

```text
Dark Phoenix  ↔  Cyclops
legacySharedComics: 390
modernSharedComics: 45   (cover_date >= 2003-01-01)
```

```text
Miles Morales  ↔  Spider-Man
legacySharedComics: n/a
  (no 1961–2002 coverage for: Miles Morales — post-2002 or below top-327 threshold)
modernSharedComics: 42   (cover_date >= 2003-01-01)
```

---

## Rebuild the legacy dataset (1961–2002)

```bash
cd tools/comic-accuracy
node build.js
# or: npm run build
```

1. Fetch co-appearance edges (melaniewalsh/sample-social-network-datasets)
2. Fetch Marvel United box JSONs (OscarGarPer/Marvel-United-Json-Database)
3. Match MU names → dataset nodes (`OVERRIDES` + normalised fuzzy match)
4. Fan out relations to **every** MU alias that shares a dataset node
5. Write `co-appearances.json`

Typical run time: ~10 seconds (network-bound).

Matching improvements in `build.js`:

- Manual `OVERRIDES` for identity aliases (Cable → Nathan Summers, Dark Phoenix → Jean Grey, Yellow Jacket → Hank Pym, …)
- Normalisation handles `Last, First`, parentheticals `(Civil War)`, and `[asgardian]` tags
- Variants that share a dataset node (e.g. `Iron Man` and `Iron Man (Civil War)`) each get a full `byCharacter` entry; `pairs` keeps one preferred (shortest, non-parenthetical) name per node

---

## Modern dataset (2003+) — Comic Vine

Extends coverage to the post-2002 gap using the [Comic Vine API](https://comicvine.gamespot.com/api/).

**`modern-co-appearances.json` is fully built and committed** (generated 2026-08-12): 125 characters processed, 5,945 pairs computed. `cv-ids.json` has 127 of 128 entries mapped — only `Sentinel` remains null.

To rebuild or expand coverage, follow the steps below.

### Quickstart

```bash
cd tools/comic-accuracy

# 1. Get a free Comic Vine API key (https://comicvine.gamespot.com/api/)
#    Set it as an environment variable — never commit it:

# PowerShell (Windows)
$env:COMIC_VINE_API_KEY = "your_key_here"

# Bash/macOS/Linux
export COMIC_VINE_API_KEY=your_key_here

# Alternatively copy .env.example → .env and fill in the key (sourced automatically)

# 2. Dry-run: print CV search suggestions without writing
node build-modern-comicvine.js --resolve --dry-run

# 3. Write auto-suggestions into cv-ids.json (review afterwards!)
npm run resolve

# 4. Manually correct wrong IDs in cv-ids.json.
#    The first CV search result is often the wrong publisher / version.
#    e.g. "Rocket" resolves to a Milestone Comics character — set manually to CV:32814

# 5. Validate on a small subset first
node build-modern-comicvine.js --spike 20

# 6. Full build once satisfied
npm run build-modern
```

### How it works

1. Read `cv-ids.json` (MU name → Comic Vine character ID)
2. For each character with a non-null ID, call the CV `/character/` endpoint to get all their issue IDs in one request (the `/issues/` endpoint's `character_ids` filter is silently ignored by CV)
3. Compute pairwise intersection: `modernSharedComics(A,B) = |issues(A) ∩ issues(B)|`
4. Write `modern-co-appearances.json`

API calls are rate-limited to ~1 req/sec. Results are cached per-character in `cache/` (gitignored) — reruns only re-fetch missing or deleted entries.

> **Date accuracy:** For characters who debuted after 2003 (Miles Morales, Silk, Gwenpool, etc.) all their issue credits are modern. For pre-2003 characters their count includes some classic-era issues. CV's `/issues/` endpoint silently ignores the `character_ids` filter, making server-side date filtering impractical.

### cv-ids.json

`cv-ids.json` maps every MU display name to its Comic Vine character ID. **127 of 128 entries are mapped**; only `Sentinel` remains `null`. Use `--resolve` to get CV search suggestions for any remaining nulls, then verify each manually:

```jsonc
{
  "Miles Morales": 1009652,   // confirmed: Miles Morales (Earth-1610) Spider-Man
  "Venom": 1009493,            // confirmed: Eddie Brock as Venom
  "Sentinel": null,            // no reliable CV match found yet
  ...
}
```

Add matched legacy characters (Iron Man, Thor, Spider-Man…) to compute cross-era pairs like `Miles Morales ↔ Spider-Man`.

### Caveats

- Auto-resolved IDs (`--resolve`) use the top CV search result — verify for alternate versions (Hawkeye → Clint Barton vs Kate Bishop, Mighty Thor → Jane Foster vs Thor Odinson, etc.)
- Issue credit quality varies; some comics are under-tagged on Comic Vine
- `modernSharedComics` counts individual issue appearances, not story arcs

---

## Command reference

### `relations.js` — offline lookup

```bash
# Single character: ranked partner list
node relations.js "Iron Man"
node relations.js "Iron Man" --top 50
node relations.js "Iron Man" --top 20 --min 10
node relations.js "Iron Man" --json

# Two characters: pair summary
node relations.js "Dark Phoenix" "Cyclops"
node relations.js "Miles Morales" "Spider-Man" --json

# Via npm (--top instead of --limit, which npm intercepts)
npm run relations -- "Iron Man" --top 10
npm run relations -- "Dark Phoenix" "Cyclops"
```

| Flag | Alias | Default | Description |
|---|---|---|---|
| `--top N` | `-n N` | 25 | Max partners to show |
| `--min N` | | 1 | Min shared comics to include |
| `--json` | | false | Machine-readable output |

Exit codes: `0` = success, `1` = ambiguous/bad name, `2` = no coverage in any source.

---

### `build.js` — rebuild legacy dataset (1961–2002)

```bash
node build.js
# or: npm run build
```

Network-only (no API key needed). Fetches upstream co-appearance CSV and MU box JSONs, then writes `co-appearances.json`. Runs in ~10 s.

---

### `build-modern-comicvine.js` — Comic Vine pipeline

```bash
# REQUIRED environment variable:
$env:COMIC_VINE_API_KEY = "your_key_here"          # PowerShell
export COMIC_VINE_API_KEY=your_key_here             # bash

# ─── Resolve mode ──────────────────────────────────────────────────────────
# Search Comic Vine for each null entry in cv-ids.json.
# Prints top 5 candidate IDs + descriptions for manual review.
node build-modern-comicvine.js --resolve
npm run resolve

# Dry-run: print suggestions only, do not write cv-ids.json
node build-modern-comicvine.js --resolve --dry-run

# ─── Spike mode ────────────────────────────────────────────────────────────
# Process only the first N characters (default: 10) — fast sanity-check.
node build-modern-comicvine.js --spike 20
node build-modern-comicvine.js --spike 5

# ─── Full build ────────────────────────────────────────────────────────────
# Fetch issue appearances for all non-null IDs, compute pairings,
# write modern-co-appearances.json.
node build-modern-comicvine.js
npm run build-modern
```

| Flag | Description |
|---|---|
| `--resolve` | Search CV API for null IDs; auto-pick top result and write to `cv-ids.json` |
| `--dry-run` | (with `--resolve`) Print candidates only; do not write anything |
| `--spike N` | Process first N characters; useful for validating cache + API access |

**Rate limit:** ~1 req/sec (1 200 ms gap). The CV free tier allows ~200 req/hour.  
**Cache:** Per-character issue lists are stored in `cache/cv-{id}-modern.json` (gitignored). Reruns skip cached entries.  
**API note:** CV's `/issues/?filter=character_ids:X` silently ignores the character filter. The build uses `/character/4005-{id}/` instead, which returns the full issue credit list in one request.  
**Typical full-build time:** 3–4 min (1 API call per character, ~125 calls total).

---

### `generate-groups.js` — villain hero groups

```bash
node generate-groups.js
```

Reads `co-appearances.json` and writes [`TOP-GROUPS.md`](./TOP-GROUPS.md): for each MU villain, the top comic-accurate heroes to face them.

---

## Pre-built output

Both datasets are committed and ready for offline lookups — **no script run needed**.

[`co-appearances.json`](./co-appearances.json) — legacy (1961–2002): 221 characters, ~4,800 pairs.

[`modern-co-appearances.json`](./modern-co-appearances.json) — modern (2003+): 125 characters, 5,945 pairs, generated 2026-08-12.

Also available:

- [`TOP-100-PAIRS.md`](./TOP-100-PAIRS.md) — human-readable strongest pairs
- [`TOP-GROUPS.md`](./TOP-GROUPS.md) — villain-centric hero groups (`node generate-groups.js`)

---

## Using the data in code

### Check a specific pair

```js
import data from './co-appearances.json' with { type: 'json' };

const count = data.byCharacter['Iron Man']?.['Doctor Doom'] ?? 0;
// count = number of individual comic issues they appeared in together (pre-2002)
```

### Find best comic-accurate partners for a character

```js
const partners = data.byCharacter['Doctor Doom'];
// Object is pre-sorted by count descending.
// First entry = most historically grounded crossover partner.
```

### Scan all pairs above a threshold

```js
const strongPairs = data.pairs.filter(p => p.sharedComics >= 20);
```

### Threshold guide

| sharedComics | Meaning |
|---|---|
| > 100 | Core relationship — very accurate crossover |
| 20 – 100 | Solid shared history |
| 5 – 19 | They've met |
| 1 – 4 | Technically true, barely meaningful |
| not present / `0` | No documented co-appearance in that window |
| `n/a` — legacy | Character(s) unmatched in 1961–2002 dataset |
| `n/a` — modern | Character has no confirmed CV ID in `cv-ids.json` |

---

## Output structure

### `co-appearances.json` (legacy)

```jsonc
{
  "meta": {
    "generated": "2026-08-12",
    "datasetCoverage": "1961–2002",
    "totalMuCharacters": 347,
    "matchedCharacters": 221,
    "unmatchedCharacters": 126
  },
  "matchedNames": {
    // MU display name → dataset node id used for the lookup
    "Iron Man": "Iron Man / Tony Stark",
    "Iron Man (Civil War)": "Iron Man / Tony Stark",
    "Dark Phoenix": "Marvel Girl / Jean Grey",
    "Cable": "Summers, Nathan Chri"
  },
  "unmatched": ["America Chavez", "Groot", "Miles Morales", ...],
  "pairs": [
    // Flat list, sorted by sharedComics descending (one preferred MU name per dataset node)
    { "hero1": "Human Torch", "hero2": "The Thing", "sharedComics": 744 }
  ],
  "byCharacter": {
    // Every MU alias that shares a dataset node gets a full entry
    "Iron Man": { "Captain America": 446, "Thor": 344 },
    "Iron Man (Civil War)": { "Captain America": 446, "Thor": 344 }
  }
}
```

### `modern-co-appearances.json` (Comic Vine)

```jsonc
{
  "meta": {
    "generated": "2026-08-12",
    "source": "comicvine",
    "method": "character-endpoint-issue-credits",
    "dateWindow": "all-time (CV /character/ endpoint; cover_date filter not supported on /issues/)",
    "charactersProcessed": 125,
    "pairsFound": 5945,
    "spikeMode": false
  },
  "pairs": [
    { "hero1": "Spider-Man", "hero2": "Iron Man", "sharedComics": 312 }
  ],
  "byCharacter": {
    "Miles Morales": { "Spider-Man": 42, "Iron Man": 18 }
  }
}
```

---

## Coverage

**Legacy (1961–2002):** 221 of 347 MU characters matched, ~4,800 pairs.  
**Modern (2003+):** 125 characters with confirmed CV IDs, 5,945 pairs.

The legacy dataset covers ~327 of the most frequently appearing characters from **13,000+ comics, 1961–2002**.

Characters unmatched in the legacy layer fall into three buckets:

| Reason | Examples | Can we map them? |
|---|---|---|
| Introduced after 2002 | America Chavez, Rocket, Groot, Miles Morales, Ironheart | Via CV IDs in `cv-ids.json` (modern layer) |
| Pre-2002 but below top-327 cut | Blade, Venom, Carnage, Rhino, Electro, Mysterio | Via CV IDs (modern); not in legacy edge list |
| MU-only variants with no node | Onslaught, Lady Deadpool | Only via `OVERRIDES` to an existing legacy node |

Identity aliases that *are* in the dataset (Dark Phoenix → Jean Grey, Cable → Nathan Summers, Baron Zemo → Citizen V, Spectrum → Monica Rambeau, etc.) are mapped in `OVERRIDES` and share that node's relations.

---

## Data sources

| Source | Layer | Role |
|---|---|---|
| [OscarGarPer/Marvel-United-Json-Database](https://github.com/OscarGarPer/Marvel-United-Json-Database) | Both | MU character names per box |
| [melaniewalsh/sample-social-network-datasets](https://github.com/melaniewalsh/sample-social-network-datasets/tree/master/sample-datasets/marvel) | Legacy | Pre-computed co-appearance weights (CSV) |
| [Rosselló, Alberich & Miro (2002)](https://arxiv.org/abs/cond-mat/0202174) | Legacy | Research paper — *"Marvel Universe looks almost like a real social network"* |
| [Russ Chappell's Marvel Chronology Project](http://www.chronologyproject.com/) | Legacy | Primary source: every significant Marvel appearance catalogued |
| [Comic Vine API](https://comicvine.gamespot.com/api/) | Modern | Issue credits — 2003 → present |

---

## Adding a missing character

### Legacy dataset

If a MU character exists in the nodes CSV under another name, add it to `OVERRIDES` at the top of `build.js`:

```js
'Your MU Character Name': 'Dataset Node Id',
```

Dataset node ids use the format `Alias / Real Name` (truncated). Browse available names in the [nodes CSV](https://raw.githubusercontent.com/melaniewalsh/sample-social-network-datasets/master/sample-datasets/marvel/marvel-unimodal-nodes.csv).

Then re-run `node build.js` to regenerate. Characters not present in the ~327-node dataset cannot be matched this way.

### Modern dataset

Add the character's Comic Vine ID to `cv-ids.json`, then re-run `npm run build-modern`. Use `npm run resolve` to search CV for candidates, or look up the ID at [comicvine.gamespot.com](https://comicvine.gamespot.com) — the numeric ID appears in the character URL (e.g. `…/4005-1234/` → ID `1234`).