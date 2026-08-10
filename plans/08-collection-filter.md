# Plan: Collection Filter

## Goal

Let users mark which expansions they own, so every roll only draws from their
actual collection. Filter state persists across sessions.

---

## Design Decisions

### No data-file changes needed

Every `Character` already carries `expansionId`. Every `Expansion` already has
`id`, `name`, and `type`. The link between content and set is already there —
the filter just needs to exploit it.

### `localStorage` persistence

Board-game ownership is stable. A player's collection doesn't change between
rolls or sessions. `localStorage` is the right tier — no server, no URL params,
no in-memory-only state that resets on refresh.

Key: `mu-randomizer:owned-expansions` → `string[]` of expansion IDs.

### Additive service signatures (no breaking changes)

`RandomizerService` methods grow an optional `pool` override param. Callers that
don't pass it get the full repo pool — existing behavior is unchanged.

### Separation of concerns

| Concern | Owner |
|---|---|
| Which expansions exist | `ExpansionRepository` |
| Which expansions the user owns | `useCollection` hook |
| Rolling from a filtered pool | `RandomizerService` (optional param) |
| Wiring filter → rolls | `useRandomizer` (accepts `ownedIds`) |
| UI for selecting owned sets | `CollectionFilterPanel` component |

`useRandomizer` does **not** import `useCollection` directly — `RandomizerPanel`
owns the composition so each hook stays independently testable.

---

## Step 1 — `useCollection` hook

Create `app/src/hooks/useCollection.ts`.

```ts
// Manages the set of expansion IDs the user owns, persisted to localStorage.
const STORAGE_KEY = 'mu-randomizer:owned-expansions'

export interface CollectionState {
  ownedIds: Set<string>
  toggle: (id: string) => void
  setAll: (ids: string[]) => void
  clearAll: () => void
  isOwned: (id: string) => boolean
}
```

Init logic:
1. Read `localStorage.getItem(STORAGE_KEY)` on mount.
2. Parse as `string[]`; fall back to **all expansion IDs** if key is absent (opt-in
   default: "I own everything" shows the full pool until the user narrows it).
3. Write back on every state change.

The default of "all owned" means the app behaves exactly as today for first-time
users — zero change in apparent behavior.

Export `useCollection` from `hooks/index.ts`.

Commit: `feat: add useCollection hook with localStorage persistence`

---

## Step 2 — Filter-aware `RandomizerService` methods

In `RandomizerService.ts`, add optional `pool` parameters to each roll method.
All existing callers continue to work unmodified.

```ts
rollHero(pool?: Character[]): Character {
  return this.shuffle.pickOne(pool ?? this.characterRepo.getHeroes())
}

rollVillain(pool?: Character[]): Character {
  return this.shuffle.pickOne(pool ?? this.characterRepo.getVillains())
}

rollTeam(pool?: Character[]): Character[] {
  return this.shuffle.pickMany(pool ?? this.characterRepo.getHeroes(), TEAM_SIZE)
}

rollExpansion(pool?: Expansion[]): Expansion {
  return this.shuffle.pickOne(pool ?? this.expansionRepo.getAll())
}
```

No new methods, no interface changes — just optional parameters.

Commit: `feat: add optional pool overrides to RandomizerService roll methods`

---

## Step 3 — `useRandomizer` accepts owned expansion IDs

Change the hook signature to accept an optional `ownedIds` parameter. When
provided, it pre-filters each pool before calling the service.

```ts
export function useRandomizer(ownedIds?: Set<string>): RandomizerState & RandomizerActions
```

Internal logic — build filtered pools from the repos before each roll:

```ts
const heroPool   = ownedIds ? heroes.filter(h => ownedIds.has(h.expansionId)) : undefined
const villainPool = ownedIds ? villains.filter(v => ownedIds.has(v.expansionId)) : undefined
const expansionPool = ownedIds
  ? expansionRepo.getAll().filter(e => ownedIds.has(e.id))
  : undefined
```

