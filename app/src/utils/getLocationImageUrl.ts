import type { Location } from '../types'

export function getLocationImageUrl(location: Location): string {
  return `/images/locations/${encodeURIComponent(location.image)}`
}
