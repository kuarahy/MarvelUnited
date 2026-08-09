# Plan: App Enhancements

## Goal

Two front-end feature additions that both improve the depth and feel of the randomizer:
1. **Visual Assets** — images for every expansion, hero, and villain
2. **Scenario Suggestions** — automated connections between rolled characters and relevant scenarios

These belong together because both extend the same data model and both live entirely within the existing component/service architecture.

---

## Feature A: Visual Assets

### Goal

Show art alongside every rolled result — hero portrait, villain card art, expansion box art. Makes the randomizer feel alive instead of just returning strings.

---

### Step 1 — Decide on an image source strategy

Three approaches, choose one:

| Approach | Pros | Cons |
|---|---|---|
| **CMON official assets** | Best quality | Requires permission check; ToS review needed |
| **BoardGameGeek image links** | Free, community-sourced | URLs can rot; no CDN guarantee |
| **Self-hosted in `/public`** | Fully controlled | Large repo size; manual curation |

**Recommended:** Start with BGG image URLs (fast to add, no hosting cost). Add a fallback placeholder for missing images. If URLs break, migrate to self-hosted or a CDN like Cloudinary.

---

### Step 2 — Extend the type definitions

In `app/src/types/Character.ts`:

```ts
export interface Character {
  id: string
  name: string
  role: CharacterRole
  expansionId: string
  imageUrl?: string       // optional until all images are sourced
}
```

In `app/src/types/Expansion.ts`:

```ts
export interface Expansion {
  id: string
  name: string
  imageUrl?: string
}
```

Commit: `feat: add optional imageUrl to Character and Expansion types`

---

### Step 3 — Add image URLs to data files

For each entry in `heroes.ts`, `villains.ts`, and `expansions.ts`, add the `imageUrl` field. Do this incrementally — start with the most popular characters, add the rest over time.

Example:

```ts
{ id: 'wolverine', name: 'Wolverine', role: 'hero', expansionId: 'xmen-core', imageUrl: 'https://...' },
```

Commit per file or per expansion block.

---

### Step 4 — Create a reusable `CharacterImage` component

`app/src/components/ui/CharacterImage.tsx`

Responsibilities:
- Renders the image if `imageUrl` is present
- Shows a styled placeholder (initials or a Marvel logo placeholder) if not
- Handles load errors gracefully with `onError` fallback

```tsx
interface CharacterImageProps {
  name: string
  imageUrl?: string
  size?: 'sm' | 'md' | 'lg'
}
```

Commit: `feat: add CharacterImage component with fallback placeholder`

---

### Step 5 — Update `ResultCard` and `TeamResultCard`

Pass `imageUrl` into the existing result display components so rolled characters show their portrait.

- `ResultCard` — show a small portrait next to the name
- `TeamResultCard` — show a portrait for each of the 4 team members

Commit: `feat: display character images in result cards`

---

### Step 6 — Add expansion box art to the expansion result

Update the expansion `ResultCard` to show the expansion box art when one is rolled.

Commit: `feat: display expansion box art in expansion result card`

---

## Feature B: Scenario Suggestions

### Goal

After rolling a team or a villain, the app automatically suggests scenarios that fit those characters — e.g. rolling Wolverine + X-Force characters nudges toward *Echoes of Fear* or *Legacy of Weapon X*.

---

### Step 1 — Model the connections in data

Create `app/src/data/scenarioConnections.ts`:

```ts
export interface ScenarioConnection {
  scenarioId: string
  characterIds: string[]      // rolling any of these nudges this scenario
  expansionIds: string[]      // rolling any of these expansions nudges this scenario
  weight: number              // higher = stronger connection
}

export const scenarioConnections: ScenarioConnection[] = [
  {
    scenarioId: 'echoes-of-fear',
    characterIds: ['wolverine', 'cyclops', 'jean-grey', 'magneto', 'mystique'],
    expansionIds: ['xmen-core', 'mutant-promos'],
    weight: 3,
  },
  {
    scenarioId: 'legacy-of-weapon-x',
    characterIds: ['wolverine', 'x-23', 'weapon-x', 'logan', 'sabretooth'],
    expansionIds: ['dofp', 'x-force'],
    weight: 3,
  },
  // ... all scenarios mapped
]
```

Commit: `feat: add scenario connection data`

---

### Step 2 — Create a `SuggestionService`

`app/src/services/SuggestionService.ts`

Responsibilities:
- Takes the currently rolled team + villain + expansion as input
- Scores each scenario by counting how many connections match
- Returns the top N suggested scenarios, sorted by score

```ts
export class SuggestionService {
  suggest(
    team: Character[],
    villain: Character | null,
    expansion: Expansion | null,
    topN = 3,
  ): Scenario[] { ... }
}
```

The scoring algorithm:
1. For each scenario connection, check how many of the rolled characters/expansions match
2. Multiply by the connection weight
3. Sort descending, return top N

Commit: `feat: add SuggestionService for scenario recommendations`

---

### Step 3 — Extend `useRandomizer` hook

Add suggestions to the randomizer state:

```ts
export interface RandomizerState {
  hero: Character | null
  villain: Character | null
  team: Character[]
  expansion: Expansion | null
  suggestedScenarios: Scenario[]   // new
}
```

After any roll that changes team/villain/expansion, recompute suggestions via `SuggestionService`.

Commit: `feat: compute scenario suggestions in useRandomizer hook`

---

### Step 4 — Create a `SuggestionPanel` component

`app/src/components/randomizer/SuggestionPanel.tsx`

- Only renders when `suggestedScenarios.length > 0`
- Shows up to 3 suggested scenario cards beneath the roll results
- Each card shows the scenario title and a short description
- Subtle styling (secondary to the main roll results, not competing)

Commit: `feat: add SuggestionPanel component to display scenario recommendations`

---

### Step 5 — Wire into `RandomizerPanel`

Add `<SuggestionPanel scenarios={suggestedScenarios} />` at the bottom of `RandomizerPanel.tsx`.

Commit: `feat: integrate SuggestionPanel into RandomizerPanel`

---

## Sequencing

Run Feature A and Feature B in parallel — they touch different files and have no dependencies on each other. Feature A is mostly data entry work; Feature B is mostly logic work.

Suggested order if working alone:
1. Type extensions (shared by both) → one commit
2. Feature A: `CharacterImage` component → visual feedback immediately
3. Feature B: connection data + `SuggestionService` → logic in place
4. Feature A: wire images into cards → polish
5. Feature B: `SuggestionPanel` + hook update → complete the feature
6. Deploy both together