Pass these into the service calls. When `ownedIds` is `undefined` (no filter),
all three variables are `undefined`, and the service falls back to its full repo
pool — same as today.

Guard: if the filtered pool for a roll would be empty, fall back to the full pool
and surface a brief toast/warning: *"No content in collection for this roll —
using full pool."* Prevents a broken `pickOne([])` crash.

The module-level singleton pattern (`const service = new RandomizerService(...)`)
stays intact. Only the pool derivation and the `ownedIds` param are new.

Commit: `feat: thread collection filter through useRandomizer`

---

## Step 4 — `CollectionFilterPanel` component

Create `app/src/components/randomizer/CollectionFilterPanel.tsx`.

Layout: a collapsible `<details>` / disclosure widget (no extra dependency) with
the summary line **"Filter by your collection (N of M sets)"** where N = owned
count and M = total.

Inside, render checkboxes grouped by `ExpansionType`:

```
▼ Filter by your collection (12 of 35 sets)

  ■ Core Sets
    ☑ Marvel United Core Box
    ☑ X-Men Core Box
    ☐ Spider-Geddon
    ☑ Multiverse Core Box

  ■ Retail Expansions
    ☑ Enter the Spider-Verse
    ☐ Tales of Asgard
    ...

  ■ Promos & KS Exclusives
    ☐ Avengers (KS Exclusives)
    ...

  [Select All]  [Clear All]
```

Props:

```ts
interface CollectionFilterPanelProps {
  expansions: Expansion[]
  ownedIds: Set<string>
  onToggle: (id: string) => void
  onSetAll: (ids: string[]) => void
  onClearAll: () => void
}
```

No internal state — fully controlled by `useCollection` via `RandomizerPanel`.

Group order: `core` → `expansion` → `promo`.

Commit: `feat: add CollectionFilterPanel component`

---

## Step 5 — Wire up in `RandomizerPanel`

`RandomizerPanel` composes `useCollection` + `useRandomizer` and renders
`CollectionFilterPanel` above the roll sections.

```tsx
export function RandomizerPanel() {
  const collection = useCollection(expansionRepo.getAll().map(e => e.id))
  const randomizer = useRandomizer(collection.ownedIds)

  return (
    <div className="flex flex-col gap-6">
      <CollectionFilterPanel
        expansions={expansionRepo.getAll()}
        ownedIds={collection.ownedIds}
        onToggle={collection.toggle}
        onSetAll={collection.setAll}
        onClearAll={collection.clearAll}
      />

      {/* existing hero / villain / team / set sections, unchanged */}
      ...
    </div>
  )
}
```

`ExpansionRepository` is instantiated at the module level in `RandomizerPanel`
(same pattern as `RandomizerService` in `useRandomizer`) to avoid re-creating on
every render.

Commit: `feat: wire CollectionFilterPanel into RandomizerPanel`

---

## Step 6 — Export bookkeeping

Add `useCollection` to `hooks/index.ts`.
Add `CollectionFilterPanel` to `components/randomizer/index.ts`.

Commit: `chore: export useCollection and CollectionFilterPanel from index files`

---

## Summary of changes

| File | Change |
|---|---|
| `hooks/useCollection.ts` | **New** — localStorage-backed owned-expansion state |
| `services/RandomizerService.ts` | Optional `pool` param on all four roll methods |
| `hooks/useRandomizer.ts` | Accepts `ownedIds?: Set<string>`, derives filtered pools |
| `components/randomizer/CollectionFilterPanel.tsx` | **New** — grouped checkbox filter UI |
| `components/randomizer/RandomizerPanel.tsx` | Composes both hooks; renders filter panel |
| `hooks/index.ts` | Export `useCollection` |
| `components/randomizer/index.ts` | Export `CollectionFilterPanel` |

No changes to: data files, type definitions, `IRepository`, `ShuffleService`,
`CharacterRepository`, `ExpansionRepository`, or `ScenarioRepository`.
