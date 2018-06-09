package com.web.log;
import backtype.storm.task.OutputCollector;



import backtype.storm.task.TopologyContext;
import backtype.storm.topology.OutputFieldsDeclarer;
import backtype.storm.topology.base.BaseRichBolt;
import backtype.storm.tuple.Tuple;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.util.Calendar;
import java.util.HashMap;
import java.util.Map;
import java.util.SortedMap;
import java.util.TimeZone;
import java.util.TreeMap;



public class WebLogStreamBolt  extends BaseRichBolt {
	Calendar cal = Calendar.getInstance(TimeZone.getTimeZone("GMT"));
    String time = cal.getTime().toString();
    String filename="";String hdfFoldername="";
    public  WebLogStreamBolt(String hdfFoldername) {
    	filename= hdfFoldername+"weblogstreaming"+time.replace(" ", "").replace(":", "")+".txt";
    	hdfFoldername=hdfFoldername;
	}

	@Override
	public void prepare(Map map, TopologyContext topologyContext, OutputCollector collector) {

    }
	
	@Override
	public void declareOutputFields(OutputFieldsDeclarer arg0) {
		// TODO Auto-generated method stub
		
	}
	String FinalString="";
	int count=0;

	@Override
	public void execute(Tuple arg0) {
		
		System.out.println("here comes Data-->"+arg0.getValueByField("word"));
		 FinalString +=arg0.getValueByField("word")+"\n";
		if(count==100){
			try {
				System.out.println("before hdfs write");
				hdfsWrite.Writetohdfs(filename,FinalString);
			} catch (IOException e) {
				e.printStackTrace();
			} catch (Exception e) {
				e.printStackTrace();
			}
			FinalString="";
			count=0;
			cal = Calendar.getInstance(TimeZone.getTimeZone("GMT"));
			time = cal.getTime().toString();
			filename= hdfFoldername+"weblogstreaming"+time.replace(" ", "").replace(":", "")+".txt";
		}
		count++;
		
		
		
	}
	
	
}