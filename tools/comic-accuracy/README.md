# Comic Accuracy — Co-Appearance Lookup

Standalone research tool. **Not part of the Marvel United Randomizer app.**

Answers one question: *"Have character A and character B actually shared panel time in the comics?"*  
Use it to flag cross-comically accurate (or inaccurate) pairings when building custom MU crossovers.

---

## How to run

**Requirements:** Node.js ≥ 18. No npm install needed — zero external dependencies.

```bash
cd tools/comic-accuracy
node build.js
```

The script will:
1. Fetch the co-appearance edge list from GitHub (melaniewalsh/sample-social-network-datasets)
2. Fetch all Marvel United box JSONs from GitHub (OscarGarPer/Marvel-United-Json-Database)
3. Cross-reference character names between the two sources
4. Write a fresh `co-appearances.json` in this directory

Typical run time: ~10 seconds (all network, no heavy computation).

---

## Pre-built output

[`co-appearances.json`](./co-appearances.json) is committed and ready to consult — **no script run needed** for routine lookups.

For a human-readable top list, see [`TOP-100-PAIRS.md`](./TOP-100-PAIRS.md).

---

## Using the data

### Check a specific pair

```js
import data from './co-appearances.json' assert { type: 'json' };

const count = data.byCharacter['Iron Man (Civil War)']?.['Doctor Doom'] ?? 0;
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
| not present | No documented co-appearance before 2002 |

---

## Output structure

```jsonc
{
  "meta": {
    "generated": "2026-08-09",
    "datasetCoverage": "1961–2002",
    "totalMuCharacters": 347,
    "matchedCharacters": 198,
    "unmatchedCharacters": 149
  },
  "matchedNames": {
    // MU display name → dataset node id used for the lookup
    "Iron Man (Civil War)": "Iron Man / Tony Stark",
    "Captain America (Sam Wilson)": "Captain America"
  },
  "unmatched": ["America Chavez", "Groot", "Miles Morales", ...],
  "pairs": [
    // Flat list, sorted by sharedComics descending
    { "hero1": "Human Torch", "hero2": "The Thing", "sharedComics": 744 }
  ],
  "byCharacter": {
    // Nested lookup, inner objects also sorted by count descending
    "Iron Man (Civil War)": {
      "Captain America (Sam Wilson)": 446,
      "Thor": 344
    }
  }
}
```

---

## Coverage

**198 of 347 MU characters** matched to the dataset. **4,571 pairs** computed.

The dataset covers ~327 of the most frequently appearing characters from **13,000+ comics, 1961–2002**.

Characters in `unmatched` fall into three buckets:

| Reason | Examples |
|---|---|
| Introduced after 2002 | America Chavez, Rocket, Groot, Miles Morales, Ironheart |
| Pre-2002 but below dataset threshold | Blade, Venom, Carnage, Rhino, Electro, Mysterio |
| MU-specific variants with no direct entry | Dark Phoenix, Colossus (Phoenix Five), Onslaught |

These are documented gaps, not errors. Use [Marvel Fandom](https://marvel.fandom.com) or [Comic Vine](https://comicvine.gamespot.com) for manual research on unmatched characters.

---

## Data sources

| Source | Role |
|---|---|
| [OscarGarPer/Marvel-United-Json-Database](https://github.com/OscarGarPer/Marvel-United-Json-Database) | MU character names per box |
| [melaniewalsh/sample-social-network-datasets](https://github.com/melaniewalsh/sample-social-network-datasets/tree/master/sample-datasets/marvel) | Pre-computed co-appearance weights (CSV) |
| [Rosselló, Alberich & Miro (2002)](https://arxiv.org/abs/cond-mat/0202174) | Research paper — *"Marvel Universe looks almost like a real social network"* |
| [Russ Chappell's Marvel Chronology Project](http://www.chronologyproject.com/) | Primary source: every significant Marvel appearance catalogued |

---

## Adding a missing character

If a new MU character isn't auto-matching, add it to the `OVERRIDES` map at the top of `build.js`:

```js
'Your MU Character Name': 'Dataset Node Id',
```

Dataset node ids use the format `Alias / Real Name` (truncated). Browse available names in the [nodes CSV](https://raw.githubusercontent.com/melaniewalsh/sample-social-network-datasets/master/sample-datasets/marvel/marvel-unimodal-nodes.csv).

Then re-run `node build.js` to regenerate.
