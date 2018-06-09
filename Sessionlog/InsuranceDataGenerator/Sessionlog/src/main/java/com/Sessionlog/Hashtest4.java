package com.Sessionlog;
import java.util.*;  


public class Hashtest4 {
    //Non-generic  
     public static void main(String[] args) {  
        Map map=new HashMap();  
        //Adding elements to map  
         
        map.put(2,"Jai");  
     
        //Traversing Map  
       // Set set=map.entrySet();//Converting to Set so that we can traverse  
        Iterator itr=map.entrySet().iterator();  
        while(itr.hasNext()){  
            //Converting to Map.Entry so that we can get key and value separately  
            Map.Entry entry=(Map.Entry)itr.next();  
            System.out.println(entry.getKey()+" "+entry.getValue()); 
        	//System.out.println(itr.hasNext());
        }  
    }  
  
}
