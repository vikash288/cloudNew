package com.web.log;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.swing.text.DateFormatter;

import org.joda.time.LocalDate;
import org.joda.time.LocalTime;
import org.joda.time.format.DateTimeFormatter;
import org.joda.time.format.DateTimeFormatterBuilder;



public class DateProgram {
  public static void main(String[] args) throws IOException {
	  File file = new File("/home/sany/Desktop/weblog.csv");
	  
		// if file doesnt exists, then create it
		if (!file.exists()) {
			file.createNewFile();
		}

		FileWriter fw = new FileWriter(file.getAbsoluteFile());
		BufferedWriter bw = new BufferedWriter(fw);
	  
	  
		 bw.write("DATETIME\tUSERID\tSESSIONID\tPRODUCTID\tREFERERURL");
	        bw.write("\n");
	  
    String mydate = DateProgram.getNextDate("2014-01-01");
    String mytime = DateProgram.getNextTime("00:00:00");
    int hours = 0;
    System.out.println("hours :"+hours);
    //int noofrecords = 100000000;
    String fulldate = mydate+" "+mytime;
		// TODO Auto-generated method stub
		sample s = new sample();
    
    boolean continueloop = true;
   while(continueloop)
   {
    	if(LocalDate.parse(mydate).getMonthOfYear()== 2)
    	{
    		System.out.println(mydate);
    		continueloop = false;
    	}
        mytime = DateProgram.getNextTime(mytime);
        String endofdate = LocalTime.parse(mytime).getHourOfDay()+":"+LocalTime.parse(mytime).getMinuteOfHour()+":"+LocalTime.parse(mytime).getSecondOfMinute();
        fulldate = mydate+" "+mytime ;
        hours = LocalTime.parse(mytime).getHourOfDay();
        if(hours==12 || hours==13 || hours==14 || hours==19 || hours==20)
        {
        	for(int j=0;j<10;j++)
        	{
        		
        		System.out.println("fulldate :"+fulldate.split("\\.")[0]);
        		String randomdate = fulldate.split("\\.")[0];
        		String record = randomdate+" GMT"+"\t"+s.userid()+"\t"+s.sessionid()+"\t"+s.productId()+"\t"+s.url();
        		 bw.write(record);
        	        bw.write("\n");
        	}
        }
        if(endofdate.equalsIgnoreCase("23:59:59"))
        		{
        	mydate = DateProgram.getNextDate(mydate);
        	System.out.println("onlydate :"+mydate);
        		}
        System.out.println("mydate time : "+fulldate.split("\\.")[0]);
        String randomdate = fulldate.split("\\.")[0];
        String record = randomdate+" GMT"+"\t"+s.userid()+"\t"+s.sessionid()+"\t"+s.productId()+"\t"+s.url();
		 bw.write(record);
        bw.write("\n");
       
		
        
    }
    bw.close();
  }
  
  public static String getNextDate(String  curDate) {
	    String nextDate="";

	    try {
	    	
	        LocalDate date = LocalDate.parse(curDate);
	        System.out.println("given date: "+date);
	        LocalDate date1 = date.plusDays(1);
	        System.out.println("after date"+date1);
	        nextDate = date1.toString();
	    } finally {
	        return nextDate;
	    }
	}
  
  
  public static String getNextTime(String  curtime) {
	    String nextsec="";

	    try {
	    	DateFormatter df = new DateFormatter();
	    	LocalTime time = LocalTime.parse(curtime);
	    	
	    	LocalTime nextsec1 =  time.plusSeconds(1);
	    	System.out.println("given time :"+time);
	    	System.out.println("after time :"+nextsec1);
	    	nextsec = nextsec1.toString();
	    	
	       
	    } finally {
	        return nextsec;
	    }
	}

}
