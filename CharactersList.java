/*
 * Names starting with v are villains, for easy finding e.g. vUltron
 * Names starting with ah are anti-heroes e.g. ahApocalypse. Anti-Heroes have both a villain deck and a hero deck -- retired this
 * Instead I'm entering an anti-hero twice, once with a v prefix and without it, that way we don't need two prefixes, but also
 * the first attempt would offer just one variable that would have to entered in different lists
 * This way we can also filter just twice if needed. The N will be small always for this project, but for big o(N) this would 
 * have mattered for performance.
 */

import java.util.List;
import java.util.ArrayList;

public class CharactersList extends ExpansionsList {
    /* Enter the Spider-Verse */
    public final String spiderMan = "Spider-Man";
    public final String milesMorales = "Miles Morales";
    public final String ghostSpider = "Ghost Spider";
    /* Avengers Core Box */
    public final String ironMan = "Iron-Man";
    public final String captainAmerica = "Captain America";
    public final String blackWidow = "Black Widow";
    public final String hulk = "Hulk";
    public final String captainMarvel = "Captain Marvel";
    public final String antMan = "Ant-Man";
    public final String wasp = "Wasp";
    public final String doctorStrange = "Doctor Strange";
    public final String vRedSkull = "RedSkull";
    public final String vUltron = "Ultron";
    public final String vTaskmaster = "Taskmaster";
    /* The Horsemen of Apocalypse */
    public final String apocalypse = "Apocalypse";
    public final String vApocalypse = "Apocalypse";
    public final String vFamine = "Famine";
    public final String vWar = "War";
    public final String vDeath ="Death";
    public final String vPestilence = "Pestilence";
    /* X-Men Core Box */
    public final String professorX = "Professor X";
    public final String cyclops = "Cyclops";
    public final String jeanGrey = "Jean Grey";
    public final String wolverine = "Wolverine";
    public final String storm = "Storm";
    public final String mohawkStorm = "Mohawk Storm";
    public final String vJuggernaut = "Juggernaut";
    public final String vSabretooth = "Sabretooth";
    public final String vMystique = "Mystique";
    public final String mystique = "Mystique";
    public final String vMagneto = "Magneto";
    public final String magneto = "Magneto";
    /* Deadpool */
    public final String deadpool = "Deadpool";
    public final String ladyDeadpool = "Lady Deadpool";
    public final String vDeadpool = "Deadpool";
    public final String vDeadpoolChallenge = "Deadpool (Challenge)";
    public final String deadpoolUnicorn = "Deadpool in an Unicorn";
    public final String bobAgentOfHydra = "Bob Agent of Hydra";
    public final String vBobAgentOfHydra = "Bob Agent of Hydra";
    /* Rise of the Black Panther */
    public final String vKillmonger = "Killmonger";
    public final String blackPanther = "Black Panther";
    public final String winterSoldier = "Winter Soldier";
    public final String shuri = "Shuri";
    /* Phoenix Five */
    public final String hopeSummers = "Hope Summers";
    public final String vColossus = "Colossus";
    public final String vCyclops = "Cyclops";
    public final String vMagik = "Magik";
    public final String vEmmaFrost = "Emma Frost";
    public final String vNamor = "Namor";
    /* X-Force */
    public final String domino = "Domino";
    public final String cannonball = "Cannonball";
    public final String shatterstar = "Shatterstar";
    public final String cable = "Cable";
    public final String vStryfe = "Stryfe";
    /* Days of Future Past */
    public final String logan = "Logan";
    public final String vSentinelI = "Sentinel I";
    public final String vSentinelII = "Sentinel II";
    public final String vSentinelIII = "Sentinel III";
    public final String vNimrod = "Nimrod";
    /* X-MEN Blue Team */
    public final String banshee = "Banshee";
    public final String psylocke = "Psylocke";
    public final String jubilee = "Jubilee";
    public final String rogue = "Rogue";
    public final String gambit = "Gambit";
    public final String vMisterSinister = "Mister Sinister";
    /* X-MEN Mutant Promos */
    public final String vAvalanche = "Avalanche";
    public final String vDeathbird = "Deathbird";
    public final String vMastermind = "Mastermind";
    public final String vLadyDeathstrike = "Lady Deathstrike";
    public final String vShadowKing = "Shadow King";
    public final String vSilverSamurai = "Silver Samurai";
    public final String vOmegaRed = "Omega Red";
    public final String vArcade = "Arcade";
    public final String vSauron = "Sauron";
    public final String vPyro = "Pyro";
    public final String vToad = "Toad";
    public final String vBlob = "Blob";
    public final String vMojo = "Mojo";
    public final String vBroodQueen = "Brood Queen";
    public final String vOnslaught = "Onslaught";
    public final String vDarkPhoenix = "Dark Phoenix";
    public final String vLegion = "Legion";
    public final String legion = "Legion";
    public final String vEmmaFrostMutantPromo = "Emma Frost - Mutant Promo";
    public final String emmaFrost = "Emma Frost";
    public final String vMarrow = "Marrow";
    public final String marrow = "Marrow";
    public final String vSpiral = "Spiral";
    public final String spiral = "Spiral";
    public final String vNamorMutantPromo = "Namor from Mutant Promo";
    public final String magik = "Magik";
    public final String sunspot = "Sunspot"; // BRAZIL MENTIONED
    public final String warlock = "Warlock";
    public final String mirage = "Mirage";
    public final String wolfsbane = "Wolfsbane";
    public final String havok = "Havok";
    public final String multipleMan = "Multiple Man";
    public final String polaris = "Polaris";
    public final String strongGuy = "Strong Guy";
    public final String boomBoom = "Boom-Boom";
    public final String blink = "Blink";
    public final String firestar = "firestar";
    public final String warpath = "Warpath";
    public final String fantomex = "Fantomex";
    public final String feral = "Feral";
    public final String kittyPride = "Kitty Pride";
    public final String lockheed = "Lockheed";
    public final String nightcrawler = "Nightcrawler";
    public final String captainBritain = "Captain Britain";
    public final String phoenix = "Phoenix";
    public final String doop = "Doop";
    public final String gwenpool = "Gwenpool";
    public final String dagger = "Dagger";
    public final String cloak = "Cloak";
    public final String longshot = "Longshot";
    public final String sunfire = "Sunfire";
    public final String weaponX = "WeaponX";
    public final String x23 = "X-23";
    public final String dazzler = "Dazzler";
    public final String pixie = "Pixie";
    public final String sasquatch = "Sasquatch";
    public final String puck = "Puck";
    public final String guardian = "Guardian";
    public final String snowbird = "Snowbird";

