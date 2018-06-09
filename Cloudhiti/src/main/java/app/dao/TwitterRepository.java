package app.dao;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.Order;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import app.model.Job;
import app.model.JobDependent;
import app.model.TwitterKafka;
import app.model.User;
import app.model.WorkFlow;

@Repository
public class TwitterRepository {
	 
	
	private static final Logger LOGGER = LoggerFactory.getLogger(TwitterRepository.class);

	    @PersistenceContext
	    EntityManager em;

	     
	    public TwitterKafka save(TwitterKafka twitterKafka) {
	        return em.merge(twitterKafka);
	    }


		 /**
	    *
	    * counts the matching Twitter Kafka topic Name, given the bellow criteria
	    *
	    * @param user-id - the currently account
	    * @return -  a list of matching  Twitter Kafka topic Name, or an empty collection if no match found
	    */
	    public Long countKafkaTopicName(long userId) {

	        CriteriaBuilder cb = em.getCriteriaBuilder();

	        // query for counting the total results
	        CriteriaQuery<Long> cq = cb.createQuery(Long.class);
	        Root<TwitterKafka> countRoot = cq.from(TwitterKafka.class);
	        cq.select((cb.count(countRoot)));
	        List<Predicate> predicates = new ArrayList<>();
	        cq.where(predicates.toArray(new Predicate[]{}));
	         
 	        Long countKafkaTopicName = em.createQuery(cq).getSingleResult();

	        LOGGER.info("Found " + countKafkaTopicName + " results.");

	        return countKafkaTopicName;
	    }
	    
	    
	    public List<TwitterKafka> findKafkaTopicNames(Long userId) {
	    	CriteriaBuilder cb = em.getCriteriaBuilder();
	    	// the actual search query that returns one page of results
	        CriteriaQuery<TwitterKafka> searchQuery = cb.createQuery(TwitterKafka.class);
	        Root<TwitterKafka> searchRoot = searchQuery.from(TwitterKafka.class);
	        searchQuery.select(searchRoot);
	        
	        List<Predicate> predicates = new ArrayList<>();
		   
  		       
	        searchQuery.where(predicates.toArray(new Predicate[]{}));
	        
	        List<Order> orderList = new ArrayList<Order>();
	        orderList.add(cb.desc(searchRoot.get("id")));
	        searchQuery.orderBy(orderList);

	        TypedQuery<TwitterKafka> filterQuery = em.createQuery(searchQuery);
			
	        return filterQuery.getResultList();
		}
}
