import type { Character, Expansion } from '../types'
import type { CharacterRepository } from '../repositories/CharacterRepository'
import type { ExpansionRepository } from '../repositories/ExpansionRepository'
import { ShuffleService } from './ShuffleService'

const TEAM_SIZE = 4

export class RandomizerService {
  private readonly shuffle = new ShuffleService()

  constructor(
    private readonly characterRepo: CharacterRepository,
    private readonly expansionRepo: ExpansionRepository,
  ) {}

  rollHero(): Character {
    return this.shuffle.pickOne(this.characterRepo.getHeroes())
  }

  rollVillain(): Character {
    return this.shuffle.pickOne(this.characterRepo.getVillains())
  }

  rollTeam(): Character[] {
    return this.shuffle.pickMany(this.characterRepo.getHeroes(), TEAM_SIZE)
  }

  rollExpansion(): Expansion {
    return this.shuffle.pickOne(this.expansionRepo.getAll())
  }
}
