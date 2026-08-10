import { useState, useCallback } from 'react'
import type { Character, Expansion } from '../types'
import { RandomizerService } from '../services'
import { CharacterRepository, ExpansionRepository } from '../repositories'
import { heroes } from '../data/heroes'
import { villains } from '../data/villains'

const charRepo = new CharacterRepository()
const expansionRepo = new ExpansionRepository()
const service = new RandomizerService(charRepo, expansionRepo)

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

function filterByOwned<T extends { expansionId: string }>(
  pool: T[],
  ownedIds: Set<string>,
  fallback: T[],
): T[] {
  const filtered = pool.filter((c) => ownedIds.has(c.expansionId))
  return filtered.length > 0 ? filtered : fallback
}

export function useRandomizer(ownedIds?: Set<string>): RandomizerState & RandomizerActions {
  const [hero, setHero] = useState<Character | null>(null)
  const [villain, setVillain] = useState<Character | null>(null)
  const [team, setTeam] = useState<Character[]>([])
  const [expansion, setExpansion] = useState<Expansion | null>(null)

  const rollHero = useCallback(() => {
    const pool = ownedIds ? filterByOwned(heroes, ownedIds, heroes) : undefined
    setHero(service.rollHero(pool))
  }, [ownedIds])

  const rollVillain = useCallback(() => {
    const pool = ownedIds ? filterByOwned(villains, ownedIds, villains) : undefined
    setVillain(service.rollVillain(pool))
  }, [ownedIds])

  const rollTeam = useCallback(() => {
    const pool = ownedIds ? filterByOwned(heroes, ownedIds, heroes) : undefined
    setTeam(service.rollTeam(pool))
  }, [ownedIds])

  const rollExpansion = useCallback(() => {
    const allExpansions = expansionRepo.getAll()
    const pool = ownedIds
      ? allExpansions.filter((e) => ownedIds.has(e.id))
      : undefined
    const resolvedPool = pool && pool.length > 0 ? pool : allExpansions
    setExpansion(service.rollExpansion(resolvedPool))
  }, [ownedIds])

  return { hero, villain, team, expansion, rollHero, rollVillain, rollTeam, rollExpansion }
}
