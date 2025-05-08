
public class Appointment {
    String id;
    String petId;
    String petName;
    String service;
    String date;
    String notes;
    boolean completed;
    
    public Appointment(String id, String petId, String petName, String service, String date, String notes, boolean completed) {
        this.id = id;
        this.petId = petId;
        this.petName = petName;
        this.service = service;
        this.date = date;
        this.notes = notes;
        this.completed = completed;
    }
    
    public String toJson() {
        return "{" +
               "\"id\":\"" + id + "\"," +
               "\"petId\":\"" + petId + "\"," +
               "\"petName\":\"" + petName + "\"," +
               "\"service\":\"" + service + "\"," +
               "\"date\":\"" + date + "\"," +
               "\"notes\":\"" + notes + "\"," +
               "\"completed\":" + completed +
               "}";
    }
}
