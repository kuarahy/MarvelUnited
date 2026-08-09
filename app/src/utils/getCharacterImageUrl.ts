import type { Character } from '../types'

export function getCharacterImageUrl(character: Character): string {
  const folder = character.role === 'villain' ? 'villains' : 'heroes'
  return `/images/${folder}/${character.id}.jpg`
}
