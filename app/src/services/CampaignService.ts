import type { Campaign } from '../types'
import type { CampaignRepository } from '../repositories/CampaignRepository'

export class CampaignService {
  constructor(private readonly campaignRepo: CampaignRepository) {}

  getAll(): Campaign[] {
    return this.campaignRepo.getAll()
  }

  getById(id: string): Campaign | undefined {
    return this.campaignRepo.getById(id)
  }
}
