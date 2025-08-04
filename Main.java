public class Main {
    public static void main(String[] args){
        
        ExpansionsList expansionList = new ExpansionsList();
        CharactersList charactersList = new CharactersList();
        Randomize rand = new Randomize();
        
        System.out.println(expansionList.getExpansions());
        System.out.println(charactersList.getHeroes());
        System.out.println(charactersList.getVillains()); 
        System.out.println("Your Expansion is: " + rand.getExpansion());
        System.out.println("Your hero is: " + rand.getOneHero());
        System.out.println("Your villain is: " + rand.getVillain());
        System.out.println("Your team is: " + rand.getHeroTeam());
    }
}
