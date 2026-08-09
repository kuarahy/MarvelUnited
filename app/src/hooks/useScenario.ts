import { useState, useCallback } from 'react'
import type { Scenario } from '../types'
import { ScenarioService } from '../services'
import { ScenarioRepository } from '../repositories'

const service = new ScenarioService(new ScenarioRepository())

export interface ScenarioState {
  scenario: Scenario | null
}

export interface ScenarioActions {
  rollScenario: () => void
}

export function useScenario(): ScenarioState & ScenarioActions {
  const [scenario, setScenario] = useState<Scenario | null>(null)

  const rollScenario = useCallback(() => setScenario(service.rollScenario()), [])

  return { scenario, rollScenario }
}
