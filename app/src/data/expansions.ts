import type { Expansion } from '../types'

export const expansions: Expansion[] = [
  // ── Core Boxes ───────────────────────────────────────────────────────────
  { id: 'avengers-core',   name: 'Marvel United Core Box',               type: 'core' },
  { id: 'multiverse-core', name: 'Multiverse Core Box',                  type: 'core' },
  { id: 'spider-geddon',   name: 'Spider-Geddon',                        type: 'core' },
  { id: 'xmen-core',       name: 'X-Men Core Box',                       type: 'core' },

  // ── Expansions (retail only, A–Z) ────────────────────────────────────────
  { id: 'annihilation',        name: 'Annihilation',                     type: 'expansion' },
  { id: 'civil-war',           name: 'Civil War',                        type: 'expansion' },
  { id: 'dofp',                name: 'Days of Future Past',              type: 'promo' },
  { id: 'deadpool',            name: 'Deadpool',                         type: 'expansion' },
  { id: 'spider-verse',        name: 'Enter the Spider-Verse',           type: 'expansion' },
  { id: 'fantastic-four',      name: 'Fantastic Four',                   type: 'promo' },
  { id: 'guardians',           name: 'Guardians of the Galaxy',          type: 'expansion' },
  { id: 'maximum-carnage',     name: 'Maximum Carnage',                  type: 'expansion' },
  { id: 'pet-companions',      name: 'Pet Companions',                   type: 'promo' },
  { id: 'phoenix-five',        name: 'Phoenix Five',                     type: 'promo' },
  { id: 'black-panther',       name: 'Rise of the Black Panther',        type: 'expansion' },
  { id: 'season-1-stretch-goals', name: 'Season 1 Stretch Goals',          type: 'promo' },
  { id: 'season-2-stretch-goals', name: 'Season 2 Stretch Goals',          type: 'promo' },
  { id: 'secret-invasion',     name: 'Secret Invasion',                  type: 'expansion' },
  { id: 'tales-of-asgard',     name: 'Tales of Asgard',                  type: 'expansion' },
  { id: 'coming-of-galactus',  name: 'The Coming of Galactus',           type: 'expansion' },
  { id: 'war-of-kings',        name: 'War of Kings',                     type: 'expansion' },
  { id: 'witching-hour',       name: 'Witching Hour',                    type: 'expansion' },
  { id: 'world-war-hulk',      name: 'World War Hulk',                   type: 'expansion' },
  { id: 'x-force',             name: 'X-Force',                          type: 'promo' },
  { id: 'xmen-blue',           name: 'X-Men: Blue Team',                 type: 'expansion' },
  { id: 'first-class',         name: 'X-Men: First Class',               type: 'promo' },
  { id: 'xmen-gold',           name: 'X-Men: Gold Team',                 type: 'expansion' },
  { id: 'age-of-apocalypse',   name: 'X-Men: The Age of Apocalypse',     type: 'expansion' },
  { id: 'horsemen',            name: 'X-Men: The Horsemen of Apocalypse',type: 'promo' },


  // ── KS Exclusive Packs ───────────────────────────────────────────────────
  { id: 'spider-verse-ks',       name: 'Enter the Spider-Verse (KS)',      type: 'promo' },
  { id: 'tales-of-asgard-ks',    name: 'Tales of Asgard (KS)',             type: 'promo' },
  { id: 'infinity-gauntlet',     name: 'The Infinity Gauntlet',           type: 'promo' },
  { id: 'spider-foes',          name: 'Return of the Sinister Six',      type: 'promo' },
  { id: 'season-3-stretch-goals', name: 'Season 3 Stretch Goals',        type: 'promo' },
  // Remaining X-Men mutant promos (will redistribute over time)
  { id: 'mutant-promos',        name: 'X-Men: Mutant Promos',            type: 'promo' },
]
