
public class Pet {
    String id;
    String name;
    String species;
    String breed;
    int age;
    String owner;
    String insuranceStatus;
    
    public Pet(String id, String name, String species, String breed, int age, String owner, String insuranceStatus) {
        this.id = id;
        this.name = name;
        this.species = species;
        this.breed = breed;
        this.age = age;
        this.owner = owner;
        this.insuranceStatus = insuranceStatus;
    }
    
    public String toJson() {
        return "{" +
               "\"id\":\"" + id + "\"," +
               "\"name\":\"" + name + "\"," +
               "\"species\":\"" + species + "\"," +
               "\"breed\":\"" + breed + "\"," +
               "\"age\":" + age + "," +
               "\"owner\":\"" + owner + "\"," +
               "\"insuranceStatus\":\"" + insuranceStatus + "\"" +
               "}";
    }
}
