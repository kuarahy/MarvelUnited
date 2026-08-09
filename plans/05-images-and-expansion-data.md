# Plan: Images, Data Completeness, and Expansion Compatibility

## Goal

Three tightly related tasks that must be done together because they all touch the same data layer:

1. **Audit and complete the character/expansion data** — cross-reference against the Marvel United JSON Database to fix gaps and errors
2. **Add images** — download from Hall of United, host in the repo under `app/public/images/`, served by Vercel
3. **Model expansion ownership** — track which characters and campaigns belong to which expansions so the app never suggests content the player doesn't own

The expansion ownership model is the most important of the three. Without it, the randomizer can roll a hero from an expansion the player doesn't have, or a campaign can require boxes they've never bought. Images and data completeness feed directly into this — you can't build a reliable ownership filter on top of incomplete or miscategorized data.

---

## Step 1 — Audit existing data against the JSON Database

**Source:** [github.com/OscarGarPer/Marvel-United-Json-Database](https://github.com/OscarGarPer/Marvel-United-Json-Database)

Open the JSON database as a reference. For each expansion you own, cross-check every character against your `heroes.ts` and `villains.ts`.

Things to look for:
- Characters in the JSON database that are missing from your data files
- Characters in your data files assigned to the wrong `expansionId`
- Anti-heroes listed only as hero or only as villain (should be both)
- Duplicate entries with slightly different names (e.g. `"Emma Frost"` vs `"Emma Frost (Mutant Promo)"`)

Document discrepancies in a scratch note before touching any code. Fix data before adding images — an image attached to a wrong `expansionId` is harder to find later.

Commit per expansion fixed, e.g.:
- `fix: correct expansion assignments for X-Men Blue Team characters`
- `fix: add missing villains from Horsemen of Apocalypse`

---

## Step 2 — Enrich the Expansion type with contents metadata

The current `Expansion` type only holds `id` and `name`. Extend it to carry everything needed for compatibility checking:

**`app/src/types/Expansion.ts`**

```ts
export interface Expansion {
  id: string
  name: string
  imageUrl?: string
  coreBox: boolean          // true = base game or standalone box; false = expansion only
  requiresExpansionId?: string  // e.g. some promos only work with the X-Men core box
}
```

**`app/src/data/expansions.ts`** — update every entry:

```ts
{ id: 'xmen-core', name: 'Marvel United: X-Men', coreBox: true },
{ id: 'dofp', name: 'Days of Future Past', coreBox: false, requiresExpansionId: 'xmen-core' },
{ id: 'mutant-promos', name: 'X-MEN Mutant Promos', coreBox: false, requiresExpansionId: 'xmen-core' },
// etc.
```

This makes it possible to warn the user if they try to enable an expansion without its required base box.

Commit: `feat: add coreBox and requiresExpansionId metadata to Expansion type`

---

## Step 3 — Add campaign expansion requirements

Each campaign markdown file requires specific expansions to be playable. Model this in a new data file rather than embedding it in the markdown.

**`app/src/data/campaignRequirements.ts`**

```ts
export interface CampaignRequirements {
  campaignId: string
  requiredExpansionIds: string[]      // must own all of these
  optionalExpansionIds: string[]      // used in some branches, not required to start
}

export const campaignRequirements: CampaignRequirements[] = [
  {
    campaignId: 'xmen',
    requiredExpansionIds: ['xmen-core'],
    optionalExpansionIds: ['dofp', 'phoenix-five', 'x-force', 'horsemen', 'xmen-blue', 'mutant-promos'],
  },
  {
    campaignId: 'avengers',
    requiredExpansionIds: ['avengers-core'],
    optionalExpansionIds: ['spider-verse', 'black-panther', 'deadpool'],
  },
]
```

Commit: `feat: add campaign expansion requirements data`

---

## Step 4 — Build the image folder structure

Create the following directory layout inside `app/public/`:

```
app/public/images/
  expansions/
    avengers-core.jpg
    xmen-core.jpg
    spider-verse.jpg
    ... (one image per expansion — box art)
  heroes/
    wolverine.jpg
    cyclops.jpg
    spider-man.jpg
    ... (one image per hero)
  villains/
    magneto.jpg
    red-skull.jpg
    ... (one image per villain)
```

**Naming convention:** file name matches the character `id` from the data files exactly. This makes it trivial to construct the URL from code:

```ts
const imageUrl = `/images/heroes/${hero.id}.jpg`
```

No `imageUrl` field needed in the data files at all — the URL is derived, not stored. This means adding a new character just requires dropping an image file with the right name.

Commit: `chore: create image folder structure under app/public/images/`

---

## Step 5 — Download and add images

**Source:** [hallofunited.com](https://hallofunited.com) — browse each character's page, save the card art image, rename it to match the character `id`.

Work expansion by expansion rather than alphabetically — it keeps the commits clean and makes it easy to skip expansions you're still researching.

Suggested commit pattern:
- `feat: add box art for all owned expansions`
- `feat: add hero images for X-Men core box`
- `feat: add villain images for X-Men core box`
- `feat: add hero images for Days of Future Past`
- ... and so on per expansion

Keep images at a reasonable resolution — 400px wide is enough for card thumbnails. Run them through [Squoosh](https://squoosh.app) or similar to compress before committing. Target under 50KB per image.

---

## Step 6 — Update the Character and Expansion types to use derived image URLs

Instead of storing `imageUrl` in the data, derive it at the component level. Update the `CharacterImage` component from Plan 04:

**`app/src/components/ui/CharacterImage.tsx`**

```tsx
function resolveImageUrl(role: CharacterRole, id: string): string {
  return `/images/${role === 'hero' ? 'heroes' : 'villains'}/${id}.jpg`
}
```

Handle missing images with an `onError` fallback to a placeholder — not every character will have an image immediately:

```tsx
<img
  src={resolveImageUrl(character.role, character.id)}
  onError={(e) => { e.currentTarget.src = '/images/placeholder.jpg' }}
  alt={character.name}
/>
```

Commit: `feat: derive image URLs from character ID, add fallback placeholder`

---

## Step 7 — Add expansion ownership selection to the UI

**`app/src/hooks/useOwnedExpansions.ts`**

Persist the player's owned expansions in `localStorage` so they don't have to re-select every session:

```ts
export function useOwnedExpansions() {
  const [owned, setOwned] = useState<string[]>(() => {
    const saved = localStorage.getItem('ownedExpansions')
    return saved ? JSON.parse(saved) : []
  })

  const toggle = useCallback((id: string) => {
    setOwned((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
      localStorage.setItem('ownedExpansions', JSON.stringify(next))
      return next
    })
  }, [])

  return { owned, toggle }
}
```

Commit: `feat: add useOwnedExpansions hook with localStorage persistence`

---

## Step 8 — Build the expansion selector UI

**`app/src/components/collection/ExpansionPicker.tsx`**

A settings panel (new tab or accessible from a gear icon) where the player checks off which expansions they own. Shows the box art, name, and whether it requires another box to work.

```tsx
interface ExpansionPickerProps {
  expansions: Expansion[]
  owned: string[]
  onToggle: (id: string) => void
}
```

Commit: `feat: add ExpansionPicker component for collection management`

---

## Step 9 — Filter the randomizer to owned expansions

**`app/src/services/RandomizerService.ts`** — update to accept an `ownedExpansionIds` filter:

```ts
rollHero(ownedExpansionIds: string[]): Character {
  const pool = this.characterRepo
    .getHeroes()
    .filter((h) => ownedExpansionIds.includes(h.expansionId))
  return this.shuffle.pickOne(pool)
}
```

If the player owns no expansions (first launch), default to the full pool so the app is still usable.

Commit: `feat: filter randomizer rolls to owned expansions`

---

## Step 10 — Add compatibility warnings to campaigns

**`app/src/services/CampaignCompatibilityService.ts`**

```ts
export class CampaignCompatibilityService {
  check(campaignId: string, ownedExpansionIds: string[]): {
    canPlay: boolean
    missingRequired: string[]
    missingOptional: string[]
  } { ... }
}
```

In `CampaignViewer`, show a banner if the player is missing required expansions:

> ⚠️ This campaign requires **Marvel United: X-Men** which is not in your collection.

And a softer note for optional expansions:

> Some branches use **Days of Future Past** (not in your collection). Those paths will be unavailable.

Commit: `feat: add campaign compatibility warnings based on owned expansions`

---

## Sequencing

| Step | Type | Depends on |
|---|---|---|
| 1 — Data audit | Data | Nothing |
| 2 — Expansion metadata | Data | Step 1 |
| 3 — Campaign requirements | Data | Step 2 |
| 4 — Image folder structure | Infra | Nothing |
| 5 — Download images | Content | Steps 1 + 4 |
| 6 — Derived image URLs | Code | Steps 4 + 5 |
| 7 — useOwnedExpansions hook | Code | Step 2 |
| 8 — ExpansionPicker UI | Code | Steps 2 + 7 |
| 9 — Filter randomizer | Code | Steps 7 + 8 |
| 10 — Campaign compatibility | Code | Steps 3 + 7 |

Steps 1–3 (data) and 4–5 (images) can be worked in parallel. Steps 6–10 depend on both being done first.
