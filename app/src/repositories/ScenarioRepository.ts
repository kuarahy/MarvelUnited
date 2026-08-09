import type { IRepository } from './IRepository'
import type { Scenario } from '../types'
import { scenarios } from '../data'

export class ScenarioRepository implements IRepository<Scenario> {
  getAll(): Scenario[] {
    return scenarios
  }

  getById(id: string): Scenario | undefined {
    return scenarios.find((s) => s.id === id)
  }
}
