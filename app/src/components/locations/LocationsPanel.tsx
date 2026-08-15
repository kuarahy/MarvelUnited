import { useRandomizer, useCollection } from '../../hooks'
import { ExpansionRepository } from '../../repositories'
import { RollButton, CollectionFilterPanel, LocationResultCard } from '../randomizer'

const expansionRepo = new ExpansionRepository()
const allExpansions = expansionRepo.getAll()

export function LocationsPanel() {
  const collection = useCollection(allExpansions.map((e) => e.id))
  const { locations, rollLocations } = useRandomizer(collection.ownedIds)

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
        <h2 className="text-lg font-bold text-gray-700 mb-3">Locations</h2>
        <div className="flex flex-col gap-3">
          <RollButton label="Roll 6 Locations" onClick={rollLocations} />
          <LocationResultCard locations={locations} />
        </div>
      </section>
    </div>
  )
}
