import type { Character } from '../../types'

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
        <ul className="mt-2 grid grid-cols-2 gap-2">
          {team.map((hero) => (
            <li
              key={hero.id}
              className="text-sm font-semibold text-gray-900 bg-gray-50 rounded-lg px-3 py-2 border border-gray-100"
            >
              {hero.name}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-300 italic text-sm mt-1">Roll to reveal</p>
      )}
    </div>
  )
}
