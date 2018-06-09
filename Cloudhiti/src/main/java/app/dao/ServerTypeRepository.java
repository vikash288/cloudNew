package app.dao;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Order;
import javax.persistence.criteria.Root;

import org.springframework.stereotype.Repository;

import app.model.AWSCredentials;
import app.model.ServerType;

/**
*
* Repository class for the Server Type entity
*
*/
@Repository
public class ServerTypeRepository {

	@PersistenceContext
    private EntityManager em;

	/**
     * finds a Server Type ID given its username
     *
     * @param ServerTypeId - the Id of the searched Server
     * @return  a matching Server, or null if no Server found.
     */
    public ServerType findUserByServerTypeID(long ServerTypeId) {

        List<ServerType> serverType = em.createNamedQuery(ServerType.FIND_BY_SERVERTYPEID, ServerType.class)
                .setParameter("id", ServerTypeId)
                .getResultList();

        return serverType.size() == 1 ? serverType.get(0) : null;
    }
    
    /**
    *
    * counts the matching ServerType, given the bellow criteria
    *
    * @param user-id - the currently account
    * @return -  a list of matching ServerType, or an empty collection if no match found
    */
    public Long countserverTypes() {

        CriteriaBuilder cb = em.getCriteriaBuilder();

        // query for counting the total results
        CriteriaQuery<Long> cq = cb.createQuery(Long.class);
        Root<ServerType> countRoot = cq.from(ServerType.class);
        cq.select((cb.count(countRoot)));
        Long resultsCount = em.createQuery(cq).getSingleResult();

         return resultsCount;
    }

    /**
     *
     * finds a list of ServerType, given the bellow criteria
     *
     * @param account-id - the currently account
     * @return -  a list of matching ServerType, or an empty collection if no match found
     */
    public List<ServerType> findserverTypes() {

        CriteriaBuilder cb = em.getCriteriaBuilder();

        // the actual search query that returns one page of results
        CriteriaQuery<ServerType> searchQuery = cb.createQuery(ServerType.class);
        Root<ServerType> searchRoot = searchQuery.from(ServerType.class);
        searchQuery.select(searchRoot);
         

        List<Order> orderList = new ArrayList<Order>();
        orderList.add(cb.desc(searchRoot.get("id")));
        searchQuery.orderBy(orderList);

        TypedQuery<ServerType> filterQuery = em.createQuery(searchQuery);
		
        return filterQuery.getResultList();
    }
    
}
