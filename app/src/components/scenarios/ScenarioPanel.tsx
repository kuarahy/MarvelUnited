import { useScenario } from '../../hooks'
import { RollButton } from '../randomizer/RollButton'
import { ScenarioCard } from './ScenarioCard'

export function ScenarioPanel() {
  const { scenario, rollScenario } = useScenario()

  return (
    <div className="flex flex-col gap-6">
      <RollButton label="Roll Random Scenario" onClick={rollScenario} />
      <ScenarioCard scenario={scenario} />
    </div>
  )
}
