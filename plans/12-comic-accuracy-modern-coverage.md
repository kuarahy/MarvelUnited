# Plan: Comic Accuracy — Modern Coverage (2002→now)

## Goal

Extend `tools/comic-accuracy` so unmatched / post-2002 Marvel United characters can get
real co-appearance counts for roughly the **last 24 years** (comics after the Rosselló /
MCP dump ends ~2002).

Keep the existing 1961–2002 dataset as **legacy**. Add a second, MU-scoped modern layer.
Do **not** expand the pre-2002 top-327 graph as the primary fix — that closes old gaps
(Venom, Elektra, …), not Miles / America Chavez / Maria Hill.

**Out of scope:** Marvel Comics API (sunset October 2025). Do not plan against it.

---

## Current state

| Layer | Source | Window | Role today |
|---|---|---|---|
| Legacy | Melanie Walsh unimodal edges (MCP / Rosselló) | ~1961–2002 | `sharedComics` in `co-appearances.json` |
| Gaps | — | 2003→now | `unmatched` / `n/a` in `relations.js` |

Target output shape (conceptual):

```jsonc
{
  "hero1": "Dark Phoenix",
  "hero2": "Miles Morales",
  "legacySharedComics": null,       // pre-2003 dataset
  "modernSharedComics": 12,         // 2003+ from chosen source
  "sources": ["comicvine-2003+"]
}
```

Scope the modern build to the **MU roster only** (~350 names), not the full Marvel
universe. That keeps API/scrape volume tractable.

---

## Option A — Comic Vine API

**Docs:** https://comicvine.gamespot.com/api/documentation  
**Status:** Live, free API key, widely used by comic tooling.

### What it gives you

| Resource | Useful fields |
|---|---|
| Character | `id`, `name`, `aliases`, `issue_credits`, `first_appeared_in_issue` |
| Issue | `id`, `cover_date`, `character_credits`, volume / issue number |

Co-appearance is derived, not native:

1. Map each MU display name → Comic Vine character ID  
2. Pull `issue_credits` (or paginate issues) for each character  
3. Keep issues with `cover_date` ≥ `2003-01-01` (tunable)  
4. `sharedComicsModern(A,B)` = `| issues(A) ∩ issues(B) |`

### Pros

- Structured JSON API; no HTML parsing  
- Issue dates support a clean 2003+ filter  
- Character aliases help matching  
- Fits an offline rebuild script (`node build-modern.js`) similar to `build.js`

### Cons

- Requires a personal API key (env var; never commit)  
- Rate limits — must throttle; full MU roster still hundreds/thousands of calls  
- Credit quality varies by issue (some issues under-tagged)  
- Name matching still needs an `OVERRIDES`-style CV ID map

### Implementation sketch

```
tools/comic-accuracy/
  build-modern-comicvine.js   # fetch + intersect + write modern-co-appearances.json
  cv-ids.json                 # MU name → Comic Vine character id
  modern-co-appearances.json  # committed output (like co-appearances.json)
```

Env: `COMIC_VINE_API_KEY`.

`relations.js` reads legacy + modern and prints both (or a combined total with source labels).

### Effort

**Medium.** Most “API plumbing” work; matching MU ↔ CV IDs is the long pole.

---

## Option B — Marvel Fandom (MediaWiki API)

**Wiki:** https://marvel.fandom.com  
**API:** standard MediaWiki Action API (`api.php`) — HTTP, no login for read.

### What it gives you

Fandom/MediaWiki can return:

- Page wikitext / parse HTML for character **Appearances** sections  
- Issue pages with character lists and publication dates (via infobox / categories)  
- Search + page props for resolving `"Miles Morales"` → canonical page title  

Co-appearance derivation:

1. Resolve MU name → Earth-616 (or MU-appropriate) character page  
2. Extract appearance list (issue page titles)  
3. Resolve each issue’s year/date  
4. Filter ≥ 2003; intersect sets between characters  

