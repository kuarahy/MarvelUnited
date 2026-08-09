import type { Scenario } from '../../types'

interface ScenarioCardProps {
  scenario: Scenario | null
}

export function ScenarioCard({ scenario }: ScenarioCardProps) {
  if (!scenario) {
    return (
      <div className="bg-white border border-dashed border-gray-200 rounded-xl p-8 text-center text-gray-300 italic">
        Roll a scenario to set the stage for your session.
      </div>
    )
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex flex-col gap-3">
      <h3 className="text-xl font-black text-red-700">{scenario.title}</h3>
      <p className="text-gray-700 leading-relaxed">{scenario.description}</p>
    </div>
  )
}
