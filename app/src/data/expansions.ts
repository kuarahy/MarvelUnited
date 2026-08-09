import type { Expansion } from '../types'

export const expansions: Expansion[] = [
  // Core Boxes
  { id: 'avengers-core',   name: 'Avengers Core Box',              type: 'core' },
  { id: 'xmen-core',       name: 'X-Men Core Box',                 type: 'core' },
  { id: 'spider-geddon',   name: 'Spider-Geddon',                  type: 'core' },
  { id: 'multiverse-core', name: 'Multiverse Core Box',            type: 'core' },
  // Expansion Packs
  { id: 'spider-verse',    name: 'Enter the Spider-Verse',         type: 'expansion' },
  { id: 'horsemen',        name: 'X-MEN: The Horsemen of Apocalypse', type: 'expansion' },
  { id: 'xmen-blue',       name: 'X-MEN Blue Team',                type: 'expansion' },
  { id: 'deadpool',        name: 'Deadpool',                       type: 'expansion' },
  { id: 'black-panther',   name: 'Rise of the Black Panther',      type: 'expansion' },
  { id: 'phoenix-five',    name: 'Phoenix Five',                   type: 'expansion' },
  { id: 'x-force',         name: 'X-Force',                        type: 'expansion' },
  { id: 'dofp',            name: 'Days of Future Past',            type: 'expansion' },
  // Promos
  { id: 'mutant-promos',   name: 'X-MEN Mutant Promos',            type: 'promo' },
]
