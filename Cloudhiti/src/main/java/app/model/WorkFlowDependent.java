package app.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

@Entity
@Table(name = "workflowdependent")
@NamedQueries({
	   @NamedQuery(
	           name =  WorkFlowDependent.FIND_BY_WORKFLOWID,
	           query = "select wfd from WorkFlowDependent wfd where workflow_id = :workflow_id"
	   )
	 
	})

public class WorkFlowDependent {

	public static final String FIND_BY_WORKFLOWID = "WorkFlowDependent.findByWorkflowId";
	
	@ManyToOne
    @JoinColumn(name="job_id")
    private Job job;
	
	@ManyToOne
    @JoinColumn(name="workflow_id")
    private WorkFlow workFlow;
	
	
	@Id
    @GeneratedValue
    private Long id;
	
	private Long SequenceId;
	private Long PredecessorId;
	private Long SuccessorId;
	private Boolean active;
	private Boolean start;
	private Boolean end;
	
	public WorkFlowDependent() {
		// TODO Auto-generated constructor stub
	}
	
	public WorkFlowDependent(WorkFlow workFlow ,Job job , Long SequenceId,Long PredecessorId,Long SuccessorId,Boolean active,Boolean start,Boolean end) {
		super();
		this.workFlow = workFlow; 
		this.job = job; 
		this.SequenceId = SequenceId; 
		this.PredecessorId = PredecessorId; 
		this.SuccessorId = SuccessorId; 
		this.active=active;
		this.start=start;
		this.end=end;
	}
	
 	
	@ManyToOne
	public Job getJob() {
		return job;
	}

	public void setJob(Job job) {
		this.job = job;
	}
	
	
	public void setId(Long id) {
			this.id = id;
	}
		
	public Long getId() {
	        return id;
	    }
	
	public void setSequenceId(Long SequenceId) {
		this.SequenceId = SequenceId;
	}
	
	public Long getSequenceId() {
		return SequenceId;
	}
	
	public void setPredecessorId(Long PredecessorId) {
		this.PredecessorId = PredecessorId;
	}
	
	public Long getPredecessorId() {
		return PredecessorId;
	}
	
	public void setSuccessorId(Long SuccessorId) {
		this.SuccessorId = SuccessorId;
	}
	
	public Long getSuccessorId() {
		return SuccessorId;
	}
	
	public void setActive(Boolean active) {
		this.active = active;
	}
	
	public Boolean getActive() {
		return active;
	}
	
	public void setStart(Boolean start) {
		this.start = start;
	}
	
	public Boolean getStart() {
		return start;
	}
	
	public void setEnd(Boolean end) {
		this.end = end;
	}
	
	public Boolean getEnd() {
		return end;
	}
	
}
