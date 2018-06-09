package com.web.log;
import backtype.storm.spout.SpoutOutputCollector;
import backtype.storm.task.TopologyContext;
import backtype.storm.topology.OutputFieldsDeclarer;
import backtype.storm.topology.base.BaseRichSpout;
import backtype.storm.tuple.Fields;
import backtype.storm.tuple.Values;
import backtype.storm.utils.Utils;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Random;

/*import org.hibernate.dialect.HSQLDialect.ReadUncommittedLockingStrategy;

import com.oneline.util.FileReaderUtil;
*/
public class WebLogStreamSpout extends BaseRichSpout {
	  SpoutOutputCollector _collector;
	  Random _rand;
	  List<String> dataLines=new ArrayList<String>();
	  String filename="";
	  public  WebLogStreamSpout(String filepath) {

		  filename=filepath;
	}

	  @Override
	  public void open(Map conf, TopologyContext context, SpoutOutputCollector collector) {
	    _collector = collector;
	    _rand = new Random();
	    String line;
	    BufferedReader br;
		try {
			br = new BufferedReader(new FileReader(filename));
			 while((line=br.readLine())!=null)
			    {
			     dataLines.add(line);
			    		 //FileReaderUtil.toLines(filename);
			    }
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	   
	  }

	  @Override
	  public void nextTuple() {
	    Utils.sleep(100);

	    for(String li:dataLines){
	    		
	    		_collector.emit(new Values(li));
	  	}
	  }

	  @Override
	  public void ack(Object id) {
	  }

	  @Override
	  public void fail(Object id) {
	  }

	  @Override
	  public void declareOutputFields(OutputFieldsDeclarer declarer) {
	    declarer.declare(new Fields("word"));
	  }
}