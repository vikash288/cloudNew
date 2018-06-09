package app.controllers;

import java.security.Principal;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import app.dto.ServerTypeDTO;
import app.dto.ServerTypesDTO;
import app.model.SearchResult;
import app.model.ServerType;
import app.services.ServerTypeServices;

@Controller
@RequestMapping("ServerType")
public class ServerTypeController {

	private static final Logger LOGGER = LoggerFactory.getLogger(ServerTypeController.class);

	@Autowired
	ServerTypeServices serverTypeServices;

	/**
	 * search ServerTypeController for the current user.
	 *
	 *
	 * @param principal
	 *            - the current logged in user
	 * @return - @see ServerTypeDTO with the list of ServerType
	 */
	@ResponseBody
	@ResponseStatus(HttpStatus.OK)
	@RequestMapping(method = RequestMethod.GET)
	public ServerTypesDTO searchServerTypes(Principal principal) {

		SearchResult<ServerType> result;
		result = serverTypeServices.findServerTypes();
		result.getResultsCount();

		return new ServerTypesDTO(ServerTypeDTO.mapFromServerTypeEntities(result.getResult()));
	}

}
