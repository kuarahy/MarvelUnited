/**
 * fetch-wiki-images.mjs
 *
 * Downloads the deck-back image for every character in wiki-slugs.json
 * from the CMON United fandom wiki.
 *
 * Usage (from repo root):
 *   node scripts/fetch-wiki-images.mjs
 *
 * Options (env vars):
 *   DRY_RUN=1   Print resolved image URLs without downloading
 *   ONLY=id     Process a single character id (e.g. ONLY=black-widow)
 *
 * Output:
 *   app/public/images/heroes/{id}.jpg
 *   app/public/images/villains/{id}.jpg
 *
 * Selection logic:
 *   1. If the entry has a `fileTitle` override, resolve that file directly.
 *   2. Otherwise, find the first image on the wiki page whose filename
 *      contains "back" but is NOT an equipment, dashboard, or threat back.
 *   3. Among qualifying back images, prefer .jpg over .png.
 *   4. Fall back to the first image on the page if no back image is found.
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')

const WIKI_API = 'https://cmon-united.fandom.com/api.php'
const OUT_BASE = join(ROOT, 'app', 'public', 'images')

const DRY_RUN = process.env.DRY_RUN === '1'
const FORCE   = process.env.FORCE === '1'
const ONLY    = process.env.ONLY ?? null

const slugs = JSON.parse(
  readFileSync(join(ROOT, 'app', 'src', 'data', 'wiki-slugs.json'), 'utf8')
)

const entries = ONLY
  ? Object.entries(slugs).filter(([id]) => id === ONLY)
  : Object.entries(slugs)

if (entries.length === 0) {
  console.error(`No entries found${ONLY ? ` for id "${ONLY}"` : ''}`)
  process.exit(1)
}

console.log(`Processing ${entries.length} character(s)…\n`)

let ok = 0, skipped = 0, failed = 0

for (const [id, { slug, role, fileTitle }] of entries) {
  try {
    const imageUrl = fileTitle
      ? await resolveImageFileUrl(fileTitle)
      : await resolveBackImageUrl(slug)

    if (!imageUrl) {
      console.warn(`⚠  ${id} — no back image found on wiki page`)
      skipped++
      continue
    }

    if (DRY_RUN) {
      console.log(`○  ${id} → ${imageUrl}`)
      ok++
      continue
    }

    const outDir  = join(OUT_BASE, role === 'hero' ? 'heroes' : 'villains')
    const outPath = join(outDir, `${id}.jpg`)

    if (!FORCE && existsSync(outPath)) {
      console.log(`–  ${id} (already exists)`)
      ok++
      continue
    }

    mkdirSync(outDir, { recursive: true })

    const buffer = await downloadImage(imageUrl)
    writeFileSync(outPath, buffer)
    console.log(`✓  ${id}`)
    ok++
  } catch (err) {
    console.error(`✗  ${id} — ${err.message}`)
    failed++
  }

  await sleep(300)
}

console.log(`\nDone: ${ok} downloaded, ${skipped} skipped, ${failed} failed`)

// ---------------------------------------------------------------------------

/**
 * Finds the deck-back image for a wiki page.
 *
 * Prefers images whose filename includes "back" but excludes partial-back
 * images (equipment backs, dashboard backs, threat backs). Among candidates
 * prefers .jpg over .png. Falls back to the first non-svg image on the page.
 */
async function resolveBackImageUrl(slug) {
  const title = decodeURIComponent(slug.replace(/_/g, ' '))

  const apiUrl = new URL(WIKI_API)
  apiUrl.searchParams.set('action', 'query')
  apiUrl.searchParams.set('titles', title)
  apiUrl.searchParams.set('prop', 'images')
  apiUrl.searchParams.set('imlimit', '50')
  apiUrl.searchParams.set('format', 'json')

  const res  = await fetch(apiUrl.toString())
  const data = await res.json()

  const page   = Object.values(data.query.pages)[0]
  const images = page.images ?? []

  if (images.length === 0) return null

  // Candidates: images with "back" in the name, excluding component backs
  const backImages = images.filter(({ title: t }) => {
    const lower = t.toLowerCase()
    return (
      lower.includes('back') &&
      !lower.endsWith('.svg') &&
      !lower.includes('equipment') &&
      !lower.includes('dashboard') &&
      !lower.includes('threat') &&
      !lower.includes('standee')
    )
  })

  // Prefer jpg over png
  const pick =
    backImages.find(({ title: t }) => t.toLowerCase().endsWith('.jpg')) ??
    backImages[0] ??
    images.find(({ title: t }) => !t.toLowerCase().endsWith('.svg'))

  if (!pick) return null
  return resolveImageFileUrl(pick.title)
}

/**
 * Converts a wiki File: title to a direct CDN download URL via the API.
 */
async function resolveImageFileUrl(fileTitle) {
  const apiUrl = new URL(WIKI_API)
  apiUrl.searchParams.set('action', 'query')
  apiUrl.searchParams.set('titles', fileTitle)
  apiUrl.searchParams.set('prop', 'imageinfo')
  apiUrl.searchParams.set('iiprop', 'url')
  apiUrl.searchParams.set('format', 'json')

  const res  = await fetch(apiUrl.toString())
  const data = await res.json()

  const page = Object.values(data.query.pages)[0]
  return page.imageinfo?.[0]?.url ?? null
}

/**
 * Downloads a URL and returns the body as a Buffer.
 * Strips CDN revision params to get the original full-res file.
 */
async function downloadImage(url) {
  const cleanUrl = url.split('/revision/')[0]
  const res = await fetch(cleanUrl)
  if (!res.ok) throw new Error(`HTTP ${res.status} fetching ${cleanUrl}`)
  return Buffer.from(await res.arrayBuffer())
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
