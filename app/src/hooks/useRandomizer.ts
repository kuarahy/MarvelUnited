import { useState, useCallback } from 'react'
import type { Character, Expansion } from '../types'
import { RandomizerService } from '../services'
import { CharacterRepository, ExpansionRepository } from '../repositories'

const service = new RandomizerService(
  new CharacterRepository(),
  new ExpansionRepository(),
)

export interface RandomizerState {
  hero: Character | null
  villain: Character | null
  team: Character[]
  expansion: Expansion | null
}

export interface RandomizerActions {
  rollHero: () => void
  rollVillain: () => void
  rollTeam: () => void
  rollExpansion: () => void
}

export function useRandomizer(): RandomizerState & RandomizerActions {
  const [hero, setHero] = useState<Character | null>(null)
  const [villain, setVillain] = useState<Character | null>(null)
  const [team, setTeam] = useState<Character[]>([])
  const [expansion, setExpansion] = useState<Expansion | null>(null)

  const rollHero = useCallback(() => setHero(service.rollHero()), [])
  const rollVillain = useCallback(() => setVillain(service.rollVillain()), [])
  const rollTeam = useCallback(() => setTeam(service.rollTeam()), [])
  const rollExpansion = useCallback(() => setExpansion(service.rollExpansion()), [])

  return { hero, villain, team, expansion, rollHero, rollVillain, rollTeam, rollExpansion }
}
