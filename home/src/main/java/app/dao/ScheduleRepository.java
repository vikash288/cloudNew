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
import app.model.Schedule;
import app.model.User;
 
/**
 *
 * Repository class for the Schedule entity
 *
 */
@Repository
public class ScheduleRepository {

    private static final Logger LOGGER = LoggerFactory.getLogger(ScheduleRepository.class);

    @PersistenceContext
    EntityManager em;

     
   
    /**
    *
    * counts the matching Schedule, given the bellow criteria
    *
    * @param user-id - the currently account
    * @return -  a list of matching Schedule, or an empty collection if no match found
    */
    public Long countSchedules(long userId) {

        CriteriaBuilder cb = em.getCriteriaBuilder();

        // query for counting the total results
        CriteriaQuery<Long> cq = cb.createQuery(Long.class);
        Root<Schedule> countRoot = cq.from(Schedule.class);
        cq.select((cb.count(countRoot)));
        cq.where(getCommonWhereCondition(cb, userId, countRoot));
        Long resultsCount = em.createQuery(cq).getSingleResult();

        LOGGER.info("Found " + resultsCount + " results.");

        return resultsCount;
    }

    /**
     *
     * finds a list of Schedule, given the bellow criteria
     *
     * @param user-id - the currently account
     * @return -  a list of matching Schedule, or an empty collection if no match found
     */
    public List<Schedule> findSchedules(long userId) {

        CriteriaBuilder cb = em.getCriteriaBuilder();

        // the actual search query that returns one page of results
        CriteriaQuery<Schedule> searchQuery = cb.createQuery(Schedule.class);
        Root<Schedule> searchRoot = searchQuery.from(Schedule.class);
        searchQuery.select(searchRoot);
        searchQuery.where(getCommonWhereCondition(cb, userId, searchRoot));

        List<Order> orderList = new ArrayList<Order>();
        orderList.add(cb.desc(searchRoot.get("id")));
        searchQuery.orderBy(orderList);

        TypedQuery<Schedule> filterQuery = em.createQuery(searchQuery);
		
        return filterQuery.getResultList();
    }
   
    /**
     * finds a Schedule given its id
     *
     * @param id - the id of the searched Schedule
     * @return  a matching Schedule, or null if no Schedule found.
    */
    public Schedule findScheduleByID(long id) {

        List<Schedule> schedule = em.createNamedQuery(Schedule.FIND_BY_ID, Schedule.class)
                .setParameter("id", id)
                .getResultList();

        return schedule.size() == 1 ? schedule.get(0) : null;
    }
    
    
    public Schedule save(Schedule schedule) {
        return em.merge(schedule);
    }

    
    
    private Predicate[] getCommonWhereCondition(CriteriaBuilder cb, long userId, Root<Schedule> searchRoot) {
    	
	       List<Predicate> predicates = new ArrayList<>();
	       Join<Schedule , User> user = searchRoot.join("user");
	
	       predicates.add(cb.equal(user.get("id"), userId));
	
	       return predicates.toArray(new Predicate[]{});
	   }

    
}
