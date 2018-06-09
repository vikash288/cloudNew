package app.controllers;

import java.security.Principal;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;
import java.sql.ResultSet;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

 
import app.dto.AWSCredentialsDTO;
import app.dto.JobDTO;
import app.dto.JobsDTO;
import app.dto.TwitterKafkaDTO;
import app.dto.TwitterKafkasDTO;
import app.model.Job;
import app.model.SearchResult;
import app.model.TwitterKafka;
import app.services.TwitterService;

@Controller
@RequestMapping("Twitter")

public class TwitterController {
	
	
	private static final Logger LOGGER = LoggerFactory.getLogger(TwitterController.class);

    @Autowired
    private TwitterService twitterService;
	
	/**
    *
    * saves a topic name 
    *
    * @param topic name - the list of schedules to save
    * @return - an updated version of the saved schedules
    */
    @ResponseBody
    @ResponseStatus(HttpStatus.OK)
    @RequestMapping(method = RequestMethod.POST)
    public List<TwitterKafka> saveTopics(@RequestBody List<TwitterKafkaDTO> twitterKafkaDTO){
       List<TwitterKafka> savedTwitterKafkaDTO = twitterService.saveTwitterKafkas(twitterKafkaDTO);
       return savedTwitterKafkaDTO;
   }
    
	/**
    *
    * list topic name 
    *
    * @param topic name - the list of schedules to save
    * @return - an updated version of the saved schedules
    */
    @ResponseBody
    @ResponseStatus(HttpStatus.OK)
    @RequestMapping( method = RequestMethod.GET)
    public TwitterKafkasDTO searchTwitterKafkaTopics(Principal principal , @RequestParam("userId") Long userId) {
    
       SearchResult<TwitterKafka> result;
	   result = twitterService.findKafkaTopicNames(userId);
	   result.getResultsCount();
	   
	   return new TwitterKafkasDTO(TwitterKafkaDTO.mapFromTwitterKafkaEntities(result.getResult()));
   } 
    
    /**
    *
    * saves a topic name 
    *
    * @param topic name - the list of schedules to save
    * @return - an updated version of the saved schedules
    */
    /*@ResponseBody
    @ResponseStatus(HttpStatus.OK)
    @RequestMapping(value = "/operationalreport" ,method = RequestMethod.POST)
    public TwitterKafkasDTO  operationalreport(Principal principal , @RequestParam("userId") Long userId){

		try {
			Class.forName("com.mysql.jdbc.Driver");
			Connection con = DriverManager.getConnection("jdbc:mysql://107.180.2.11:3306/cloudhitiMain", "cloudhitiadmin", "cloudhitiadmin2017");
			 
			Statement stmt = con.createStatement();
			ResultSet rs = stmt.executeQuery("");
			while (rs.next())
			{}
				 
			con.close();
		} catch (Exception e) {
			System.out.println(e);
		}
		 
		jdbc:mysql://107.180.2.11:3306/cloudhitidemo
		return null;
	}*/
 
}
