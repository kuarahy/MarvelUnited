import type { Character } from '../../types'
import { getCharacterImageUrl } from '../../utils'

interface TeamResultCardProps {
  team: Character[]
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
              className="rounded-lg overflow-hidden border border-gray-100 bg-gray-50"
            >
              <div className="w-full" style={{ aspectRatio: '2 / 3' }}>
                <img
                  src={getCharacterImageUrl(hero)}
                  alt={hero.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-sm font-semibold text-gray-900 px-2 py-1.5 leading-tight">
                {hero.name}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-300 italic text-sm mt-1">Roll to reveal</p>
      )}
    </div>
  )
}
