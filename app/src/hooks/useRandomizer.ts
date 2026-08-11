import { useState, useCallback } from 'react'
import type { Character, Expansion } from '../types'
import { RandomizerService } from '../services'
import { CharacterRepository, ExpansionRepository } from '../repositories'
import { heroes } from '../data/heroes'
import { villains } from '../data/villains'

const charRepo = new CharacterRepository()
const expansionRepo = new ExpansionRepository()
const service = new RandomizerService(charRepo, expansionRepo)
const allExpansions = expansionRepo.getAll()

/** Parent expansion IDs for which the user owns the KS variant. */
function ownedKsParentIds(ownedIds: Set<string>): Set<string> {
  const parents = new Set<string>()
  for (const id of ownedIds) {
    const parentId = allExpansions.find((e) => e.id === id)?.parentId
    if (parentId) parents.add(parentId)
  }
  return parents
}

/**
 * Retail ownership → characters in that box except ksExclusive.
 * KS ownership (parentId link) → full retail roster plus KS exclusives.
 * alsoIn → unlocked when that alternate expansion (or its KS variant) is owned.
 */
function filterByOwned<T extends { expansionId: string; ksExclusive?: boolean; alsoIn?: string }>(
  pool: T[],
  ownedIds: Set<string>,
  fallback: T[],
): T[] {
  const ksParents = ownedKsParentIds(ownedIds)
  const filtered = pool.filter((c) => {
    if (ksParents.has(c.expansionId)) return true
    if (ownedIds.has(c.expansionId)) return !c.ksExclusive
    if (c.alsoIn && (ownedIds.has(c.alsoIn) || ksParents.has(c.alsoIn))) return true
    return false
  })
  return filtered.length > 0 ? filtered : fallback
}

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
    const allExp = expansionRepo.getAll()
    const pool = ownedIds ? allExp.filter((e) => ownedIds.has(e.id)) : undefined
    const resolvedPool = pool && pool.length > 0 ? pool : allExp
    setExpansion(service.rollExpansion(resolvedPool))
  }, [ownedIds])

  return { hero, villain, team, expansion, rollHero, rollVillain, rollTeam, rollExpansion }
}
