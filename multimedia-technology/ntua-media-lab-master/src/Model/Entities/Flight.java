package Model.Entities;
import javafx.beans.property.SimpleIntegerProperty;
import javafx.beans.property.SimpleStringProperty;
public class Flight {

    private SimpleStringProperty flightId, city , status;
    private SimpleIntegerProperty flightType, aircraftType,departsIn;
    private double total_fee;

    public Flight() {
        flightId = new SimpleStringProperty("");
        city = new SimpleStringProperty("");
        status = new SimpleStringProperty("");
        flightType = new SimpleIntegerProperty(0);
        aircraftType = new SimpleIntegerProperty(0);
        departsIn = new SimpleIntegerProperty(0);

    }
    public Flight(String flightId, String city, String status, int flightType, int aircraftType, int departsIn) {
        this.flightId = new SimpleStringProperty(flightId);
        this.city = new SimpleStringProperty(city);
        this.status = new SimpleStringProperty(status);
        this.flightType = new SimpleIntegerProperty(flightType);
        this.aircraftType = new SimpleIntegerProperty(aircraftType);
        this.departsIn = new SimpleIntegerProperty(departsIn);
    }

    public String getFlightId() {
        return flightId.get();
    }

    public SimpleStringProperty flightIdProperty() {
        return flightId;
    }

    public void setFlightId(String flightId) {
        this.flightId.set(flightId);
    }

    public String getCity() {
        return city.get();
    }

    public SimpleStringProperty cityProperty() {
        return city;
    }

    public void setCity(String city) {
        this.city.set(city);
    }

    public String getStatus() {
        return status.get();
    }

    public SimpleStringProperty statusProperty() {
        return status;
    }

    public void setStatus(String status) {
        this.status.set(status);
    }

    public int getFlightType() {
        return flightType.get();
    }

    public SimpleIntegerProperty flightTypeProperty() {
        return flightType;
    }

    public void setFlightType(int flightType) {
        this.flightType.set(flightType);
    }

    public int getAircraftType() {
        return aircraftType.get();
    }

    public SimpleIntegerProperty aircraftTypeProperty() {
        return aircraftType;
    }

    public void setAircraftType(int aircraftType) {
        this.aircraftType.set(aircraftType);
    }

    public int getDepartsIn() {
        return departsIn.get();
    }

    public SimpleIntegerProperty departsInProperty() {
        return departsIn;
    }

    public void setDepartsIn(int departsIn) {
        this.departsIn.set(departsIn);
    }

    @Override
    public String toString() {
        return getFlightId()+","+getCity()+","+getFlightType()+","+getAircraftType()+","+getDepartsIn()+","+getStatus()+"\n";
    }
}