public class Main {
    public static void main(String[] args){
        ExpansionsList expansionList = new ExpansionsList();
        CharactersList charactersList = new CharactersList();
        Randomize rand = new Randomize();
        System.out.println(expansionList.getExpansions());
        System.out.println(charactersList.getHeroes());
        System.out.println(charactersList.getVillains());
        System.out.println(rand.getExpansion());
        System.out.println(rand.getHero());
        System.out.println(rand.getVillain());
    }
}
