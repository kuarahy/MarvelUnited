import type { Location } from '../../types'
import { expansions } from '../../data'
import { getLocationImageUrl } from '../../utils'

interface LocationResultCardProps {
  locations: Location[]
}

function resolveExpansionName(expansionId: string): string | undefined {
  return expansions.find((e) => e.id === expansionId)?.name
}

export function LocationResultCard({ locations }: Readonly<LocationResultCardProps>) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm min-h-[80px]">
      <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">
        Locations
      </span>
      {locations.length > 0 ? (
        <ul className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-3">
          {locations.map((location) => (
            <li
              key={location.id}
              className="rounded-lg overflow-hidden border border-gray-100 bg-gray-50 flex flex-col"
            >
              <div className="w-full" style={{ aspectRatio: '3 / 2' }}>
                <img
                  src={getLocationImageUrl(location)}
                  alt={location.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-2 flex flex-col gap-1">
                <p className="text-sm font-bold text-gray-900 leading-tight">{location.name}</p>
                {resolveExpansionName(location.expansionId) && (
                  <span className="text-xs bg-red-100 text-red-700 font-medium px-2 py-0.5 rounded-full self-start">
                    {resolveExpansionName(location.expansionId)}
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-300 italic text-sm mt-1">Roll to reveal</p>
      )}
    </div>
  )
}
