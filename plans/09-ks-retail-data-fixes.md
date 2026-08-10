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
| `expansionId` | `'guardians'` | `'avengers-ks'` |

Yondu was a separate S1 KS promo (described as "fits in promo box") —
he was never part of the retail Guardians box. He belongs alongside the
other S1 KS promo content in `avengers-ks`.

**Fix:** change the `expansionId` on `yondu` in `heroes.ts`.

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

---

## Items Needing Further Research

The following re-classifications are plausible but need verification before
touching the data:

### S1 Promo Box characters vs. stretch goals
Nick Fury, Hawkeye (heroes) and Corvus Glaive (villain) are currently in
`season-1-stretch-goals`. The HoU article lists them as **Promo Box** content,
separate from the 33-hero / 11-villain stretch goal batch. Likewise Adam Warlock
is in `season-1-stretch-goals` but was an Ultimate-tier promo. Verify whether
the app's `avengers-ks` expansion is the right home for these four, or if a
dedicated `s1-promo-box` expansion should be created.

### Pyro / Blob / Toad placement
These three are in `season-2-stretch-goals`. The HoU article calls them a
separate "Pyro, Blob, Toad Villain Set" KS exclusive, distinct from the S2
stretch goal batch. Verify if they should move to `mutant-promos` or get their
own expansion entry.

---

## Implementation Order

1. **Data fix** — Silver Surfer `expansionId` → `'fantastic-four'`
2. **Data fix** — Yondu `expansionId` → `'avengers-ks'`
3. **Type change** — add `ksExclusive?: boolean` to `Character`
4. **Data update** — set `ksExclusive: true` on the 7 characters listed above
5. **Resolve open items** — investigate Promo Box characters and Pyro/Blob/Toad
6. **Plan 08 integration** — update `RandomizerService` / `useRandomizer` to
   respect `ksExclusive` when filtering by collection
