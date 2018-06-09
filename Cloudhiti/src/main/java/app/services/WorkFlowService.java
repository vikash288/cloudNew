package app.services;

import static org.springframework.util.Assert.notNull;

import java.util.List;
import java.util.stream.Collectors;

 
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import app.dao.JobRepository;
import app.dao.ScheduleRepository;
import app.dao.UserRepository;
import app.dao.WorkFlowRepository;
import app.dto.WorkFlowDTO;
import app.dto.WorkFlowDependentDTO;
import app.model.Job;
import app.model.Schedule;
import app.model.SearchResult;
import app.model.WorkFlow;
import app.model.WorkFlowDependent;
import app.model.User;

@Service
public class WorkFlowService {

	private static final Logger LOGGER = LoggerFactory.getLogger(WorkFlowService.class);
	
	@Autowired
	WorkFlowRepository workFlowRepository;
	
 
	@Autowired
    UserRepository userRepository;
	
	@Autowired
	JobRepository jobRepository;
	
	@Autowired
	ScheduleRepository scheduleRepository;
	
	/**
    *
    * saves a workFlow (new or not) into the database.
    *
    * @param username - - the currently logged in user
    * @param id - the database ud of the workFlow
    * @return - the new version of the folder
    */

   @Transactional 
   public Long saveWorkFlow( Long id,String workflowName,String workjson, Boolean schedulestatus, Long scheduleId ,Long user_id,List<WorkFlowDependentDTO> workFlowDependentDTO  ) {	
     
		 
	   LOGGER.info("Found " + user_id + " results.");
  	   notNull(user_id, "User Id is mandatory");
      // notNull(servertypeid, "servertypeid is mandatory");
      
      
    
       WorkFlow workFlow = null;
 
       if (id != null) {
    	    
         
       } 
       
       else if( user_id != null){      	
       	User user = userRepository.findUserByUserID(user_id);
       	Schedule schedule = scheduleRepository.findScheduleByID(scheduleId);
       	
       	if (user != null) {
       		workFlow = workFlowRepository.save(new WorkFlow( user , schedule,workflowName,schedulestatus,workjson));
       				for(int i=0; i < workFlowDependentDTO.size(); i++)
       				{
       					Job job = jobRepository.findJobByJobID( workFlowDependentDTO.get(i).getjobId());  
       					
       					workFlowRepository.saveDependent( new WorkFlowDependent( workFlow,job,workFlowDependentDTO.get(i).getsequenceId(),workFlowDependentDTO.get(i).getpredecessorId(),workFlowDependentDTO.get(i).getsuccessorId(),workFlowDependentDTO.get(i).getactive(),workFlowDependentDTO.get(i).getstart(),workFlowDependentDTO.get(i).getend() ));
       					//LOGGER.info("Found object" + workFlowDependentDTO.get(i).getsequenceId() + " results.");
       				}
       				
       				 
            } else {
               LOGGER.warn("A ServerCredentials was attempted to be saved for a non-existing user: " + user_id);
			}
       	
       }
       else {
    	   LOGGER.warn("A ServerCredentials was attempted to be saved for a non-existing user: " + user_id);
       } 

       return workFlow.getId(); 
    }
   
   
	/**
    *
    * saves a list of workflow (new or not) into the database
    *
    * @param username - the currently logged in user
     */
   
    @Transactional
 	public List<Long> saveWorkflows(List<WorkFlowDTO> workFlows) {	
    	//LOGGER.info("Found " + workFlows + " results.");
    	//LOGGER.info("Found " + workFlows.get(0).getworkjson() + " results.");
    	return workFlows.stream()
                .map((workFlow) -> saveWorkFlow(
                		workFlow.getId(),
                		workFlow.getworkflowName(),
                		workFlow.getworkjson(),
                		workFlow.getschedulestatus(),
                		workFlow.getscheduleId(),
                 		workFlow.getParentId(),
                 		workFlow.getworkFlowDependentDTO()
                        ))
                .collect(Collectors.toList());
   	    } 
    
    /**
    *
    * searches WorkFlow by user Id
    *
    * @param username - the currently logged in user
    * @return - the found results
    */
   @Transactional(readOnly = true)
   public SearchResult<WorkFlow> findWorkflows(Long userId) {

       Long resultsCount = workFlowRepository.countWorkFlows(userId);

       List<WorkFlow> jobs = workFlowRepository.findWorkFlows(userId);
       
       return new SearchResult<>(resultsCount, jobs);
   }
}
