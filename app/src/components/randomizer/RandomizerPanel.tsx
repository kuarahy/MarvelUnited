import { useRandomizer, useCollection } from '../../hooks'
import { ExpansionRepository } from '../../repositories'
import { RollButton } from './RollButton'
import { CharacterResultCard } from './CharacterResultCard'
import { TeamResultCard } from './TeamResultCard'
import { SetResultCard } from './SetResultCard'
import { CollectionFilterPanel } from './CollectionFilterPanel'

const expansionRepo = new ExpansionRepository()
const allExpansions = expansionRepo.getAll()

function resolveExpansionName(expansionId: string): string | undefined {
  return allExpansions.find((e) => e.id === expansionId)?.name
}

export function RandomizerPanel() {
  const collection = useCollection(allExpansions.map((e) => e.id))
  const { hero, villain, team, expansion, rollHero, rollVillain, rollTeam, rollExpansion } =
    useRandomizer(collection.ownedIds)

  return (
    <div className="flex flex-col gap-6">
      <CollectionFilterPanel
        expansions={allExpansions}
        ownedIds={collection.ownedIds}
        onToggle={collection.toggle}
        onSetAll={collection.setAll}
        onClearAll={collection.clearAll}
      />

      <section>
        <h2 className="text-lg font-bold text-gray-700 mb-3">Randomize One Hero or Villain</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="flex flex-col gap-3">
            <RollButton label="Roll Hero" onClick={rollHero} />
            <CharacterResultCard
              label="Hero"
              character={hero}
              expansionName={hero ? resolveExpansionName(hero.expansionId) : undefined}
            />
          </div>
          <div className="flex flex-col gap-3">
            <RollButton label="Roll Villain" onClick={rollVillain} />
            <CharacterResultCard
              label="Villain"
              character={villain}
              expansionName={villain ? resolveExpansionName(villain.expansionId) : undefined}
            />
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-lg font-bold text-gray-700 mb-3">Randomize a Team</h2>
        <div className="flex flex-col gap-3">
          <RollButton label="Roll Team of 4" onClick={rollTeam} />
          <TeamResultCard team={team} />
        </div>
      </section>

      <section>
        <h2 className="text-lg font-bold text-gray-700 mb-3">Set</h2>
        <div className="flex flex-col gap-3">
          <RollButton label="Roll Set" onClick={rollExpansion} />
          <SetResultCard set={expansion} />
        </div>
      </section>
    </div>
  )
}
