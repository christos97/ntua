package Model.Entities;
import javafx.beans.property.SimpleIntegerProperty;
import javafx.beans.property.SimpleStringProperty;

public class AirportParking {

    private SimpleStringProperty suffix;
    private SimpleIntegerProperty category, parkingSlots, price;

    public AirportParking() {
        suffix = new SimpleStringProperty("");
        category = new SimpleIntegerProperty(0);
        parkingSlots = new SimpleIntegerProperty(0);
        price = new SimpleIntegerProperty(0);
    }

    public AirportParking(String flightId, String city, String status, int flightType, int aircraftType, int departsIn) {
        this.suffix = new SimpleStringProperty(flightId);
        this.category = new SimpleIntegerProperty(flightType);
        this.parkingSlots = new SimpleIntegerProperty(aircraftType);
        this.price = new SimpleIntegerProperty(departsIn);
    }

    public String getSuffix() {
        return suffix.get();
    }

    public SimpleStringProperty suffixProperty() {
        return suffix;
    }

    public void setSuffix(String suffix) {
        this.suffix.set(suffix);
    }

    public int getCategory() {
        return category.get();
    }

    public SimpleIntegerProperty categoryProperty() {
        return category;
    }

    public void setCategory(int category) {
        this.category.set(category);
    }

    public int getParkingSlots() {
        return parkingSlots.get();
    }

    public SimpleIntegerProperty parkingSlotsProperty() {
        return parkingSlots;
    }

    public void setParkingSlots(int parkingSlots) {
        this.parkingSlots.set(parkingSlots);
    }

    public int getPrice() {
        return price.get();
    }

    public SimpleIntegerProperty priceProperty() {
        return price;
    }

    public void setPrice(int price) {
        this.price.set(price);
    }

    @Override
    public String toString() {
        return getCategory()+","+getParkingSlots()+","+getPrice()+","+getSuffix()+"\n";

    }
}