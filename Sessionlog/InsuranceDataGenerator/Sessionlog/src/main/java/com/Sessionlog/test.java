package com.Sessionlog;

 
	import java.io.File;
	import java.io.FileInputStream;
	import java.io.FileWriter;
	import java.io.IOException;
	import java.nio.ByteBuffer;
	import java.text.SimpleDateFormat;
	import java.util.Date;
	import java.util.Properties;
	import java.util.Random;
	import java.nio.charset.StandardCharsets;
	import org.fluttercode.datafactory.impl.DataFactory;

	import au.com.bytecode.opencsv.CSVWriter;
	import com.amazonaws.auth.AWSCredentials;
	import com.amazonaws.auth.BasicAWSCredentials;

	import com.amazonaws.services.kinesisfirehose.AmazonKinesisFirehoseClient;
	import com.amazonaws.services.kinesisfirehose.model.DescribeDeliveryStreamRequest;
	import com.amazonaws.services.kinesisfirehose.model.DescribeDeliveryStreamResult;
	import com.amazonaws.services.kinesisfirehose.model.PutRecordRequest;
	import com.amazonaws.services.kinesisfirehose.model.PutRecordResult;
	import com.amazonaws.services.kinesisfirehose.model.Record;

	 
	public class test {
	//public class LogGenerator {
	 
			static final long unixTime = System.currentTimeMillis() / 1000L;
	   		static String[] userAgent={ "Mozilla/5.0" , "Windows NT 6.2; rv:20.0 " , "Gecko/20121202" , "Firefox/20.0"};
			static DataFactory df = new DataFactory();
			static Properties prop = new Properties();
			static String status = "UNDEFINED";
			
			
			public static void createDirectoryIfNeeded(String directoryName) {
				File theDir = new File(directoryName);
				// if the directory does not exist, create it
				if (!theDir.exists() && !theDir.isDirectory()) {
					theDir.mkdirs();
				}
			}

			public static void generateInformation(String saveDir, int row) throws IOException {

	 			
				prop.load(new FileInputStream("config.properties"));
				AWSCredentials credentials = new BasicAWSCredentials(prop.getProperty("accessKey"),prop.getProperty("secretKey"));
				String firehoseEndpointURL = prop.getProperty("firehoseEndpointURL");
				String deliveryStreamName =  prop.getProperty("deliveryStreamName");
	 			 
				AmazonKinesisFirehoseClient firehoseClient = new AmazonKinesisFirehoseClient(credentials);
				firehoseClient.setEndpoint(firehoseEndpointURL); 
		        DescribeDeliveryStreamRequest describeHoseRequest = new DescribeDeliveryStreamRequest() 
		                .withDeliveryStreamName(deliveryStreamName); 
		        DescribeDeliveryStreamResult  describeHoseResult = null;
		        
		        try { 
		            describeHoseResult = firehoseClient.describeDeliveryStream(describeHoseRequest); 
		            status = describeHoseResult.getDeliveryStreamDescription().getDeliveryStreamStatus(); 
		        } catch (Exception e) { 
		            System.out.println(e.getLocalizedMessage()); 
		            System.out.println("Firehose Not Existent...will create"); 
		 
	 	        } finally
		        {
	 	        	System.out.println("Firehose Not Existent...will create"); 
		        }
		        
		        if(status.equalsIgnoreCase("ACTIVE")){ 
		        	System.out.println("Firehose ACTIVE"); 
		        	
		        	
		        	createDirectoryIfNeeded(saveDir);
					String filePath = saveDir + "/Sessionlog.csv";
					CSVWriter writer = new CSVWriter(new FileWriter(filePath), CSVWriter.DEFAULT_SEPARATOR,
							CSVWriter.NO_QUOTE_CHARACTER);
					
					
					 
					//Header to send data
					String clientInfoHeader = "LogType,SessionId,UserId,StartTimeStamp,EndTimeStamp,PageId,Page_SessionId,IPAddress,UserAgent,TotalTimeSpend";
					writer.writeNext(clientInfoHeader.split(","));
					writer.flush();
					
					for (int i = 0; i < row; i++) {
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
		 				
					//	String jsonRow = LogType + "," + SessionId + "," + UserId + "," + StartTimeStamp + "," + EndTimeStampPageId  + "," + PageId + "," + Page_SessionId + ","
						//		+ IPAddress + "," + UserAgent + "," + TotalTimeSpend   ;
						String jsonRow = "{\"LogType\":\""+LogType+"\" ,\"SessionId\":\""+SessionId+"\" ,\"UserId\":\""+UserId+"\" ,\"StartTimeStamp\":\""+StartTimeStamp+"\" ,"
								+ "\"EndTimeStampPageId\":\""+EndTimeStampPageId+"\" ,\"PageId\":\""+PageId+"\" ,\"Page_SessionId\":\""+Page_SessionId+"\" "
								+ ",\"IPAddress\":\""+IPAddress+"\" ,\"UserAgent\":\""+UserAgent+"\" ,\"TotalTimeSpend\":\""+TotalTimeSpend+"\" " + "\n";
								 
								
						writer.writeNext(jsonRow.split("\n"));
						writer.flush();
						
						 
				        Record record = new Record()
				        		.withData(ByteBuffer.wrap(jsonRow.getBytes()));  
				        PutRecordRequest putRecordInHoseRequest = new PutRecordRequest() 
			                    .withDeliveryStreamName(deliveryStreamName) 
			                    .withRecord(record); 
			 
			            PutRecordResult res = firehoseClient.putRecord(putRecordInHoseRequest); 
			            System.out.println(res.toString());
			            
		        } 
		        
		        
				 
				
				}

				//writer.close();
				 
			}

		 
			 
			@SuppressWarnings("deprecation")
			public static void main(String[] args) throws IOException {
				/*
				 * if (args.length < 2) { System.out.println(
				 * "Please enter <Destination Location> <No no Line>"); } else { String
				 * destLocation = args[0]; int row = Integer.parseInt(args[1]);
				 * generateClientInformation(destLocation, row); }
				 */
				
				 
				//generateInformation("C:/Users/abistat/Desktop/assets", 10);
				
				 
		      /*  AWSCredentials credentials = new BasicAWSCredentials("AKIAIKEW7WHMOYM2QUTQ", "kpZX6gXZvMJnMWSVmTiiUPNaGvzZsy8eNlGvbKQ8");
				String firehoseEndpointURL = "https://firehose.us-west-2.amazonaws.com"; 
				String deliveryStreamName = "testingstreaming";
	 			
				
				AmazonKinesisFirehoseClient firehoseClient = new AmazonKinesisFirehoseClient(credentials);
				firehoseClient.setEndpoint(firehoseEndpointURL); 
		        DescribeDeliveryStreamRequest describeHoseRequest = new DescribeDeliveryStreamRequest() 
		                .withDeliveryStreamName(deliveryStreamName); 
		        DescribeDeliveryStreamResult  describeHoseResult = null;
		        String status = "UNDEFINED";
		        
		        try { 
		            describeHoseResult = firehoseClient.describeDeliveryStream(describeHoseRequest); 
		            status = describeHoseResult.getDeliveryStreamDescription().getDeliveryStreamStatus(); 
		        } catch (Exception e) { 
		            System.out.println(e.getLocalizedMessage()); 
		            System.out.println("Firehose Not Existent...will create"); 
		 
	 	        } 
		        if(status.equalsIgnoreCase("ACTIVE")){ 
		        	System.out.println("Firehose ACTIVE"); 
		            //return; 
		        } 
		        String data = "{\"ticker_symbol\":\"QXZ\"}";
		        Record record = new Record()
		        		.withData(ByteBuffer.wrap(data.getBytes()));  
		        PutRecordRequest putRecordInHoseRequest = new PutRecordRequest() 
	                    .withDeliveryStreamName(deliveryStreamName) 
	                    .withRecord(record); 
	 
	            PutRecordResult res = firehoseClient.putRecord(putRecordInHoseRequest); 
	            System.out.println(res.toString());*/
		        
				/*String data = "{\"ticker_symbol\":\"QXZ\"}";
				
	 			Record record = new Record();
				record.setData(ByteBuffer.wrap(data.getBytes(StandardCharsets.UTF_8)));
				//
				PutRecordRequest putRecordRequest = new PutRecordRequest()
						.withDeliveryStreamName("testingstreaming")
						.withRecord(record);
						putRecordRequest.setRecord(record);
						PutRecordResult result = firehoseClient.putRecord(putRecordRequest);
						System.out.println("Result Inserted with ID: "+result.getRecordId());*/
				
		 
			}

	 

	//}

}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
/*	package com.Sessionlog;

	import java.io.File;
	import java.io.FileInputStream;
	import java.io.FileWriter;
	import java.io.IOException;
	 import java.util.Properties;
	import java.util.Random;
	 import org.fluttercode.datafactory.impl.DataFactory;

	import au.com.bytecode.opencsv.CSVWriter;*/
	/*import com.amazonaws.auth.AWSCredentials;
	import com.amazonaws.auth.AWSStaticCredentialsProvider;
	import com.amazonaws.auth.BasicAWSCredentials;
	import com.amazonaws.regions.Regions;
	import com.amazonaws.services.kinesis.AmazonKinesis;
	import com.amazonaws.services.kinesis.AmazonKinesisClientBuilder;
	import com.amazonaws.services.kinesisfirehose.AmazonKinesisFirehoseClient;
	import com.amazonaws.services.kinesisfirehose.model.DescribeDeliveryStreamRequest;
	import com.amazonaws.services.kinesisfirehose.model.DescribeDeliveryStreamResult;
	import com.amazonaws.services.kinesisfirehose.model.PutRecordRequest;
	import com.amazonaws.services.kinesisfirehose.model.PutRecordResult;
	import com.amazonaws.services.kinesisfirehose.model.Record;
	*/
