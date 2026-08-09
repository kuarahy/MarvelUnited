import type { IRepository } from './IRepository'
import type { Expansion } from '../types'
import { expansions } from '../data'

export class ExpansionRepository implements IRepository<Expansion> {
  getAll(): Expansion[] {
    return expansions
  }

  getById(id: string): Expansion | undefined {
    return expansions.find((e) => e.id === id)
  }
}
