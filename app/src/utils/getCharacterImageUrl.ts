import type { Character } from '../types'

export function getCharacterImageUrl(character: Character): string {
  const folder = character.role === 'hero' ? 'heroes' : 'villains'
  return `/images/${folder}/${character.id}.jpg`
}
