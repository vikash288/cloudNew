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
import app.model.JobType;
import app.model.ServerCredentials;
import app.model.ServerType;
import app.model.User;

@Repository
public class JobRepository {

	 private static final Logger LOGGER = LoggerFactory.getLogger(JobRepository.class);
	 
	 @PersistenceContext
	 EntityManager em;
	 /**
	    *
	    * counts the matching servercredentials, given the bellow criteria
	    *
	    * @param user-id - the currently account
	    * @return -  a list of matching servercredentials, or an empty collection if no match found
	    */
	    public Long countJobs(long userId) {

	        CriteriaBuilder cb = em.getCriteriaBuilder();

	        // query for counting the total results
	        CriteriaQuery<Long> cq = cb.createQuery(Long.class);
	        Root<Job> countRoot = cq.from(Job.class);
	        cq.select((cb.count(countRoot)));
	        cq.where(getCommonWhereCondition(cb, userId, countRoot));
	        Long resultsCount = em.createQuery(cq).getSingleResult();

	        LOGGER.info("Found " + resultsCount + " results.");

	        return resultsCount;
	    }

	    /**
	     *
	     * finds a list of folders, given the bellow criteria
	     *
	     * @param account-id - the currently account
	     * @return -  a list of matching folders, or an empty collection if no match found
	     */
	    public List<Job> findJobs(long userId) {

	        CriteriaBuilder cb = em.getCriteriaBuilder();

	        // the actual search query that returns one page of results
	        CriteriaQuery<Job> searchQuery = cb.createQuery(Job.class);
	        Root<Job> searchRoot = searchQuery.from(Job.class);
	        searchQuery.select(searchRoot);
	        searchQuery.where(getCommonWhereCondition(cb, userId, searchRoot));

	        List<Order> orderList = new ArrayList<Order>();
	        orderList.add(cb.desc(searchRoot.get("id")));
	        searchQuery.orderBy(orderList);

	        TypedQuery<Job> filterQuery = em.createQuery(searchQuery);
			
	        return filterQuery.getResultList();
	    }
	   
	    public List<JobDependent> findJobDependents(Long userId) {
	    	CriteriaBuilder cb = em.getCriteriaBuilder();
	    	// the actual search query that returns one page of results
	        CriteriaQuery<JobDependent> searchQuery = cb.createQuery(JobDependent.class);
	        Root<JobDependent> searchRoot = searchQuery.from(JobDependent.class);
	        searchQuery.select(searchRoot);
	        
	        List<Predicate> predicates = new ArrayList<>();
		    Join<JobDependent , Job> job = searchRoot.join("job");
		    Join<Job , User> user = job.join("user");
		    predicates.add(cb.equal(user.get("id"), userId));
  		       
	        searchQuery.where(predicates.toArray(new Predicate[]{}));
	        
	        List<Order> orderList = new ArrayList<Order>();
	        orderList.add(cb.desc(searchRoot.get("id")));
	        searchQuery.orderBy(orderList);

	        TypedQuery<JobDependent> filterQuery = em.createQuery(searchQuery);
			
	        return filterQuery.getResultList();
		}
	    
	    
	    
	    public List<JobDependent> findJobDependentByID(Long userId, Long jobId) {
	    	CriteriaBuilder cb = em.getCriteriaBuilder();
	    	// the actual search query that returns one page of results
	        CriteriaQuery<JobDependent> searchQuery = cb.createQuery(JobDependent.class);
	        Root<JobDependent> searchRoot = searchQuery.from(JobDependent.class);
	        searchQuery.select(searchRoot);
	        
	       
	        List<Predicate> predicates = new ArrayList<>();
		    Join<JobDependent , Job> job = searchRoot.join("job");
		    Join<Job , User> user = job.join("user");
		    predicates.add(cb.equal(user.get("id"), userId));
		    predicates.add(cb.equal(job.get("id"),jobId));
		    
	        searchQuery.where(predicates.toArray(new Predicate[]{}));
	        
	        List<Order> orderList = new ArrayList<Order>();
	        orderList.add(cb.desc(searchRoot.get("id")));
	        searchQuery.orderBy(orderList);

	        TypedQuery<JobDependent> filterQuery = em.createQuery(searchQuery);
			
	        return filterQuery.getResultList();
		}
	    
	    /**
	    *
	    * counts the matching job type, given the bellow criteria
	    *
	    * @param user-id - the currently account
	    * @return -  a list of matching job type, or an empty collection if no match found
	    */
	    public Long countJobTypes(long userId) {

	    	 CriteriaBuilder cb = em.getCriteriaBuilder();

	         // query for counting the total results
	         CriteriaQuery<Long> cq = cb.createQuery(Long.class);
	         Root<JobType> countRoot = cq.from(JobType.class);
	         cq.select((cb.count(countRoot)));
	         Long resultsCount = em.createQuery(cq).getSingleResult();

	          return resultsCount;
	    }

	    /**
	     *
	     * finds a list of job type, given the bellow criteria
	     *
	     * @param account-id - the currently account
	     * @return -  a list of matching job type, or an empty collection if no match found
	     */
	    public List<JobType> findJobTypes(long userId) {

	    	CriteriaBuilder cb = em.getCriteriaBuilder();

	        // the actual search query that returns one page of results
	        CriteriaQuery<JobType> searchQuery = cb.createQuery(JobType.class);
	        Root<JobType> searchRoot = searchQuery.from(JobType.class);
	        searchQuery.select(searchRoot);
	         

	        List<Order> orderList = new ArrayList<Order>();
	        orderList.add(cb.desc(searchRoot.get("id")));
	        searchQuery.orderBy(orderList);

	        TypedQuery<JobType> filterQuery = em.createQuery(searchQuery);
			
	        return filterQuery.getResultList();
	    }
	    
	    
	    /**
	     * finds a user given its username
	     *
	     * @param username - the username of the searched user
	     * @return  a matching user, or null if no user found.
	     */
	    public JobType findJobTypeByJobID(long id) {

	        List<JobType> jobType = em.createNamedQuery(JobType.FIND_BY_JOBTYPEID, JobType.class)
	                .setParameter("id", id)
	                .getResultList();

	        return jobType.size() == 1 ? jobType.get(0) : null;
	    }
	    
	 /**
	 *
	 * save changes made to a job, or create the job if its a new job.
	 *
	 */
	public Job save(Job job) {
	    return em.merge(job);
	}
	
	
	/**
     * finds a user given its username
     *
     * @param username - the username of the searched user
     * @return  a matching user, or null if no user found.
     */
    public Job findJobByJobID(long id) {

        List<Job> job = em.createNamedQuery(Job.FIND_BY_JOBID, Job.class)
                .setParameter("id", id)
                .getResultList();

        return job.size() == 1 ? job.get(0) : null;
    }
    
    /**
	 *
	 * save changes made to a job dependent, or create the job dependent if its a new job.
	 *
	 */
	public JobDependent saveDependent(JobDependent jobDependent) {
	    return em.merge(jobDependent);
	}
	
 
	 private Predicate[] getCommonWhereCondition(CriteriaBuilder cb, long userId, Root<Job> searchRoot) {
	
	       List<Predicate> predicates = new ArrayList<>();
	       Join<Job , User> user = searchRoot.join("user");
	
	       predicates.add(cb.equal(user.get("id"), userId));
	
	       return predicates.toArray(new Predicate[]{});
	   }

	
}
