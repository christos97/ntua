package Model.Query;
import DataAccess.DataConnection;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.PreparedStatement;

import Model.Entities.Category;
import javafx.collections.FXCollections;
import javafx.collections.ObservableList;

public class CategoryQuery {

    private static ObservableList<Category> categories;
    private static PreparedStatement statement;


    public static ObservableList<Category> getCategoryTitle(Integer id) {

        Connection connection = DataConnection.getConnection();
        categories = FXCollections.observableArrayList();

        try {

            String sql = "SELECT title FROM Category WHERE id=?";
            statement = connection.prepareStatement(sql);
            statement.setInt(1, id);

            ResultSet rs = statement.executeQuery();

            while(rs.next())
            {
                Category category = new Category();
                //category.setId( rs.getInt("id") );
                category.setTitle( rs.getString("title") );
                categories.add(category);
            }

            return  categories;

        } catch (SQLException ex) {

            ex.printStackTrace();

        }
        return null;

    }


}