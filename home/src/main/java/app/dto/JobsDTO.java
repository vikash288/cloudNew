package app.dto;

import java.util.List;

public class JobsDTO {

	 
    List<JobDTO> job;
	
	public JobsDTO(List<JobDTO> job) {
		 this.job = job;
	}
	
	public List<JobDTO> getJobs() {
	       return job;
	 }

	public void setJobs(List<JobDTO> job) {
	        this.job = job;
	  }

}
