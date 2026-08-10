import { useState, useCallback, useEffect } from 'react'

const STORAGE_KEY = 'mu-randomizer:owned-expansions'

export interface CollectionState {
  ownedIds: Set<string>
  toggle: (id: string) => void
  setAll: (ids: string[]) => void
  clearAll: () => void
  isOwned: (id: string) => boolean
}

function loadFromStorage(allIds: string[]): Set<string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw === null) return new Set(allIds)
    const parsed = JSON.parse(raw)
    if (Array.isArray(parsed)) return new Set(parsed as string[])
  } catch {
    // corrupted entry — reset to full collection
  }
  return new Set(allIds)
}

export function useCollection(allIds: string[]): CollectionState {
  const [ownedIds, setOwnedIds] = useState<Set<string>>(() => loadFromStorage(allIds))

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...ownedIds]))
  }, [ownedIds])

  const toggle = useCallback((id: string) => {
    setOwnedIds((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }, [])

  const setAll = useCallback((ids: string[]) => {
    setOwnedIds(new Set(ids))
  }, [])

  const clearAll = useCallback(() => {
    setOwnedIds(new Set())
  }, [])

  const isOwned = useCallback((id: string) => ownedIds.has(id), [ownedIds])

  return { ownedIds, toggle, setAll, clearAll, isOwned }
}
