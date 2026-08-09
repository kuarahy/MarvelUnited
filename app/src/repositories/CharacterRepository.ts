import type { IRepository } from './IRepository'
import type { Character } from '../types'
import { heroes, villains } from '../data'

export class CharacterRepository implements IRepository<Character> {
  private readonly characters: Character[] = [...heroes, ...villains]

  getAll(): Character[] {
    return this.characters
  }

  getById(id: string): Character | undefined {
    return this.characters.find((c) => c.id === id)
  }

  getHeroes(): Character[] {
    return heroes
  }

  getVillains(): Character[] {
    return villains
  }

  getByExpansion(expansionId: string): Character[] {
    return this.characters.filter((c) => c.expansionId === expansionId)
  }
}
