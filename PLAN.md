# Plan: Convert Marvel United Randomizer to a Browser App

## Goal

Make the randomizer accessible to anyone via a URL — no installs, no Java, no terminal. Users open the link from Vercel and everything runs directly in the browser.

This is a static front-end app: all data is bundled at build time, and Vercel serves it as a plain webpage. There is no backend, no server, and no runtime dependencies for the user.

---

## Stack

| Layer | Choice | Reason |
|---|---|---|
| Framework | React + TypeScript | Component model fits the UI well; TS catches mistakes early |
| Build tool | Vite | Fast builds, native ESM, zero config for Vercel |
| Styling | Tailwind CSS | Utility-first, no extra build steps |
| Markdown rendering | `react-markdown` | Renders existing campaign `.md` files as-is |
| Hosting | Vercel | Free tier, auto-deploys from GitHub push, detects Vite automatically |

---

## Step-by-Step

### Step 1 — Scaffold the project

```bash
npm create vite@latest marvel-united-app -- --template react-ts
cd marvel-united-app
npm install
```

Install dependencies:

```bash
npm install react-markdown tailwindcss @tailwindcss/vite
```

Initialize Tailwind:

```bash
npx tailwindcss init
```

Add the Vite Tailwind plugin to `vite.config.ts`:

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

---

### Step 2 — Port the data

Translate the Java classes to TypeScript modules. This is a straight 1-to-1 conversion — just arrays and functions.

**`src/data/expansions.ts`**

```ts
export const expansions = [
  "Enter the Spider-Verse",
  "X-MEN: The Horsemen of Apocalypse",
  "X-MEN Blue Team",
  "X-MEN Mutant Promos",
  "Deadpool",
  "Rise of the Black Panther",
  "Phoenix Five",
  "X-Force",
  "Days of Future Past",
]
```

**`src/data/characters.ts`**

Export `heroes` and `villains` as string arrays, mirroring `CharactersList.java`.

**`src/data/scenarios.ts`**

Export each scenario as an object with `{ title, description }`.

---

### Step 3 — Build the randomizer logic

**`src/utils/randomize.ts`**

```ts
export function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5)
}

export function pickOne<T>(arr: T[]): T {
  return shuffle(arr)[0]
}

export function pickTeam(heroes: string[], size = 4): string[] {
  return shuffle(heroes).slice(0, size)
}
```

This replaces `Randomize.java` entirely. No external libraries needed.

---

### Step 4 — Build the UI components

**`src/components/RandomizerPanel.tsx`**

The main interactive panel. Buttons for:
- Roll random expansion
- Roll random hero
- Roll random villain
- Roll a team of 4

Each button updates local state and displays the result with an animation.

**`src/components/ScenarioCard.tsx`**

Displays a random scenario prompt on click. Pulls from `src/data/scenarios.ts`.

**`src/components/CampaignViewer.tsx`**

Renders the existing campaign markdown files. Import the `.md` files as raw strings using Vite's `?raw` suffix:

```ts
import xmenCampaign from '../../Campaigns/X-Men Campaign.md?raw'
import earthsMightiest from "../../Campaigns/Earth's Mightiest Campaign.md?raw"
```

Pass the string to `<ReactMarkdown>`. No changes to the existing `.md` files required.

---

### Step 5 — Wire it together in `App.tsx`

Simple tab navigation:
- **Randomizer** — the main roller panel
- **Campaigns** — dropdown or tabs to pick a campaign, renders the markdown
- **Scenarios** — random scenario generator

---

### Step 6 — Deploy to Vercel

**Option A — CLI (one-time)**

```bash
npm install -g vercel
vercel
```

Follow the prompts. Vercel detects Vite automatically and sets the build command to `npm run build` and the output directory to `dist`.

**Option B — GitHub integration (recommended for ongoing use)**

1. Push the app to a GitHub repository (can live in this repo under a subdirectory, or as a separate repo)
2. Go to [vercel.com](https://vercel.com), import the repository
3. Vercel auto-deploys on every push to `main`

After the first deploy, users get a URL like `https://marvel-united-app.vercel.app`. That's all they need — no installs, no accounts, no setup.

---

### Step 7 — Add more expansions over time

Once the data layer is a TypeScript file, adding a new expansion is just adding a string to an array and a character to a list. The UI updates automatically.

Future expansions to add (from ROADMAP):
- Kickstarter Promo Box 2
- The Infinity Gauntlet
- Spider-Geddon

---

## What the user experience looks like

1. User opens the Vercel URL in any browser
2. They see a Marvel United-themed page with buttons
3. They click **Roll Team** — four random heroes appear instantly
4. They click **Roll Villain** — a villain is drawn
5. They browse campaigns in the Campaigns tab
6. Nothing was installed. Nothing was downloaded by the user. It just works.

---

## Files to keep from the Java project

| File | Status |
|---|---|
| `Campaigns/*.md` | Keep — imported directly into the React app |
| `Scenarios.java` | Port to `src/data/scenarios.ts` |
| `CharactersList.java` | Port to `src/data/characters.ts` |
| `ExpansionsList.java` | Port to `src/data/expansions.ts` |
| `Randomize.java` | Replace with `src/utils/randomize.ts` |
| `Main.java` | No longer needed |
