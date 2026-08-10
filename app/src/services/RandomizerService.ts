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

  rollHero(pool?: Character[]): Character {
    return this.shuffle.pickOne(pool ?? this.characterRepo.getHeroes())
  }

  rollVillain(pool?: Character[]): Character {
    return this.shuffle.pickOne(pool ?? this.characterRepo.getVillains())
  }

  rollTeam(pool?: Character[]): Character[] {
    return this.shuffle.pickMany(pool ?? this.characterRepo.getHeroes(), TEAM_SIZE)
  }

  rollExpansion(pool?: Expansion[]): Expansion {
    return this.shuffle.pickOne(pool ?? this.expansionRepo.getAll())
  }
}
