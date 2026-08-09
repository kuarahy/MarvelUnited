# Plan: Community Outreach

## Goal

Get the project in front of Marvel United players through two parallel tracks:
1. **PDF Release** — printable campaign and scenario cards with images for easy table play
2. **Social & Branding** — add presence, links, and donation options to the app and profiles

These belong together because both are about reaching and serving the community, not about adding features to the app itself.

---

## Track A: PDF Release

### Goal

Generate polished, printable PDFs of the campaigns and scenarios so players can print them out and play without needing a screen.

---

### Step 1 — Choose a PDF generation approach

The Markdown source files already exist. The cleanest pipeline for a static site is:

| Option | Pros | Cons |
|---|---|---|
| **Pandoc + LaTeX** | Full control, best typography | Setup overhead, LaTeX install |
| **Puppeteer (headless Chrome)** | Renders exactly like the browser | Heavier dependency |
| **md-to-pdf** | Simple CLI, Markdown-native | Less layout control |

**Recommended:** `md-to-pdf` for a first pass (quick wins), then move to Puppeteer if more design control is needed.

Install:

```bash
npm install -g md-to-pdf
```

---

### Step 2 — Design the PDF layout

Create a CSS stylesheet that controls the PDF output:

```
plans/pdf/style.css
```

Key design decisions:
- Page size: A4 or Letter (Letter for US community)
- Font: readable serif for body, bold sans for headings
- Color: match the app's red-and-dark-gray palette
- Campaign flowcharts: render the Mermaid diagrams as images first (screenshot or `mermaid-js/mermaid-cli`), embed as PNG in the PDF
- Page breaks between campaign acts

---

### Step 3 — Generate Mermaid diagrams as images

The Avengers campaign has a Mermaid flowchart. Convert it to a PNG for embedding:

```bash
npm install -g @mermaid-js/mermaid-cli
mmdc -i Campaigns/Earth\'s\ Mightiest\ Campaign.md -o plans/pdf/avengers-flowchart.png
```

---

### Step 4 — Generate PDFs

```bash
md-to-pdf Campaigns/X-Men\ Campaign.md --stylesheet plans/pdf/style.css
md-to-pdf Campaigns/Earth\'s\ Mightiest\ Campaign.md --stylesheet plans/pdf/style.css
```

Output: two PDF files ready for review. Iterate on the stylesheet until the layout is clean.

---

### Step 5 — Create a scenario reference card PDF

Compile all scenarios from `app/src/data/scenarios.ts` into a single Markdown file (`plans/pdf/scenario-cards.md`), one scenario per card layout, then generate:

```bash
md-to-pdf plans/pdf/scenario-cards.md --stylesheet plans/pdf/style.css
```

---

### Step 6 — Host the PDFs

Two options (do both):

**GitHub Releases:**
- Create a GitHub Release tagged `v1.0-pdfs`
- Attach all PDF files as release assets
- Users download directly from GitHub

**Vercel app download page:**
- Add a `/downloads` route to the React app
- List each PDF with a download link pointing to the GitHub Release assets

Commit: `feat: add downloads page with PDF links`

---

### Step 7 — Distribute to communities

Post in the following places with the PDF link and Vercel app URL:

| Platform | Where |
|---|---|
| Reddit | r/marvelunited, r/boardgames |
| BoardGameGeek | Marvel United game page → Files section |
| CMON Forums | Marvel United board |
| Facebook | Marvel United fan groups |

Write a short post explaining what the tool does, show a screenshot of the randomizer, attach the PDF link.

---

## Track B: Social & Branding

### Goal

Make the project discoverable and give the community ways to follow, support, and contribute.

---

### Step 1 — Update the app footer

In `app/src/components/layout/Footer.tsx`, add:

- GitHub link (already present — verify it points to the renamed repo)
- A Ko-fi or GitHub Sponsors button: `https://ko-fi.com/[your-handle]` or `https://github.com/sponsors/kuarahy`
- BGG game page link for context

Commit: `feat: add sponsor and community links to footer`

---

### Step 2 — Update the README

In `README.md`:
- Add a **Community** section with links to Reddit, BGG, and Discord (if applicable)
- Add a **Contributing** section explaining how to add new expansions (point to `plans/02-new-expansions.md`)
- Add a Ko-fi / GitHub Sponsors badge next to the existing shields

Commit: `docs: add community and contributing sections to README`

---

### Step 3 — Update GitHub profile / repo metadata

On GitHub:
- Add a repo description: *"Browser-based randomizer and campaign tool for the Marvel United board game"*
- Add the live Vercel URL to the repo homepage field
- Confirm topics are set: `board-game`, `marvel`, `java`, `randomizer`, `marvel-united`, `tabletop`, `campaign` (already done)

---

### Step 4 — Optional: add Open Graph metadata to the app

In `app/index.html`, add Open Graph tags so the Vercel URL previews well when shared on social media:

```html
<meta property="og:title" content="Marvel United Randomizer" />
<meta property="og:description" content="Roll random heroes, villains, and teams for Marvel United. Includes two full branching campaigns." />
<meta property="og:url" content="https://marvel-united-randomizer.vercel.app" />
<meta property="og:type" content="website" />
```

Commit: `feat: add Open Graph metadata for social sharing`
