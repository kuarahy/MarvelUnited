import { useRandomizer } from '../../hooks'
import { RollButton } from './RollButton'
import { ResultCard } from './ResultCard'
import { TeamResultCard } from './TeamResultCard'

export function RandomizerPanel() {
  const { hero, villain, team, expansion, rollHero, rollVillain, rollTeam, rollExpansion } =
    useRandomizer()

  return (
    <div className="flex flex-col gap-6">
      <section>
        <h2 className="text-lg font-bold text-gray-700 mb-3">Characters</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="flex flex-col gap-3">
            <RollButton label="Roll Hero" onClick={rollHero} />
            <ResultCard label="Hero" value={hero?.name ?? null} />
          </div>
          <div className="flex flex-col gap-3">
            <RollButton label="Roll Villain" onClick={rollVillain} />
            <ResultCard label="Villain" value={villain?.name ?? null} />
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-lg font-bold text-gray-700 mb-3">Team</h2>
        <div className="flex flex-col gap-3">
          <RollButton label="Roll Team of 4" onClick={rollTeam} />
          <TeamResultCard team={team} />
        </div>
      </section>

      <section>
        <h2 className="text-lg font-bold text-gray-700 mb-3">Expansion</h2>
        <div className="flex flex-col gap-3">
          <RollButton label="Roll Expansion" onClick={rollExpansion} />
          <ResultCard label="Expansion" value={expansion?.name ?? null} />
        </div>
      </section>
    </div>
  )
}