    public List getHeroes(){
        List<String> heroesList = new ArrayList<>();
        heroesList.add(spiderMan);
        heroesList.add(milesMorales);
        heroesList.add(ghostSpider);
        heroesList.add(ironMan);
        heroesList.add(captainAmerica);
        heroesList.add(blackWidow);
        heroesList.add(hulk);
        heroesList.add(captainMarvel);
        heroesList.add(antMan);
        heroesList.add(wasp);
        heroesList.add(professorX);
        heroesList.add(cyclops);
        heroesList.add(jeanGrey);
        heroesList.add(wolverine);
        heroesList.add(storm);
        heroesList.add(deadpool);
        heroesList.add(ladyDeadpool);
        heroesList.add(bobAgentOfHydra);
        heroesList.add(blackPanther);
        heroesList.add(winterSoldier);
        heroesList.add(shuri);
        heroesList.add(hopeSummers);
        heroesList.add(domino);
        heroesList.add(cannonball);
        heroesList.add(shatterstar);
        heroesList.add(cable);
        heroesList.add(logan);
        heroesList.add(banshee);
        heroesList.add(psylocke);
        heroesList.add(jubilee);
        heroesList.add(rogue);
        heroesList.add(gambit);
        heroesList.add(emmaFrost);
        heroesList.add(magik);
        heroesList.add(sunspot);
        heroesList.add(warlock);
        heroesList.add(mirage);
        heroesList.add(wolfsbane);
        heroesList.add(havok);
        heroesList.add(multipleMan);
        heroesList.add(polaris);
        heroesList.add(strongGuy);
        heroesList.add(boomBoom);
        heroesList.add(blink);
        heroesList.add(firestar);
        heroesList.add(warpath);
        heroesList.add(fantomex);
        heroesList.add(feral);
        heroesList.add(kittyPride);
        heroesList.add(lockheed);
        heroesList.add(nightcrawler);
        heroesList.add(captainBritain);
        heroesList.add(phoenix);
        heroesList.add(doop);
        heroesList.add(gwenpool);
        heroesList.add(dagger);
        heroesList.add(cloak);
        heroesList.add(longshot);
        heroesList.add(sunfire);
        heroesList.add(weaponX);
        heroesList.add(x23);
        heroesList.add(dazzler);
        heroesList.add(pixie);
        heroesList.add(sasquatch);
        heroesList.add(puck);
        heroesList.add(guardian);
        heroesList.add(snowbird);
        return heroesList;
    }

    public List getVillains(){
        List<String> villainsList = new ArrayList<>();
        villainsList.add(vRedSkull);
        villainsList.add(vUltron);
        villainsList.add(vTaskmaster);
        villainsList.add(vApocalypse);
        villainsList.add(vFamine);
        villainsList.add(vWar);
        villainsList.add(vDeath);
        villainsList.add(vPestilence);
        villainsList.add(vJuggernaut);
        villainsList.add(vSabretooth);
        villainsList.add(vMystique);
        villainsList.add(vMagneto);
        villainsList.add(vDeadpool);
        villainsList.add(vDeadpoolChallenge);
        villainsList.add(vBobAgentOfHydra);
        villainsList.add(vKillmonger);
        villainsList.add(vColossus);
        villainsList.add(vCyclops);
        villainsList.add(vMagik);
        villainsList.add(vEmmaFrost);
        villainsList.add(vNamor);
        villainsList.add(vStryfe);
        villainsList.add(vSentinelI);
        villainsList.add(vSentinelII);
        villainsList.add(vSentinelIII);
        villainsList.add(vNimrod);
        villainsList.add(vMisterSinister);
        villainsList.add(vAvalanche);
        villainsList.add(vDeathbird);
        villainsList.add(vMastermind);
        villainsList.add(vLadyDeathstrike);
        villainsList.add(vShadowKing);
        villainsList.add(vSilverSamurai);
        villainsList.add(vOmegaRed);
        villainsList.add(vArcade);
        villainsList.add(vSauron);
        villainsList.add(vPyro);
        villainsList.add(vToad);
        villainsList.add(vBlob);
        villainsList.add(vMojo);
        villainsList.add(vBroodQueen);
        villainsList.add(vOnslaught);
        villainsList.add(vDarkPhoenix);
        villainsList.add(vLegion);
        villainsList.add(vEmmaFrostMutantPromo);
        villainsList.add(vMarrow);
        villainsList.add(vSpiral);
        villainsList.add(vNamorMutantPromo);
        return villainsList;
    }
    
}
