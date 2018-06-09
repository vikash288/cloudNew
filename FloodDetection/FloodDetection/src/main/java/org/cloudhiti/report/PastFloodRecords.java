package org.cloudhiti.report;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;


/**
 * Servlet implementation class PastFloodRecords
 */
public class PastFloodRecords extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
	private static ObjectMapper objectMapper = new ObjectMapper();

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public PastFloodRecords() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		//response.getWriter().append("Served at: ").append(request.getContextPath());
		PrintWriter out = response.getWriter();
		response.setContentType("text/json");
		MysqlConnection mysql = new MysqlConnection();

		Connection conn;
		try {
			conn = mysql.connectMySQL();
			//Past Record
			String query = "select * from cloudhiti.floodtable where floodflag = 'true' and year( date ) =2017";
			String sedimentQuery = "SELECT MONTHNAME(Date) as monthname , avg(Waterlevel),avg(Discharge),avg(RunInThousend),avg(CoarseLoadinMetric),avg(MediumLoadinMetric),avg(FineLoadinMetric) FROM `floodtable` WHERE year( Date ) = '2017' GROUP BY month( Date ) ";

			// create the java statement
			Statement st = conn.createStatement();
			Statement st1 = conn.createStatement();

			// execute the query, and get a java resultset
			ResultSet rs = st.executeQuery(query);
			ResultSet rs1 = st1.executeQuery(sedimentQuery);
			List<String> pflooddate = new ArrayList<String>();
			List<Double> waterlevel = new ArrayList<Double>();
			List<Double> dischargelevel = new ArrayList<Double>();
			List<Double> runhector = new ArrayList<Double>();
			
			//Sediment 
			
			List<String> sedimentMonth = new ArrayList<String>();
			List<Double> cSediment = new ArrayList<Double>();
			List<Double> mSediment = new ArrayList<Double>();
			List<Double> fSediment = new ArrayList<Double>();
			
			//Water Level
			List<Double> monwaterlevel = new ArrayList<Double>();
			List<Double> monwaterdischarge = new ArrayList<Double>();
			List<Double> monrunhector = new ArrayList<Double>();
			
			Map<String,Object> pastJson = new HashMap<String,Object>();
			Map<String,Object> sedimentJson = new HashMap<String,Object>();
			Map<String,Object> waterJson = new HashMap<String,Object>();

			String table = "";
			// iterate through the java resultset
			while (rs.next()) {
				pflooddate.add(rs.getString(1));
				waterlevel.add(Double.parseDouble(rs.getString(2)));
				dischargelevel.add(Double.parseDouble(rs.getString(3)));
				runhector.add(Double.parseDouble(rs.getString(4)));
				table +="<tr><td>"+rs.getString(1)+"</td><td>"+rs.getString(2)+"</td><td>"+rs.getString(3)+"</td><td>"+rs.getString(4)+"</td><td>"+rs.getString(5)+"</td><td>"+rs.getString(6)+"</td><td>"+rs.getString(7)+"</td></tr>";
			}
			
			while(rs1.next()){
				sedimentMonth.add(rs1.getString("monthname"));
				monwaterlevel.add(Double.parseDouble(rs1.getString(2)));
				monwaterdischarge.add(Double.parseDouble(rs1.getString(3)));
				monrunhector.add(Double.parseDouble(rs1.getString(4)));
				cSediment.add(Double.parseDouble(rs1.getString(5)));
				mSediment.add(Double.parseDouble(rs1.getString(6)));
				fSediment.add(Double.parseDouble(rs1.getString(7)));
			}
			
			Map<String,Object> responseJson = new HashMap<String,Object>();
			waterJson.put("watermonth", sedimentMonth);
			waterJson.put("waterlevel", monwaterlevel);
			waterJson.put("waterdischarge", monwaterdischarge);
			waterJson.put("waterhector", monrunhector);
			
			sedimentJson.put("sedimonth", sedimentMonth);
			sedimentJson.put("csedi", cSediment);
			sedimentJson.put("mSedi", mSediment);
			sedimentJson.put("fSedi", fSediment);
			pastJson.put("datarecord", table);
			pastJson.put("floodate", pflooddate);
			pastJson.put("waterlevel", waterlevel);
			pastJson.put("dischargelevel", dischargelevel);
			pastJson.put("runinhector", runhector);
			
			responseJson.put("pastRecord", pastJson);
			responseJson.put("sedimentRecord", sedimentJson);
			responseJson.put("pastWaterRecord", waterJson);
			String mapAsJson = new ObjectMapper().writeValueAsString(responseJson);

			
			out.println(mapAsJson);
			
			

		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
		
		/*PrintWriter out = response.getWriter();
		//response.setContentType("text/json");
		 String fyear = request.getParameter("fyear");
		System.out.println("Hello Console");
		out.println("Hello "+fyear);*/
	}

}
