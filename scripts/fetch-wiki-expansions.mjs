/**
 * fetch-wiki-expansions.mjs
 *
 * Uses the CMON United fandom MediaWiki API to:
 * 1. Get all pages in Category:Expansions and Category:Core_Sets
 * 2. For each expansion page, extract the character lists (heroes/villains)
 *
 * Usage:
 *   node scripts/fetch-wiki-expansions.mjs > scripts/wiki-expansions.json
 */

const WIKI_API = 'https://cmon-united.fandom.com/api.php'

async function getCategoryMembers(category) {
  const url = new URL(WIKI_API)
  url.searchParams.set('action', 'query')
  url.searchParams.set('list', 'categorymembers')
  url.searchParams.set('cmtitle', `Category:${category}`)
  url.searchParams.set('cmlimit', '500')
  url.searchParams.set('cmnamespace', '0')
  url.searchParams.set('format', 'json')

  const res = await fetch(url.toString())
  const data = await res.json()
  return data.query.categorymembers.map(m => m.title)
}

async function getPageLinks(title) {
  const url = new URL(WIKI_API)
  url.searchParams.set('action', 'query')
  url.searchParams.set('titles', title)
  url.searchParams.set('prop', 'links')
  url.searchParams.set('pllimit', '500')
  url.searchParams.set('format', 'json')

  const res = await fetch(url.toString())
  const data = await res.json()
  const page = Object.values(data.query.pages)[0]
  return (page.links ?? []).map(l => l.title)
}

async function getPageCategories(title) {
  const url = new URL(WIKI_API)
  url.searchParams.set('action', 'query')
  url.searchParams.set('titles', title)
  url.searchParams.set('prop', 'categories')
  url.searchParams.set('cllimit', '50')
  url.searchParams.set('format', 'json')

  const res = await fetch(url.toString())
  const data = await res.json()
  const page = Object.values(data.query.pages)[0]
  return (page.categories ?? []).map(c => c.title)
}

// Get all expansion and core set pages
process.stderr.write('Fetching Category:Expansions…\n')
const expansionPages = await getCategoryMembers('Expansions')
process.stderr.write(`  Found ${expansionPages.length} expansion pages\n`)

process.stderr.write('Fetching Category:Core_Sets…\n')
const coreSetsPages = await getCategoryMembers('Core_Sets')
process.stderr.write(`  Found ${coreSetsPages.length} core set pages\n`)

// Combine into a map with type
const allPages = [
  ...coreSetsPages.map(p => ({ title: p, type: 'core' })),
  ...expansionPages.map(p => ({ title: p, type: 'expansion' })),
]

// Filter to only box pages (not character pages)
const boxKeywords = ['box', 'pack', 'team', 'set', 'united', 'force', 'verse', 'geddon', 'past', 'pangolin', 'panther', 'five', 'city', 'hydra', 'class', 'hour', 'purge', 'era', 'story', 'legends', 'gold', 'blue']

process.stderr.write('\nFetching links for each expansion page…\n')

const results = []

for (const { title, type } of allPages) {
  process.stderr.write(`  ${title}…\n`)

  // Get the categories of this page to confirm it's a box page
  const cats = await getPageCategories(title)
  const isBox = cats.some(c =>
    c.includes('Core_Sets') || c.includes('Expansions') || c.includes('Retail') || c.includes('Kickstarter')
  )

  if (!isBox) {
    process.stderr.write(`    Skipping (not a box page)\n`)
    continue
  }

  // Get links from this page — characters are linked pages
  const links = await getPageLinks(title)

  results.push({
    title,
    type,
    categories: cats,
    links: links.filter(l =>
      !l.startsWith('Category:') &&
      !l.startsWith('File:') &&
      !l.startsWith('Help:') &&
      !l.startsWith('Talk:') &&
      !l.includes('CMON') &&
      l !== title
    ),
  })

  // Small delay to be polite
  await new Promise(r => setTimeout(r, 200))
}

console.log(JSON.stringify(results, null, 2))
process.stderr.write(`\nDone. ${results.length} boxes found.\n`)