/*	import com.amazonaws.auth.AWSStaticCredentialsProvider;
	import com.amazonaws.auth.BasicAWSCredentials;
	import com.amazonaws.regions.Regions;
	import com.amazonaws.services.kinesis.AmazonKinesis;
	import com.amazonaws.services.kinesis.AmazonKinesisClientBuilder;
	 

	public class LogGenerator {
	 
			static final long unixTime = System.currentTimeMillis() / 1000L;
	   		static String[] userAgent={ "Mozilla/5.0" , "Windows NT 6.2; rv:20.0 " , "Gecko/20121202" , "Firefox/20.0"};
			static DataFactory df = new DataFactory();
			static Properties prop = new Properties();
			static String status = "ACTIVE";
			
			
			public static void createDirectoryIfNeeded(String directoryName) {
				File theDir = new File(directoryName);
				// if the directory does not exist, create it
				if (!theDir.exists() && !theDir.isDirectory()) {
					theDir.mkdirs();
				}
			}

			public static void generateInformation(String saveDir, int row) throws IOException, InterruptedException {

	 			
				prop.load(new FileInputStream("config.properties"));*/
				/*AWSCredentials credentials = new BasicAWSCredentials(prop.getProperty("accessKey"),prop.getProperty("secretKey"));
				String firehoseEndpointURL = prop.getProperty("firehoseEndpointURL");
				String deliveryStreamName =  prop.getProperty("deliveryStreamName");
	 			 
				AmazonKinesisFirehoseClient firehoseClient = new AmazonKinesisFirehoseClient(credentials);
				firehoseClient.setEndpoint(firehoseEndpointURL); 
		        DescribeDeliveryStreamRequest describeHoseRequest = new DescribeDeliveryStreamRequest() 
		                .withDeliveryStreamName(deliveryStreamName); 
		        DescribeDeliveryStreamResult  describeHoseResult = null;
		        
		        try {   
		            describeHoseResult = firehoseClient.describeDeliveryStream(describeHoseRequest); 
		            status = describeHoseResult.getDeliveryStreamDescription().getDeliveryStreamStatus(); 
		        } catch (Exception e) { 
		            System.out.println(e.getLocalizedMessage()); 
		            System.out.println("Firehose Not Existent...will create"); 
		 
	 	        } finally
		        {
	 	        	System.out.println("Firehose Login"); 
		        }*/
				
				
				/*BasicAWSCredentials awsCreds = new BasicAWSCredentials(prop.getProperty("accessKey"),prop.getProperty("secretKey"));

			    AmazonKinesis amazonKinesis = AmazonKinesisClientBuilder
			                .standard().withRegion(Regions.US_WEST_2)
			                .withCredentials(new AWSStaticCredentialsProvider(awsCreds))
			                .build();
			    
			    
		        
		        if(status.equalsIgnoreCase("ACTIVE")){ 
		        	System.out.println("Firehose ACTIVE"); 
		        	
		        	
		        	createDirectoryIfNeeded(saveDir);
					String filePath = saveDir + "/Sessionlog.csv";
					CSVWriter writer = new CSVWriter(new FileWriter(filePath), CSVWriter.DEFAULT_SEPARATOR,
							CSVWriter.NO_QUOTE_CHARACTER);
					
					
					 
					//Header to send data
					String clientInfoHeader = "LogType,SessionId,UserId,StartTimeStamp,EndTimeStamp,PageId,Page_SessionId,IPAddress,UserAgent,TotalTimeSpend";
					writer.writeNext(clientInfoHeader.split(","));
					writer.flush();
					
					
					long startTime = System.currentTimeMillis();
					long endTime = startTime + 60000 + 60000;
					//System.out.println(endTime - startTime );  
					
					for (long i = startTime ; i < endTime; i++) {
					//System.out.println(endTime - startTime );  	
						
					 
	                
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
						String jsonRow = "{\"LogType\":\""+LogType+"\" ,\"SessionId\":\""+SessionId+"\" ,\"UserId\":\""+UserId+"\" ,\"StartTimeStamp\":\""+StartTimeStamp+"\" ,"
							 	+ "\"EndTimeStampPageId\":\""+EndTimeStampPageId+"\" ,\"PageId\":\""+PageId+"\" ,\"Page_SessionId\":\""+Page_SessionId+"\" "
							 	+ ",\"IPAddress\":\""+IPAddress+"\" ,\"UserAgent\":\""+UserAgent+"\" ,\"TotalTimeSpend\":\""+TotalTimeSpend+"\"  } " + "\n";
								 
						//String jsonRow= "{\"timestamp\":\"" + new Date().getTime() + "\"}"; 
						writer.writeNext(csvRow.split(","));
						writer.flush();*/
						
						 
						/*PutRecordRequest putRecordRequest = new PutRecordRequest();
				        putRecordRequest.setStreamName("TestCloudhiti"); //name of aws stream you created
				        putRecordRequest.setPartitionKey("session" + "S1");
				        putRecordRequest.withData(ByteBuffer.wrap(jsonRow.getBytes()));
				        
				        PutRecordResult putRecordResult = amazonKinesis.putRecord(putRecordRequest);

				        System.out.println(putRecordResult.getSequenceNumber());*/
				        
				        /* Record record = new Record()
				        		.withData(ByteBuffer.wrap(jsonRow.getBytes()));  
				        PutRecordRequest putRecordInHoseRequest = new PutRecordRequest() 
			                    .withDeliveryStreamName(deliveryStreamName) 
			                    .withRecord(record); 
			 
			            PutRecordResult res = firehoseClient.putRecord(putRecordInHoseRequest); 
			            System.out.println(res.toString());*/
			            
					 /*} 
		        
		        
					 i= System.currentTimeMillis();
					 Thread.sleep(1000);
					}
					
				}
*/
				//writer.close();
				 
		//	}

		 
			 
			/*@SuppressWarnings("deprecation")
			public static void main(String[] args) throws IOException, InterruptedException {
				
				 * if (args.length < 2) { System.out.println(
				 * "Please enter <Destination Location> <No no Line>"); } else { String
				 * destLocation = args[0]; int row = Integer.parseInt(args[1]);
				 * generateClientInformation(destLocation, row); }
				 
				
				 
				//generateInformation("C:/Users/abistat/Desktop/assets", 10);
				 
				 
			}

	 

	}*/

