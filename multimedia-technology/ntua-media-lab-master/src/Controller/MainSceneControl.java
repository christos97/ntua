package Controller;


import Model.Entities.Data;
import Model.Query.AirportParkingQuery;
import Model.Query.CategoryQuery;
import Model.Query.FlightQuery;
import Model.Query.ServicesQuery;
import View.MainScene;
import View.ParkingPopup;
import javafx.animation.*;
import javafx.application.Platform;
import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.event.ActionEvent;
import javafx.event.EventHandler;
import javafx.scene.control.*;
import javafx.scene.layout.*;
import javafx.scene.paint.Color;
import javafx.scene.shape.Rectangle;
import javafx.util.Duration;

import java.sql.Time;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Timer;
import java.util.TimerTask;
import static java.lang.Double.parseDouble;


public class MainSceneControl {

    //fields
    private static BorderPane main;
    private static Button submitButton;
    private static MenuItem load;
    private static TextField idField;
    private static String id;
    private static int aircraftTypeId;
    private static Alert statusAlert;
    private static String status;
    private static Alert existAlert;
    private static boolean exist;
    private static String prev;
    private static Label total_fee;
    private static int total_slots;
    private static int flightTypeId;
    private static GridPane center;
    private static  int[] categoryId;
    private static Rectangle rect;
    private static int[] park;
    private static int currentSlots;
    private static FillTransition fill;
    private static ObservableList<Rectangle> rectangles;
    private static Label availableSlots;
    private static int t=0;
    private static Label statusBar;
    private static Label clock;
    private static int chosen;
    private static int departsIn;
    private static int START_TIME=0;

    public static void countTime() {
        Timeline time = new Timeline();
        time.setCycleCount(Timeline.INDEFINITE);
        KeyFrame frame = new KeyFrame(Duration.seconds(1), actionEvent -> {
            START_TIME++;
            clock.setText("Time: \n" + START_TIME + " s");
        });
        time.getKeyFrames().add(frame);
        time.playFromStart();
    }
    public static void startTask(Thread trd)
    {
        trd.setDaemon(true);
        trd.start();
    }

    public static void runTask(){
        long departs = departsIn;
            try {
               System.out.println(departs);
               Thread.sleep(flightTypeId * 2000 + 200 + (departs * 1000) / 12);
           } catch (InterruptedException e) { e.printStackTrace(); }
            Platform.runLater(() -> {
                statusBar.setText("Flight: " + id + " Took off");
                rectangles.get(chosen).setFill(Color.GREEN);
            });
        }

    public static void updateScene(){
        long departs = departsIn;
        fill.setCycleCount(1);
        fill.setDuration(Duration.millis(flightTypeId*2000+ 200 + (departs * 1000) / 12.0));
        fill.setFromValue(Color.GREEN);
        fill.setToValue(Color.RED);
        fill.setShape(rectangles.get(chosen));
        fill.play();
    }


