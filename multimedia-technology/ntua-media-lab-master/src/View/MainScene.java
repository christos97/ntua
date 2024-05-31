package View;

import Model.Entities.Data;
import javafx.animation.FadeTransition;
import javafx.animation.FillTransition;
import javafx.geometry.Orientation;
import javafx.geometry.Pos;
import javafx.scene.Scene;
import javafx.scene.control.*;
import javafx.scene.layout.*;
import javafx.scene.paint.Color;
import javafx.scene.shape.Rectangle;
import javafx.util.Duration;


public class MainScene {
    private static Scene scene;
    private static Menu applicationMenu;
    private static Menu detailsMenu;
    private static MenuBar menuBar;
    private static BorderPane mainLayout;
    private static VBox right_vbox;
    private static VBox left_vbox;
    private static GridPane center;
    private static Label statusbar;
    private static TextField idField;
    private static Button submitButton;
    private static Label formLabel;
    private static Label total_fee;
    private static Data data;
    private static MenuItem load;
    private static MenuItem start;
    private static Label availableSlots;
    private static Label clock;


    public static void initialize() {

        mainLayout = new BorderPane();
        left_vbox = new VBox(40);
        right_vbox = new VBox(13);
        center = new GridPane();

        statusbar = new Label();
        formLabel = new Label("Give Flight ID ");
        data = new Data();
        load = new MenuItem("Load");
        start = new MenuItem("Start");
        formLabel.setTranslateX(-25);
        formLabel.setTranslateY(30);

        idField = new TextField();
        idField.setPromptText("Give Flight ID");
        idField.setMaxWidth(100);
        idField.setTranslateX(-30);
        idField.setTranslateY(30);
        idField.setAlignment(Pos.BASELINE_RIGHT);

        submitButton = new Button("Submit");
        submitButton.setTranslateX(-20);
        submitButton.setTranslateY(30);
        submitButton.setMaxWidth(80);

        clock = new Label ("Time: ");
        clock.setTranslateX(15);
        clock.setTranslateY(-10);

        total_fee = new Label();
        total_fee.setTranslateY(-20);
        total_fee.setTranslateX(15);
        total_fee.setText("Total Amount Collected:\n" + data.getTotal_fee() + "$");

        availableSlots = new Label();
        availableSlots.setTranslateY(-30);
        availableSlots.setTranslateX(15);
        availableSlots.setText("Available Slots:\n" + data.getTotal_slots());
        statusbar.setText("Status Bar");
        statusbar.setTranslateX(250);
        statusbar.setTranslateY(-20);
        left_vbox.setAlignment(Pos.CENTER_LEFT);
        menuBar = new MenuBar();
        applicationMenu = new Menu("Application");
        applicationMenu.getItems().addAll(start,load);
        detailsMenu = new Menu("Details");

        menuBar.getMenus().addAll(applicationMenu, detailsMenu);
        right_vbox.getChildren().addAll(formLabel, idField, submitButton);
        left_vbox.getChildren().addAll(clock, total_fee, availableSlots);
        mainLayout.setTop(menuBar);
        mainLayout.setCenter(center);
        mainLayout.setLeft(left_vbox);
        mainLayout.setRight(right_vbox);
        mainLayout.setBottom(statusbar);


        scene = new Scene(mainLayout, 600, 600);
    }

    public static Label getStatusbar() {
        return statusbar;
    }

    public static Label getClock(){
        return clock;
    }

    public static void setStatusbar(Label statusbar) {
        MainScene.statusbar = statusbar;
    }

    public static Scene getScene() {
        return scene;
    }

    public static MenuItem getStart() { return start; }

    public static MenuItem getLoad() {
        return load;
    }

    public static BorderPane getMainLayout() {
        return mainLayout;
    }

    public static GridPane getCenter() {
        return center;
    }

    public static Button getSubmitButton() {
        return submitButton;
    }

    public static TextField getIdField() {
        return idField;
    }

    public static void setTotalFee(String fee) {
        total_fee.setText("Total Amount Collected:\n" + fee + "$");
    }

    public static Label getTotalFee() {
        return total_fee;
    }


    public static Label getAvailableSlots() {
        return availableSlots;
    }
    public static void setAvailableSlots(String currentSlots){
        availableSlots.setText("Available Slots:\n" + currentSlots);
    }

}