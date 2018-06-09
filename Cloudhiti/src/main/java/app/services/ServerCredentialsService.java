package app.services;

import static org.springframework.util.Assert.notNull;
import static app.services.ValidationUtils.assertNotBlank;

import java.util.List;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import app.dao.ServerCredentialsRepository;
import app.dao.ServerTypeRepository;
import app.dao.UserRepository;
import app.dto.ServerCredentialDTO;
import app.model.SearchResult;
import app.model.ServerCredentials;
import app.model.ServerType;
import app.model.User;

@Service
public class ServerCredentialsService {

	private static final Logger LOGGER=LoggerFactory.getLogger(ServerCredentialsService.class);
	
    @Autowired
    ServerCredentialsRepository serverCredentialsRepository;

    @Autowired
    UserRepository userRepository;
    
    @Autowired
    ServerTypeRepository serverTypeRepository;
    
	/**
    *
    * saves a folder (new or not) into the database.
    *
    * @param username - - the currently logged in user
    * @param id - the database ud of the folder
    * @return - the new version of the folder
    */

   @Transactional 
   public List<ServerCredentials> saveServerCredential( Long id,String ServerName,String ipaddress,String className,Long port,String username ,String password,
		   String databaseType,String databaseName,String secretKey,String accessKey,String reason,String appkey,String consumersecret,
			String consumerKey,String appsecret,Long user_id,Long servertypeid) {	
     
		 
	   LOGGER.info("Found " + appkey + " results.");
	   LOGGER.info("Found " + consumersecret + " results.");
	   LOGGER.info("Found " + consumerKey + " results.");
	   LOGGER.info("Found " + appsecret + " results.");
	   LOGGER.info("Found " + databaseName + " results.");
	   LOGGER.info("Found " + servertypeid + " results.");
	   
       notNull(user_id, "User Id is mandatory");
       notNull(servertypeid, "servertypeid is mandatory");
      
      
    
       ServerCredentials servercredentials = null;
       List<ServerCredentials> Listservercredentials=null;
       if (id != null) {
    	   ServerType ServerType = serverTypeRepository.findUserByServerTypeID(servertypeid);
    	   
    	   servercredentials = serverCredentialsRepository.findServerCredentialsById(id);
    	   servercredentials.setaccessKey(accessKey);
    	   servercredentials.setappkey(appkey);
    	   servercredentials.setappsecret(appsecret);
    	   servercredentials.setconsumerKey(consumerKey);
    	   servercredentials.setdatabaseName(databaseName);
    	   servercredentials.setdatabaseType(databaseType);
    	   servercredentials.setipaddress(ipaddress);
    	   servercredentials.setclassName(className);
    	   servercredentials.setpassword(password);
    	   servercredentials.setport(port);
    	   servercredentials.setreason(reason);
    	   servercredentials.setsecretKey(secretKey);
    	   servercredentials.setServerName(ServerName);
    	   servercredentials.setusername(username);
    	   servercredentials.setconsumersecret(consumersecret);
    	   servercredentials.setsecretKey(secretKey);
    	   servercredentials.setServerType(ServerType);
    	   
    	    User user = userRepository.findUserByUserID(user_id);
          	
          	
          	if (user != null) {
           		
          		Listservercredentials = serverCredentialsRepository.findservercredentials(user_id);
    
              } else {
                  LOGGER.warn("A ServerCredentials was attempted to be saved for a non-existing user: " + user_id);
   			}
 
       } 
       
       else if( user_id != null){      	
       	User user = userRepository.findUserByUserID(user_id);
       	ServerType ServerType = serverTypeRepository.findUserByServerTypeID(servertypeid);
       	
       	if (user != null) {
       		servercredentials = serverCredentialsRepository.save(new ServerCredentials( user , ServerType,ServerName, port, username, password, ipaddress,className,databaseType,databaseName,secretKey,accessKey,
       				reason,appkey,consumersecret,consumerKey,appsecret));
       		
       		Listservercredentials = serverCredentialsRepository.findservercredentials(user_id);
 
           } else {
               LOGGER.warn("A ServerCredentials was attempted to be saved for a non-existing user: " + user_id);
			}
       	
       }
       else {
    	   LOGGER.warn("A ServerCredentials was attempted to be saved for a non-existing user: " + user_id);
       } 

       return Listservercredentials; 
    }
   	
   /**
    *
    * saves a list of ServerCredentials (new or not) into the database
    *
    * @param username - the currently logged in user
    * @param servercredential - the list of ServerCredentials to be saved
    * @return - the new versions of the saved ServerCredentials
    */
   
   @Transactional
 	public List<List<ServerCredentials>> saveServerCredentials(List<ServerCredentialDTO> servercredentials) {	
    	LOGGER.info("Found " + servercredentials.get(0).getservertypeid() + " results.");
    	
    	 return servercredentials.stream()
                .map((servercredential) -> saveServerCredential(
                		servercredential.getId(),
                		servercredential.getServerName(),
                		servercredential.gethosturl(),
                		servercredential.getclassName(),
                		servercredential.getport(),
                		servercredential.getusername(),
                		servercredential.getpassword(),
                		servercredential.getdatabaseType(),
                		servercredential.getdatabaseName(),
                		servercredential.getsecretKey(),
                		servercredential.getaccessKey(),
                		servercredential.getreason(),
                		servercredential.getappkey(),
                		servercredential.getconsumersecret(), 
                		servercredential.getconsumerKey(), 
                		servercredential.getappsecret(), 
                		servercredential.getParentId(),
                		servercredential.getservertypeid()
                        ))
                .collect(Collectors.toList()); 
 
    	 
	    }
   /**
   *
   * searches S3Credentials by date/time
   *
   * @param username - the currently logged in user
   * @return - the found results
   */
   @Transactional(readOnly = true)
   public SearchResult<ServerCredentials> findServercredentials(Long userId) {

      Long resultsCount = serverCredentialsRepository.countservercredentials(userId);

      List<ServerCredentials> servercredentials = serverCredentialsRepository.findservercredentials(userId);

      return new SearchResult<>(resultsCount, servercredentials);
   }
   
   
   /**
   *
   * searches S3Credentials by ServerId,UserId
   *
   * @param username - the currently logged in user
   * @return - the found results
   */
   @Transactional(readOnly = true)
   public ServerCredentials findServercredentialById(Long userId,Long ServeId) {

	  ServerCredentials servercredential = serverCredentialsRepository.findServercredentialById(userId,ServeId);

      return  servercredential;
   }
}
