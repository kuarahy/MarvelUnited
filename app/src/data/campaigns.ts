import type { Campaign } from '../types'
import xmenContent from './campaigns/xmen.md?raw'
import avengersContent from './campaigns/avengers.md?raw'

export const campaigns: Campaign[] = [
  {
    id: 'xmen',
    title: 'X-Men: Children of the Atom',
    content: xmenContent,
  },
  {
    id: 'avengers',
    title: "Earth's Mightiest: Shadows Over New York",
    content: avengersContent,
  },
]
