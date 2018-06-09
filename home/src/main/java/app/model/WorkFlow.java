package app.model;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

@Entity
@Table(name = "workflow")
@NamedQueries({
	   @NamedQuery(
	           name =  WorkFlow.FIND_BY_WORKFLOWID,
	           query = "select wk from WorkFlow wk where workflow_id = :workflow_id"
	   )
	 
	})

public class WorkFlow {

	public static final String FIND_BY_WORKFLOWID = "WorkFlow.findByWorkflowId";
	
  
	@ManyToOne
    @JoinColumn(name="user_id")
    private User user;
	
	
	@ManyToOne
    @JoinColumn(name="schedule_id")
    private Schedule schedule;
	
	
	@Id
    @GeneratedValue
    private Long id;
    
    private String WorkflowName;
    
    private Boolean schedulestatus;
    
    
    @Column( columnDefinition="TEXT" )
    private String Workjson;
   
 	/*@Column( columnDefinition="TIMESTAMP" )
	private Date TimeStamp; */
	
	public WorkFlow() {
		// TODO Auto-generated constructor stub
	}
	
	public WorkFlow(User user , Schedule schedule,String WorkflowName,Boolean schedulestatus,String Workjson) {
		super();
		this.user = user; 
		this.schedule = schedule; 
		this.WorkflowName = WorkflowName; 
		this.schedulestatus=schedulestatus;
		this.Workjson = Workjson; 
	}
	
	@ManyToOne
		public User getUser() {
			return user;
		}

		public void setUser(User user) {
			this.user = user;
		}
		
		@ManyToOne
		public Schedule getSchedule() {
			return schedule;
		}

		public void setSchedule(Schedule schedule) {
			this.schedule = schedule;
		}
		
		public void setId(Long id) {
  			this.id = id;
  		}
  		
  		public Long getId() {
  	        return id;
  	    }
  		
  		public void setWorkflowName(String WorkflowName) {
			this.WorkflowName = WorkflowName;
		}
		
		public String getWorkflowName() {
			return WorkflowName;
		}
		
		public void setWorkjson(String Workjson) {
			this.Workjson = Workjson;
		}
		
		public String getWorkjson() {
			return Workjson;
		}
		
		public void setSchedulestatus(Boolean schedulestatus) {
			this.schedulestatus = schedulestatus;
		}
		
		public Boolean getSchedulestatus() {
			return schedulestatus;
		}
}
