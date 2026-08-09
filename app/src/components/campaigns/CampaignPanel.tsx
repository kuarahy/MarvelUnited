import { useCampaign } from '../../hooks'
import { CampaignSelector } from './CampaignSelector'
import { CampaignViewer } from './CampaignViewer'

export function CampaignPanel() {
  const { campaigns, selected, selectCampaign } = useCampaign()

  return (
    <div className="flex flex-col gap-6">
      <CampaignSelector
        campaigns={campaigns}
        selectedId={selected?.id ?? null}
        onSelect={selectCampaign}
      />
      <CampaignViewer campaign={selected} />
    </div>
  )
}
