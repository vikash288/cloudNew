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

import app.dao.AWSCredentialsRepository;
import app.dao.JobRepository;
import app.dao.ServerCredentialsRepository;
import app.dao.ServerTypeRepository;
import app.dao.UserRepository;
import app.dto.JobDTO;
import app.model.Job;
import app.model.JobDependent;
import app.model.JobType;
import app.model.SearchResult;
import app.model.ServerCredentials;
import app.model.ServerType;
import app.model.User;

/**
 *
 * Business service for Job -related operations.
 *
 */

@Service
public class JobService {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(JobService.class);

	@Autowired
	JobRepository jobRepository;
	@Autowired
	ServerCredentialsRepository  serverCredentialsRepository;
	@Autowired
	AWSCredentialsRepository awscredentialsRepository;

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
   public List<Job> saveJob( Long id,String JobName,String JobComment, String SorcebucketName,String SourcefolderPath,String SourcefileKey
		   ,String DestinationbucketName,String DestinationfolderPath,String DestinationfileKey,
		   Boolean Sourcerdbmsnewtable,Boolean SourcerdbmsnewtableTruncate,String SourcerdbmstableName ,
		   Boolean Destinationrdbmsnewtable,Boolean DestinationrdbmsnewtableTruncate,String DestinationrdbmstableName, String sourcerhashtag,
   		int sourcerbatchsize ,String sourcerkafkaName , String dumpaccessKey ,String dumpsecretKey ,String dumpbucketName,String dumpKey , String dumpbucketlocation,String trainaccessKey ,String trainsecretKey ,String trainbucketName ,String trainKey ,String mlalgorithm,String mlVariable,String transformquery,String Jobjson,Long user_id,Long source ,Long target,Long source_Type ,Long target_Type ,Long jobType) {	
   	   
	   LOGGER.info("Found " + user_id + " results.");
	   LOGGER.info("Found " + SorcebucketName + " results.");
	   
	  /* assertNotBlank(JobName, "JobName cannot be blank");
	   assertNotBlank(JobbucketPath, "JobbucketPath cannot be blank");
   	   assertNotBlank(JobfolderPath, "JobfolderPath cannot be blank");
   	   assertNotBlank(JobfileKey, "JobfileKey cannot be blank");*/
       notNull(user_id, "User Id is mandatory"); 
       notNull(source, "source is mandatory"); 
       notNull(target, "target is mandatory"); 
 
	 
      
    
       Job job = null;
       JobDependent jobDependent= null;
       
       List<Job> ListJob=null;
       if (id != null) {
    	   //s3credentials = s3credentialsRepository.findS3CredentialsById(id);
    	   //s3credentials.setaccessKey(accessKey);
    	    
    	   //s3credentials.setUserId(user_id);

       } 
       
       else if( user_id != null){      	
  
    	   
    	User user = userRepository.findUserByUserID(user_id);
       	ServerCredentials sourceObject = serverCredentialsRepository.findServerCredentialsById(source);
        LOGGER.info("Found " + sourceObject + " results.");
        ServerCredentials targetObject = serverCredentialsRepository.findServerCredentialsById(target);
        LOGGER.info("Found " + source_Type + target_Type+" results.");
        
        ServerType    sourceType =  serverTypeRepository.findUserByServerTypeID(source_Type);
      
        ServerType    targetType =  serverTypeRepository.findUserByServerTypeID(target_Type);
        JobType JobType =  jobRepository.findJobTypeByJobID(jobType);
        
       	if (user != null) {  
       		
       		 job = jobRepository.save(new Job(user,sourceObject,targetObject,sourceType, targetType, JobType, JobName,JobComment, Jobjson));
       		
       		 jobDependent = jobRepository.saveDependent(new JobDependent(job,SorcebucketName,SourcefolderPath,SourcefileKey,
       				DestinationbucketName,DestinationfolderPath,  DestinationfileKey , Sourcerdbmsnewtable,SourcerdbmsnewtableTruncate,SourcerdbmstableName,
       				Destinationrdbmsnewtable, DestinationrdbmsnewtableTruncate, DestinationrdbmstableName, sourcerhashtag,
       	    		 sourcerbatchsize , sourcerkafkaName ,  dumpaccessKey , dumpsecretKey , dumpbucketName, dumpKey ,  dumpbucketlocation,trainaccessKey , trainsecretKey , trainbucketName , trainKey ,mlalgorithm,mlVariable,transformquery));
      
       		ListJob = jobRepository.findJobs(user_id);
 
           } else {
               LOGGER.warn("A S3Credentials was attempted to be saved for a non-existing user: " + user_id);
			}
       	
       }
       else {
    	   LOGGER.warn("A S3Credentials was attempted to be saved for a non-existing user: " + user_id);
       } 

       return ListJob; 
   }

