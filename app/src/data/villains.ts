import type { Character } from '../types'

export const villains: Character[] = [
  // ── Marvel United Core Box (Avengers) ───────────────────────────────────
  { id: 'red-skull',           name: 'Red Skull',          role: 'villain', expansionId: 'avengers-core' },
  { id: 'ultron',              name: 'Ultron',             role: 'villain', expansionId: 'avengers-core' },
  { id: 'taskmaster',          name: 'Taskmaster',         role: 'villain', expansionId: 'avengers-core' },

  // ── Spider-Geddon Core Box ───────────────────────────────────────────────
  { id: 'morlun',              name: 'Morlun',             role: 'villain', expansionId: 'spider-geddon' },
  { id: 'spot',                name: 'Spot',               role: 'villain', expansionId: 'spider-geddon' },

  // ── Multiverse Core Box ──────────────────────────────────────────────────
  { id: 'emperor-doom',        name: 'Emperor Doom',       role: 'villain', expansionId: 'multiverse-core' },
  { id: 'immortus',            name: 'Immortus',           role: 'villain', expansionId: 'multiverse-core' },
  { id: 'maestro',             name: 'Maestro',            role: 'villain', expansionId: 'multiverse-core' },

  // ── Enter the Spider-Verse ───────────────────────────────────────────────
  { id: 'green-goblin',        name: 'Green Goblin',       role: 'villain', expansionId: 'spider-verse' },

  // ── Tales of Asgard ──────────────────────────────────────────────────────
  { id: 'loki-v',              name: 'Loki',               role: 'villain', expansionId: 'tales-of-asgard' },
  { id: 'hela',                name: 'Hela',               role: 'villain', expansionId: 'tales-of-asgard' },

  // ── Guardians of the Galaxy ──────────────────────────────────────────────
  { id: 'ronan',               name: 'Ronan',              role: 'villain', expansionId: 'guardians' },

  // ── Season 1 Stretch Goals ───────────────────────────────────────────────
  { id: 'kingpin',             name: 'Kingpin',            role: 'villain', expansionId: 'season-1-stretch-goals' },
  { id: 'bullseye',            name: 'Bullseye',           role: 'villain', expansionId: 'season-1-stretch-goals' },

  // ── X-MEN: The Horsemen of Apocalypse ───────────────────────────────────
  { id: 'famine',              name: 'Famine',             role: 'villain', expansionId: 'horsemen' },
  { id: 'war',                 name: 'War',                role: 'villain', expansionId: 'horsemen' },
  { id: 'death',               name: 'Death',              role: 'villain', expansionId: 'horsemen' },
  { id: 'pestilence',          name: 'Pestilence',         role: 'villain', expansionId: 'horsemen' },

  // ── X-Men Core Box ───────────────────────────────────────────────────────
  { id: 'juggernaut',          name: 'Juggernaut',         role: 'villain', expansionId: 'xmen-core' },
  { id: 'sabretooth',          name: 'Sabretooth',         role: 'villain', expansionId: 'xmen-core' },
  { id: 'mystique-v',          name: 'Mystique',           role: 'villain', expansionId: 'xmen-core' },
  { id: 'magneto-v',           name: 'Magneto',            role: 'villain', expansionId: 'xmen-core' },

  // ── X-Men Blue Team ──────────────────────────────────────────────────────
  { id: 'mister-sinister',     name: 'Mister Sinister',    role: 'villain', expansionId: 'xmen-blue' },
  { id: 'thanos',              name: 'Thanos',             role: 'villain', expansionId: 'infinity-gauntlet' },

  // ── Season 1 Stretch Goals (continued) ───────────────────────────────────
  { id: 'dormammu',            name: 'Dormammu',           role: 'villain', expansionId: 'season-1-stretch-goals' },
  { id: 'modok',               name: 'M.O.D.O.K.',        role: 'villain', expansionId: 'season-1-stretch-goals' },
  { id: 'venom-v',             name: 'Venom',              role: 'villain', expansionId: 'season-1-stretch-goals' },

  // ── Season 2 Stretch Goals (continued) ───────────────────────────────────
  { id: 'callisto',            name: 'Callisto',           role: 'villain', expansionId: 'season-2-stretch-goals' },

  // ── X-Men Gold Team ──────────────────────────────────────────────────────
  { id: 'sebastian-shaw',      name: 'Sebastian Shaw',     role: 'villain', expansionId: 'xmen-gold' },
  { id: 'super-skrull',        name: 'Super-Skrull',       role: 'villain', expansionId: 'xmen-gold' },

  // ── Deadpool ─────────────────────────────────────────────────────────────
  { id: 'deadpool-v',          name: 'Deadpool',           role: 'villain', expansionId: 'deadpool' },
  { id: 'deadpool-challenge',  name: 'Deadpool (Challenge)', role: 'villain', expansionId: 'deadpool' },
  { id: 'bob-v',               name: 'Bob, Agent of Hydra',role: 'villain', expansionId: 'deadpool' },

  // ── Rise of the Black Panther ────────────────────────────────────────────
  { id: 'killmonger',          name: 'Killmonger',         role: 'villain', expansionId: 'black-panther' },

  // ── Phoenix Five ─────────────────────────────────────────────────────────
  { id: 'colossus-v',          name: 'Colossus',           role: 'villain', expansionId: 'phoenix-five' },
  { id: 'cyclops-v',           name: 'Cyclops',            role: 'villain', expansionId: 'phoenix-five' },
  { id: 'magik-v',             name: 'Magik',              role: 'villain', expansionId: 'phoenix-five' },
  { id: 'emma-frost-v',        name: 'Emma Frost',         role: 'villain', expansionId: 'phoenix-five' },
  { id: 'namor-v',             name: 'Namor',              role: 'villain', expansionId: 'phoenix-five' },

  // ── X-Force ──────────────────────────────────────────────────────────────
  { id: 'stryfe',              name: 'Stryfe',             role: 'villain', expansionId: 'x-force' },

  // ── Days of Future Past ──────────────────────────────────────────────────
  { id: 'sentinel-i',          name: 'Sentinel I',         role: 'villain', expansionId: 'dofp' },
  { id: 'sentinel-ii',         name: 'Sentinel II',        role: 'villain', expansionId: 'dofp' },
  { id: 'sentinel-iii',        name: 'Sentinel III',       role: 'villain', expansionId: 'dofp' },
  { id: 'nimrod',              name: 'Nimrod',             role: 'villain', expansionId: 'dofp' },
  { id: 'sentinel-challenge',  name: 'Sentinel',           role: 'villain', expansionId: 'dofp' },

  // ── X-Men: First Class ───────────────────────────────────────────────────
  { id: 'quicksilver-fc',      name: 'Quicksilver (First Class)', role: 'villain', expansionId: 'first-class' },
  { id: 'scarlet-witch-fc',    name: 'Scarlet Witch (First Class)', role: 'villain', expansionId: 'first-class' },

  // ── Fantastic Four ───────────────────────────────────────────────────────
  // Doctor Doom plays as anti-hero/hero above; no additional villain variant

  // ── Maximum Carnage ──────────────────────────────────────────────────────
  { id: 'carnage',             name: 'Carnage',            role: 'villain', expansionId: 'maximum-carnage' },
  { id: 'scream',              name: 'Scream',             role: 'villain', expansionId: 'maximum-carnage' },
  { id: 'shriek',              name: 'Shriek',             role: 'villain', expansionId: 'maximum-carnage' },
  { id: 'scorpion',            name: 'Scorpion',           role: 'villain', expansionId: 'maximum-carnage' },
  { id: 'demogoblin',          name: 'Demogoblin',         role: 'villain', expansionId: 'maximum-carnage' },
  { id: 'doppelganger',        name: 'Doppelganger',       role: 'villain', expansionId: 'maximum-carnage' },

  // ── Witching Hour ────────────────────────────────────────────────────────
  { id: 'scarlet-witch-v',     name: 'Scarlet Witch',      role: 'villain', expansionId: 'witching-hour' },

  // ── Spider-Man's Greatest Foes ───────────────────────────────────────────
  { id: 'doctor-octopus',      name: 'Doctor Octopus',     role: 'villain', expansionId: 'spider-foes' },
  { id: 'electro',             name: 'Electro',            role: 'villain', expansionId: 'spider-foes' },
  { id: 'kraven',              name: 'Kraven',             role: 'villain', expansionId: 'spider-foes' },
  { id: 'mysterio',            name: 'Mysterio',           role: 'villain', expansionId: 'spider-foes' },
  { id: 'rhino',               name: 'Rhino',              role: 'villain', expansionId: 'spider-foes' },
  { id: 'sandman',             name: 'Sandman',            role: 'villain', expansionId: 'spider-foes' },
  { id: 'vulture',             name: 'Vulture',            role: 'villain', expansionId: 'spider-foes' },

  // ── Secret Invasion ──────────────────────────────────────────────────────
  { id: 'queen-veranke',       name: 'Queen Veranke',      role: 'villain', expansionId: 'secret-invasion' },
  { id: 'skrulls',             name: 'Skrulls',            role: 'villain', expansionId: 'secret-invasion' },

  // ── War of Kings ─────────────────────────────────────────────────────────
  { id: 'vulcan',              name: 'Vulcan',             role: 'villain', expansionId: 'war-of-kings' },

  // ── X-Men: The Age of Apocalypse ─────────────────────────────────────────
  { id: 'apocalypse-aoa',      name: 'Apocalypse (Age of Apocalypse)', role: 'villain', expansionId: 'age-of-apocalypse' },
  { id: 'dark-beast',          name: 'Dark Beast',         role: 'villain', expansionId: 'age-of-apocalypse' },
  { id: 'nemesis',             name: 'Nemesis',            role: 'villain', expansionId: 'age-of-apocalypse' },

  // ── Annihilation ─────────────────────────────────────────────────────────
  { id: 'annihilus',           name: 'Annihilus',          role: 'villain', expansionId: 'annihilation' },

  // ── The Coming of Galactus ───────────────────────────────────────────────
  { id: 'air-walker',          name: 'Air-Walker',         role: 'villain', expansionId: 'coming-of-galactus' },
  { id: 'firelord',            name: 'Firelord',           role: 'villain', expansionId: 'coming-of-galactus' },
  { id: 'galactus',            name: 'Galactus',           role: 'villain', expansionId: 'coming-of-galactus' },
  { id: 'terrax',              name: 'Terrax',             role: 'villain', expansionId: 'coming-of-galactus' },

  // ── Season 3 Stretch Goals ───────────────────────────────────────────────
  { id: 'abomination',         name: 'Abomination',        role: 'villain', expansionId: 'season-3-stretch-goals' },
  { id: 'absorbing-man',       name: 'Absorbing Man',      role: 'villain', expansionId: 'season-3-stretch-goals' },
  { id: 'blastaar',            name: 'Blastaar',           role: 'villain', expansionId: 'season-3-stretch-goals' },
  { id: 'bulldozer',           name: 'Bulldozer',          role: 'villain', expansionId: 'season-3-stretch-goals' },
  { id: 'chameleon',           name: 'Chameleon',          role: 'villain', expansionId: 'season-3-stretch-goals' },
  { id: 'crimson-dynamo',      name: 'Crimson Dynamo',     role: 'villain', expansionId: 'season-3-stretch-goals' },
  { id: 'crossbones',          name: 'Crossbones',         role: 'villain', expansionId: 'season-3-stretch-goals' },
  { id: 'enchantress',         name: 'Enchantress',        role: 'villain', expansionId: 'season-3-stretch-goals' },
  { id: 'fin-fang-foom',       name: 'Fin Fang Foom',      role: 'villain', expansionId: 'season-3-stretch-goals' },
  { id: 'gorr',                name: 'Gorr',               role: 'villain', expansionId: 'season-3-stretch-goals' },
  { id: 'high-evolutionary',   name: 'High Evolutionary',  role: 'villain', expansionId: 'season-3-stretch-goals' },
  { id: 'hobgoblin',           name: 'Hobgoblin',          role: 'villain', expansionId: 'season-3-stretch-goals' },
  { id: 'iron-patriot',        name: 'Iron Patriot',       role: 'villain', expansionId: 'season-3-stretch-goals' },
  { id: 'klaw',                name: 'Klaw',               role: 'villain', expansionId: 'season-3-stretch-goals' },
  { id: 'knull',               name: 'Knull',              role: 'villain', expansionId: 'season-3-stretch-goals' },
  { id: 'lizard',              name: 'Lizard',             role: 'villain', expansionId: 'season-3-stretch-goals' },
  { id: 'maximus',             name: 'Maximus',            role: 'villain', expansionId: 'season-3-stretch-goals' },
  { id: 'mole-man',            name: 'Mole Man',           role: 'villain', expansionId: 'season-3-stretch-goals' },
  { id: 'piledriver',          name: 'Piledriver',         role: 'villain', expansionId: 'season-3-stretch-goals' },
  { id: 'purple-man',          name: 'Purple Man',         role: 'villain', expansionId: 'season-3-stretch-goals' },
  { id: 'shocker',             name: 'Shocker',            role: 'villain', expansionId: 'season-3-stretch-goals' },
  { id: 'thunderball',         name: 'Thunderball',        role: 'villain', expansionId: 'season-3-stretch-goals' },
  { id: 'titania',             name: 'Titania',            role: 'villain', expansionId: 'season-3-stretch-goals' },
  { id: 'wrecker',             name: 'Wrecker',            role: 'villain', expansionId: 'season-3-stretch-goals' },

  // ── Avengers (KS Exclusives) ─────────────────────────────────────────────
  { id: 'baron-zemo',          name: 'Baron Zemo',         role: 'villain', expansionId: 'season-1-stretch-goals' },
  { id: 'corvus-glaive',       name: 'Corvus Glaive',      role: 'villain', expansionId: 'season-1-stretch-goals' },
  { id: 'kang',                name: 'Kang',               role: 'villain', expansionId: 'season-1-stretch-goals' },

  // ── The Infinity Gauntlet ─────────────────────────────────────────────────
  { id: 'black-dwarf',         name: 'Black Dwarf',        role: 'villain', expansionId: 'infinity-gauntlet' },
  { id: 'ebony-maw',           name: 'Ebony Maw',          role: 'villain', expansionId: 'infinity-gauntlet' },
  { id: 'proxima-midnight',    name: 'Proxima Midnight',   role: 'villain', expansionId: 'infinity-gauntlet' },

  // ── Season 2 Stretch Goals ────────────────────────────────────────────────────────────────────
  { id: 'avalanche',           name: 'Avalanche',          role: 'villain', expansionId: 'season-2-stretch-goals' },
  { id: 'deathbird',           name: 'Deathbird',          role: 'villain', expansionId: 'season-2-stretch-goals' },
  { id: 'mastermind',          name: 'Mastermind',         role: 'villain', expansionId: 'season-2-stretch-goals' },
  { id: 'lady-deathstrike',    name: 'Lady Deathstrike',   role: 'villain', expansionId: 'season-2-stretch-goals' },
  { id: 'shadow-king',         name: 'Shadow King',        role: 'villain', expansionId: 'season-2-stretch-goals' },
  { id: 'silver-samurai',      name: 'Silver Samurai',     role: 'villain', expansionId: 'season-2-stretch-goals' },
  { id: 'omega-red',           name: 'Omega Red',          role: 'villain', expansionId: 'season-2-stretch-goals' },
  { id: 'arcade',              name: 'Arcade',             role: 'villain', expansionId: 'season-2-stretch-goals' },
  { id: 'sauron',              name: 'Sauron',             role: 'villain', expansionId: 'season-2-stretch-goals' },
  { id: 'pyro',                name: 'Pyro',               role: 'villain', expansionId: 'mutant-promos' },
  { id: 'toad',                name: 'Toad',               role: 'villain', expansionId: 'mutant-promos' },
  { id: 'blob',                name: 'Blob',               role: 'villain', expansionId: 'mutant-promos' },
  { id: 'mojo',                name: 'Mojo',               role: 'villain', expansionId: 'season-2-stretch-goals' },
  { id: 'brood-queen',         name: 'Brood Queen',        role: 'villain', expansionId: 'season-2-stretch-goals' },
  { id: 'onslaught',           name: 'Onslaught',          role: 'villain', expansionId: 'season-2-stretch-goals' },
  { id: 'dark-phoenix',        name: 'Dark Phoenix',       role: 'villain', expansionId: 'season-2-stretch-goals' },
  { id: 'legion-v',            name: 'Legion',             role: 'villain', expansionId: 'season-2-stretch-goals' },
  { id: 'emma-frost-promo',    name: 'Emma Frost',         role: 'villain', expansionId: 'season-2-stretch-goals' },
  { id: 'marrow-v',            name: 'Marrow',             role: 'villain', expansionId: 'season-2-stretch-goals' },
  { id: 'spiral-v',            name: 'Spiral',             role: 'villain', expansionId: 'season-2-stretch-goals' },
  { id: 'namor-promo',         name: 'Namor',              role: 'villain', expansionId: 'season-2-stretch-goals' },
]
