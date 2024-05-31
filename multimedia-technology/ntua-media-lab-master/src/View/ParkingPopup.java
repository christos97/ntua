package View;

import Controller.MainController;
import Model.Entities.Flight;
import javafx.event.ActionEvent;
import javafx.event.EventHandler;
import javafx.geometry.Pos;
import javafx.scene.*;
import javafx.scene.control.*;
import javafx.scene.layout.*;
import javafx.stage.*;
import Model.Entities.Data;



public class ParkingPopup {

    private static boolean isCancelled ;
    public static void display(Data data)
    {

        Stage popupwindow = new Stage();
        TilePane r = new TilePane();
        popupwindow.initModality(Modality.APPLICATION_MODAL);
        popupwindow.setTitle("Message");
        Alert alert = new Alert(Alert.AlertType.CONFIRMATION);
        String category = data.getCateg();
        int flightType = data.getType();
        int _price = data.getPrice();
        double price = _price;
        String suffix = data.getSuf();
        String city = data.getCity();

        String[] services = data.getServices();
        Double[] pricing = data.getPricing();

        CheckBox[] box = new CheckBox[services.length];
        Double[] selected = new Double[services.length];
        Label label = new Label(
                "City : " + city +
                "\n\nParking slot available: " + suffix +
                "\n\nParking Category: " + category + "\n\nCost: " + price + "$" + "\n\nChoose Services available: \n\n"
        );

        Double[] extras = new Double[services.length];
        for (int i =0; i < services.length; i++){
            extras[i] = pricing[i]*price;
            box[i] = new CheckBox(services[i]);
            var text = services[i] + ": " +extras[i].toString()+"$";
            box[i].setText(text);
            r.getChildren().addAll(box[i]);
            r.setHgap(10);
        }

        Button button1= new Button("OK");
        button1.setDefaultButton(true);
        button1.setTranslateY(36);
        button1.setTranslateX(100);
        Button button2 = new Button ("Cancel");
        button2.setTranslateY(0);
        button2.setTranslateX(-100);

        EventHandler<ActionEvent> event2 = e2 -> {
            MainController.getWindow();
            isCancelled = true;
            popupwindow.close();
        };

        for (int i=0; i<services.length; i++) selected[i]=0.0;

        EventHandler<ActionEvent> event = e -> {
            for (int i=0; i<services.length; i++)
            if (box[i].isSelected()) {
                String text = box[i].getText();
                String _text = text.replaceAll("[^-.?0-9]+", "");
                double sel = Double.parseDouble(_text);
                selected[i] = sel;
            } else
                selected[i] = 0.0;

        };

        for (int i=0; i<services.length; i++) box[i].setOnAction(event);

        button1.setOnAction(e -> {
            isCancelled = false;
            double extra_fee = 0.0;
            for (int i=0; i<services.length; i++) {
                extra_fee+=selected[i];

            }
            double total_fee = price + extra_fee;
            System.out.println(total_fee);
            alert.setContentText("Total fee: " + total_fee);
            alert.showAndWait();
            if (alert.getResult() == ButtonType.OK) {
                data.setTotal_fee(total_fee);
                popupwindow.close();
            }
            else popupwindow.show();


        });

        button2.setOnAction(event2);

        VBox layout= new VBox(10);

        layout.getChildren().addAll(label,r,button1,button2);

        layout.setAlignment(Pos.CENTER);

        Scene scene1= new Scene(layout, 400, 300);

        popupwindow.setScene(scene1);

        popupwindow.showAndWait();

    }

    public static boolean isIsCancelled() {
        return isCancelled;
    }

    public static void setIsCancelled(boolean isCancelled) {
        ParkingPopup.isCancelled = isCancelled;
    }
}
