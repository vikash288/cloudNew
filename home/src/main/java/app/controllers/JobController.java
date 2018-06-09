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

import app.dto.JobDTO;
import app.dto.JobTypeDTO;
import app.dto.JobTypesDTO;
import app.dto.JobsDTO;
 
import app.model.Job;
import app.model.JobDependent;
import app.model.JobType;
import app.model.SearchResult;
import app.services.JobService;

 

/**
*
*  REST service for jobs - allows to update, create and search for jobs for the currently logged in user.
*
*/
@Controller
@RequestMapping("Job")
public class JobController {
	
	@Autowired
	private JobService jobService;
	
	private static final Logger LOGGER = LoggerFactory.getLogger(JobController.class);

	
	
	
     
   
	 /**
     * search Job for the current user by date and time ranges.
     *
     *
     * @param principal  - the current logged in user
     * @return - @see JobDTO with the current page, total pages and the list of jobs
     */
    @ResponseBody
    @ResponseStatus(HttpStatus.OK)
    @RequestMapping(method = RequestMethod.OPTIONS)
    public JobsDTO searchJobs(Principal principal , @RequestParam("userId") Long userId) {
    	LOGGER.info("Found " + userId + " results.");
    	SearchResult<Job> result;
		result = jobService.findJobs(userId);
		 //LOGGER.info("Found " + result.getResult().+ " results.");
		 result.getResultsCount();
        
        return new JobsDTO(JobDTO.mapFromJobEntities(result.getResult()));
        
     } 
	
    
    /**
     * search Job Dependent for the current user by date and time ranges.
     *
     *
     * @param principal  - the current logged in user
     * @return 
     * @return - @see JobDTO with the current page, total pages and the list of jobs
     */
    @ResponseBody
    @ResponseStatus(HttpStatus.OK)
    @RequestMapping(method = RequestMethod.PUT)
    public JobsDTO searchJobDependents(Principal principal , @RequestParam("userId") Long userId) {
     	SearchResult<JobDependent> result;
		result = jobService.findJobDependents(userId);
	    LOGGER.info("Found " + result.getResult().get(0).getJob()+ " results.");
		result.getResultsCount();
         
       return new JobsDTO(JobDTO.mapFromJobDependentEntities(result.getResult()));
        
     } 
	
    
    /**
     * search Job Type for the current user.
     *
     *
     * @param principal  - the current logged in user
     * @return - @see the list of job Type
     */
    @ResponseBody
    @ResponseStatus(HttpStatus.OK)
    @RequestMapping(method = RequestMethod.GET)
    public JobTypesDTO searchJobType(Principal principal , @RequestParam("userId") Long userId) {
     	SearchResult<JobType> result;
		result = jobService.findJobTypes(userId);
		
		result.getResultsCount();
        
        return new JobTypesDTO(JobTypeDTO.mapFromJobTypeEntities(result.getResult()));
        
     } 
    
    
    
    /**
     * search Job Type for the current user and job id.
     *
     *
     * @param principal  - the current logged in user
     * @return - @see the list of job Type
     */
    @ResponseBody
    @ResponseStatus(HttpStatus.OK)
    @RequestMapping(value = "/getJobByID" , method = RequestMethod.GET)
    public JobsDTO searchJobByID(Principal principal , @RequestParam("userId") Long userId , @RequestParam("jobId") Long jobId) {
    	SearchResult<JobDependent> result;
		result = jobService.findJobDependentByID(userId,jobId);
	    //LOGGER.info("Found " + result.getResult().get(0).getJob()+ " results.");
		result.getResultsCount();
         
        return new JobsDTO(JobDTO.mapFromJobDependentEntities(result.getResult()));
        
     } 
	 /**
    *
    * saves a list of Job (new or not) into the database
    *
    * @param username - the currently logged in user
    * @param Job - the list of Jobs to be saved
 * @return 
    * @return - the new versions of the saved job
    */
    
    @ResponseBody
    @ResponseStatus(HttpStatus.OK)
    @RequestMapping(method = RequestMethod.POST)
    public  List<List<Job>> saveJob(Principal principal, @RequestBody List<JobDTO> jobs) {
    	
 	   LOGGER.info("Found " + jobs.get(0).toString()+ " results.");
 	   List<List<Job>> jobData= jobService.saveJobs(jobs);
 	   return jobData; 
 	  
     }

}
