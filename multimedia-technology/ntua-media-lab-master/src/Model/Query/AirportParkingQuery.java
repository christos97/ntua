package Model.Query;
import DataAccess.DataConnection;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.PreparedStatement;

import Model.Entities.AirportParking;
import javafx.collections.FXCollections;
import javafx.collections.ObservableList;

public class AirportParkingQuery {

    private static ObservableList<AirportParking> airports;
    private static PreparedStatement statement;


    public static ObservableList<AirportParking> getAirportData() {

        Connection connection = DataConnection.getConnection();
        airports = FXCollections.observableArrayList();

        try {

            String sql = "SELECT * FROM AirportParking ";
            statement = connection.prepareStatement(sql);

            ResultSet rs = statement.executeQuery();

            while(rs.next())
            {
                AirportParking airport = new AirportParking();
                airport.setCategory( rs.getInt("category") );
                airport.setParkingSlots( rs.getInt("parkingSlots") );
                airport.setPrice( rs.getInt("price") );
                airport.setSuffix( rs.getString("suffix") );
                airports.add(airport);
            }

            return  airports;

        } catch (SQLException ex) {

            ex.printStackTrace();

        }
        return null;
    }

    public static void newArrival (String title) {
        Connection connection = DataConnection.getConnection();
        try {
            String sql = "UPDATE AirportParking INNER JOIN Category ON AirportParking.category=Category.id SET parkingSlots = parkingSlots - 1 WHERE Category.title=?";
            statement = connection.prepareStatement(sql);
            statement.setString(1, title);
            statement.executeUpdate();
        } catch (SQLException ex) { ex.printStackTrace(); }
    }

    public static void clearAirportData () {
        Connection connection = DataConnection.getConnection();
        try {
            String sql = "DELETE FROM AirportParking";
            statement = connection.prepareStatement(sql);
            statement.executeUpdate();
        } catch (SQLException ex) { ex.printStackTrace(); }
    }
    public static void uploadAirportData (){
        Connection connection = DataConnection.getConnection();
        try {
            String sql2 = "LOAD DATA INFILE 'airport_default.txt' INTO TABLE AirportParking FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n'";
            statement = connection.prepareStatement(sql2);
            statement.executeUpdate();
        } catch (SQLException ex) { ex.printStackTrace(); }
    }
    public static ObservableList<AirportParking> getParkingSlotsPerCategory () {
        Connection connection = DataConnection.getConnection();
        try {
            String sql = "SELECT category, parkingSlots FROM AirportParking";
            statement = connection.prepareStatement(sql);
            ResultSet rs = statement.executeQuery();
            while(rs.next())
            {
                AirportParking airport = new AirportParking();
                airport.setCategory( rs.getInt("category") );
                airport.setParkingSlots( rs.getInt("parkingSlots") );
                airports.add(airport);
            }
            System.out.println(airports.get(0));
            return  airports;
        } catch (SQLException ex) { ex.printStackTrace(); }
        return null;
    }

}
