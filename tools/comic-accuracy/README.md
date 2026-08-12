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

Reads the committed [`co-appearances.json`](./co-appearances.json) — **no network**. Rebuild first only if you need fresher data.

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

> npm steals `--limit` (it’s an npm config key), so use `--top` when calling via `npm run`. Direct `node relations.js … --limit 100` still works.

Names resolve with exact match, hyphen/space-insensitive compact match (`Spiderman` → `Spider-Man`), then fuzzy match. Ambiguous queries print candidates and exit `1`. Unmatched characters with no coverage in either source exit `2`.

Example pair output (after modern build):

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

```text
Miles Morales  ↔  Spider-Man
legacySharedComics: n/a
  (no 1961–2002 coverage for: Miles Morales — post-2002 or below top-327 threshold)
modernSharedComics: n/a   (run build-modern-comicvine.js to populate)
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

### Quickstart

```bash
cd tools/comic-accuracy

# 1. Get a free Comic Vine API key and export it
export COMIC_VINE_API_KEY=your_key_here

# 2. Resolve MU names → CV character IDs (review suggestions before proceeding)
npm run resolve           # writes auto-suggestions into cv-ids.json
# -- or --
node build-modern-comicvine.js --resolve --dry-run  # print only, don't write

# 3. Manually verify cv-ids.json entries (wrong versions are common)
#    e.g. "Venom" could resolve to Eddie Brock, Flash Thompson, or the symbiote

# 4. Run a spike on 20 characters first to validate hit rate
node build-modern-comicvine.js --spike 20

# 5. Full build once you're happy with the spike
npm run build-modern
```

### How it works

1. Read `cv-ids.json` (MU name → Comic Vine character ID)
2. For each character with a non-null ID, fetch their issue appearances filtered by `cover_date >= 2003-01-01` via the Comic Vine issues endpoint (paginated at 100/req)
3. Compute pairwise intersection: `modernSharedComics(A,B) = |issues(A) ∩ issues(B)|`
4. Write `modern-co-appearances.json`

API calls are rate-limited to ~1 req/sec. Results are cached per-character in `cache/` (gitignored) — reruns only re-fetch missing or deleted entries.

### cv-ids.json

`cv-ids.json` maps every MU display name to its Comic Vine character ID. All 126 unmatched characters start as `null`. Use `--resolve` to get CV search suggestions, then verify each manually:

```jsonc
{
  "Miles Morales": 1009652,   // confirmed: Miles Morales (Earth-1610) Spider-Man
  "Venom": 1009493,            // confirmed: Eddie Brock as Venom
  "Ghost-Spider": null,        // still needs mapping
  ...
}
```

Add matched legacy characters (Iron Man, Thor, Spider-Man…) to compute cross-era pairs like `Miles Morales ↔ Spider-Man`.

### Caveats

- Auto-resolved IDs (`--resolve`) use the top CV search result — verify for alternate versions (Hawkeye → Clint Barton vs Kate Bishop, Mighty Thor → Jane Foster vs Thor Odinson, etc.)
- Issue credit quality varies; some comics are under-tagged on Comic Vine
- `modernSharedComics` counts individual issue appearances, not story arcs

---

## Pre-built output

[`co-appearances.json`](./co-appearances.json) (legacy, 1961–2002) is committed and ready to consult — **no script run needed** for routine lookups.

[`modern-co-appearances.json`](./modern-co-appearances.json) (2003+) is a stub until you populate `cv-ids.json` and run `build-modern-comicvine.js`.

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
| `n/a` — modern | `modern-co-appearances.json` not yet built |

---

## Output structure

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
    "Iron Man": {
      "Captain America": 446,
      "Thor": 344
    },
    "Iron Man (Civil War)": {
      "Captain America": 446,
      "Thor": 344
    }
  }
}
```

---

## Coverage

**221 of 347 MU characters** matched to the dataset. **~4,800 pairs** computed.

The dataset covers ~327 of the most frequently appearing characters from **13,000+ comics, 1961–2002**.

Characters in `unmatched` fall into three buckets:

| Reason | Examples | Can we invent relations? |
|---|---|---|
| Introduced after 2002 | America Chavez, Rocket, Groot, Miles Morales, Ironheart | **No** — not in this dataset |
| Pre-2002 but below top-327 cut | Blade, Venom, Carnage, Rhino, Electro, Mysterio | **No** — absent from the edge list |
| MU-only variants with no node | Onslaught, Lady Deadpool, Ghost-Spider | Only if you map them via `OVERRIDES` to an existing node |

Identity aliases that *are* in the dataset (Dark Phoenix → Jean Grey, Cable → Nathan Summers, Baron Zemo → Citizen V, Spectrum → Monica Rambeau, etc.) are mapped in `OVERRIDES` and share that node’s relations.

Post-2002 coverage would need a **different data source** (manual curated lists, Marvel API, Comic Vine, etc.). This tool will not fabricate edges.

---

## Data sources

| Source | Layer | Role |
|---|---|---|
| [OscarGarPer/Marvel-United-Json-Database](https://github.com/OscarGarPer/Marvel-United-Json-Database) | Both | MU character names per box |
| [melaniewalsh/sample-social-network-datasets](https://github.com/melaniewalsh/sample-social-network-datasets/tree/master/sample-datasets/marvel) | Legacy | Pre-computed co-appearance weights (CSV) |
| [Rosselló, Alberich & Miro (2002)](https://arxiv.org/abs/cond-mat/0202174) | Legacy | Research paper — *"Marvel Universe looks almost like a real social network"* |
| [Russ Chappell's Marvel Chronology Project](http://www.chronologyproject.com/) | Legacy | Primary source: every significant Marvel appearance catalogued |
| [Comic Vine API](https://comicvine.gamespot.com/api/) | Modern | Issue credits with cover dates — 2003 → present |

---

## Adding a missing character

If a MU character exists in the nodes CSV under another name, add it to `OVERRIDES` at the top of `build.js`:

```js
'Your MU Character Name': 'Dataset Node Id',
```

Dataset node ids use the format `Alias / Real Name` (truncated). Browse available names in the [nodes CSV](https://raw.githubusercontent.com/melaniewalsh/sample-social-network-datasets/master/sample-datasets/marvel/marvel-unimodal-nodes.csv).

Then re-run `node build.js` to regenerate. Characters not present in the ~327-node dataset cannot be matched this way.
