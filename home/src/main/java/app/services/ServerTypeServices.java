package app.services;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import app.dao.ServerTypeRepository;
import app.model.ServerType;
import app.model.SearchResult;

/**
*
* Business service for ServerType  related operations
*
*/
@Service
public class ServerTypeServices {

	@SuppressWarnings("unused")
	private static final Logger LOGGER = LoggerFactory.getLogger(ServerTypeServices.class);
	
	@Autowired
	private ServerTypeRepository serverTypeRepository;
	
	 /**
	   *
	   * searches ServerType
	   *
	   * @param username - the currently logged in user
	   * @return - the found results
	   */
	  @Transactional(readOnly = true)
	  public SearchResult<ServerType> findServerTypes() {

	      Long resultsCount = serverTypeRepository.countserverTypes();

	      List<ServerType> awscredentials = serverTypeRepository.findserverTypes();

	      return new SearchResult<>(resultsCount, awscredentials);
	  }

}
