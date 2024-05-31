package Model.Query;
import DataAccess.DataConnection;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.PreparedStatement;

import Model.Entities.Services;
import javafx.collections.FXCollections;
import javafx.collections.ObservableList;

public class ServicesQuery {

    private static ObservableList<Services> services;
    private static PreparedStatement statement;
    private static String sql;


    public static ObservableList<Services> findById(Integer id, Integer type ) {

        Connection connection = DataConnection.getConnection();
        services = FXCollections.observableArrayList();

        try {
            if (id == 6 ) { sql = "SELECT title,pricing FROM Services WHERE id=1 OR id=2"; }
            else {
                if(type == 1) sql = "SELECT title,pricing FROM Services WHERE id!=4";
                else sql = "SELECT title,pricing FROM Services";
            }
            statement = connection.prepareStatement(sql);
            ResultSet rs = statement.executeQuery();

            while(rs.next())
            {
                Services service = new Services();
                service.setTitle( rs.getString("title") );
                service.setPricing( rs.getDouble("pricing") );
                services.add(service);
            }

            return  services;

        } catch (SQLException ex) { ex.printStackTrace(); }

        return null;

    }
}