    public static void initialize(){
        main = MainScene.getMainLayout();
        availableSlots = MainScene.getAvailableSlots();
        fill = new FillTransition();
        statusBar = MainScene.getStatusbar();
        clock = MainScene.getClock();
        //username field
        idField = MainScene.getIdField();
        statusAlert = new Alert(Alert.AlertType.ERROR);
        statusAlert.setContentText("Flight has already been scheduled.");
        existAlert = new Alert(Alert.AlertType.ERROR);
        existAlert.setContentText("Flight does not exist.");

        //submitButton
        total_fee = MainScene.getTotalFee();
        prev= total_fee.getText();
        submitButton = MainScene.getSubmitButton();
        submitButton.setDefaultButton(true);
        MenuItem start = MainScene.getStart();
        load = MainScene.getLoad();
        center = MainScene.getCenter();
        rectangles = FXCollections.observableArrayList();
        EventHandler<ActionEvent> eventHandler = e -> {
            var q = AirportParkingQuery.getAirportData();
            int[] cat = new int[q.size()];
            park = new int[q.size()];
            for (int i=0; i<q.size(); i++){
                park[i] = q.get(i).getParkingSlots();
                cat[i] = q.get(i).getCategory();
            }
            total_slots=0;
            for (int i =0; i < cat.length; i++) {
                total_slots += park[i];
            }
            availableSlots.setText("Total Slots:\n"+total_slots);
            for (int i=0; i<cat.length; i++) {
                rect = new Rectangle();
                center.setHgap(15);
                center.setVgap(15);
                center.setTranslateX(50);
                var q1 = CategoryQuery.getCategoryTitle(cat[i]);
                String title = q1.get(0).getTitle();
                Label label = new Label(title);
                label.setTranslateY(130);
                label.setTranslateX(0);
                center.add(label,0,i);
                for (int j=0; j<park[i]; j++){
                    rect = new Rectangle();
                    rect.setTranslateX(0);
                    rect.setTranslateY(130);
                    rect.setWidth(15);
                    rect.setHeight(15);
                    rect.setArcWidth(4);
                    rect.setArcHeight(4);
                    rect.setFill(Color.GREEN);
                    rectangles.add(rect);
                    center.add(rect,j+1,i);
                }
            }
            center.setTranslateY(50);
            statusBar.setText("Parking Loaded ");
        };

        load.setOnAction(eventHandler);
        start.setOnAction( s -> countTime() );


        submitButton.setOnAction(e->{   // Submit Flight id actions

            statusBar.setText("Request for landing sent");
            id = idField.getText();
            idField.clear();
            Data data = handleSubmitButton();
            if (data != null) {
                ParkingPopup.display(data);
            }
            else {
                statusBar.setText("Try Again");
                if (!exist) existAlert.show();
                else if (status.equals("Parked")) statusAlert.show();
                return;
            };
            if (ParkingPopup.isIsCancelled()) return;
            statusBar.setText("Flight: "+id+" Landing");
            prev= total_fee.getText().replaceAll("[^-.?0-9]+", "");
            MainScene.setTotalFee(String.valueOf(data.getTotal_fee() + parseDouble(prev)));
            System.out.println("Total Amount Updated");
            int passed =0;
            if (data.getCategId() != 1) {
                for (int i = 0; i < data.getCategId()-1; i++) passed += park[i];
            }
            chosen = 0;
            for (int j=0; j < park[data.getCategId()-1]; j++) {
                if(rectangles.get(passed + j).getFill() == Color.GREEN) {
                    chosen=passed+j;
                    fill.setCycleCount(1);
                    fill.setDuration(Duration.millis(flightTypeId*2000));
                    fill.setFromValue(Color.GREEN);
                    fill.setToValue(Color.RED);
                    fill.setShape(rectangles.get(passed + j));
                    PauseTransition pause = new PauseTransition(Duration.millis(5000));
                    pause.setOnFinished(f -> {rectangles.get(chosen).setFill(Color.GREEN);});
                    SequentialTransition seqT = new SequentialTransition(fill,pause);
                    seqT.play();
                    statusBar.setText("Flight: "+id+" Landed");
                    String _currentSlots = availableSlots.getText().replaceAll("[^-.?0-9]+", "");
                    currentSlots = Integer.parseInt(_currentSlots);
                    FlightQuery.updateById(id);
                    status = "Parked";
                    break;
                }
                else if (j == park[data.getCategId()-1] -1) {
                    Alert noSlot = new Alert(Alert.AlertType.ERROR);
                    noSlot.setContentText("No parking slot available at \n" + data.getCateg());
                    noSlot.show();
                }
            }
            if (status.equals("Parked")) {
                Runnable task = () -> runTask();
                Thread taskThread = new Thread(task);
                startTask(taskThread);
                //updateScene();
            }
            else
            {
                status = "Holding";
                statusBar.setText("Flight: "+ id + " on hold");
            }
        });
    }



