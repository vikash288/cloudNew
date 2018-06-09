package app.dto;

import java.util.List;

public class WorkFlowsDTO {

	List<WorkFlowDTO> workflow;
	
	public WorkFlowsDTO(List<WorkFlowDTO> workflow) {
		 this.workflow = workflow;
	}
	
	public List<WorkFlowDTO> getWorkflows() {
	       return workflow;
	 }

	public void setWorkflows(List<WorkFlowDTO> workflow) {
	        this.workflow = workflow;
	  }
}
