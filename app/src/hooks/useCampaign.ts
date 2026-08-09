import { useState, useCallback } from 'react'
import type { Campaign } from '../types'
import { CampaignService } from '../services'
import { CampaignRepository } from '../repositories'

const service = new CampaignService(new CampaignRepository())
const allCampaigns = service.getAll()

export interface CampaignState {
  campaigns: Campaign[]
  selected: Campaign | null
}

export interface CampaignActions {
  selectCampaign: (id: string) => void
}

export function useCampaign(): CampaignState & CampaignActions {
  const [selected, setSelected] = useState<Campaign | null>(allCampaigns[0] ?? null)

  const selectCampaign = useCallback((id: string) => {
    const found = service.getById(id)
    if (found) setSelected(found)
  }, [])

  return { campaigns: allCampaigns, selected, selectCampaign }
}
