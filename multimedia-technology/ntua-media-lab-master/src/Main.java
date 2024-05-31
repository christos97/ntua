import Controller.MainController;
import Controller.MainSceneControl;
import DataAccess.DataConnection;
import View.MainScene;
import javafx.application.Application;
import javafx.stage.Stage;

public class Main extends Application{

    @Override
    public void start(Stage primaryStage)throws Exception {
        DataConnection.connect();
        MainController.showMainScene();
        MainController.getWindow();
    }

    public static void main(String[] args) {
        launch(args);
    }

}