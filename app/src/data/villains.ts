import type { Character } from '../types'

export const villains: Character[] = [
  // ── Marvel United Core Box (Avengers) ───────────────────────────────────
  { id: 'red-skull',           name: 'Red Skull',          role: 'villain', expansionId: 'avengers-core' },
  { id: 'ultron',              name: 'Ultron',             role: 'villain', expansionId: 'avengers-core' },
  { id: 'taskmaster',          name: 'Taskmaster',         role: 'villain', expansionId: 'avengers-core' },

  // ── Spider-Geddon Core Box ───────────────────────────────────────────────
  { id: 'morlun',              name: 'Morlun',             role: 'villain', expansionId: 'spider-geddon' },
  { id: 'spot',                name: 'Spot',               role: 'villain', expansionId: 'spider-geddon' },
  { id: 'anti-venom',        name: 'Anti-Venom',         role: 'villain', expansionId: 'spider-geddon' },
  { id: 'superior-spider-man', name: 'Superior Spider-Man', role: 'villain', expansionId: 'spider-geddon' },

  // ── Multiverse Core Box ──────────────────────────────────────────────────
  { id: 'emperor-doom',        name: 'Emperor Doom',       role: 'villain', expansionId: 'multiverse-core' },
  { id: 'immortus',            name: 'Immortus',           role: 'villain', expansionId: 'multiverse-core' },
  { id: 'maestro',             name: 'Maestro',            role: 'villain', expansionId: 'multiverse-core' },
<<<<<<< HEAD
  { id: 'cosmic-ghost-rider-blaze', name: 'Cosmic Ghost Rider (Johnny Blaze)', role: 'villain', expansionId: 'multiverse-core' },
=======
  { id: 'cosmic-ghost-rider-v',name: 'Cosmic Ghost Rider', role: 'villain', expansionId: 'multiverse-core' },
>>>>>>> b05a4c2cfc12b6c04094975ff2f9540b9cc98268

  // ── Enter the Spider-Verse ───────────────────────────────────────────────
  { id: 'green-goblin',        name: 'Green Goblin',       role: 'villain', expansionId: 'spider-verse' },

  // ── Tales of Asgard ──────────────────────────────────────────────────────
  { id: 'loki-v',              name: 'Loki',               role: 'villain', expansionId: 'tales-of-asgard' },

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
  { id: 'apocalypse-v',        name: 'Apocalypse',         role: 'villain', expansionId: 'horsemen' },

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
  { id: 'scarlet-witch-quicksilver', name: 'Scarlet Witch & Quicksilver', role: 'villain', expansionId: 'first-class' },

  // ── Fantastic Four ───────────────────────────────────────────────────────
  { id: 'super-skrull',        name: 'Super-Skrull',       role: 'villain', expansionId: 'fantastic-four', ksExclusive: true },
  { id: 'doctor-doom-v',       name: 'Doctor Doom',        role: 'villain', expansionId: 'fantastic-four' },

  // ── Maximum Carnage ──────────────────────────────────────────────────────
  { id: 'scream',              name: 'Scream',             role: 'villain', expansionId: 'maximum-carnage' },
  { id: 'shriek',              name: 'Shriek',             role: 'villain', expansionId: 'maximum-carnage' },
  { id: 'scorpion',            name: 'Scorpion',           role: 'villain', expansionId: 'maximum-carnage' },
  { id: 'demogoblin-doppelganger', name: 'Demogoblin & Doppelganger', role: 'villain', expansionId: 'maximum-carnage' },
  { id: 'morbius-v',           name: 'Morbius',            role: 'villain', expansionId: 'maximum-carnage' },

  // ── World War Hulk ───────────────────────────────────────────────────────
  { id: 'world-breaker-hulk',  name: 'World Breaker Hulk', role: 'villain', expansionId: 'world-war-hulk' },
  { id: 'the-void',            name: 'The Void',           role: 'villain', expansionId: 'world-war-hulk' },
  { id: 'ares-v',              name: 'Ares',               role: 'villain', expansionId: 'world-war-hulk' },
  { id: 'gladiator-hulk-v',    name: 'Gladiator Hulk',     role: 'villain', expansionId: 'world-war-hulk' },
  { id: 'sentry-v',            name: 'Sentry',             role: 'villain', expansionId: 'world-war-hulk' },

  // ── Witching Hour ────────────────────────────────────────────────────────
  { id: 'scarlet-witch-v',     name: 'Scarlet Witch',      role: 'villain', expansionId: 'witching-hour' },
  { id: 'agatha-harkness-v',   name: 'Agatha Harkness',    role: 'villain', expansionId: 'witching-hour' },
  { id: 'grey-hulk-v',         name: 'Grey-Hulk',          role: 'villain', expansionId: 'witching-hour' },
  { id: 'juggernaut-hero-v',   name: 'Juggernaut',         role: 'villain', expansionId: 'witching-hour' },
  { id: 'mister-sinister-hero-v', name: 'Mister Sinister', role: 'villain', expansionId: 'witching-hour' },

  // ── Spider-Man's Greatest Foes ───────────────────────────────────────────
  { id: 'doctor-octopus',      name: 'Doctor Octopus',     role: 'villain', expansionId: 'spider-foes' },
  { id: 'electro',             name: 'Electro',            role: 'villain', expansionId: 'spider-foes' },
  { id: 'kraven',              name: 'Kraven',             role: 'villain', expansionId: 'spider-foes' },
  { id: 'mysterio',            name: 'Mysterio',           role: 'villain', expansionId: 'spider-foes' },
  { id: 'sandman',             name: 'Sandman',            role: 'villain', expansionId: 'spider-foes' },
  { id: 'vulture',             name: 'Vulture',            role: 'villain', expansionId: 'spider-foes' },

  // ── Secret Invasion ──────────────────────────────────────────────────────
  { id: 'queen-veranke',       name: 'Queen Veranke',      role: 'villain', expansionId: 'secret-invasion' },
  { id: 'skrulls',             name: 'Skrulls',            role: 'villain', expansionId: 'secret-invasion' },

  // ── War of Kings ─────────────────────────────────────────────────────────
  { id: 'vulcan',              name: 'Vulcan',             role: 'villain', expansionId: 'war-of-kings' },
  { id: 'gladiator-v',         name: 'Gladiator',          role: 'villain', expansionId: 'war-of-kings' },

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
  { id: 'nova-frankie-raye-v', name: 'Nova (Frankie Raye)', role: 'villain', expansionId: 'coming-of-galactus' },

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
  { id: 'daken-v',             name: 'Daken',              role: 'villain', expansionId: 'season-3-stretch-goals' },
  { id: 'darkchild-v',         name: 'Darkchild',          role: 'villain', expansionId: 'season-3-stretch-goals' },
  { id: 'moonstone-v',         name: 'Moonstone',          role: 'villain', expansionId: 'season-3-stretch-goals' },
  { id: 'us-agent-v',          name: 'U.S. Agent',         role: 'villain', expansionId: 'season-3-stretch-goals' },
  { id: 'white-widow-v',       name: 'White Widow',        role: 'villain', expansionId: 'season-3-stretch-goals' },
  { id: 'red-hulk-v',          name: 'Red Hulk',           role: 'villain', expansionId: 'season-3-stretch-goals' },
  { id: 'darkstar-v',          name: 'Darkstar',           role: 'villain', expansionId: 'season-3-stretch-goals' },
  { id: 'ursa-major-v',        name: 'Ursa Major',         role: 'villain', expansionId: 'season-3-stretch-goals' },
  { id: 'red-guardian-v',      name: 'Red Guardian',       role: 'villain', expansionId: 'season-3-stretch-goals' },

  // ── Avengers (KS Exclusives) ─────────────────────────────────────────────
  { id: 'baron-zemo',          name: 'Baron Zemo',         role: 'villain', expansionId: 'season-1-stretch-goals' },
  { id: 'corvus-glaive',       name: 'Corvus Glaive',      role: 'villain', expansionId: 'season-1-stretch-goals' },
  { id: 'kang',                name: 'Kang',               role: 'villain', expansionId: 'season-1-stretch-goals' },
  { id: 'hela',                name: 'Hela',               role: 'villain', expansionId: 'season-1-stretch-goals' },
  { id: 'carnage',             name: 'Carnage',            role: 'villain', expansionId: 'season-1-stretch-goals' },
  { id: 'rhino',               name: 'Rhino',              role: 'villain', expansionId: 'season-1-stretch-goals' },

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
  { id: 'pyro',                name: 'Pyro',               role: 'villain', expansionId: 'xmen-core-ks', alsoIn: 'season-2-stretch-goals' },
  { id: 'toad',                name: 'Toad',               role: 'villain', expansionId: 'xmen-core-ks', alsoIn: 'season-2-stretch-goals' },
  { id: 'blob',                name: 'Blob',               role: 'villain', expansionId: 'xmen-core-ks', alsoIn: 'season-2-stretch-goals' },
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
