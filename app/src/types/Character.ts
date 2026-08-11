export type CharacterRole = 'hero' | 'villain' | 'anti-hero'

export interface Character {
  id: string
  name: string
  role: CharacterRole
  expansionId: string
  ksExclusive?: boolean
  // For characters that appear in more than one expansion
  alsoIn?: string
}
