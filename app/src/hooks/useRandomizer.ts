import { useState, useCallback } from 'react'
import type { Character, Expansion, Location } from '../types'
import { RandomizerService } from '../services'
import { CharacterRepository, ExpansionRepository, LocationRepository } from '../repositories'
import { heroes } from '../data/heroes'
import { villains } from '../data/villains'

const charRepo = new CharacterRepository()
const expansionRepo = new ExpansionRepository()
const locationRepo = new LocationRepository()
const service = new RandomizerService(charRepo, expansionRepo)
const allExpansions = expansionRepo.getAll()
const allLocations = locationRepo.getAll()

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
 * Direct ownership of a KS pack expansionId → always included.
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
    if (ownedIds.has(c.expansionId)) {
      const exp = allExpansions.find((e) => e.id === c.expansionId)
      // expansionId is already a KS pack — owning it unlocks the character
      if (exp?.parentId) return true
      return !c.ksExclusive
    }
    if (c.alsoIn && (ownedIds.has(c.alsoIn) || ksParents.has(c.alsoIn))) return true
    return false
  })
  return filtered.length > 0 ? filtered : fallback
}

function filterLocationsByOwned(ownedIds: Set<string>): Location[] {
  const ksParents = ownedKsParentIds(ownedIds)
  const filtered = allLocations.filter((l) => ownedIds.has(l.expansionId) || ksParents.has(l.expansionId))
  return filtered.length > 0 ? filtered : allLocations
}

export interface RandomizerState {
  hero: Character | null
  villain: Character | null
  team: Character[]
  expansion: Expansion | null
  locations: Location[]
}

export interface RandomizerActions {
  rollHero: () => void
  rollVillain: () => void
  rollTeam: () => void
  rollExpansion: () => void
  rollLocations: () => void
}

export function useRandomizer(ownedIds?: Set<string>): RandomizerState & RandomizerActions {
  const [hero, setHero] = useState<Character | null>(null)
  const [villain, setVillain] = useState<Character | null>(null)
  const [team, setTeam] = useState<Character[]>([])
  const [expansion, setExpansion] = useState<Expansion | null>(null)
  const [locations, setLocations] = useState<Location[]>([])

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

  const rollLocations = useCallback(() => {
    const pool = ownedIds ? filterLocationsByOwned(ownedIds) : allLocations
    setLocations(service.rollLocations(pool))
  }, [ownedIds])

  return { hero, villain, team, expansion, locations, rollHero, rollVillain, rollTeam, rollExpansion, rollLocations }
}
