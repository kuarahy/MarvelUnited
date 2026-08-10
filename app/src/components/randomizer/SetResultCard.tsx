import type { Expansion } from '../../types'
import { getSetImageUrl } from '../../utils'

const TYPE_LABELS: Record<Expansion['type'], string> = {
  core: 'Core Set',
  expansion: 'Expansion',
  promo: 'Promo',
}

interface SetResultCardProps {
  set: Expansion | null
}

export function SetResultCard({ set }: SetResultCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
      {set ? (
        <div className="flex items-stretch">
          <div className="w-1/4 shrink-0" style={{ aspectRatio: '1 / 1' }}>
            <img
              src={getSetImageUrl(set)}
              alt={set.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-3 flex flex-col gap-1 justify-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">
              Set
            </span>
            <span className="text-lg font-bold text-gray-900 leading-tight">
              {set.name}
            </span>
            <span className="text-xs bg-red-100 text-red-700 font-medium px-2 py-0.5 rounded-full self-start">
              {TYPE_LABELS[set.type]}
            </span>
          </div>
        </div>
      ) : (
        <div className="p-4 min-h-[80px] flex flex-col gap-1 justify-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">
            Set
          </span>
          <span className="text-gray-300 italic text-sm">Roll to reveal</span>
        </div>
      )}
    </div>
  )
}
