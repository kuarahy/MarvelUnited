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

/** Expands owned IDs to include parent expansions for KS variants. */
function resolveOwnedIds(ownedIds: Set<string>): Set<string> {
  const resolved = new Set(ownedIds)
  for (const id of ownedIds) {
    const parentId = allExpansions.find((e) => e.id === id)?.parentId
    if (parentId) resolved.add(parentId)
  }
  return resolved
}

function filterByOwned<T extends { expansionId: string }>(
  pool: T[],
  ownedIds: Set<string>,
  fallback: T[],
): T[] {
  const filtered = pool.filter((c) => ownedIds.has(c.expansionId))
  return filtered.length > 0 ? filtered : fallback
}
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

  const resolvedIds = ownedIds ? resolveOwnedIds(ownedIds) : undefined

  const rollHero = useCallback(() => {
    const pool = resolvedIds ? filterByOwned(heroes, resolvedIds, heroes) : undefined
    setHero(service.rollHero(pool))
  }, [resolvedIds])

  const rollVillain = useCallback(() => {
    const pool = resolvedIds ? filterByOwned(villains, resolvedIds, villains) : undefined
    setVillain(service.rollVillain(pool))
  }, [resolvedIds])

  const rollTeam = useCallback(() => {
    const pool = resolvedIds ? filterByOwned(heroes, resolvedIds, heroes) : undefined
    setTeam(service.rollTeam(pool))
  }, [resolvedIds])

  const rollExpansion = useCallback(() => {
    const allExp = expansionRepo.getAll()
    const pool = ownedIds ? allExp.filter((e) => ownedIds.has(e.id)) : undefined
    const resolvedPool = pool && pool.length > 0 ? pool : allExp
    setExpansion(service.rollExpansion(resolvedPool))
  }, [ownedIds])

  return { hero, villain, team, expansion, rollHero, rollVillain, rollTeam, rollExpansion }
}
