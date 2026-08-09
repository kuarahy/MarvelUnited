import type { Campaign } from '../../types'

interface CampaignSelectorProps {
  campaigns: Campaign[]
  selectedId: string | null
  onSelect: (id: string) => void
}

export function CampaignSelector({ campaigns, selectedId, onSelect }: CampaignSelectorProps) {
  return (
    <div className="flex gap-2 flex-wrap">
      {campaigns.map((campaign) => (
        <button
          key={campaign.id}
          onClick={() => onSelect(campaign.id)}
          className={`px-4 py-2 rounded-lg text-sm font-semibold border transition-colors ${
            selectedId === campaign.id
              ? 'bg-red-600 text-white border-red-600'
              : 'bg-white text-gray-600 border-gray-200 hover:border-red-400'
          }`}
        >
          {campaign.title}
        </button>
      ))}
    </div>
  )
}
