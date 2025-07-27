import java.util.Collections;
import java.util.List;

public class Randomize{

    ExpansionsList expansionsList = new ExpansionsList();
    CharactersList charactersList = new CharactersList();
    List<String> expansions = expansionsList.getExpansions();
    List<String> heroes = charactersList.getHeroes();
    List<String> villains = charactersList.getVillains();

    public void randomize(List<String> list){
        Collections.shuffle(list);
    }

    public String getExpansion(){
        randomize(expansions);
        return expansions.get(0);
    }

    public String getHero(){
        randomize(heroes);
        return heroes.get(0);
    }

    public String getVillain(){
        randomize(villains);
        return villains.get(0);
    }

}