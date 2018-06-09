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

import app.model.AWSCredentials;
import app.model.User;

/**
 *
 * Repository class for the S3Credentials entity
 *
 */
@Repository
public class AWSCredentialsRepository {

	private static final Logger LOGGER = LoggerFactory.getLogger(AWSCredentialsRepository.class);

	@PersistenceContext
	EntityManager em;

	/**
	 *
	 * counts the matching s3credentials, given the bellow criteria
	 *
	 * @param user-id
	 *            - the currently account
	 * @return - a list of matching s3credentials, or an empty collection if no
	 *         match found
	 */
	public Long countawscredentials(long userId) {

		CriteriaBuilder cb = em.getCriteriaBuilder();

		// query for counting the total results
		CriteriaQuery<Long> cq = cb.createQuery(Long.class);
		Root<AWSCredentials> countRoot = cq.from(AWSCredentials.class);
		cq.select((cb.count(countRoot)));
		cq.where(getCommonWhereCondition(cb, userId, countRoot));
		Long resultsCount = em.createQuery(cq).getSingleResult();

		LOGGER.info("Found " + resultsCount + " results.");

		return resultsCount;
	}

	/**
	 *
	 * finds a list of s3credentials, given the bellow criteria
	 *
	 * @param account-id
	 *            - the currently account
	 * @return - a list of matching s3credentials, or an empty collection if no match
	 *         found
	 */
	public List<AWSCredentials> findawscredentials(long userId) {

		CriteriaBuilder cb = em.getCriteriaBuilder();

		// the actual search query that returns one page of results
		CriteriaQuery<AWSCredentials> searchQuery = cb.createQuery(AWSCredentials.class);
		Root<AWSCredentials> searchRoot = searchQuery.from(AWSCredentials.class);
		searchQuery.select(searchRoot);
		searchQuery.where(getCommonWhereCondition(cb, userId, searchRoot));

		List<Order> orderList = new ArrayList<Order>();
		orderList.add(cb.desc(searchRoot.get("id")));
		searchQuery.orderBy(orderList);

		TypedQuery<AWSCredentials> filterQuery = em.createQuery(searchQuery);

		return filterQuery.getResultList();
	}

	/**
	 *
	 * save changes made to a S3Credentials, or create the S3Credentials if its
	 * a new S3Credentials.
	 *
	 */
	public AWSCredentials save(AWSCredentials awscredential) {
		return em.merge(awscredential);
	}

	/**
	 *
	 * finds a S3Credentials given its id
	 *
	 */
	public AWSCredentials findDataAWSCredentialsById(Long id) {
		return em.find(AWSCredentials.class, id);
	}

	/**
	 *
	 * deletes AWSCredentials into the database
	 *
	 * @param s3credentialIds
	 *      - the ids of the S3Credentials to be deleted
	 */
	public void delete(Long awscredentialId) {
		AWSCredentials delete = em.find(AWSCredentials.class, awscredentialId);
		em.remove(delete);
	}

	/**
	 * finds a ServerCredentials given its id
	 *
	 * @param id
	 *            - the id of the searched ServerCredentials
	 * @return a matching ServerCredentials, or null if no ServerCredentials
	 *         found.
	 */
	public AWSCredentials findS3CredentialsById(long aws_id) {

		List<AWSCredentials> awsCredentials = em
				.createNamedQuery(AWSCredentials.FIND_BY_AWSCREDENTIALSID, AWSCredentials.class)
				.setParameter("id", aws_id).getResultList();

		return awsCredentials.size() == 1 ? awsCredentials.get(0) : null;
	}

	private Predicate[] getCommonWhereCondition(CriteriaBuilder cb, long userId, Root<AWSCredentials> searchRoot) {

		List<Predicate> predicates = new ArrayList<>();
		Join<AWSCredentials, User> user = searchRoot.join("user");

		predicates.add(cb.equal(user.get("id"), userId));

		return predicates.toArray(new Predicate[] {});
	}

}
