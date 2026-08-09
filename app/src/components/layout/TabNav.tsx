export type TabId = 'randomizer' | 'campaigns' | 'scenarios'

interface Tab {
  id: TabId
  label: string
}

const TABS: Tab[] = [
  { id: 'randomizer', label: 'Randomizer' },
  { id: 'campaigns', label: 'Campaigns' },
  { id: 'scenarios', label: 'Scenarios' },
]

interface TabNavProps {
  active: TabId
  onChange: (tab: TabId) => void
}

export function TabNav({ active, onChange }: TabNavProps) {
  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="max-w-4xl mx-auto flex">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`px-6 py-3 text-sm font-semibold border-b-2 transition-colors ${
              active === tab.id
                ? 'border-red-600 text-red-600'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </nav>
  )
}
