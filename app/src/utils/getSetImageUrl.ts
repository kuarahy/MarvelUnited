import type { Expansion } from '../types'

export function getSetImageUrl(expansion: Expansion): string {
  return `/images/sets/${expansion.id}.webp`
}
