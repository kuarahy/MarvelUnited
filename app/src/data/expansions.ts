import type { Expansion } from '../types'

export const expansions: Expansion[] = [
  // ── Core Boxes ───────────────────────────────────────────────────────────
  { id: 'avengers-core',   name: 'Marvel United Core Box',               type: 'core' },
  { id: 'multiverse-core', name: 'Multiverse Core Box',                  type: 'core' },
  { id: 'spider-geddon',   name: 'Spider-Geddon',                        type: 'core' },
  { id: 'xmen-core',       name: 'X-Men Core Box',                       type: 'core' },

  // ── Retail Expansions ────────────────────────────────────────────────────
  { id: 'civil-war',       name: 'Civil War',                            type: 'expansion' },
  { id: 'dofp',            name: 'Days of Future Past',                  type: 'expansion' },
  { id: 'deadpool',        name: 'Deadpool',                             type: 'expansion' },
  { id: 'spider-verse',    name: 'Enter the Spider-Verse',               type: 'expansion' },
  { id: 'fantastic-four',  name: 'Fantastic Four',                       type: 'expansion' },
  { id: 'guardians',       name: 'Guardians of the Galaxy',              type: 'expansion' },
  { id: 'maximum-carnage', name: 'Maximum Carnage',                      type: 'expansion' },
  { id: 'pet-companions',  name: 'Pet Companions',                       type: 'expansion' },
  { id: 'phoenix-five',    name: 'Phoenix Five',                         type: 'expansion' },
  { id: 'black-panther',   name: 'Rise of the Black Panther',            type: 'expansion' },
  { id: 'tales-of-asgard', name: 'Tales of Asgard',                      type: 'expansion' },
  { id: 'witching-hour',   name: 'Witching Hour',                        type: 'expansion' },
  { id: 'world-war-hulk',  name: 'World War Hulk',                       type: 'expansion' },
  { id: 'x-force',         name: 'X-Force',                              type: 'expansion' },
  { id: 'first-class',     name: 'X-Men: First Class',                   type: 'expansion' },
  { id: 'xmen-blue',       name: 'X-MEN Blue Team',                      type: 'expansion' },
  { id: 'xmen-gold',       name: 'X-MEN Gold Team',                      type: 'expansion' },
  { id: 'horsemen',        name: 'X-MEN: The Horsemen of Apocalypse',    type: 'expansion' },

  // ── Multiverse KS Exclusives ─────────────────────────────────────────────
  { id: 'annihilation',        name: 'Annihilation',                     type: 'expansion' },
  { id: 'secret-invasion',     name: 'Secret Invasion',                  type: 'expansion' },
  { id: 'coming-of-galactus',  name: 'The Coming of Galactus',           type: 'expansion' },
  { id: 'war-of-kings',        name: 'War of Kings',                     type: 'expansion' },
  { id: 'age-of-apocalypse',   name: 'X-Men: The Age of Apocalypse',     type: 'expansion' },

  // ── KS Exclusive Packs ───────────────────────────────────────────────────
  { id: 'avengers-ks',          name: 'Avengers (KS Exclusives)',        type: 'promo' },
  { id: 'spider-foes',          name: 'Return of the Sinister Six',      type: 'promo' },
  // Remaining X-Men mutant promos (will redistribute over time)
  { id: 'season-3-stretch-goals', name: 'Season 3 Stretch Goals',        type: 'promo' },
  { id: 'mutant-promos',        name: 'X-MEN Mutant Promos',             type: 'promo' },
]
