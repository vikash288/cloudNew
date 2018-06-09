package app.controllers;

import java.security.Principal;
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

import app.dto.ServerCredentialDTO;
import app.dto.ServerCredentialsDTO;

import app.model.SearchResult;
import app.model.ServerCredentials;
import app.services.ServerCredentialsService;

@Controller
@RequestMapping("ServerCredentials")
public class ServerCredentialsController {

	@Autowired
	private ServerCredentialsService servercredentialsService;

	private static final Logger LOGGER = LoggerFactory.getLogger(ServerCredentialsController.class);

	/**
	 * search ServerCredentials for the current user by date and time ranges.
	 *
	 *
	 * @param principal
	 *            - the current logged in user
	 * @return - @see ServerCredentialDTO with the current page, total pages and
	 *         the list of folders
	 */
	@ResponseBody
	@ResponseStatus(HttpStatus.OK)
	@RequestMapping(  method = RequestMethod.POST)
	public ServerCredentialsDTO searchServerCredentials(Principal principal, @RequestParam("userId") Long userId) {
		LOGGER.info("Found " + userId + " results.");
		SearchResult<ServerCredentials> result;
		result = servercredentialsService.findServercredentials(userId);
		result.getResultsCount();

		return new ServerCredentialsDTO(ServerCredentialDTO.mapFromServercredentialEntities(result.getResult()));
	}

	/**
	 * search ServerCredentials for the current user by and ServeId for edit.
	 *
	 *
	 * @param principal
	 *            - the current logged in user
	 * @return - @see ServerCredentialDTO Object
	 */
	@ResponseBody
	@ResponseStatus(HttpStatus.OK)
	@RequestMapping(value = "/searchServerCredential" ,method = RequestMethod.POST)
	public ServerCredentials searchServerCredential(Principal principal, @RequestParam("userId") Long userId,
			@RequestParam("ServerId") Long ServerId) {
		// LOGGER.info("Found " + userId + " results.");
		ServerCredentials result;
		result = servercredentialsService.findServercredentialById(userId, ServerId);

		return result;
	}

	/**
	 *
	 * add of ServerCredential into the database
	 *
	 * @param username
	 *            - the currently logged in user
	 * @return - the list with added AWSCredentials
	 */
	@ResponseBody
	@ResponseStatus(HttpStatus.OK)
	@RequestMapping(value = "/saveServerCredential" , method = RequestMethod.POST)
	public List<List<ServerCredentials>> saveServerCredential(Principal principal,
			@RequestBody List<ServerCredentialDTO> servercredential) {

		LOGGER.info("Found 1" + servercredential.get(0).getservertypeid() + " results.");
		LOGGER.info("Found 2" + servercredential.get(0).getParentId() + " results.");
		List<List<ServerCredentials>> savedServercredentialData = servercredentialsService
				.saveServerCredentials(servercredential);
		return savedServercredentialData;

	}

}
