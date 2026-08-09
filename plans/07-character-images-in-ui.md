# Plan: Character Images in Roll Results

## Goal

Surface the hero and villain portrait images (already downloaded via Plan 06) inside the roll result cards in the Randomizer tab.

Images appear on:
- **Roll Hero** — portrait card for the rolled hero
- **Roll Villain** — portrait card for the rolled villain
- **Roll Team of 4** — portrait thumbnail per team member in the 2×2 grid
- **Roll Expansion** — expansion box art (images not yet sourced — see Step 5)

No changes to the data layer, types, hooks, services, or repositories are needed. The image path is fully derivable from the `Character` object already in state.

---

## Background

Images live at:
- `app/public/images/heroes/{id}.jpg`
- `app/public/images/villains/{id}.jpg`

Each filename matches `character.id` exactly (e.g. `wolverine.jpg`, `magneto-v.jpg`). The `Character` objects returned by `rollHero`, `rollVillain`, and `rollTeam` are already available in component props — they just haven't been used for images yet. A single utility function maps any `Character` to its image URL.

---

## Step 1 — Add the image URL utility

**`app/src/utils/getCharacterImageUrl.ts`**

```ts
import type { Character } from '../types'

export function getCharacterImageUrl(character: Character): string {
  const folder = character.role === 'hero' ? 'heroes' : 'villains'
  return `/images/${folder}/${character.id}.jpg`
}
```

Export it from `app/src/utils/index.ts` (create the barrel if it doesn't exist).

No changes to `Character`, `heroes.ts`, or `villains.ts`.

Commit: `feat: add getCharacterImageUrl utility`

---

## Step 2 — Create `CharacterResultCard`

**`app/src/components/randomizer/CharacterResultCard.tsx`**

A portrait-style card for a single hero or villain result. Replaces `ResultCard` for the hero and villain roll slots.

Layout when a character is rolled:

```
┌────────────────────┐
│                    │
│     [card art]     │  ← aspect-ratio: 2/3, object-fit: cover
│                    │
├────────────────────┤
│  HERO              │  ← label (xs, uppercase, tracking-widest, gray-400)
│  Wolverine         │  ← name (lg, bold, gray-900)
│  X-Men Core Box    │  ← expansion badge (red pill, optional)
└────────────────────┘
```

Layout when nothing has been rolled yet (matches the current `ResultCard` empty state):

```
┌────────────────────┐
│  HERO              │
│  Roll to reveal    │  ← italic, gray-300
└────────────────────┘
```

Props:

```ts
interface CharacterResultCardProps {
  label: string
  character: Character | null
  expansionName?: string   // resolved from expansionId before passing in
}
```

The component uses `getCharacterImageUrl` internally — the caller only passes the `Character` object.

Add the export to `app/src/components/randomizer/index.ts`.

Commit: `feat: add CharacterResultCard with portrait image`

---

## Step 3 — Update `TeamResultCard`

**`app/src/components/randomizer/TeamResultCard.tsx`**

Each hero chip in the 2×2 grid becomes a mini portrait card: image on top, name below. The outer grid stays `grid-cols-2`.

Each cell:

```
┌──────────┐
│  [image] │  ← aspect-ratio: 2/3, rounded-t-lg
│  Name    │  ← text-sm, font-semibold, px-2 py-1
└──────────┘
```

Uses `getCharacterImageUrl` for each `hero` in the `team` array. No prop changes — `team: Character[]` is already the interface.

Commit: `feat: show hero portraits in TeamResultCard`

---

## Step 4 — Wire up `RandomizerPanel`

**`app/src/components/randomizer/RandomizerPanel.tsx`**

Replace `ResultCard` with `CharacterResultCard` for the hero and villain slots. Pass the full `Character | null` object instead of just the name string.

Before:
```tsx
<ResultCard label="Hero" value={hero?.name ?? null} />
<ResultCard label="Villain" value={villain?.name ?? null} />
```

After:
```tsx
<CharacterResultCard label="Hero" character={hero} expansionName={...} />
<CharacterResultCard label="Villain" character={villain} expansionName={...} />
```

The `expansionName` can be resolved inline from the `ExpansionRepository` or passed as a lookup map — whichever is cleaner at the time.

`ResultCard` stays in place for the Expansion slot (no image yet).

Commit: `feat: use CharacterResultCard in RandomizerPanel`

---

## Step 5 — Expansion box art (deferred)

Expansion images are not yet sourced. The Roll Expansion result currently uses the text-only `ResultCard`, which is fine for now.

When box art is added:

1. Source images from CMON wiki or BoardGameGeek — one per expansion
2. Save to `app/public/images/expansions/{id}.jpg` (e.g. `xmen-core.jpg`, `horsemen.jpg`)
3. Add `getExpansionImageUrl(e: Expansion): string` utility following the same pattern
4. Create `ExpansionResultCard` (or add an `imageSrc` prop to `ResultCard`)
5. Wire into `RandomizerPanel`

Commit: `feat: add expansion box art and ExpansionResultCard`

---

## What stays the same

| Layer | Change |
|---|---|
| `Character` type | None |
| `heroes.ts` / `villains.ts` | None |
| `useRandomizer` hook | None |
| `RandomizerService` | None |
| `ResultCard` | None (still used for Expansion) |
| `RollButton` | None |

---

## Sequencing

| Step | Type | Depends on |
|---|---|---|
| 1 — `getCharacterImageUrl` utility | Code | Nothing |
| 2 — `CharacterResultCard` | Code | Step 1 |
| 3 — `TeamResultCard` update | Code | Step 1 |
| 4 — `RandomizerPanel` wiring | Code | Steps 2 + 3 |
| 5 — Expansion box art | Content + Code | Independent; deferred |

Steps 2 and 3 can be worked in parallel after Step 1. Step 4 is a quick wiring pass once both cards are done.
