import ReactMarkdown from 'react-markdown'
import type { Campaign } from '../../types'

interface CampaignViewerProps {
  campaign: Campaign | null
}

export function CampaignViewer({ campaign }: CampaignViewerProps) {
  if (!campaign) {
    return <p className="text-gray-400 italic">Select a campaign above to read it.</p>
  }

  return (
    <article className="prose prose-sm sm:prose max-w-none text-gray-800">
      <ReactMarkdown>{campaign.content}</ReactMarkdown>
    </article>
  )
}
