
# Pet Care CRM Backend

This is a simple Java backend for the Pet Care CRM application. It provides basic API endpoints for managing pets, appointments, services, and insurance.

## Running the Backend

1. Compile all Java files:
   ```
   javac Server.java User.java Pet.java Appointment.java Service.java Insurance.java
   ```

2. Run the server:
   ```
   java Server
   ```

3. The server will start on port 8080

## API Endpoints

- `/api/login` - Authentication endpoint
- `/api/pets` - Manage pets
- `/api/appointments` - Manage appointments
- `/api/services` - Manage services
- `/api/insurance` - Manage insurance plans

## Notes

This is a simple in-memory implementation without a database for demonstration purposes.
Default admin credentials: 
- Username: admin
- Password: 123
