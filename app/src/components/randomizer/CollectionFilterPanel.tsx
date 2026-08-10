import type { Expansion, ExpansionType } from '../../types'

interface CollectionFilterPanelProps {
  expansions: Expansion[]
  ownedIds: Set<string>
  onToggle: (id: string) => void
  onSetAll: (ids: string[]) => void
  onClearAll: () => void
}

const GROUP_LABELS: Record<ExpansionType, string> = {
  core: 'Core Sets',
  expansion: 'Retail Expansions',
  promo: 'Promos & KS Exclusives',
}

const GROUP_ORDER: ExpansionType[] = ['core', 'expansion', 'promo']

export function CollectionFilterPanel({
  expansions,
  ownedIds,
  onToggle,
  onSetAll,
  onClearAll,
}: CollectionFilterPanelProps) {
  const allIds = expansions.map((e) => e.id)
  const ownedCount = expansions.filter((e) => ownedIds.has(e.id)).length

  const grouped = GROUP_ORDER.reduce<Record<ExpansionType, Expansion[]>>(
    (acc, type) => {
      acc[type] = expansions.filter((e) => e.type === type)
      return acc
    },
    { core: [], expansion: [], promo: [] },
  )

  return (
    <details className="border border-gray-200 rounded-lg bg-white shadow-sm">
      <summary className="flex items-center justify-between px-4 py-3 cursor-pointer select-none text-sm font-semibold text-gray-700 hover:bg-gray-50 rounded-lg">
        <span>Filter by your collection</span>
        <span className="text-gray-400 font-normal">
          {ownedCount} of {expansions.length} sets
        </span>
      </summary>

      <div className="px-4 pb-4 pt-2 flex flex-col gap-4">
        {GROUP_ORDER.map((type) => {
          const group = grouped[type]
          if (group.length === 0) return null
          return (
            <div key={type}>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
                {GROUP_LABELS[type]}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                {group.map((exp) => (
                  <label
                    key={exp.id}
                    className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer hover:text-gray-900"
                  >
                    <input
                      type="checkbox"
                      checked={ownedIds.has(exp.id)}
                      onChange={() => onToggle(exp.id)}
                      className="accent-red-600"
                    />
                    {exp.name}
                  </label>
                ))}
              </div>
            </div>
          )
        })}

        <div className="flex gap-3 pt-1 border-t border-gray-100">
          <button
            onClick={() => onSetAll(allIds)}
            className="text-xs text-red-600 hover:underline"
          >
            Select All
          </button>
          <button
            onClick={onClearAll}
            className="text-xs text-gray-500 hover:underline"
          >
            Clear All
          </button>
        </div>
      </div>
    </details>
  )
}
