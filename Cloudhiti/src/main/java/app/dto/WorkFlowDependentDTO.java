package app.dto;

public class WorkFlowDependentDTO {

	private Long id;
	private Long sequenceId; 
	private Long predecessorId;
	private Long successorId;
	private Long jobId;
	private Boolean active;
	private Boolean start;
	private Boolean end;
	
	
	public WorkFlowDependentDTO() {
		// TODO Auto-generated constructor stub
	}
	
	public Long getId() {
        return id;
    }

	public void setId(Long id) {
	    this.id = id;
	}
	
	public void setsequenceId(Long sequenceId) {
		this.sequenceId = sequenceId;
	}
	
	public Long getsequenceId() {
		return sequenceId;
	}
	
	public void setpredecessorId(Long predecessorId) {
		this.predecessorId = predecessorId;
	}
	
	public Long getpredecessorId() {
		return predecessorId;
	}
	
	public void setsuccessorId(Long successorId) {
		this.successorId = successorId;
	}
	
	public Long getsuccessorId() {
		return successorId;
	}
	
	public void setjobId(Long jobId) {
		this.jobId = jobId;
	}
	
	public Long getjobId() {
		return jobId;
	}
	
	
	public void setactive(Boolean active) {
		this.active = active;
	}
	
	public Boolean getactive() {
		return active;
	} 
	
	public void setstart(Boolean start) {
		this.start = start;
	}
	
	public Boolean getstart() {
		return start;
	}
	
	public void setend(Boolean end) {
		this.end = end;
	}
	
	public Boolean getend() {
		return end;
	}
}
