
import java.io.IOException;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.sun.net.httpserver.Headers;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;

public class Server {
    // In-memory data storage
    private static Map<String, User> users = new HashMap<>();
    private static List<Pet> pets = new ArrayList<>();
    private static List<Appointment> appointments = new ArrayList<>();
    private static List<Service> services = new ArrayList<>();
    private static List<Insurance> insurances = new ArrayList<>();

    static {
        // Add default user
        users.put("admin", new User("admin", "123", true));
        
        // Add some initial data
        pets.add(new Pet("1", "Buddy", "Dog", "Golden Retriever", 3, "John Smith", "Premium"));
        pets.add(new Pet("2", "Whiskers", "Cat", "Tabby", 2, "Sarah Johnson", "Basic"));
        
        services.add(new Service("201", "Basic Checkup", "General health assessment", 50.0, 30));
        services.add(new Service("202", "Grooming", "Bath, nail trimming, ear cleaning", 45.0, 60));
        
        appointments.add(new Appointment("101", "1", "Buddy", "Annual Checkup", "2025-04-15T10:30:00", "Regular checkup", false));
    }

    public static void main(String[] args) throws IOException {
        HttpServer server = HttpServer.create(new InetSocketAddress(8080), 0);
        
        // Define API endpoints
        server.createContext("/api/login", new LoginHandler());
        server.createContext("/api/pets", new PetsHandler());
        server.createContext("/api/appointments", new AppointmentsHandler());
        server.createContext("/api/services", new ServicesHandler());
        server.createContext("/api/insurance", new InsuranceHandler());
        
        server.setExecutor(null);
        server.start();
        
        System.out.println("Server started on port 8080");
    }
    
    // Handler classes
    static class LoginHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            enableCORS(exchange);
            
            if (exchange.getRequestMethod().equalsIgnoreCase("OPTIONS")) {
                exchange.sendResponseHeaders(204, -1);
                return;
            }
            
