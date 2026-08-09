/**
 * fetch-wiki-images.mjs
 *
 * Downloads character portrait images from the CMON United fandom wiki
 * for every entry in app/src/data/wiki-slugs.json.
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
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')

const WIKI_BASE = 'https://cmon-united.fandom.com/wiki/'
const WIKI_API  = 'https://cmon-united.fandom.com/api.php'
const OUT_BASE  = join(ROOT, 'app', 'public', 'images')

const DRY_RUN = process.env.DRY_RUN === '1'
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

for (const [id, { slug, role }] of entries) {
  try {
    const imageUrl = await resolvePortraitUrl(slug)

    if (!imageUrl) {
      console.warn(`⚠  ${id} — no portrait found on wiki page`)
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

    if (existsSync(outPath)) {
      console.log(`–  ${id} already exists, skipping`)
      skipped++
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

  // Polite delay between requests
  await sleep(300)
}

console.log(`\nDone: ${ok} downloaded, ${skipped} skipped, ${failed} failed`)

// ---------------------------------------------------------------------------

/**
 * Resolves the full-resolution portrait URL for a wiki page.
 *
 * Strategy:
 *  1. Use the fandom API to get the page's image list — faster than HTML parsing
 *     and avoids Cloudflare bot-detection that blocks browser-style fetches.
 *  2. Filter to the first image that looks like a character portrait (not a
 *     card-art thumbnail, icon, or wiki chrome image).
 *  3. Fall back to the first image on the page if the heuristic finds nothing.
 */
async function resolvePortraitUrl(slug) {
  const title = decodeURIComponent(slug.replace(/_/g, ' '))

  const apiUrl = new URL(WIKI_API)
  apiUrl.searchParams.set('action', 'query')
  apiUrl.searchParams.set('titles', title)
  apiUrl.searchParams.set('prop', 'images')
  apiUrl.searchParams.set('imlimit', '20')
  apiUrl.searchParams.set('format', 'json')

  const res  = await fetch(apiUrl.toString())
  const data = await res.json()

  const page  = Object.values(data.query.pages)[0]
  const images = page.images ?? []

  // Prefer images whose filename looks like a character portrait:
  // - not "Icon", "Logo", "Map", "Background", "Banner", "Badge"
  // - not a .svg (wiki chrome)
  const portrait = images.find(({ title: t }) => {
    const lower = t.toLowerCase()
    return (
      !lower.endsWith('.svg') &&
      !lower.includes('icon') &&
      !lower.includes('logo') &&
      !lower.includes('map') &&
      !lower.includes('background') &&
      !lower.includes('banner') &&
      !lower.includes('badge') &&
      !lower.includes('layout') &&
      !lower.includes('card') &&
      !lower.includes('token')
    )
  }) ?? images[0]

  if (!portrait) return null

  return await resolveImageFileUrl(portrait.title)
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
 * Strips the revision/latest query string to get the original full-res file.
 */
async function downloadImage(url) {
  // Strip scale/revision params — fandom CDN serves originals without them
  const cleanUrl = url.split('/revision/')[0]

  const res = await fetch(cleanUrl)
  if (!res.ok) throw new Error(`HTTP ${res.status} fetching ${cleanUrl}`)

  const arrayBuffer = await res.arrayBuffer()
  return Buffer.from(arrayBuffer)
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
