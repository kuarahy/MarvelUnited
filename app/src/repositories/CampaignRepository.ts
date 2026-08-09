import type { IRepository } from './IRepository'
import type { Campaign } from '../types'
import { campaigns } from '../data'

export class CampaignRepository implements IRepository<Campaign> {
  getAll(): Campaign[] {
    return campaigns
  }

  getById(id: string): Campaign | undefined {
    return campaigns.find((c) => c.id === id)
  }
}
