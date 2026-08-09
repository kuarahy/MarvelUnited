# Marvel United Randomizer

A Java tool that randomizes heroes, villains, and expansions for the **Marvel United** board game. It also includes two custom branching campaign systems with narrative consequences for wins and losses.

![Java](https://img.shields.io/badge/Java-ED8B00?style=flat&logo=openjdk&logoColor=white)
![Board Game](https://img.shields.io/badge/Board%20Game-Marvel%20United-red?style=flat)
![License](https://img.shields.io/badge/License-MIT-blue?style=flat)

---

## Features

- **Random expansion picker** – draws a random expansion from your collection
- **Random hero** – picks a single hero at random
- **Random villain** – picks a villain at random
- **Random team builder** – assembles a team of 4 heroes for a session
- **Custom campaigns** – two fully branching narrative campaigns with win/loss consequences
- **Custom scenarios** – original story prompts to set the tone for each session

---

## Expansions Supported

| Expansion |
|---|
| Enter the Spider-Verse |
| X-MEN: The Horsemen of Apocalypse |
| X-MEN Blue Team |
| X-MEN Mutant Promos |
| Deadpool |
| Rise of the Black Panther |
| Phoenix Five |
| X-Force |
| Days of Future Past |

---

## How to Run

Requires Java 8+. Compile and run from the project root:

```bash
javac *.java
java Main
```

The output lists all expansions and heroes, then prints:
- A randomly selected expansion
- A randomly selected hero
- A randomly selected villain
- A randomly selected team of 4 heroes

---

## Project Structure

| File | Purpose |
|---|---|
| `Main.java` | Entry point — runs and prints randomized results |
| `Randomize.java` | Shuffles and picks from lists |
| `CharactersList.java` | All heroes and villains grouped by expansion |
| `ExpansionsList.java` | All owned expansions |
| `Scenarios.java` | Original story prompts for custom sessions |
| `EchoesOfFear.java` | Scenario stub — *Echoes of Fear* |
| `Campaigns/` | Markdown files for branching campaign systems |

---

## Campaigns

### [X-Men: Children of the Atom](Campaigns/X-Men%20Campaign.md)
A 4-act branching campaign starting with the original five X-Men. Losses change the story direction, add permanent handicaps, or remove heroes. Paths escalate from school-level threats to mutant extinction events.

**Required:** Marvel United: X-Men core box  
**Recommended expansions:** Days of Future Past, Phoenix Five, X-Force, Horsemen of the Apocalypse

### [Earth's Mightiest: Shadows Over New York](Campaigns/Earth's%20Mightiest%20Campaign.md)
A 4-act Avengers campaign starting at street level and escalating to cosmic threats. Features a Mermaid flowchart of all branching paths and over 9 possible victory conditions.

**Required:** Marvel United base set  
**Recommended expansions:** Spider-Man, Avengers, Guardians of the Galaxy

---

## Scenarios

Original scenario prompts included in `Scenarios.java` to set the tone for custom sessions:

- **Echoes of Fear** — Mutant tensions ignite a city-wide conflict in New York City
- **Crimson Covenant** — A clandestine society employs twisted experiments and deadly assassins
- **Phoenix Rising** — A fractured team faces the destructive legacy of the Phoenix
- **Shifting Sands** — Investigators uncover a pattern of manipulation and theft
- **Shadow Syndicate** — Spies and manipulators operate from the shadows
- **Doop Directive** — Reality itself breaks as a mysterious entity breaches dimensions
- **Frozen Frontier** — An ancient evil stirs beneath the ice
- **Fantomex Gambit** — Elaborate schemes and intricate traps threaten to unravel reality
- and more...

---

## Roadmap

- [x] Convert code to a front-end centric code that can be deployed and read directly from Vercel, or similar
- [ ] Add more campaign boxes (Kickstarter Promo Box 2, The Infinity Gauntlet, Spider-Geddon)
- [ ] Release PDFs to communities with images, making it easy for people to play with
- [ ] Add name and links social media, donation boxes, etc (no ads! :D)
- [ ] Add images to every expansion, hero, villain, and fields
- [ ] Add suggestions or automated connections to Random Scenarios

---

## Support

If you find this useful, consider [sponsoring on GitHub](https://github.com/sponsors/kuarahy).
