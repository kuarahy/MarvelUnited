import { useRandomizer, useCollection } from '../../hooks'
import { ExpansionRepository, LocationRepository } from '../../repositories'
import { RollButton, CollectionFilterPanel, LocationResultCard } from '../randomizer'

const expansionRepo = new ExpansionRepository()
const locationRepo = new LocationRepository()
const locationExpansionIds = new Set(locationRepo.getAll().map((l) => l.expansionId))
const locationExpansions = expansionRepo.getAll().filter((e) => locationExpansionIds.has(e.id))

export function LocationsPanel() {
  const collection = useCollection(locationExpansions.map((e) => e.id), 'mu-randomizer:locations-owned-expansions')
  const { locations, rollLocations } = useRandomizer(collection.ownedIds)

  return (
    <div className="flex flex-col gap-6">
      <CollectionFilterPanel
        expansions={locationExpansions}
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
