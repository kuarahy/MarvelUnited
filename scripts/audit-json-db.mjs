/**
 * audit-json-db.mjs
 *
 * Fetches every JSON file from OscarGarPer/Marvel-United-Json-Database (English),
 * extracts boxes + characters, and prints a structured inventory.
 *
 * Usage (from repo root):
 *   node scripts/audit-json-db.mjs
 */

const RAW = 'https://raw.githubusercontent.com/OscarGarPer/Marvel-United-Json-Database/main/en/'

const FILES = [
  'mun-ultimate.json',
  'mun-uncanny.json',
  'mun-spidergeddon.json',
  'mun-omniverse.json',
  'mun-pr02.json',
]

const LOYALTY_MAP = {
  hero:         'hero',
  'anti-hero':  'hero',   // anti-heroes playable as heroes
  villain:      'villain',
  'villain-bio':'villain',
  challenge:    'villain',
  hidden:       'villain',
  other:        null,     // skip (Lockheed-like companions)
}

const boxes = []

for (const file of FILES) {
  const url = RAW + file
  process.stderr.write(`Fetching ${file}…\n`)
  const res = await fetch(url)
  if (!res.ok) { process.stderr.write(`  SKIP (${res.status})\n`); continue }

  const data = await res.json()

  // Each file may be a single box or an array of boxes
  const rawBoxes = Array.isArray(data) ? data : [data]

  for (const box of rawBoxes) {
    if (!box.boxId) continue

    const entry = {
      file,
      boxId: box.boxId,
      name: box.name?.text ?? box.name?.locText ?? box.boxId,
      characters: [],
    }

    for (const char of box.characters ?? []) {
      const loyalty = char.loyalty?.toLowerCase()
      const role = LOYALTY_MAP[loyalty]
      if (role === null) continue   // skip non-playable
      if (role === undefined) continue  // unknown loyalty

      entry.characters.push({
        name: char.name?.text ?? char.name?.locText ?? '(unnamed)',
        role,
        loyalty: char.loyalty,
      })
    }

    boxes.push(entry)
  }
}

// Output JSON for easy processing
console.log(JSON.stringify(boxes, null, 2))
