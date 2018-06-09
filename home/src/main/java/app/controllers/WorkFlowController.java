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
import app.dto.JobsDTO;
import app.dto.WorkFlowDTO;
import app.dto.WorkFlowsDTO;
import app.model.AWSCredentials;
import app.model.Job;
import app.model.SearchResult;
import app.model.WorkFlow;
import app.services.WorkFlowService;

@Controller
@RequestMapping("WorkFlow")
public class WorkFlowController {

	 private static final Logger LOGGER = LoggerFactory.getLogger(WorkFlowController.class);
	 
	  @Autowired
	  WorkFlowService workFlowService;
	  
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
	    public List<Long> saveWorkFlow(Principal principal, @RequestBody List<WorkFlowDTO> workflow) {
	    	
	 	    LOGGER.info("Found " + workflow.get(0).getworkflowName()+ " results.");
	 	   //LOGGER.info("Found " + workflow.get(0).getworkFlowDependentDTO().get(1).getpredecessorId()+ " results.");
	 	   //LOGGER.info("Found " + workflow.get(0).toString()+ " results.");
	 	   //List<List<WorkFlowDTO>> jobData= workFlowService.save(workflow);
	 	  List<Long> workflowId= workFlowService.saveWorkflows(workflow);
	 	 /*String url = "http://www.google.com/search?q=mkyong";

			URL obj = new URL(url);
			HttpURLConnection con = (HttpURLConnection) obj.openConnection();*/
	 	  return workflowId; 
	 	  
	     }
	  
	    /**
	     * search workflow.
	     *
	     *
	     * @param principal  - the current logged in user and userId
	     * @return - @see WorkflowDTO with the current page, total pages and the list of workflows
	     */
	   @ResponseBody
	    @ResponseStatus(HttpStatus.OK)
	    @RequestMapping(method = RequestMethod.GET)
	    public WorkFlowsDTO searchWorkFlows(Principal principal , @RequestParam("userId") Long userId) {
	    	LOGGER.info("Found " + userId + " results.");
	    	SearchResult<WorkFlow> result;
			result = workFlowService.findWorkflows(userId);
			 //LOGGER.info("Found " + result.getResult().+ " results.");
			 result.getResultsCount();
	        
	        return new WorkFlowsDTO(WorkFlowDTO.mapFromWorkflowEntities(result.getResult()));
	        
	     } 
}
