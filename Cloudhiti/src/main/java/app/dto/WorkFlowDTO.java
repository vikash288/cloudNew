package app.dto;

import java.util.ArrayList;
//import java.util.ArrayList;
//import antlr.collections.List;
import java.util.List;
import java.util.stream.Collectors;

import app.model.Schedule;
import app.model.User;
import app.model.WorkFlow;

public class WorkFlowDTO {

	private Long id;
	private String workflowName;
 	private String workjson;
	private Boolean schedulestatus;
	private Long scheduleId;
	private Long parentId;
	
	
	//private WorkFlowDependentDTO workFlowDependentDTO; 
	
	//WorkFlowDependentDTO workFlowDependentObject;
	//WorkFlowDependentDTO obj=new WorkFlowDependentDTO();
	//private List<WorkFlowDependentDTO> workFlowDependentDTO =new ArrayList<WorkFlowDependentDTO>();
	
	//ArrayList<WorkFlowDependentDTO> workFlowDependentDTO=new ArrayList<WorkFlowDependentDTO>();
	
	private List<WorkFlowDependentDTO> workFlowDependentDTO = new ArrayList<WorkFlowDependentDTO>();
	
	public WorkFlowDTO() {
		// TODO Auto-generated constructor stub
		//this.id = id;
	}
	
	public WorkFlowDTO(Long id, String workflowName, String workjson, Boolean schedulestatus, Schedule scheduleId, User user) {
		this.id = id;
		this.workflowName = workflowName;
		this.workjson = workjson;
		this.schedulestatus=schedulestatus;
		this.scheduleId=scheduleId.getId();
		this.parentId = user.getId();
	}
	
	public static WorkFlowDTO mapFromWorkflowEntity(WorkFlow workFlow) {
        return new WorkFlowDTO( workFlow.getId(), workFlow.getWorkflowName(),workFlow.getWorkjson(),workFlow.getSchedulestatus(),workFlow.getSchedule(), workFlow.getUser());
    }
 
    public static List<WorkFlowDTO> mapFromWorkflowEntities(List<WorkFlow> workFlows) {
       return workFlows.stream().map((workFlow) -> mapFromWorkflowEntity(workFlow)).collect(Collectors.toList());
    }
   
	public Long getId() {
        return id;
    }

	public void setId(Long id) {
	    this.id = id;
	}
	
	/*public WorkFlowDependentDTO getworkFlowDependentDTO() {
		return workFlowDependentDTO;
	}
	
	public void setworkFlowDependentDTO(WorkFlowDependentDTO workFlowDependentDTO) {
		this.workFlowDependentDTO = workFlowDependentDTO;
	}*/

	
	 public List<WorkFlowDependentDTO> getworkFlowDependentDTO() {
		return workFlowDependentDTO;
	}
	
	public void setworkFlowDependentDTO(List<WorkFlowDependentDTO> workFlowDependentDTO) {
		this.workFlowDependentDTO = workFlowDependentDTO;
	}
 
	
	public Long getParentId() {
		return parentId;
	}	
	
	public void setParentId(Long parentId) {
		this.parentId = parentId;
	}
	
	public Long getscheduleId() {
		return scheduleId;
	}
	
	public void setscheduleId(Long scheduleId) {
		this.scheduleId = scheduleId;
	}
	
	public void setworkflowName(String workflowName) {
		this.workflowName = workflowName;
	}
	
	public String getworkflowName() {
		return workflowName;
	}
	
	public void setschedulestatus(Boolean schedulestatus) {
		this.schedulestatus = schedulestatus;
	}
	
	public Boolean getschedulestatus() {
		return schedulestatus;
	}
	
	public void setworkjson(String workjson) {
		this.workjson = workjson;
	}
	
	public String getworkjson() {
		return workjson;
	}
	
	
	@Override
    public String toString() {
        return "User{" +
                "username='" + workFlowDependentDTO + '\'' +
                "username='" + workflowName + '\'' +
                '}';
    }
	
	
}
