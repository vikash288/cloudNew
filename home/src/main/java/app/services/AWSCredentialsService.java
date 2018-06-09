package app.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import app.dao.AWSCredentialsRepository;
import app.dao.UserRepository;
import app.dto.AWSCredentialDTO;
import app.model.AWSCredentials;
import app.model.SearchResult;
import app.model.User;

import static org.springframework.util.Assert.notNull;
import static app.services.ValidationUtils.assertNotBlank;

import java.util.List;
import java.util.stream.Collectors;

/**
 *
 * Business service for S3Credential -related operations.
 *
 */

@Service
public class AWSCredentialsService {

	private static final Logger LOGGER = LoggerFactory.getLogger(AWSCredentialsService.class);

	@Autowired
	AWSCredentialsRepository awscredentialsRepository;

	@Autowired
	UserRepository userRepository;

	/**
	 *
	 * add of AWSCredentials into the database
	 *
	 * @param username
	 *            - the currently logged in user
	 * @return - the list with added AWSCredentials
	 */
	@Transactional
	public List<AWSCredentials> saveAWSCredential(Long id, String awscredentialsName, String accessKey,
			String secretKey, Long user_id, String trashbucketName, int mainaccountStatus) {

		//LOGGER.info("Found " + user_id + " results.");
		assertNotBlank(secretKey, "secretKey cannot be blank");
		assertNotBlank(accessKey, "accessKey cannot be blank");
		notNull(user_id, "User Id is mandatory");
		notNull(secretKey, "secretKey is mandatory");
		notNull(accessKey, "accessKey is mandatory");

		AWSCredentials awscredentials = null;
		List<AWSCredentials> Listawscredentials = null;
		if (id != null) {
			awscredentials = awscredentialsRepository.findDataAWSCredentialsById(id);
			awscredentials.setaccessKey(accessKey);
			awscredentials.setsecretKey(secretKey);
			awscredentials.setawscredentialsName(awscredentialsName);
 
			User user = userRepository.findUserByUserID(user_id);
			if (user != null) {
				Listawscredentials = awscredentialsRepository.findawscredentials(user_id);
			} else {
				LOGGER.warn("A S3Credentials was attempted to be saved for a non-existing user: " + user_id);
			}
		}

		else if (user_id != null) {
			User user = userRepository.findUserByUserID(user_id);
			if (user != null) {
				awscredentials = awscredentialsRepository.save(new AWSCredentials(user, awscredentialsName, secretKey,
						accessKey, trashbucketName, mainaccountStatus));

				Listawscredentials = awscredentialsRepository.findawscredentials(user_id);

			} else {
				LOGGER.warn("A awsCredentials was attempted to be saved for a non-existing user: " + user_id);
			}

		} else {
			LOGGER.warn("A awsCredentials was attempted to be saved for a non-existing user: " + user_id);
		}
		return Listawscredentials;
	}

	/**
	 *
	 * add of AWSCredentials into the database
	 *
	 * @param username
	 *            - the currently logged in user
	 * @return - the list with added AWSCredentials
	 */
	@Transactional
	public List<List<AWSCredentials>> saveAWSCredentials(List<AWSCredentialDTO> awscredentials) {
		LOGGER.info("Found " + awscredentials + " results.");

		return awscredentials.stream()
				.map((awscredential) -> saveAWSCredential(awscredential.getId(), awscredential.getawscredentialsName(),
						awscredential.getaccessKey(), awscredential.getsecretKey(), awscredential.getParentId(),
						awscredential.gettrashbucketName(), awscredential.getmainaccountStatus()))
				.collect(Collectors.toList());

	}

	/**
	 *
	 * list of AWSCredentials into the database
	 *
	 * @param username
	 *            - the currently logged in user
	 * @return - the list AWSCredentials
	 */
	@Transactional(readOnly = true)
	public SearchResult<AWSCredentials> findawscredentials(Long userId) {

		Long resultsCount = awscredentialsRepository.countawscredentials(userId);

		List<AWSCredentials> awscredentials = awscredentialsRepository.findawscredentials(userId);

		return new SearchResult<>(resultsCount, awscredentials);
	}

	/**
	 *
	 * deletes AWSCredentials into the database
	 *
	 * @param s3credentialIds
	 *      - the ids of the S3Credentials to be deleted
	 */
	@Transactional
	public void deletes3credentials(List<Long> awscredentialIds) {
		notNull(awscredentialIds, "awscredentialId is mandatory");
		awscredentialIds.stream().forEach((awscredentialId) -> awscredentialsRepository.delete(awscredentialId));
	}

}
