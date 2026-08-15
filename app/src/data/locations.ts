import type { Location } from '../types'

export const locations: Location[] = [
  // ── Enter the Spider-Verse ───────────────────────────────────────────────
  { id: 'brooklyn-bridge',     name: 'Brooklyn Bridge',     expansionId: 'spider-verse', image: 'Location Enter the Spider-Verse 1.jpg' },
  { id: 'daily-bugle',         name: 'Daily Bugle',         expansionId: 'spider-verse', image: 'Location Enter the Spider-Verse 2.jpg' },
  { id: 'midtown-high-school', name: 'Midtown High School', expansionId: 'spider-verse', image: 'Location Enter the Spider-Verse 3.jpg' },
  { id: 'osborn-laboratories', name: 'Osborn Laboratories', expansionId: 'spider-verse', image: 'Location Enter the Spider-Verse 4.jpg' },
  { id: 'oscorp-tower',        name: 'Oscorp Tower',        expansionId: 'spider-verse', image: 'Location Enter the Spider-Verse 5.jpg' },
  { id: 'queens',              name: 'Queens',              expansionId: 'spider-verse', image: 'Location Enter the Spider-Verse 6.jpg' },

  // ── Tales of Asgard ──────────────────────────────────────────────────────
  { id: 'asgardian-palace',      name: "Asgardian Palace",       expansionId: 'tales-of-asgard', image: 'Location Asgard 1.jpg' },
  { id: 'bifrost-bridge',        name: 'Bifrost Bridge',         expansionId: 'tales-of-asgard', image: 'Location Asgard 2.jpg' },
  { id: 'heimdalls-observatory', name: "Heimdall's Observatory",  expansionId: 'tales-of-asgard', image: 'Location Asgard 3.jpg' },
  { id: 'odins-vault',           name: "Odin's Vault",           expansionId: 'tales-of-asgard', image: 'Location Asgard 4.jpg' },
  { id: 'throne-room',           name: 'Throne Room',            expansionId: 'tales-of-asgard', image: 'Location Asgard 5.jpg' },
  { id: 'valhalla',              name: 'Valhalla',               expansionId: 'tales-of-asgard', image: 'Location Asgard 6.jpg' },

  // ── Guardians of the Galaxy ──────────────────────────────────────────────
  { id: 'collectors-museum', name: "Collector's Museum", expansionId: 'guardians', image: 'Location Guardians 1.jpg' },
  { id: 'kyln',              name: 'Kyln',               expansionId: 'guardians', image: 'Location Guardians 2.jpg' },
  { id: 'knowhere',          name: 'Knowhere',           expansionId: 'guardians', image: 'Location Guardians 3.jpg' },
  { id: 'the-milano',        name: 'The Milano',         expansionId: 'guardians', image: 'Location Guardians 4.jpg' },
  { id: 'morag',             name: 'Morag',              expansionId: 'guardians', image: 'Location Guardians 5.jpg' },
  { id: 'xandar',            name: 'Xandar',             expansionId: 'guardians', image: 'Location Guardians 6.jpg' },

  // ── Rise of the Black Panther ────────────────────────────────────────────
  { id: 'golden-city',   name: 'Golden City',   expansionId: 'black-panther', image: 'Location Black Panther 1.jpg' },
  { id: 'great-mound',   name: 'Great Mound',   expansionId: 'black-panther', image: 'Location Black Panther 2.jpg' },
  { id: 'jabari-village', name: 'Jabari Village', expansionId: 'black-panther', image: 'Location Black Panther 3.jpg' },
  { id: 'royal-palace',  name: 'Royal Palace',  expansionId: 'black-panther', image: 'Location Black Panther 4.jpg' },
  { id: 'shuris-lab',    name: "Shuri's Lab",   expansionId: 'black-panther', image: 'Location Black Panther 5.jpg' },
  { id: 'wakanda-falls', name: 'Wakanda Falls', expansionId: 'black-panther', image: 'Location Black Panther 6.jpg' },

  // ── The Infinity Gauntlet ────────────────────────────────────────────────
  { id: 'asgard-gauntlet',    name: 'Asgard',               expansionId: 'infinity-gauntlet', image: 'Location Gauntlet 1.jpg' },
  { id: 'hala',               name: 'Hala',                 expansionId: 'infinity-gauntlet', image: 'Location Gauntlet 2.jpg' },
  { id: 'new-york-gauntlet',  name: 'New York',             expansionId: 'infinity-gauntlet', image: 'Location Gauntlet 3.jpg' },
  { id: 'nidavellir',         name: 'Nidavellir',           expansionId: 'infinity-gauntlet', image: 'Location Gauntlet 4.jpg' },
  { id: 'sanctum-sanctorum',  name: 'Sanctum Sanctorum',    expansionId: 'infinity-gauntlet', image: 'Location Gauntlet 5.jpg' },
  { id: 'vormir',             name: 'Vormir',               expansionId: 'infinity-gauntlet', image: 'Location Gauntlet 6.jpg' },
  { id: 'avengers-mansion',   name: "Avengers' Mansion",    expansionId: 'infinity-gauntlet', image: 'Location Gauntlet Thanos 1.jpg' },
  { id: 'quantum-tunnel',     name: 'Quantum Tunnel',       expansionId: 'infinity-gauntlet', image: 'Location Gauntlet Thanos 2.jpg' },
  { id: 'sanctuary',          name: 'Sanctuary',            expansionId: 'infinity-gauntlet', image: 'Location Gauntlet Thanos 3.jpg' },
  { id: 'thanos-palace',      name: "Thanos' Palace",       expansionId: 'infinity-gauntlet', image: 'Location Gauntlet Thanos 4.jpg' },
  { id: 'titan',              name: 'Titan',                expansionId: 'infinity-gauntlet', image: 'Location Gauntlet Thanos 5.jpg' },
  { id: 'wakanda-fields',     name: 'Wakanda Fields',       expansionId: 'infinity-gauntlet', image: 'Location Gauntlet Thanos 6.jpg' },

  // ── X-Men Core Box ───────────────────────────────────────────────────────
  { id: 'asteroid-m',            name: 'Asteroid M',            expansionId: 'xmen-core', image: 'Location X-Men 1.jpg' },
  { id: 'genosha',               name: 'Genosha',               expansionId: 'xmen-core', image: 'Location X-Men 2.jpg' },
  { id: 'hangar-bay',            name: 'Hangar Bay',            expansionId: 'xmen-core', image: 'Location X-Men 3.jpg' },
  { id: 'muir-island',           name: 'Muir Island',           expansionId: 'xmen-core', image: 'Location X-Men 4.jpg' },
  { id: 'sentinel-space-station', name: 'Sentinel Space Station', expansionId: 'xmen-core', image: 'Location X-Men 5.jpg' },
  { id: 'weapon-x-facility',     name: 'Weapon X Facility',     expansionId: 'xmen-core', image: 'Location X-Men 6.jpg' },
  { id: 'xavier-institute',      name: 'Xavier Institute',      expansionId: 'xmen-core', image: 'Location X-Men 7.jpg' },
  { id: 'x-jet',                 name: 'X-Jet',                 expansionId: 'xmen-core', image: 'Location X-Men 8.jpg' },

  // ── X-Men: Gold Team ─────────────────────────────────────────────────────
  { id: 'chandilar',              name: 'Chandilar',              expansionId: 'xmen-gold', image: 'Location Gold 1.jpg' },
  { id: 'hellfire-club-building', name: 'Hellfire Club Building', expansionId: 'xmen-gold', image: 'Location Gold 2.jpg' },
  { id: 'krakoa',                 name: 'Krakoa',                 expansionId: 'xmen-gold', image: 'Location Gold 3.jpg' },
  { id: 'limbo',                  name: 'Limbo',                  expansionId: 'xmen-gold', image: 'Location Gold 4.jpg' },

  // ── X-Men: Blue Team ─────────────────────────────────────────────────────
  { id: 'excalibur-lighthouse', name: 'Excalibur Lighthouse', expansionId: 'xmen-blue', image: 'Location Blue 1.jpg' },
  { id: 'madripoor',            name: 'Madripoor',            expansionId: 'xmen-blue', image: 'Location Blue 2.jpg' },
  { id: 'mojoverse',            name: 'Mojoverse',            expansionId: 'xmen-blue', image: 'Location Blue 3.jpg' },
  { id: 'the-savage-land',      name: 'The Savage Land',      expansionId: 'xmen-blue', image: 'Location Blue 4.jpg' },

  // ── Deadpool ─────────────────────────────────────────────────────────────
  { id: 'deadpools-apartment', name: "Deadpool's Apartment", expansionId: 'deadpool', image: 'Location Deadpool.jpg' },

  // ── X-Men: The Horsemen of Apocalypse ───────────────────────────────────
  { id: 'apocalypses-pyramid', name: "Apocalypse's Pyramid", expansionId: 'horsemen', image: 'Location Horsemen 1.jpg' },
  { id: 'starlight-citadel',   name: 'Starlight Citadel',    expansionId: 'horsemen', image: 'Location Horsemen 2.jpg' },

  // ── X-Men: First Class ───────────────────────────────────────────────────
  { id: 'cape-citadel',    name: 'Cape Citadel',                        expansionId: 'first-class', image: 'Location First Class 1.jpg' },
  { id: 'island-m',        name: 'Island M',                            expansionId: 'first-class', image: 'Location First Class 2.jpg' },
  { id: 'xaviers-school',  name: "Xavier's School for Gifted Youngsters", expansionId: 'first-class', image: 'Location First Class 3.jpg' },
  { id: 'the-danger-room', name: 'The Danger Room',                      expansionId: 'first-class', image: 'Location First Class Danger Room.jpg' },

  // ── X-Force ──────────────────────────────────────────────────────────────
  { id: 'adirondack-mountains', name: 'Adirondack Mountains', expansionId: 'x-force', image: 'Location X-Force 1.jpg' },
  { id: 'morlock-tunnel',       name: 'Morlock Tunnel',       expansionId: 'x-force', image: 'Location X-Force 2.jpg' },
  { id: 'murderworld',          name: 'Murderworld',          expansionId: 'x-force', image: 'Location X-Force 3.jpg' },
  { id: 'stryfe-secret-base',   name: "Stryfe's Secret Base", expansionId: 'x-force', image: 'Location X-Force 4.jpg' },

  // ── Fantastic Four ───────────────────────────────────────────────────────
  { id: 'yancy-street',   name: '4 Yancy Street',  expansionId: 'fantastic-four', image: 'Location Fantastic Four 1.jpg' },
  { id: 'baxter-building', name: 'Baxter Building', expansionId: 'fantastic-four', image: 'Location Fantastic Four 2.jpg' },
  { id: 'latveria',        name: 'Latveria',         expansionId: 'fantastic-four', image: 'Location Fantastic Four 3.jpg' },
  { id: 'mount-wundagore', name: 'Mount Wundagore',  expansionId: 'fantastic-four', image: 'Location Fantastic Four 4.jpg' },

  // ── Multiverse Core Box ──────────────────────────────────────────────────
  { id: 'alchemax-headquarters', name: 'Alchemax Headquarters',        expansionId: 'multiverse-core', image: 'Location Multiverse 1.jpg' },
  { id: 'kun-lun',               name: "K'un-Lun",                     expansionId: 'multiverse-core', image: 'Location Multiverse 2.jpg' },
  { id: 'london',                name: 'London',                        expansionId: 'multiverse-core', image: 'Location Multiverse 3.jpg' },
  { id: 'muspelheim',            name: 'Muspelheim',                    expansionId: 'multiverse-core', image: 'Location Multiverse 4.jpg' },
  { id: 'niffleheim',            name: 'Niffleheim',                    expansionId: 'multiverse-core', image: 'Location Multiverse 5.jpg' },
  { id: 'project-pegasus',       name: 'Project P.E.G.A.S.U.S.',       expansionId: 'multiverse-core', image: 'Location Multiverse 6.jpg' },
  { id: 'tva-headquarters',      name: 'TVA Headquarters',              expansionId: 'multiverse-core', image: 'Location Multiverse 7.jpg' },
  { id: 'un-headquarters',       name: 'United Nations Headquarters',   expansionId: 'multiverse-core', image: 'Location Multiverse 8.jpg' },

  // ── Civil War ────────────────────────────────────────────────────────────
  { id: 'avengers-mountain', name: 'Avengers Mountain', expansionId: 'civil-war', image: 'Civil War Location.jpg' },
  { id: 'bar-with-no-name',  name: 'Bar with No Name',  expansionId: 'civil-war', image: 'Civil War Location 1.jpg' },
  { id: 'garrett-castle',    name: 'Garrett Castle',    expansionId: 'civil-war', image: 'Civil War Location 2.jpg' },
  { id: 'the-raft',          name: 'The Raft',          expansionId: 'civil-war', image: 'Civil War Location 3.jpg' },
  { id: 'sokovia',           name: 'Sokovia',           expansionId: 'civil-war', image: 'Civil War Location 4.jpg' },
  { id: 'washington-dc',     name: 'Washington D.C.',   expansionId: 'civil-war', image: 'Civil War Location 5.jpg' },

  // ── World War Hulk ───────────────────────────────────────────────────────
  { id: 'battleworld',          name: 'Battleworld',        expansionId: 'world-war-hulk', image: 'World War Hulk Location 1.jpg' },
  { id: 'new-york-city-arena',  name: 'New York City Arena', expansionId: 'world-war-hulk', image: 'World War Hulk Location 2.jpg' },
  { id: 'sakaar',               name: 'Sakaar',              expansionId: 'world-war-hulk', image: 'World War Hulk Location 3.jpg' },

  // ── Maximum Carnage ──────────────────────────────────────────────────────
  { id: 'bishop-building',  name: 'Bishop Building',  expansionId: 'maximum-carnage', image: 'Location Maximum Carnage 1.jpg' },
  { id: 'fisk-tower',       name: 'Fisk Tower',       expansionId: 'maximum-carnage', image: 'Location Maximum Carnage 2.jpg' },
  { id: 'hells-kitchen',    name: "Hell's Kitchen",   expansionId: 'maximum-carnage', image: 'Location Maximum Carnage 3.jpg' },
  { id: 'statue-of-liberty', name: 'Statue of Liberty', expansionId: 'maximum-carnage', image: 'Location Maximum Carnage 4.jpg' },

  // ── The Coming of Galactus ───────────────────────────────────────────────
  { id: 'africa',        name: 'Africa',        expansionId: 'coming-of-galactus', image: 'Location Coming of Galactus 1.jpg' },
  { id: 'asia',          name: 'Asia',          expansionId: 'coming-of-galactus', image: 'Location Coming of Galactus 2.jpg' },
  { id: 'europe',        name: 'Europe',        expansionId: 'coming-of-galactus', image: 'Location Coming of Galactus 3.jpg' },
  { id: 'north-america', name: 'North America', expansionId: 'coming-of-galactus', image: 'Location Coming of Galactus 4.jpg' },
  { id: 'oceania',       name: 'Oceania',       expansionId: 'coming-of-galactus', image: 'Location Coming of Galactus 5.jpg' },
  { id: 'south-america', name: 'South America', expansionId: 'coming-of-galactus', image: 'Location Coming of Galactus 6.jpg' },

  // ── Secret Invasion ──────────────────────────────────────────────────────
  { id: 'camp-hammond',  name: 'Camp Hammond',  expansionId: 'secret-invasion', image: 'Location Secret Invasion 1.jpg' },
  { id: 'mount-rushmore', name: 'Mount Rushmore', expansionId: 'secret-invasion', image: 'Location Secret Invasion 2.jpg' },
  { id: 'the-peak-vii',  name: 'The Peak VII',  expansionId: 'secret-invasion', image: 'Location Secret Invasion 3.jpg' },
  { id: 'san-francisco', name: 'San Francisco', expansionId: 'secret-invasion', image: 'Location Secret Invasion 4.jpg' },

  // ── War of Kings ─────────────────────────────────────────────────────────
  { id: 'attilan',               name: 'Attilan',               expansionId: 'war-of-kings', image: 'Location War of Kings 1.jpg' },
  { id: 'blue-area-of-the-moon', name: 'Blue Area of the Moon', expansionId: 'war-of-kings', image: 'Location War of Kings 2.jpg' },
  { id: 'tarnax-iv',             name: 'Tarnax IV',             expansionId: 'war-of-kings', image: 'Location War of Kings 3.jpg' },
  { id: 'watcher-citadel',       name: 'Watcher Citadel',       expansionId: 'war-of-kings', image: 'Location War of Kings 4.jpg' },

  // ── X-Men: The Age of Apocalypse ────────────────────────────────────────
  { id: 'avalon',                  name: 'Avalon',                  expansionId: 'age-of-apocalypse', image: 'Location The Age of Apocalypse 1.jpg' },
  { id: 'the-core',                name: 'The Core',                expansionId: 'age-of-apocalypse', image: 'Location The Age of Apocalypse 2.jpg' },
  { id: 'dark-beast-laboratory',   name: 'Dark Beast Laboratory',   expansionId: 'age-of-apocalypse', image: 'Location The Age of Apocalypse 3.jpg' },
  { id: 'human-high-council-base', name: 'Human High Council Base', expansionId: 'age-of-apocalypse', image: 'Location The Age of Apocalypse 4.jpg' },

  // ── Annihilation ─────────────────────────────────────────────────────────
  { id: 'arthros',               name: 'Arthros',               expansionId: 'annihilation', image: 'Location Annihilation 1.jpg' },
  { id: 'harvester-of-sorrow',   name: 'Harvester of Sorrow',   expansionId: 'annihilation', image: 'Location Annihilation 2.jpg' },
  { id: 'kree-lar',              name: 'Kree-Lar',              expansionId: 'annihilation', image: 'Location Annihilation 3.jpg' },
  { id: 'nova-corps-headquarters', name: 'Nova Corps Headquarters', expansionId: 'annihilation', image: 'Location Annihilation 4.jpg' },

  // ── Spider-Geddon ────────────────────────────────────────────────────────
  { id: 'great-weaver-temple', name: 'Great Weaver Temple', expansionId: 'spider-geddon', image: 'Location Spider-Geddon 1.jpg' },
  { id: 'horizon-labs',        name: 'Horizon Labs',        expansionId: 'spider-geddon', image: 'Location Spider-Geddon 2.jpg' },
  { id: 'japan',               name: 'Japan',               expansionId: 'spider-geddon', image: 'Location Spider-Geddon 3.jpg' },
  { id: 'las-vegas',           name: 'Las Vegas',           expansionId: 'spider-geddon', image: 'Location Spider-Geddon 4.jpg' },
  { id: 'loomworld',           name: 'Loomworld',           expansionId: 'spider-geddon', image: 'Location Spider-Geddon 5.jpg' },
  { id: 'parker-residence',    name: 'Parker Residence',    expansionId: 'spider-geddon', image: 'Location Spider-Geddon 6.jpg' },
  { id: 'sims-tower',          name: 'Sims Tower',          expansionId: 'spider-geddon', image: 'Location Spider-Geddon 7.jpg' },
  { id: 'spider-island',       name: 'Spider-Island',       expansionId: 'spider-geddon', image: 'Location Spider-Geddon 8.jpg' },

  // ── Fin Fang Foom ────────────────────────────────────────────────────────
  { id: 'valley-of-the-sleeping-dragon', name: 'Valley of the Sleeping Dragon', expansionId: 'fin-fang-foom', image: 'Fin Fang Foom Location.jpg' },
]
