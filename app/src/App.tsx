import { useState } from 'react'
import { Header, TabNav, Footer } from './components/layout'
import type { TabId } from './components/layout'
import { RandomizerPanel } from './components/randomizer'
import { CampaignPanel } from './components/campaigns'
import { ScenarioPanel } from './components/scenarios'
import type { ReactElement } from 'react'

const TAB_PANELS: Record<TabId, ReactElement> = {
  randomizer: <RandomizerPanel />,
  campaigns: <CampaignPanel />,
  scenarios: <ScenarioPanel />,
}

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>('randomizer')

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <TabNav active={activeTab} onChange={setActiveTab} />
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-8">
        {TAB_PANELS[activeTab]}
      </main>
      <Footer />
    </div>
  )
}
