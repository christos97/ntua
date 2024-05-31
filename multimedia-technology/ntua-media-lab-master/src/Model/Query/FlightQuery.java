package Model.Query;
import DataAccess.DataConnection;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.PreparedStatement;

import Model.Entities.Flight;
import javafx.collections.FXCollections;
import javafx.collections.ObservableList;

public class FlightQuery {

    private static ObservableList<Flight> flights;
    private static PreparedStatement statement;

    // GET INCOMING FLIGHT DATA BY ID
    public static ObservableList<Flight> findById(String flightID) {

        Connection connection = DataConnection.getConnection();
        flights = FXCollections.observableArrayList();

        try {

            String sql = "SELECT * FROM Flights WHERE flightID=?";
            statement = connection.prepareStatement(sql);
            statement.setString(1, flightID);
            ResultSet rs = statement.executeQuery();

            while(rs.next())
            {
                Flight flight = new Flight();
                flight.setFlightId( rs.getString("flightID") );
                flight.setCity( rs.getString("city") );
                flight.setStatus( rs.getString("status") );
                flight.setFlightType( rs.getInt("flightType") );
                flight.setAircraftType(rs.getInt("aircraftType"));
                flight.setDepartsIn(rs.getInt("departsIn"));
                flights.add(flight);
            }

            return  flights;

        } catch (SQLException ex) { ex.printStackTrace(); }

        return null;

    }

    // UPDATE FLIGHT STATUS TO PARKED
    public static void updateById(String flightID) {
        Connection connection = DataConnection.getConnection();
        try {
            String sql = "UPDATE Flights SET status='Parked' WHERE flightID=?";
            statement = connection.prepareStatement(sql);
            statement.setString(1, flightID);
            statement.executeUpdate();
        } catch (SQLException ex) { ex.printStackTrace(); }
    }
}
