# Plan: Wiki Image Pipeline

## Goal

Replace the manual image-sourcing step from Plan 05 (Hall of United) with a structured, reproducible pipeline:

1. **Build a wiki-slug mapping** — a JSON file in this repo that relates each of our character `id`s to their [cmon-united.fandom.com](https://cmon-united.fandom.com) wiki slug
2. **Write an extraction script** — crawls each character's fandom page and downloads the portrait image
3. **Hook it into the image folder structure** from Plan 05 Step 4 — images land at `app/public/images/heroes/{id}.jpg` and `app/public/images/villains/{id}.jpg`, no changes needed downstream

This supersedes Plan 05 Step 5 (the manual Hall of United download step). Everything else in Plan 05 remains unchanged.

---

## Background: why a mapping file, not pure derivation

The fandom wiki URL for most characters is mechanically derivable from the display name — `"Black Widow"` → `https://cmon-united.fandom.com/wiki/Black_Widow`. But a meaningful subset of characters break the pattern:

- Alternate versions: `"Mohawk Storm"` is likely `Storm_(Mohawk)` on the wiki
- Punctuation in names: `"Bob, Agent of Hydra"` → `Bob,_Agent_of_Hydra`
- Disambiguation slugs that the wiki resolves differently than we'd expect

An explicit mapping file makes every one of these visible and correctable. The fandom URL becomes a single lookup rather than a fragile string transform.

The [OscarGarPer JSON Database](https://github.com/OscarGarPer/Marvel-United-Json-Database) is used as a cross-reference during the mapping phase to confirm character names match between sources. It does not drive the image pipeline directly.

---

## Step 1 — Create the wiki-slug mapping file

**`app/src/data/wiki-slugs.json`**

A flat object mapping each character `id` from our data files to the fandom wiki slug (the part of the URL after `/wiki/`):

```json
{
  "spider-man": "Spider-Man",
  "miles-morales": "Miles_Morales",
  "ghost-spider": "Ghost-Spider",
  "iron-man": "Iron_Man",
  "captain-america": "Captain_America",
  "black-widow": "Black_Widow",
  "hulk": "Hulk",
  "captain-marvel": "Captain_Marvel",
  "ant-man": "Ant-Man",
  "wasp": "Wasp",
  "professor-x": "Professor_X",
  "cyclops": "Cyclops",
  "jean-grey": "Jean_Grey",
  "wolverine": "Wolverine",
  "storm": "Storm",
  "mohawk-storm": "Storm_(Mohawk)",
  "deadpool": "Deadpool",
  "lady-deadpool": "Lady_Deadpool",
  "bob-agent-of-hydra": "Bob,_Agent_of_Hydra",
  "deadpool-unicorn": "Deadpool_in_a_Unicorn",
  "black-panther": "Black_Panther",
  "winter-soldier": "Winter_Soldier",
  "shuri": "Shuri"
}
```

Add every hero and villain from `heroes.ts` and `villains.ts`. For each entry:

1. Start with the mechanical derivation: replace spaces with underscores
2. Open `https://cmon-united.fandom.com/wiki/{derived_slug}` in a browser
3. If it 404s or redirects to a disambiguation page, find the correct slug and use that instead
4. If the character has no fandom page yet, omit the entry — the extraction script will skip missing keys

Verify each URL resolves to the correct character page before committing.

Commit: `feat: add wiki-slug mapping for all owned characters`

---

## Step 2 — Audit names against the JSON Database

Before writing the extraction script, use the [JSON Database](https://github.com/OscarGarPer/Marvel-United-Json-Database) as a cross-reference to catch name mismatches in our own data.

For each JSON file (`mun-ultimate.json`, `mun-uncanny.json`, etc.):

1. Find each `character` entry whose `name.text` matches a character you own
2. Check that the name matches exactly what's in your `heroes.ts` / `villains.ts`
3. Check that the character is assigned to the correct `expansionId` in your data

Document any discrepancies. Fix data issues before running the script — a character whose `id` is wrong in your data will download an image under the wrong filename.

This doubles as the Plan 05 Step 1 audit. Do it here, once, before touching images.

Commit: `fix: correct character names and expansion assignments per JSON Database audit`

---

## Step 3 — Write the image extraction script

**`scripts/fetch-wiki-images.mjs`**

A Node.js script (no build step required — plain ESM) that:

1. Reads `app/src/data/wiki-slugs.json`
2. For each entry, fetches `https://cmon-united.fandom.com/wiki/{slug}`
3. Parses the HTML to find the character portrait — the `<figure>` with class `pi-image` inside the character infobox
4. Downloads the image at its highest available resolution
5. Saves it to `app/public/images/{role}/{id}.jpg` where `role` is `heroes` or `villains`

The script needs to know whether each `id` is a hero or villain. Pass a combined lookup built from `heroes.ts` and `villains.ts`, or add a `role` field to the mapping JSON.

```js
// scripts/fetch-wiki-images.mjs
import { writeFileSync, mkdirSync } from 'fs'
import { join } from 'path'

const WIKI_BASE = 'https://cmon-united.fandom.com/wiki/'
const OUTPUT_BASE = 'app/public/images'

const slugs = JSON.parse(readFileSync('app/src/data/wiki-slugs.json', 'utf8'))

for (const [id, slug] of Object.entries(slugs)) {
  const url = WIKI_BASE + encodeURIComponent(slug)
  const html = await fetch(url).then(r => r.text())
  const imageUrl = extractPortraitUrl(html)   // parse the infobox figure
  if (!imageUrl) { console.warn(`No image found for ${id}`); continue }
  const buffer = await fetch(imageUrl).then(r => r.arrayBuffer())
  const role = heroIds.has(id) ? 'heroes' : 'villains'
  const outPath = join(OUTPUT_BASE, role, `${id}.jpg`)
  mkdirSync(join(OUTPUT_BASE, role), { recursive: true })
  writeFileSync(outPath, Buffer.from(buffer))
  console.log(`✓ ${id}`)
}
```

The `extractPortraitUrl` function needs to handle fandom's image URL format — they serve images through a CDN with `/revision/latest` paths; strip the query string and fetch the full-resolution version.

Run with: `node scripts/fetch-wiki-images.mjs`

Commit: `feat: add fetch-wiki-images script`

---

## Step 4 — Run the script and verify output

Run `node scripts/fetch-wiki-images.mjs` from the repo root.

Check each downloaded image:
- Correct character (not a villain portrait for a hero, not a card back)
- Reasonable resolution — fandom portraits are typically 300–500px wide, which is sufficient
- Not a placeholder or "no image" fandom default

For any character that printed a warning (`No image found`), check the fandom page manually. Either:
- The infobox structure differs — update `extractPortraitUrl` to handle it
- The page doesn't have a portrait — download manually from Hall of United as a fallback

After all images are verified, run them through [Squoosh](https://squoosh.app) or a batch compress tool. Target under 50 KB per image. JPEG quality 80 is usually sufficient for card art.

Commit: `feat: add hero and villain portrait images (fandom pipeline)`

---

## Step 5 — Add the mapping to the Character type (optional but useful)

If the app ever needs to deep-link to a character's fandom page (e.g., a "Learn more" button in the UI), the wiki URL should be derivable without re-reading the JSON file at runtime.

Add a utility function to the data layer:

**`app/src/data/wikiUrl.ts`**

```ts
import slugs from './wiki-slugs.json'

const WIKI_BASE = 'https://cmon-united.fandom.com/wiki/'

export function wikiUrl(characterId: string): string | null {
  const slug = (slugs as Record<string, string>)[characterId]
  return slug ? WIKI_BASE + encodeURIComponent(slug) : null
}
```

No changes to the `Character` type needed — the mapping is a side-lookup, not part of the character record.

Commit: `feat: add wikiUrl utility for fandom deep-links`

---

## Sequencing

| Step | Type | Depends on |
|---|---|---|
| 1 — Wiki-slug mapping | Data | Nothing |
| 2 — JSON Database audit | Data | Nothing (run in parallel with Step 1) |
| 3 — Extraction script | Code | Step 1 |
| 4 — Run and verify | Content | Steps 2 + 3 |
| 5 — wikiUrl utility | Code | Step 1 |

Steps 1 and 2 can be worked simultaneously. The script (Step 3) can be written while Step 2 is in progress — it only needs the mapping file to run, not a clean audit. Step 5 is optional and can be deferred until the UI needs it.

---

## What this replaces in Plan 05

| Plan 05 Step | Status |
|---|---|
| Step 1 — Data audit | Absorbed into Step 2 of this plan |
| Step 5 — Download images | Replaced by Steps 1 + 3 + 4 of this plan |
| All other Plan 05 steps | Unchanged |
