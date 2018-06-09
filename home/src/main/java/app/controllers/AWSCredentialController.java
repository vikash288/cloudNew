package app.controllers;

import java.security.Principal;
import java.util.List;
 
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import app.dto.AWSCredentialDTO;
import app.dto.AWSCredentialsDTO;

import app.model.AWSCredentials;
import app.model.SearchResult;
import app.services.AWSCredentialsService;

@Controller
@RequestMapping("AWSCredential")
public class AWSCredentialController {

	@Autowired
	private AWSCredentialsService awscredentialsService;

	private static final Logger LOGGER = LoggerFactory.getLogger(AWSCredentialController.class);

	/**
	 *
	 * add of AWSCredentials into the database
	 *
	 * @param username
	 *            - the currently logged in user
	 * @return - the list with added AWSCredentials
	 */
	@ResponseBody
	@ResponseStatus(HttpStatus.OK)
	@RequestMapping(method = RequestMethod.POST)
	public List<List<AWSCredentials>> saveAWSCredential(Principal principal,
			@RequestBody List<AWSCredentialDTO> saveawsCredential) {
		// LOGGER.info("Found " + saveawsCredential.toString() + " results.");
		List<List<AWSCredentials>> saveawsCredentials = awscredentialsService.saveAWSCredentials(saveawsCredential);
		return saveawsCredentials;

	}

	/**
	 *
	 * list of AWSCredentials into the database
	 *
	 * @param username
	 *            - the currently logged in user
	 * @return - the list AWSCredentials
	 */
	@ResponseBody
	@ResponseStatus(HttpStatus.OK)
	@RequestMapping(value = "/searchAWSCredentials" ,method = RequestMethod.POST)
	public AWSCredentialsDTO searchAWSCredentials(Principal principal, @RequestParam("userId") Long userId) {
		//LOGGER.info("Found " + userId + " results.");
		SearchResult<AWSCredentials> result;
		result = awscredentialsService.findawscredentials(userId);
		result.getResultsCount();

		return new AWSCredentialsDTO(AWSCredentialDTO.mapFromAWScredentialEntities(result.getResult()));
	}

	/**
	 *
	 * deletes AWSCredentials into the database
	 *
	 * @param s3credentialIds
	 *      - the ids of the S3Credentials to be deleted
	 */
	@ResponseBody
	@ResponseStatus(HttpStatus.OK)
	@RequestMapping(method = RequestMethod.DELETE)
	public void deleteAWSCredentials(@RequestBody List<Long> s3credentialIds) {
		LOGGER.info("Found " + s3credentialIds.get(0) + " results.");
		awscredentialsService.deletes3credentials(s3credentialIds);
	}

	@ExceptionHandler(Exception.class)
	public ResponseEntity<String> errorHandler(Exception exc) {
		LOGGER.error(exc.getMessage(), exc);
		return new ResponseEntity<>(exc.getMessage(), HttpStatus.BAD_REQUEST);
	}
}
