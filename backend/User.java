
public class User {
    String username;
    String password;
    boolean isAdmin;
    
    public User(String username, String password, boolean isAdmin) {
        this.username = username;
        this.password = password;
        this.isAdmin = isAdmin;
    }
    
    public String toJson() {
        return "{" +
               "\"username\":\"" + username + "\"," +
               "\"isAdmin\":" + isAdmin +
               "}";
    }
}
