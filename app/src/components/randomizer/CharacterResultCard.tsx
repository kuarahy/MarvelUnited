import type { Character } from '../../types'
import { getCharacterImageUrl } from '../../utils'

interface CharacterResultCardProps {
  label: string
  character: Character | null
  expansionName?: string
}

export function CharacterResultCard({ label, character, expansionName }: CharacterResultCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
      {character ? (
        <>
          <div className="w-full" style={{ aspectRatio: '2 / 3' }}>
            <img
              src={getCharacterImageUrl(character)}
              alt={character.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-3 flex flex-col gap-1">
            <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">
              {label}
            </span>
            <span className="text-lg font-bold text-gray-900 leading-tight">
              {character.name}
            </span>
            {expansionName && (
              <span className="text-xs bg-red-100 text-red-700 font-medium px-2 py-0.5 rounded-full self-start">
                {expansionName}
              </span>
            )}
          </div>
        </>
      ) : (
        <div className="p-4 min-h-[80px] flex flex-col gap-1 justify-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">
            {label}
          </span>
          <span className="text-gray-300 italic text-sm">Roll to reveal</span>
        </div>
      )}
    </div>
  )
}