Projects like generic [Fandom scrapers](https://apify.com/khadinakbar/fandom-scraper) show the
MediaWiki-API pattern (infobox + links as JSON). We would keep this **in-repo** and
MU-scoped, not depend on a third-party Apify actor.

### Pros

- No commercial API key  
- Often more complete / current than frozen academic dumps  
- Aligns with how fans already verify appearances  
- Same wiki family as our existing image pipeline thinking (`plans/06-wiki-image-pipeline.md`)

### Cons

- Appearances lists are **wiki markup**, not a clean `issue_credits[]` array  
- Parsing is brittle (templates, “Minor Appearances”, flashbacks, alternate realities)  
- Need strict Earth-616 (or explicit reality) filtering or MU research gets noisy  
- Rate/etiquette: polite concurrency, caching, User-Agent; Fandom ToS apply  
- Heavier maintenance when templates change

### Implementation sketch

```
tools/comic-accuracy/
  build-modern-fandom.js
  fandom-slugs.json           # MU name → wiki page title
  cache/                      # gitignored raw API responses
  modern-co-appearances.json
```

Prefer MediaWiki `action=parse` / `action=query` over scraping HTML in a browser.

### Effort

**High.** Most flexible long-term source; most parsing risk.

---

## Option C — Ask the Watcher approach

**Repo:** https://github.com/akashpatel1198/ask-the-watcher  

Community project that scrapes **Marvel Database (Fandom)** via MediaWiki, stores SQLite,
and exposes a small REST API:

| Endpoint pattern | Use |
|---|---|
| `GET /api/characters/:id/comics` | Comics for a character |
| `GET /api/comics/:id/characters` | Characters in a comic |
| `GET /api/comics?year=` | Year-filtered comics |

### What it gives you

Same underlying data as Option B, but with:

1. Existing scrape scripts (`scrape-characters.js`, `scrape-comics.js`, …)  
2. A local DB + HTTP shape closer to “character ↔ comics”  
3. Year filters useful for the 2003+ window  

You still run the scrape yourself (scrape JSON is gitignored upstream).

### Pros

- Accelerates Fandom path — less greenfield  
- Already models character↔comic both directions (ideal for intersection)  
- Can stay local (no dependency on their hosted API if we only reuse scripts/schema)

### Cons

- Third-party project — may go stale; treat as **reference or vendored scripts**, not a hard runtime dependency  
- Still inherits Fandom parsing / reality / etiquette issues  
- Hosted API (if any) is not a dataset we control; prefer local scrape → our JSON  
- License / attribution: check repo license before copying code

### Implementation sketch

1. Spike: run Ask-the-Watcher scrapers locally; confirm MU unmatched names resolve  
2. Either:  
   - **C1** — Vendor/adapt scrape scripts into `tools/comic-accuracy/fandom/`  
   - **C2** — Keep Watcher as a one-off ETL that exports `modern-co-appearances.json` we commit  
3. Wire `relations.js` the same as Options A/B

### Effort

**Medium–High.** Lower than pure B if scrapers work; higher if we must rewrite them.

---

## Comparison (for the modern gap only)

| Criterion | A Comic Vine | B Fandom direct | C Ask the Watcher |
|---|---|---|---|
| Closes 2003→now | Yes | Yes | Yes |
| Ready-made co-appearance CSV | No | No | No |
| Structured issue credits | Strong | Weak (parse) | Medium (after scrape) |
| API key | Yes | No | No (local) |
| Maintenance risk | Rate limits / CV schema | Template drift | Upstream + Fandom |
| Best fit if… | We want a clean rebuild script | We want max completeness | We want a head start on Fandom ETL |

---

## Recommended path

1. **Spike Comic Vine (Option A) first** — 10–20 unmatched MU names, measure hit rate and
   shared-issue counts vs manual spot-checks on Fandom.  
2. If CV coverage is thin for MU-relevant modern titles, **spike Ask the Watcher / Fandom
   (C → B)** on the same sample.  
3. Pick one primary modern source; keep the other as a documented fallback.  
4. Ship:
   - `modern-co-appearances.json` (committed)
   - `relations.js` dual-source output
   - README section: Legacy (≤2002) vs Modern (2003+)
5. Explicitly **do not** block on expanding the pre-2002 network unless a later plan
   targets “below top-327” classics.

---

## Integration with existing tool

| Piece | Change |
|---|---|
| `build.js` | Unchanged (legacy MCP edges) |
| New `build-modern-*.js` | Produces modern JSON |
| `relations.js` | Resolve name → show legacy + modern |
| `README.md` | Document sources, date window, limits |
| Secrets | `.env` / user env only; never commit API keys |

Sample CLI after integration:

```bash
npm run relations -- "Miles Morales" "Spider-Man"
# Miles Morales  ↔  Spider-Man
# legacySharedComics: n/a
# modernSharedComics: 42   (comicvine, cover_date ≥ 2003)
```

---

## Non-goals

- Replacing the legacy 1961–2002 dataset  
- Full-universe modern graph (millions of pairs)  
- Marvel Comics API (sunset)  
- Fabricating relations from appearance *counts* alone (FiveThirtyEight-style censuses)

---

## Open questions

1. Modern window start: strict `2003-01-01`, or overlap year `2000` for softer join with legacy?  
2. Do variant MU figures (Iron Man Civil War, Dark Phoenix) share modern IDs with base characters?  
3. Accept Comic Vine under-credits, or require a minimum confidence (e.g. both major + minor appearances)?  
4. Commit raw caches or only derived `modern-co-appearances.json`?
