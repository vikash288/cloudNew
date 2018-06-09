package app.services;

import static org.springframework.util.Assert.notNull;

import java.util.List;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import app.dao.TwitterRepository;
import app.dto.TwitterKafkaDTO;
import app.model.AWSCredentials;
import app.model.SearchResult;
import app.model.TwitterKafka;

@Service
public class TwitterService {
	
	@SuppressWarnings("unused")
	private static final Logger LOGGER = LoggerFactory.getLogger(TwitterService.class);
	
	
    @Autowired
    private TwitterRepository  twitterRepository;
    
    
    /**
    *
    * saves a list of Twitter (new or not) into the database
    *
    * @param twitterTopics - the list of Twitter to be saved
    * @return - the new versions of the saved Twitter
    */
    
    @Transactional
    public TwitterKafka saveTwitterKafkaName( Long id,String twitterKafkaName) {

        notNull(twitterKafkaName, "twitterKafkaName is mandatory");
 		
            
        TwitterKafka twitterKafka = null;
        if(id != null  ){
				// Do nothing if Job / Trigger already exists !!
				
			} else {
 				
				twitterKafka = twitterRepository.save(new TwitterKafka(twitterKafkaName));
			}
		 
        return twitterKafka;
    }
    
    
    /**
    *
    * saves a list of Twitter (new or not) into the database
    *
    * @param twitterTopics - the list of Twitter to be saved
    * @return - the new versions of the saved Twitter
    */
    @Transactional
    public List<TwitterKafka> saveTwitterKafkas(List<TwitterKafkaDTO> twitterTopics)  {
       return twitterTopics.stream()
               .map((twitterTopic) -> saveTwitterKafkaName(twitterTopic.getId(),
            		   twitterTopic.gettwitterKafkaName()
 					 ))
               .collect(Collectors.toList());
    }
    
    
    /**
    *
    * searches Twitter Kafka Name
    *
    * @param username - the currently logged in user
    * @return - the found results
    */
   @Transactional(readOnly = true)
   public SearchResult<TwitterKafka> findKafkaTopicNames(Long userId) {

       Long resultsCount = twitterRepository.countKafkaTopicName(userId);

       List<TwitterKafka> twitterKafka = twitterRepository.findKafkaTopicNames(userId);

       return new SearchResult<>(resultsCount, twitterKafka);
   }
}
