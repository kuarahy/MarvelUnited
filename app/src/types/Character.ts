export type CharacterRole = 'hero' | 'villain'

export interface Character {
  id: string
  name: string
  role: CharacterRole
  expansionId: string
}
