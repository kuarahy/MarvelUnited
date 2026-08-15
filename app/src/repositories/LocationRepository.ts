import type { Location } from '../types'
import { locations } from '../data'

export class LocationRepository {
  getAll(): Location[] {
    return locations
  }

  getById(id: string): Location | undefined {
    return locations.find((l) => l.id === id)
  }

  getByExpansion(expansionId: string): Location[] {
    return locations.filter((l) => l.expansionId === expansionId)
  }
}
