import type { Character } from '../../types'
import { expansions } from '../../data'
import { getCharacterImageUrl } from '../../utils'

interface TeamResultCardProps {
  team: Character[]
}

function resolveExpansionName(expansionId: string): string | undefined {
  return expansions.find((e) => e.id === expansionId)?.name
}

export function TeamResultCard({ team }: TeamResultCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm min-h-[80px]">
      <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">
        Hero Team
      </span>
      {team.length > 0 ? (
        <ul className="mt-2 grid grid-cols-2 gap-3">
          {team.map((hero) => (
            <li
              key={hero.id}
              className="rounded-lg overflow-hidden border border-gray-100 bg-gray-50 flex items-stretch"
            >
              <div className="w-1/4 shrink-0" style={{ aspectRatio: '2 / 3' }}>
                <img
                  src={getCharacterImageUrl(hero)}
                  alt={hero.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-2 flex flex-col gap-1 justify-center">
                <p className="text-lg font-bold text-gray-900 leading-tight">
                  {hero.name}
                </p>
                {resolveExpansionName(hero.expansionId) && (
                  <span className="text-xs bg-red-100 text-red-700 font-medium px-2 py-0.5 rounded-full self-start">
                    {resolveExpansionName(hero.expansionId)}
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
