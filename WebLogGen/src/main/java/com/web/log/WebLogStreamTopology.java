package com.web.log;


import backtype.storm.Config;
import backtype.storm.LocalCluster;
import backtype.storm.StormSubmitter;

import backtype.storm.topology.TopologyBuilder;


public class WebLogStreamTopology {
	 public static void main(String[] args)  
	    {
	        TopologyBuilder builder = new TopologyBuilder();

	      Config conf = new Config();	        
	        builder.setSpout( "spout",new WebLogStreamSpout("/home/sany/Desktop/weblog.csv"),1);
	        //builder.setBolt("bolt",bolt,4).shuffleGrouping("spout");
	        builder.setBolt( "bolt", new WebLogStreamBolt("/data/") ).shuffleGrouping("spout");	   
	        LocalCluster cluster = new LocalCluster();
	        
	        try {
	        	StormSubmitter.submitTopology("WebLogStreaming", conf, builder.createTopology());
	        	//cluster.submitTopology("WebLogStreaming", conf, builder.createTopology());	
			} catch (Exception e) {
				
				System.out.println("Error:"+e);
				//System.out.print("Error submiting Topology", e);
			}

	    }
}
