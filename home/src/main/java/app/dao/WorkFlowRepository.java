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
import app.model.User;
import app.model.WorkFlow;
import app.model.WorkFlowDependent;

@Repository
public class WorkFlowRepository {

	private static final Logger LOGGER = LoggerFactory.getLogger(WorkFlowRepository.class);
	
	 @PersistenceContext
	 EntityManager em;
	 
	 /**
	    *
	    * counts the matching WorkFlow, given the bellow criteria
	    *
	    * @param user-id - the currently account
	    * @return -  a list of matching WorkFlow, or an empty collection if no match found
	    */
	    public Long countWorkFlows(long userId) {

	        CriteriaBuilder cb = em.getCriteriaBuilder();

	        // query for counting the total results
	        CriteriaQuery<Long> cq = cb.createQuery(Long.class);
	        Root<WorkFlow> countRoot = cq.from(WorkFlow.class);
	        cq.select((cb.count(countRoot)));
	        cq.where(getCommonWhereCondition(cb, userId, countRoot));
	        Long resultsCount = em.createQuery(cq).getSingleResult();

	        LOGGER.info("Found " + resultsCount + " results.");

	        return resultsCount;
	    }

	    /**
	     *
	     * finds a list of WorkFlow, given the bellow criteria
	     *
	     * @param user-id - the currently account
	     * @return -  a list of matching folders, or an empty collection if no match found
	     */
	    public List<WorkFlow> findWorkFlows(long userId) {

	        CriteriaBuilder cb = em.getCriteriaBuilder();

	        // the actual search query that returns one page of results
	        CriteriaQuery<WorkFlow> searchQuery = cb.createQuery(WorkFlow.class);
	        Root<WorkFlow> searchRoot = searchQuery.from(WorkFlow.class);
	        searchQuery.select(searchRoot);
	        searchQuery.where(getCommonWhereCondition(cb, userId, searchRoot));

	        List<Order> orderList = new ArrayList<Order>();
	        orderList.add(cb.desc(searchRoot.get("id")));
	        searchQuery.orderBy(orderList);

	        TypedQuery<WorkFlow> filterQuery = em.createQuery(searchQuery);
			
	        return filterQuery.getResultList();
	    }
	   
	    /**
	 *
	 * save changes made to a WorkFlow, or create the workFlow if its a new workFlow.
	 *
	 */
	public WorkFlow save(WorkFlow workFlow) {
	    return em.merge(workFlow);
	}
	
	
	 
	 /**
	 *
	 * save changes made to a WorkFlow, or create the job if its a new job.
	 *
	 */
	public WorkFlowDependent saveDependent(WorkFlowDependent workFlowDependent) {
	    return em.merge(workFlowDependent);
	}
	
	
	private Predicate[] getCommonWhereCondition(CriteriaBuilder cb, long userId, Root<WorkFlow> searchRoot) {
		
	       List<Predicate> predicates = new ArrayList<>();
	       Join<Job , User> user = searchRoot.join("user");
	
	       predicates.add(cb.equal(user.get("id"), userId));
	
	       return predicates.toArray(new Predicate[]{});
	   }
}
