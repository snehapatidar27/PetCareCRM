
public class Service {
    String id;
    String name;
    String description;
    double price;
    int duration;
    
    public Service(String id, String name, String description, double price, int duration) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.duration = duration;
    }
    
    public String toJson() {
        return "{" +
               "\"id\":\"" + id + "\"," +
               "\"name\":\"" + name + "\"," +
               "\"description\":\"" + description + "\"," +
               "\"price\":" + price + "," +
               "\"duration\":" + duration +
               "}";
    }
}