   /**
    *
    * saves a list of S3Credentials (new or not) into the database
    *
    * @param username - the currently logged in user
    * @param s3credentials - the list of S3Credential to be saved
    * @return - the new versions of the saved folders
    */
   
   @Transactional
 	public List<List<Job>> saveJobs(List<JobDTO> jobs) {	
    	LOGGER.info("Found " + jobs + " results.");
    	LOGGER.info("Found " + jobs.get(0).getjobjson() + " results.");
    	return jobs.stream()
                .map((job) -> saveJob(
                		job.getId(),
                		job.getjobName(),
                		job.getjobComment(),
                		job.getsorcebucketName(),
                		job.getsourcefolderPath(),
                		job.getsourcefileKey(),
                		job.getdestinationbucketName(),
                		job.getdestinationfolderPath(),
                		job.getdestinationfileKey(),
                		job.getsourcerdbmsnewtable(),
                		job.getsourcerdbmsnewtableTruncate(),
                		job.getsourcerdbmstableName(),
                		job.getdestinationrdbmsnewtable(),
                		job.getdestinationrdbmsnewtableTruncate(),
                		job.getdestinationrdbmstableName(),
                		job.getSourcerhashtag(),
                		job.getSourcerbatchsize(), 
                		job.getSourcerkafkaName(),
                		job.getDumpaccessKey(),
                		job.getDumpsecretKey(),
                		job.getDumpbucketName(),
                		job.getDumpKey(),
                		job.getDumpbucketlocation(),
                		job.getTrainaccessKey(),
                		job.getTrainsecretKey(),
                		job.getTrainbucketName(),
                		job.getTrainKey(),
                 		job.getmlalgorithm(),
                		job.getmlVariable(),
                		job.gettransformquery(),
                		job.getjobjson(),
                		job.getParentId(),
                		job.getSourceId(),
                		job.getTargetId(),
                		job.getsourceType(),
                		job.gettargetType(),
                		job.getjobType()
                        ))
                .collect(Collectors.toList());
 
    	 
	    }
   
   
	   /**
	   *
	   * searches Jobs by user Id
	   *
	   * @param username - the currently logged in user
	   * @return - the found results
	   */
	  @Transactional(readOnly = true)
	  public SearchResult<JobType> findJobTypes(Long userId) {
	
	      Long resultsCount = jobRepository.countJobTypes(userId);
	
	      List<JobType> jobs = jobRepository.findJobTypes(userId);
	
	      return new SearchResult<>(resultsCount, jobs);
	  }

   
   /**
   *
   * searches Jobs by user Id
   *
   * @param username - the currently logged in user
   * @return - the found results
   */
  @Transactional(readOnly = true)
  public SearchResult<Job> findJobs(Long userId) {

      Long resultsCount = jobRepository.countJobs(userId);

      List<Job> jobs = jobRepository.findJobs(userId);
      
      return new SearchResult<>(resultsCount, jobs);
  }
  /**
  *
  * searches JobDependents   by user Id
  *
  * @param username - the currently logged in user
  * @return - the found results
  */
	@Transactional(readOnly = true)
	public SearchResult<JobDependent> findJobDependents(Long userId) {
 
	     List<JobDependent> jobDependents = jobRepository.findJobDependents(userId);
 	     return new SearchResult<>(0, jobDependents);
	}
	
	@Transactional(readOnly = true)
	public SearchResult<JobDependent> findJobDependentByID(Long userId,Long jobId) {
 
	     List<JobDependent> jobDependents = jobRepository.findJobDependentByID(userId,jobId);
 	     return new SearchResult<>(0, jobDependents);
	}
	
	 
}
