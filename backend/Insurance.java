
public class Insurance {
    String id;
    String name;
    String coverage;
    double price;
    String description;
    
    public Insurance(String id, String name, String coverage, double price, String description) {
        this.id = id;
        this.name = name;
        this.coverage = coverage;
        this.price = price;
        this.description = description;
    }
    
    public String toJson() {
        return "{" +
               "\"id\":\"" + id + "\"," +
               "\"name\":\"" + name + "\"," +
               "\"coverage\":\"" + coverage + "\"," +
               "\"price\":" + price + "," +
               "\"description\":\"" + description + "\"" +
               "}";
    }
}
