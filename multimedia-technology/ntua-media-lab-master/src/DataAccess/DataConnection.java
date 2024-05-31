package DataAccess;
import java.sql.Connection;
import java.sql.DriverManager;

public class DataConnection {

    private static Connection connection;
    private static String JDBC_DRIVER = "com.mysql.cj.jdbc.Driver";
    private static final String DATABASE_URL = "jdbc:mysql://localhost:3306/mydb?autoReconnect=true&useSSL=false";
    private static String userName = "root";
    private static String password = "Skatakia1234#";

    public static void connect() {
        connection = null;
        try {
            Class.forName(JDBC_DRIVER);
            connection = DriverManager.getConnection(DATABASE_URL, userName, password);
            System.out.println("database connection success");
        }

        catch (Exception e) {
            e.printStackTrace();
            System.out.println("problem with database connection");
        }
    }

    public static Connection getConnection() {
        return connection;
    }

}