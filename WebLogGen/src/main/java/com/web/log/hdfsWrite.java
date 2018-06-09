/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.web.log;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.OutputStreamWriter;
 import java.io.*;
import java.net.URI;
import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.FileSystem;
import org.apache.hadoop.fs.Path;
import java.io.File;
import java.io.FileWriter;
import java.io.BufferedWriter;
import java.io.IOException;
 
public class hdfsWrite {
    public static void writetemp(String str,String fn){
    try{
    		//String data = " This content will append to the end of the file";
 
    		File file =new File("/tmp/"+fn);
 
    		//if file doesnt exists, then create it
    		if(!file.exists()){
    			file.createNewFile();
    		}
 
    		//true = append file
    		FileWriter fileWritter = new FileWriter(file.getName(),true);
    	        BufferedWriter bufferWritter = new BufferedWriter(fileWritter);
    	        bufferWritter.write(str);
    	        bufferWritter.close();
 
	        //System.out.println("Done");
 
    	}catch(IOException e){
    		e.printStackTrace();
    	}
    }
    public static void Del(String filename){
                File file = new File(filename);
 
                        if(file.delete()){
                        	System.out.println(file.getName() + " is deleted!");
        		}else{
        			System.out.println("Delete operation is failed.");
                	}
    }
    public static void copyFromLocal(String src) throws IOException, InterruptedException{
         Configuration conf =new Configuration();
        FileSystem fs = FileSystem.get(conf);
        Path sourcePath = new Path(src);
        Path destPath = new Path("/user/TwitterDataStore/");
        if(!(fs.exists(destPath)))
        {
            System.out.println("No Such destination exists :"+destPath);
            return;
        }
         
        fs.copyFromLocalFile(sourcePath, destPath);
        
        
    }
    public static void Writetohdfs(String args,String contnt) throws IOException,Exception{
       // if (args.length < 2) {
         //   System.out.println("Usage: WriteToHDFS <hdfs-file-path-to-write-into> <text-to-write-in-file>");
           // System.out.println("Example: WriteToHDFS 'hdfs:/localhost:9000/myFirstSelfWriteFile' 'Hello HDFS world'");
            //System.exit(-1);
        //}
        
    	System.out.println("in hdfswrite");
            Path path = new Path(args);
//            FileSystem fileSystem = FileSystem.get(new Configuration());
            Configuration conf=new Configuration();
            conf.addResource("/etc/hadoop/conf/core-site.xml");
            FileSystem fileSystem= FileSystem.get(conf);
            System.out.println(fileSystem.getConf());
            
            BufferedWriter bufferedWriter = new BufferedWriter(new OutputStreamWriter(fileSystem.create(path, true)));
            bufferedWriter.write(contnt);
            bufferedWriter.close();
        //    return bufferedWriter;
       
    }
 
    public static void main(String[] args) throws Exception {

        if (args.length < 2) {
            System.out.println("Usage: WriteToHDFS <hdfs-file-path-to-write-into> <text-to-write-in-file>");
            System.out.println("Example: WriteToHDFS 'hdfs:/localhost:9000/myFirstSelfWriteFile' 'Hello HDFS world'");
            System.exit(-1);
        }
        try {
            Path path = new Path(args[0]);
            //FileSystem fileSystem = FileSystem.get(new Configuration());
            FileSystem fileSystem=		FileSystem.get(new URI("hdfs://ec2-54-237-157-2.compute-1.amazonaws.com:8020"), new Configuration());
            BufferedWriter bufferedWriter = new BufferedWriter(new OutputStreamWriter(fileSystem.create(path, true)));
            bufferedWriter.write(args[1]);
            bufferedWriter.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
     }
}
