import { useState } from 'react'
import { Header, TabNav, Footer } from './components/layout'
import type { TabId } from './components/layout'
import { RandomizerPanel } from './components/randomizer'
// Not ready for prod yet — re-enable with TabNav entries when content is ready:
// import { CampaignPanel } from './components/campaigns'
// import { ScenarioPanel } from './components/scenarios'
import type { ReactElement } from 'react'

const TAB_PANELS: Partial<Record<TabId, ReactElement>> = {
  randomizer: <RandomizerPanel />,
  // campaigns: <CampaignPanel />,
  // scenarios: <ScenarioPanel />,
}

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>('randomizer')
  const showTabs = Object.keys(TAB_PANELS).length > 1

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      {showTabs && <TabNav active={activeTab} onChange={setActiveTab} />}
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-8">
        {TAB_PANELS[activeTab]}
      </main>
      <Footer />
    </div>
  )
}
