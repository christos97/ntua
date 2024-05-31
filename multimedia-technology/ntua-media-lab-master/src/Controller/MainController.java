package Controller;
import Model.Query.AirportParkingQuery;
import View.*;
import javafx.stage.Stage;

import javafx.scene.control.Button;
public class MainController{
    public static Stage window = new Stage();
    public static void showMainScene() {

        //View init
        MainScene.initialize();

        //Controller init
        MainSceneControl.initialize();

        //set scene
        window.setScene(MainScene.getScene());
        window.setTitle("MediaLabAirport™");
        window.show();
        window.centerOnScreen();
    }

    public static Stage getWindow() {
        return window;
    }
}

