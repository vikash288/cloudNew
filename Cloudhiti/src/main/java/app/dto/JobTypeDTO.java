package app.dto;

import java.util.List;
import java.util.stream.Collectors;

import app.model.JobType;
import app.model.ServerType;

public class JobTypeDTO {
	
	private Long id;
	private String jobTypeName;
	 
	public JobTypeDTO() {
		// TODO Auto-generated constructor stub
	}
	
	public JobTypeDTO(Long id,String jobTypeName ) {
			this.id = id;
			this.jobTypeName = jobTypeName; 			 
	}
	
	public static JobTypeDTO mapFromjobTypeEntity(JobType jobType) {
	        return new JobTypeDTO( jobType.getId(), jobType.getJobTypeName() );
	}
	 
	public static List<JobTypeDTO> mapFromJobTypeEntities(List<JobType> jobTypes) {
	       return jobTypes.stream().map((jobType) -> mapFromjobTypeEntity(jobType)).collect(Collectors.toList());
	}
	   
	public void setId(Long id) {
			this.id = id;
	}
		
	public Long getId() {
	        return id;
	}
	
	public String getjobTypeName() {
		return jobTypeName;
	}

	public void setjobTypeName(String jobTypeName) {
		this.jobTypeName = jobTypeName;
	}
	 
}
