import type { Scenario } from '../types'
import type { ScenarioRepository } from '../repositories/ScenarioRepository'
import { ShuffleService } from './ShuffleService'

export class ScenarioService {
  private readonly shuffle = new ShuffleService()

  constructor(private readonly scenarioRepo: ScenarioRepository) {}

  getAll(): Scenario[] {
    return this.scenarioRepo.getAll()
  }

  rollScenario(): Scenario {
    return this.shuffle.pickOne(this.scenarioRepo.getAll())
  }
}