            if ("POST".equals(exchange.getRequestMethod())) {
                // Get request body
                String requestBody = new String(exchange.getRequestBody().readAllBytes());
                String[] credentials = requestBody.split("&");
                String username = credentials[0].split("=")[1];
                String password = credentials[1].split("=")[1];
                
                User user = users.get(username);
                
                String response;
                if (user != null && user.password.equals(password)) {
                    response = "{\"success\": true, \"message\": \"Login successful\", \"user\": {\"username\": \"" + 
                               username + "\", \"isAdmin\": " + user.isAdmin + "}}";
                    sendResponse(exchange, 200, response);
                } else {
                    response = "{\"success\": false, \"message\": \"Invalid credentials\"}";
                    sendResponse(exchange, 401, response);
                }
            } else {
                sendResponse(exchange, 405, "{\"error\": \"Method not allowed\"}");
            }
        }
    }
    
    static class PetsHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            enableCORS(exchange);
            
            if (exchange.getRequestMethod().equalsIgnoreCase("OPTIONS")) {
                exchange.sendResponseHeaders(204, -1);
                return;
            }
            
            if ("GET".equals(exchange.getRequestMethod())) {
                StringBuilder response = new StringBuilder("[");
                for (int i = 0; i < pets.size(); i++) {
                    response.append(pets.get(i).toJson());
                    if (i < pets.size() - 1) {
                        response.append(",");
                    }
                }
                response.append("]");
                sendResponse(exchange, 200, response.toString());
            } else if ("POST".equals(exchange.getRequestMethod())) {
                // Logic to add a new pet
                String requestBody = new String(exchange.getRequestBody().readAllBytes());
                // Simple parsing - in a real app would use JSON library
                String name = extractValue(requestBody, "name");
                String species = extractValue(requestBody, "species");
                String breed = extractValue(requestBody, "breed");
                int age = Integer.parseInt(extractValue(requestBody, "age"));
                String owner = extractValue(requestBody, "owner");
                
                String id = String.valueOf(pets.size() + 1);
                Pet newPet = new Pet(id, name, species, breed, age, owner, "None");
                pets.add(newPet);
                
                sendResponse(exchange, 201, "{\"success\": true, \"message\": \"Pet added\", \"pet\": " + newPet.toJson() + "}");
            } else {
                sendResponse(exchange, 405, "{\"error\": \"Method not allowed\"}");
            }
        }
    }
    
    static class AppointmentsHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            enableCORS(exchange);
            
            if (exchange.getRequestMethod().equalsIgnoreCase("OPTIONS")) {
                exchange.sendResponseHeaders(204, -1);
                return;
            }
            
            if ("GET".equals(exchange.getRequestMethod())) {
                StringBuilder response = new StringBuilder("[");
                for (int i = 0; i < appointments.size(); i++) {
                    response.append(appointments.get(i).toJson());
                    if (i < appointments.size() - 1) {
                        response.append(",");
                    }
                }
                response.append("]");
                sendResponse(exchange, 200, response.toString());
            } else if ("POST".equals(exchange.getRequestMethod())) {
                // Logic to create a new appointment
                String requestBody = new String(exchange.getRequestBody().readAllBytes());
                String petId = extractValue(requestBody, "petId");
                String service = extractValue(requestBody, "service");
                String date = extractValue(requestBody, "date");
                String notes = extractValue(requestBody, "notes");
                
                // Find pet name
                String petName = "Unknown";
                for (Pet pet : pets) {
                    if (pet.id.equals(petId)) {
                        petName = pet.name;
                        break;
                    }
                }
                
                String id = String.valueOf(100 + appointments.size() + 1);
                Appointment newAppointment = new Appointment(id, petId, petName, service, date, notes, false);
                appointments.add(newAppointment);
                
                sendResponse(exchange, 201, "{\"success\": true, \"message\": \"Appointment created\", \"appointment\": " + newAppointment.toJson() + "}");
            } else {
                sendResponse(exchange, 405, "{\"error\": \"Method not allowed\"}");
            }
        }
    }
    
    static class ServicesHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            enableCORS(exchange);
            
            if (exchange.getRequestMethod().equalsIgnoreCase("OPTIONS")) {
                exchange.sendResponseHeaders(204, -1);
                return;
            }
            
            if ("GET".equals(exchange.getRequestMethod())) {
                StringBuilder response = new StringBuilder("[");
                for (int i = 0; i < services.size(); i++) {
                    response.append(services.get(i).toJson());
                    if (i < services.size() - 1) {
                        response.append(",");
                    }
                }
                response.append("]");
                sendResponse(exchange, 200, response.toString());
            } else if ("POST".equals(exchange.getRequestMethod())) {
                // Logic to add a new service
                String requestBody = new String(exchange.getRequestBody().readAllBytes());
                String name = extractValue(requestBody, "name");
                String description = extractValue(requestBody, "description");
                double price = Double.parseDouble(extractValue(requestBody, "price"));
                int duration = Integer.parseInt(extractValue(requestBody, "duration"));
                
                String id = String.valueOf(200 + services.size() + 1);
                Service newService = new Service(id, name, description, price, duration);
                services.add(newService);
                
                sendResponse(exchange, 201, "{\"success\": true, \"message\": \"Service added\", \"service\": " + newService.toJson() + "}");
            } else {
                sendResponse(exchange, 405, "{\"error\": \"Method not allowed\"}");
            }
        }
    }
    
    static class InsuranceHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            enableCORS(exchange);
            
            if (exchange.getRequestMethod().equalsIgnoreCase("OPTIONS")) {
                exchange.sendResponseHeaders(204, -1);
                return;
            }
            
            if ("GET".equals(exchange.getRequestMethod())) {
                String response = "[" +
                    "{\"id\": \"301\", \"name\": \"Basic Plan\", \"coverage\": \"Accident only\", \"price\": 15.99, \"description\": \"Covers accidents and injuries\"}, " +
                    "{\"id\": \"302\", \"name\": \"Standard Plan\", \"coverage\": \"Accidents and illness\", \"price\": 25.99, \"description\": \"Covers accidents, injuries, and common illnesses\"}, " +
                    "{\"id\": \"303\", \"name\": \"Premium Plan\", \"coverage\": \"Comprehensive\", \"price\": 39.99, \"description\": \"Full coverage including preventive care\"}" +
                    "]";
                sendResponse(exchange, 200, response);
            } else if ("POST".equals(exchange.getRequestMethod())) {
                // Logic to update pet insurance
                String requestBody = new String(exchange.getRequestBody().readAllBytes());
                String petId = extractValue(requestBody, "petId");
                String plan = extractValue(requestBody, "plan");
                
                // Update pet insurance status
                for (Pet pet : pets) {
                    if (pet.id.equals(petId)) {
                        pet.insuranceStatus = plan;
                        sendResponse(exchange, 200, "{\"success\": true, \"message\": \"Insurance updated\", \"pet\": " + pet.toJson() + "}");
                        return;
                    }
                }
                
                sendResponse(exchange, 404, "{\"success\": false, \"message\": \"Pet not found\"}");
            } else {
                sendResponse(exchange, 405, "{\"error\": \"Method not allowed\"}");
            }
        }
    }
    
    // Helper methods
    private static void enableCORS(HttpExchange exchange) {
        Headers headers = exchange.getResponseHeaders();
        headers.set("Access-Control-Allow-Origin", "*");
        headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        headers.set("Access-Control-Allow-Headers", "Content-Type,Authorization");
    }
    
    private static void sendResponse(HttpExchange exchange, int statusCode, String response) throws IOException {
        exchange.getResponseHeaders().set("Content-Type", "application/json");
        exchange.sendResponseHeaders(statusCode, response.length());
        OutputStream os = exchange.getResponseBody();
        os.write(response.getBytes());
        os.close();
    }
    
    private static String extractValue(String json, String key) {
        // Simple JSON parsing - in a real app would use a JSON library
        int keyIndex = json.indexOf("\"" + key + "\"");
        if (keyIndex == -1) return "";
        
        int valueStart = json.indexOf(":", keyIndex) + 1;
        while (valueStart < json.length() && (json.charAt(valueStart) == ' ' || json.charAt(valueStart) == '"')) {
            valueStart++;
        }
        
        int valueEnd;
        if (json.charAt(valueStart - 1) == '"') {
            valueEnd = json.indexOf("\"", valueStart);
        } else {
            valueEnd = json.indexOf(",", valueStart);
            if (valueEnd == -1) {
                valueEnd = json.indexOf("}", valueStart);
            }
        }
        
        if (valueEnd == -1) return "";
        
        String value = json.substring(valueStart, valueEnd);
        return value.replace("\"", "");
    }
}
