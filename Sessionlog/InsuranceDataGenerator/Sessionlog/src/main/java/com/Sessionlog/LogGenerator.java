package com.Sessionlog;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.nio.ByteBuffer;
import java.util.Properties;
import java.util.Random;
import org.fluttercode.datafactory.impl.DataFactory;
import au.com.bytecode.opencsv.CSVWriter;
//import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
//import com.amazonaws.regions.Regions;
import com.amazonaws.services.kinesis.AmazonKinesis;
import com.amazonaws.services.kinesis.AmazonKinesisClientBuilder;
import com.amazonaws.services.kinesis.model.*;
 

public class LogGenerator {
 
		static final long unixTime = System.currentTimeMillis() / 1000L;
   		static String[] userAgent={ "Mozilla" , "Windows NT" , "Gecko" , "Firefox"};
		static DataFactory df = new DataFactory();
 		
		
		public static void createDirectoryIfNeeded(String directoryName) {
			File theDir = new File(directoryName);
			// if the directory does not exist, create it
			if (!theDir.exists() && !theDir.isDirectory()) {
				theDir.mkdirs();
			}
		}
		 

		public static void generateInformation(Properties prop, CSVWriter writer,int totalMinutesecond ,int row ) throws IOException, InterruptedException {
 
				BasicAWSCredentials awsCreds = new BasicAWSCredentials(prop.getProperty("accessKey"),prop.getProperty("secretKey"));

				AmazonKinesis amazonKinesis = AmazonKinesisClientBuilder
		                .standard().withRegion( prop.getProperty("Region"))
		                .withCredentials(new AWSStaticCredentialsProvider(awsCreds))
		                .build();
		    
		    	System.out.println("Firehose ACTIVE"); 
	         
				long startTime = System.currentTimeMillis();
				long endTime = startTime + totalMinutesecond;
 				
				for (long i = startTime ; i < endTime; i++) {
				
					
				// 6000 *5 = 30 000
                
				 for (int j = 0; j < row; j++) {
					String LogType = "webaccess";  
					String SessionId =  String.valueOf((df.getNumberBetween(100, 999))) + df.getRandomChar() + String.valueOf((df.getNumberBetween(10, 99)))+ df.getRandomChar()+String.valueOf((df.getNumberBetween(10, 99)));
					String UserId = String.valueOf((df.getNumberBetween(100000000, 999999999))) ;
					long StartTimeStamp = System.currentTimeMillis();
					
					String PageId = String.valueOf((df.getNumberBetween(10000, 99999)));
					String Page_SessionId = String.valueOf((df.getNumberBetween(100, 999))) + df.getRandomChar() + String.valueOf((df.getNumberBetween(10, 99)))+ df.getRandomChar()+String.valueOf((df.getNumberBetween(10, 99)));

					Random r = new Random();
					String IPAddress =  r.nextInt(256) + "." + r.nextInt(256) + "." + r.nextInt(256) + "." + r.nextInt(256);
	 
					String UserAgent = userAgent[ df.getNumberBetween(0, 4)];
					long EndTimeStampPageId = System.currentTimeMillis() + (df.getNumberBetween(1000000, 9999999));
					long TotalTimeSpend=  EndTimeStampPageId - StartTimeStamp;
	 				
				    String csvRow = LogType + "," + SessionId + "," + UserId + "," + StartTimeStamp + "," + EndTimeStampPageId  + "," + PageId + "," + Page_SessionId + ","
							+ IPAddress + "," + UserAgent + "," + TotalTimeSpend   ;
					String jsonRow = "{\"logtype\":\""+LogType+"\" ,\"sessionid\":\""+SessionId+"\" ,\"userid\":\""+UserId+"\" ,\"starttimestamp\":\""+StartTimeStamp+"\" ,"
						 	+ "\"endtimestamp\":\""+EndTimeStampPageId+"\" ,\"pageid\":\""+PageId+"\" ,\"pagesessionid\":\""+Page_SessionId+"\" "
						 	+ ",\"ipaddress\":\""+IPAddress+"\" ,\"useragent\":\""+UserAgent+"\" ,\"totaltimespend\":\""+TotalTimeSpend+"\"  } " + "\n";
							 
 					System.out.println("Write to csv" );  	
					writer.writeNext(csvRow.split(","));
					writer.flush();
					
					System.out.println("Send json to stream" );  
					System.out.println(jsonRow );  	 
				 	PutRecordRequest putRecordRequest = new PutRecordRequest();
			        putRecordRequest.setStreamName(prop.getProperty("StreamName")); //name of aws stream you created
			        putRecordRequest.setPartitionKey("session" + "S1");
			        putRecordRequest.withData(ByteBuffer.wrap(jsonRow.getBytes()));
			        
			        PutRecordResult putRecordResult = amazonKinesis.putRecord(putRecordRequest);
 
			       // System.out.println("Return data from stream   " + "-" + putRecordResult.getSequenceNumber());  
			        
			        
		            
				 } 
	        
	        
				 i= System.currentTimeMillis();
				 Thread.sleep(1000);
				}
				
		  
			 
		}

	 
		 
		//@SuppressWarnings("deprecation")
		public static void main(String[] args) throws IOException, InterruptedException {
		 
			Properties prop = new Properties();
			//InputStream inputStream = LogGenerator.class
			  //      .getResourceAsStream("config.properties");
			//prop.load(inputStream);
			prop.load(new FileInputStream("~/Sessionlog/config.properties"));
			
         	String saveDir = prop.getProperty("Dir");
			createDirectoryIfNeeded(saveDir);
        	String filePath = saveDir + "/Sessionlog.csv";
			CSVWriter writer = new CSVWriter(new FileWriter(filePath), CSVWriter.DEFAULT_SEPARATOR,
					CSVWriter.NO_QUOTE_CHARACTER);
			//Header to send data
			String clientInfoHeader = "LogType,SessionId,UserId,StartTimeStamp,EndTimeStamp,PageId,Page_SessionId,IPAddress,UserAgent,TotalTimeSpend";
			writer.writeNext(clientInfoHeader.split(","));
			writer.flush();
			int totalMinutesecond =  Integer.parseInt( prop.getProperty("Duration"))  ;
			generateInformation(prop,writer, totalMinutesecond,10);
			writer.close(); 
			 
		}

 

}