    //handle submit button
    public static Data handleSubmitButton(){
        exist = true;
        var q1 = FlightQuery.findById(id);  // GET Flight data
        if (q1.size() == 0){
            exist = false;
            return null;
        } ;
        String city = q1.get(0).getCity();
        flightTypeId = q1.get(0).getFlightType();
        aircraftTypeId = q1.get(0).getAircraftType();
        departsIn = q1.get(0).getDepartsIn();
        status = q1.get(0).getStatus();
        System.out.println("status="+status+" @flightID:"+id);
        if (status != null) {
            if (status.equals("Parked")) return null;
        }
        var q2 = AirportParkingQuery.getAirportData(); // GET Airport data
        assert q2 != null;
        int size = q2.size();
        categoryId = new int[size];
        int[] parkingSlots = new int[size];
        int[] price = new int[size];
        String[] suffix = new String[size];


        for (int i =0; i < size; i++) {
            categoryId[i] = q2.get(i).getCategory();
            parkingSlots[i] = q2.get(i).getParkingSlots();
            System.out.println(categoryId[i] + "    " + parkingSlots[i]);
            price[i] = q2.get(i).getPrice();
            suffix[i] = q2.get(i).getSuffix();
        }

        total_slots=0;
        for (int i =0; i < size; i++) {
            total_slots += parkingSlots[i];
        }

            //CHECK

        //  Gate
        for (int i =0; i < size; i++) {
            if (categoryId[i] == 1 && flightTypeId == 1 && (aircraftTypeId == 2 || aircraftTypeId == 3) && departsIn <= 45 && parkingSlots[i] > 0)  {
                var cq = CategoryQuery.getCategoryTitle(categoryId[i]); //Category Title
                String title = cq.get(0).getTitle();
                var sq = ServicesQuery.findById(categoryId[i],aircraftTypeId); //Services available at category
                String[] services = new String[sq.size()];
                Double[] pricing = new Double[sq.size()];
                for (int j =0; j < sq.size(); j++){
                    services[j] = sq.get(j).getTitle();
                    pricing[j] = sq.get(j).getPricing();
                }
                Data data = new Data(title,city,flightTypeId,price[i],suffix[i],services,pricing,categoryId[i]);
                return data;
            }
        }

        //  Cargo Gate
        for (int i =0; i < size; i++) {
            if (categoryId[i] == 2 && flightTypeId == 1 && (aircraftTypeId == 2 || aircraftTypeId == 3) && departsIn <= 90 && parkingSlots[i] > 0)  {
                var cq = CategoryQuery.getCategoryTitle(categoryId[i]); //Category Title
                String title = cq.get(0).getTitle();
                var sq = ServicesQuery.findById(categoryId[i],aircraftTypeId); //Services available at category
                String[] services = new String[sq.size()];
                Double[] pricing = new Double[sq.size()];
                for (int j =0; j < sq.size(); j++){
                    services[j] = sq.get(j).getTitle();
                    pricing[j] = sq.get(j).getPricing();
                }
                Data data = new Data(title,city,flightTypeId,price[i],suffix[i],services,pricing,categoryId[i]);
                return  data;
            }
        }

        // Zone A

        for (int i =0; i < size; i++) {
            if (categoryId[i] == 3 && flightTypeId == 1 && (aircraftTypeId == 2 || aircraftTypeId == 3) && departsIn <= 90 && parkingSlots[i] > 0)  {
                var cq = CategoryQuery.getCategoryTitle(categoryId[i]); //Category Title
                String title = cq.get(0).getTitle();
                var sq = ServicesQuery.findById(categoryId[i],aircraftTypeId); //Services available at category
                String[] services = new String[sq.size()];
                Double[] pricing = new Double[sq.size()];
                for (int j =0; j < sq.size(); j++){
                    services[j] = sq.get(j).getTitle();
                    pricing[j] = sq.get(j).getPricing();
                }
                Data data = new Data(title,city,flightTypeId,price[i],suffix[i],services,pricing,categoryId[i]);
                return  data;
            }
        }

        // Zone B
        for (int i =0; i < size; i++) {
            if (categoryId[i] == 4  && (aircraftTypeId == 2 || aircraftTypeId == 3) && departsIn <= 120 && parkingSlots[i] > 0)  {
                var cq = CategoryQuery.getCategoryTitle(categoryId[i]); //Category Title
                String title = cq.get(0).getTitle();
                var sq = ServicesQuery.findById(categoryId[i],aircraftTypeId); //Services available at category
                String[] services = new String[sq.size()];
                Double[] pricing = new Double[sq.size()];
                for (int j =0; j < sq.size(); j++){
                    services[j] = sq.get(j).getTitle();
                    pricing[j] = sq.get(j).getPricing();
                }
                Data data = new Data(title,city,flightTypeId,price[i],suffix[i],services,pricing,categoryId[i]);
                return  data;
            }
        }

        // Zone C

        for (int i =0; i < size; i++) {
            if (categoryId[i] == 5 &&  aircraftTypeId == 1 && departsIn <= 180 && parkingSlots[i] > 0)  {
                var cq = CategoryQuery.getCategoryTitle(categoryId[i]); //Category Title
                String title = cq.get(0).getTitle();
                var sq = ServicesQuery.findById(categoryId[i],aircraftTypeId); //Services available at category
                String[] services = new String[sq.size()];
                Double[] pricing = new Double[sq.size()];
                for (int j =0; j < sq.size(); j++){
                    services[j] = sq.get(j).getTitle();
                    pricing[j] = sq.get(j).getPricing();
                }
                Data data = new Data(title,city,flightTypeId,price[i],suffix[i],services,pricing,categoryId[i]);
                return  data;
            }
        }

        // General
        for (int i =0; i < size; i++) {
            if (categoryId[i] == 6 &&  departsIn <= 240 && parkingSlots[i] > 0)  {
                var cq = CategoryQuery.getCategoryTitle(categoryId[i]); //Category Title
                String title = cq.get(0).getTitle();
                var sq = ServicesQuery.findById(categoryId[i],aircraftTypeId); //Services available at category
                String[] services = new String[sq.size()];
                Double[] pricing = new Double[sq.size()];
                for (int j =0; j < sq.size(); j++){
                    services[j] = sq.get(j).getTitle();
                    pricing[j] = sq.get(j).getPricing();
                }
                Data data = new Data(title,city,flightTypeId,price[i],suffix[i],services,pricing,categoryId[i]);
                return  data;
            }
        }

        //LongTerm
        for (int i =0; i < size; i++) {
            if (categoryId[i] == 7 && (flightTypeId == 2 || flightTypeId == 3)  && departsIn <= 600 && parkingSlots[i] > 0)  {
                var cq = CategoryQuery.getCategoryTitle(categoryId[i]); //Category Title
                String title = cq.get(0).getTitle();
                var sq = ServicesQuery.findById(categoryId[i],aircraftTypeId); //Services available at category
                String[] services = new String[sq.size()];
                Double[] pricing = new Double[sq.size()];
                for (int j =0; j < sq.size(); j++){
                    services[j] = sq.get(j).getTitle();
                    pricing[j] = sq.get(j).getPricing();
                }
                Data data = new Data(title,city,flightTypeId,price[i],suffix[i],services,pricing,categoryId[i]);
                return  data;
            }
        }
        return null;
    }
}




