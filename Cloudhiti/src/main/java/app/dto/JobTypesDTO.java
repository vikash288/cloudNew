package app.dto;

import java.util.List;

public class JobTypesDTO {

	 List<JobTypeDTO> jobTypeDTO;
	 
	 public JobTypesDTO(List<JobTypeDTO> jobTypeDTO) {
		 this.jobTypeDTO = jobTypeDTO;
	}
	 
	 public List<JobTypeDTO> getJobType() {
	       return jobTypeDTO;
	 }

	public void setJobType(List<JobTypeDTO> jobTypeDTO) {
	        this.jobTypeDTO = jobTypeDTO;
	  }

}
