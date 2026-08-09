import slugs from './wiki-slugs.json'

const WIKI_BASE = 'https://cmon-united.fandom.com/wiki/'

export function wikiUrl(characterId: string): string | null {
  const entry = (slugs as Record<string, { slug: string; role: string }>)[characterId]
  return entry ? WIKI_BASE + encodeURIComponent(entry.slug) : null
}
