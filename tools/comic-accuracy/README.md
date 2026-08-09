# Comic Accuracy — Co-Appearance Lookup

**Standalone research tool. Not part of the Marvel United Randomizer app.**

Answers one question: *"Have character A and character B actually appeared together in the comics?"*  
Use it to flag cross-comically accurate (or inaccurate) hero/villain combinations when building custom crossovers.

---

## Quick consult — `co-appearances.json`

The pre-built output is committed at [`co-appearances.json`](./co-appearances.json). No script needed.

### Structure

```jsonc
{
  "meta": { /* generation date, sources, coverage stats */ },

  // MU display name → dataset node Id used for matching
  "matchedNames": {
    "Iron Man (Civil War)": "Iron Man / Tony Stark",
    "Captain America (Sam Wilson)": "Captain America",
    ...
  },

  // Characters with no match in the dataset (see coverage note below)
  "unmatched": ["America Chavez", "Groot", "Miles Morales", ...],

  // Flat list, sorted by sharedComics descending — best for scanning
  "pairs": [
    { "hero1": "Human Torch", "hero2": "The Thing", "sharedComics": 744 },
    { "hero1": "Human Torch", "hero2": "Mister Fantastic", "sharedComics": 713 },
    ...
  ],

  // Nested lookup: byCharacter[A][B] = sharedComics count
  "byCharacter": {
    "Iron Man (Civil War)": {
      "Captain America (Sam Wilson)": 446,
      "Thor": 344,
      ...
    },
    ...
  }
}
```

### How to use it for crossover research

**Is this pair accurate?**  
Look up `byCharacter[heroName][villainName]`. Any value > 0 means they've shared panel time. Higher = stronger comic history.

**Suggested threshold:**
| sharedComics | Interpretation |
|---|---|
| > 100 | Core relationship — very accurate |
| 20 – 100 | Solid shared history |
| 5 – 19 | They've met |
| 1 – 4 | Technically true, barely relevant |
| missing / 0 | No documented co-appearance (pre-2002) |

**Find the best heroes for a villain:**
```js
const partners = coAppearances.byCharacter["Doctor Doom"];
// Already sorted by count. Top entries = most comic-accurate heroes to face Doom.
```

---

## Data sources

| Source | What it provides |
|---|---|
| [OscarGarPer/Marvel-United-Json-Database](https://github.com/OscarGarPer/Marvel-United-Json-Database) | Marvel United character names per box |
| [melaniewalsh/sample-social-network-datasets](https://github.com/melaniewalsh/sample-social-network-datasets/tree/master/sample-datasets/marvel) | Pre-computed co-appearance weights |
| [Rosselló, Alberich & Miro (2002)](https://arxiv.org/abs/cond-mat/0202174) | Original research — *"Marvel Universe looks almost like a real social network"* |
| [Russ Chappell's Marvel Chronology Project](http://www.chronologyproject.com/) | Primary source data (every significant Marvel appearance, 1961–2002) |

---

## Coverage

The dataset covers **~327 characters** extracted from **13,000+ comics published 1961–2002**.

**Characters in the `unmatched` list** fall into one of three categories:
1. **Introduced after 2002** — America Chavez, Rocket, Groot, Miles Morales, Kamala Khan, Ironheart, etc.
2. **Pre-2002 but not in the top-327 most connected characters** — Blade, Venom, Carnage, Electro, Rhino, etc. (they appear in fewer comics than the dataset threshold)
3. **Variant versions** — "Colossus (Phoenix Five)" is a different MU card from the base Colossus, whose base version IS matched

Unmatched characters are not wrong — they just lack dataset coverage. Use Marvel Fandom wiki or Comic Vine for manual research on those.

---

## Regenerating the lookup

Run this if new boxes are added to the OscarGarPer database:

```bash
node build.js
```

Requires Node.js ≥ 18. No dependencies.

The script fetches:
1. The co-appearance edges CSV from GitHub (melaniewalsh)
2. All MU box JSONs from GitHub (OscarGarPer)

Then writes a fresh `co-appearances.json`.

### Adding name overrides

If a new MU character isn't auto-matching, add an entry to the `OVERRIDES` map in `build.js`:

```js
'Your MU Character Name': 'Dataset Node Id as it appears in nodes CSV',
```

Node Ids use the format `Alias / Real Name` (truncated at ~20 chars), sourced from the [nodes CSV](https://raw.githubusercontent.com/melaniewalsh/sample-social-network-datasets/master/sample-datasets/marvel/marvel-unimodal-nodes.csv).
