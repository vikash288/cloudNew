package org.cloudhiti.report;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class MysqlConnection {
	
	public Connection connectMySQL() throws ClassNotFoundException, SQLException, IOException {
		Class.forName("com.mysql.jdbc.Driver");
		Connection con = DriverManager.getConnection("jdbc:mysql://localhost:3306/cloudhiti","root","eminent");
		return con;
	}

}
