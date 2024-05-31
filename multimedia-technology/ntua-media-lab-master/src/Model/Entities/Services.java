package Model.Entities;
import javafx.beans.property.SimpleIntegerProperty;
import javafx.beans.property.SimpleStringProperty;

public class Services {
    private SimpleIntegerProperty id;
    private SimpleStringProperty title;
    private double pricing;

    public Services() {
        id = new SimpleIntegerProperty(0);
        title = new SimpleStringProperty("");
        pricing = 0.0;
    }

    public Services(Integer id, String title, double pricing) {
        this.id = new SimpleIntegerProperty(id);
        this.title = new SimpleStringProperty(title);
        this.pricing = pricing;
    }

    public int getId() {
        return id.get();
    }

    public SimpleIntegerProperty idProperty() {
        return id;
    }

    public void setId(int id) {
        this.id.set(id);
    }

    public String getTitle() {
        return title.get();
    }

    public SimpleStringProperty titleProperty() {
        return title;
    }

    public void setTitle(String title) {
        this.title.set(title);
    }

    public double getPricing() {
        return pricing;
    }

    public void setPricing(double pricing) {
        this.pricing = pricing;
    }
}