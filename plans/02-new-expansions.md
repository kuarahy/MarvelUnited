# Plan: Add New Expansion Boxes

## Goal

Add character and expansion data for three new boxes so they appear in the randomizer:
- **Kickstarter Promo Box 2**
- **The Infinity Gauntlet**
- **Spider-Geddon**

This is a pure data task — no new components or services needed. The architecture already supports it.

---

## Context

Each new box requires:
1. A new entry in `app/src/data/expansions.ts`
2. New hero entries in `app/src/data/heroes.ts`
3. New villain entries in `app/src/data/villains.ts`

The `CharacterRepository`, `RandomizerService`, and all UI components pick up new data automatically.

---

## Step-by-Step

### Step 1 — Research each box's contents

Before writing any code, confirm the exact character roster for each box from the official CMON source or the Marvel United BGG page:

- **Kickstarter Promo Box 2**: list all heroes and villains included
- **The Infinity Gauntlet**: list all heroes (e.g. Thor, Nebula, Star-Lord) and villains (Thanos with Infinity Stones as a mechanic)
- **Spider-Geddon**: list all Spider-heroes and associated villains (e.g. Superior Spider-Man, Spider-Punk, Morlun)

Document each character's role (hero / villain / anti-hero) and which box they belong to.

---

### Step 2 — Add expansion entries

In `app/src/data/expansions.ts`, add one entry per box:

```ts
{ id: 'ks-promo-2', name: 'Kickstarter Promo Box 2' },
{ id: 'infinity-gauntlet', name: 'The Infinity Gauntlet' },
{ id: 'spider-geddon', name: 'Spider-Geddon' },
```

Commit: `feat: add expansion entries for KS Promo Box 2, Infinity Gauntlet, Spider-Geddon`

---

### Step 3 — Add heroes

In `app/src/data/heroes.ts`, append each new hero with the correct `expansionId` matching Step 2.

Follow the existing pattern:

```ts
{ id: 'thor', name: 'Thor', role: 'hero', expansionId: 'infinity-gauntlet' },
{ id: 'nebula', name: 'Nebula', role: 'hero', expansionId: 'infinity-gauntlet' },
// ... etc
```

Commit per box for clean history, e.g.:
- `feat: add heroes for The Infinity Gauntlet`
- `feat: add heroes for Spider-Geddon`
- `feat: add heroes for KS Promo Box 2`

---

### Step 4 — Add villains

In `app/src/data/villains.ts`, append each new villain the same way.

```ts
{ id: 'thanos', name: 'Thanos', role: 'villain', expansionId: 'infinity-gauntlet' },
{ id: 'morlun', name: 'Morlun', role: 'villain', expansionId: 'spider-geddon' },
// ... etc
```

Commit per box, same pattern as Step 3.

---

### Step 5 — Update the README expansions table

In `README.md`, add the three new boxes to the Expansions Supported table.

Commit: `docs: update expansions table with new boxes`

---

### Step 6 — Deploy

```bash
cd app
npx vercel --prod
```

No build config changes needed — Vercel picks up the new data on the next deploy.

---

## Notes

- Anti-heroes that appear in both roles (e.g. Nebula, Gamora in some sets) should have two entries — one as hero, one as villain — following the existing convention in `CharactersList.java`.
- If a character appears in multiple boxes, use the box where they first appeared as `expansionId`.
- Thanos with the Infinity Gauntlet is mechanically unique in the board game; note this in a code comment but don't model the mechanic in data yet — that belongs to a future scenario rules feature.
