# Plan: KS-Exclusive & Retail Data Fixes

## Goal

Fix confirmed expansion-assignment errors and add a `ksExclusive` flag to the
`Character` type so that characters only available in the Kickstarter version of
a box can be correctly filtered when a user owns the retail edition.

Source: https://hallofunited.com/2021/04/19/what-is-actually-exclusive-to-the-marvel-united-kickstarters/

---

## Context

Several boxes were sold at retail **and** via KS. The KS version included extra
characters that retail buyers never got. Currently the data model has no way to
express this — every character in a box is treated as owned once the user marks
that expansion. This will cause incorrect results once Plan 08 (Collection
Filter) ships.

Additionally, one hero (Silver Surfer) is assigned to the wrong expansion
entirely.

---

## Confirmed Data Errors

### 1 — Silver Surfer: wrong expansion

| Field | Current | Correct |
|---|---|---|
| `expansionId` | `'guardians'` | `'fantastic-four'` |

Silver Surfer ships in the **Fantastic Four** box. He has no connection to
the Guardians of the Galaxy expansion.

**Fix:** change the `expansionId` on `silver-surfer` in `heroes.ts`.

---

### 2 — Yondu: wrong expansion

| Field | Current | Correct |
|---|---|---|
| `expansionId` | `'guardians'` | `'season-1-stretch-goals'` |

Yondu was a separate S1 KS promo (never in the retail Guardians box). The
HoU "Season 1 Kickstarter Stretch Goals" page lists him under
"Separate Kickstarter Promos" — the correct bucket is `season-1-stretch-goals`,
the same expansion that holds Nick Fury, Hawkeye, Corvus Glaive, and Adam Warlock.

**Fix:** change the `expansionId` on `yondu` in `heroes.ts`.

---

### 3 — `avengers-ks` is misnamed — rename to `infinity-gauntlet`

The existing expansion entry reads:

```ts
{ id: 'avengers-ks', name: 'Avengers (KS Exclusives)', type: 'promo' }
```

This name is wrong. The Avengers content lives in `avengers-core` (the retail
Core Box). There is no separate "Avengers KS box." The actual occupants —
Black Dwarf, Ebony Maw, Proxima Midnight — are all characters from
**The Infinity Gauntlet** expansion, which has its own dedicated box.

**Fix:** rename `id` → `'infinity-gauntlet'` and `name` → `'The Infinity Gauntlet'`
in `expansions.ts`, and update all three character `expansionId` references in
`villains.ts`.

---

### 4 — Thanos: wrong expansion

| Field | Current | Correct |
|---|---|---|
| `expansionId` | `'xmen-blue'` | `'infinity-gauntlet'` |

The HoU Infinity Gauntlet page lists Thanos alongside the Black Order. He has
no connection to the X-Men Blue Team expansion.

**Fix:** change the `expansionId` on `thanos` in `villains.ts`.

---

## Missing Data Concept — KS-Exclusive Characters Inside Retail Boxes

Several expansions are available at retail **and** via KS, but the KS version
included one or more extra characters not present in the retail copy. The
current `Character` type has no field to express this:

```ts
// current — no way to distinguish retail vs KS content within the same box
export interface Character {
  id: string
  name: string
  role: CharacterRole
  expansionId: string
}
```

### Proposed addition

```ts
export interface Character {
  id: string
  name: string
  role: CharacterRole
  expansionId: string
  ksExclusive?: boolean   // true = only in KS edition of the parent box
}
```

Once Plan 08 (Collection Filter) allows users to mark which expansions they
own, the randomizer must also respect `ksExclusive`. A user who owns the
**retail** Tales of Asgard should not have Beta Ray Bill in their pool.

The exact UX for this is TBD (separate toggle? sub-checkbox on the expansion
tile?), but the data model change can land independently first.

---

## Characters Requiring `ksExclusive: true`

### Season 1

| Character | `expansionId` | Retail box exists? | Note |
|---|---|---|---|
| Spider-Ham | `spider-verse` | Yes | KS bonus in Enter the Spider-Verse |
| Beta Ray Bill | `tales-of-asgard` | Yes | KS bonus in Tales of Asgard |
| Gamora | `guardians` | Yes | KS bonus in Guardians of the Galaxy |

### Season 2

| Character | `expansionId` | Retail box exists? | Note |
|---|---|---|---|
| Banshee | `xmen-blue` | Yes (Blue Team) | KS bonus in X-Men: Blue Team |
| Forge | `xmen-gold` | Yes (Gold Team) | KS bonus in X-Men: Gold Team |
| Lady Deadpool | `deadpool` | Yes | KS bonus in Deadpool expansion |
| Old Man Logan | `dofp` | Yes | KS bonus in Days of Future Past |

> Storm (Mohawk) is already in `season-2-stretch-goals` (a KS-only expansion),
> so she does not need the flag.

## S2 Villain Trio Re-assignment

Per the HoU article, Pyro, Blob, and Toad are a distinct **"Pyro, Blob, Toad
Villain Set"** — a separate S2 KS exclusive, not part of the S2 stretch goal
batch. They are currently in `season-2-stretch-goals`.

Move all three to `mutant-promos` (which already exists for this kind of
KS-only mutant content), or create a dedicated `s2-villain-set` expansion if
`mutant-promos` semantics don't fit.

---

## Implementation Order

1. **Data fix** — Silver Surfer `expansionId` → `'fantastic-four'`
2. **Data fix** — Yondu `expansionId` → `'season-1-stretch-goals'`
3. **Expansion rename** — `avengers-ks` → `infinity-gauntlet` in `expansions.ts`;
   update `expansionId` on Black Dwarf, Ebony Maw, Proxima Midnight in `villains.ts`
4. **Data fix** — Thanos `expansionId` → `'infinity-gauntlet'`
5. **Data fix** — move Pyro, Blob, Toad → `mutant-promos` (or `s2-villain-set`)
6. **Type change** — add `ksExclusive?: boolean` to `Character`
7. **Data update** — set `ksExclusive: true` on the 7 characters listed above
8. **Plan 08 integration** — update `RandomizerService` / `useRandomizer` to
   respect `ksExclusive` when filtering by collection
