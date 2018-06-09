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
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.xml.soap.Text;

@Entity
@Table(name = "job")
@NamedQueries({
	   @NamedQuery(
	           name =  Job.FIND_BY_USERID,
	           query = "select j from Job j where user_id = :user_id"
	   ),
	   @NamedQuery(
	           name =  Job.FIND_BY_JOBID,
	           query = "select j from Job j where id = :id"
	   )
	})

public class Job {

	public static final String FIND_BY_USERID = "job.findByUserId";
	public static final String FIND_BY_JOBID = "job.findByJobId";
    
    @ManyToOne
    @JoinColumn(name="user_id")
    private User user;
    
    
    @ManyToOne        
    @JoinColumn(name="source_id")
    private ServerCredentials source;
    
    @ManyToOne          
    @JoinColumn(name="target_id")
    private ServerCredentials target; 
    
    @ManyToOne        
    @JoinColumn(name="Source_Type")
    private ServerType source_Type;
    
    @ManyToOne          
    @JoinColumn(name="Target_Type")
    private ServerType target_Type; 
    
    @ManyToOne          
    @JoinColumn(name="jobType_id")
    private JobType jobType; 
    
	
	@Id
    @GeneratedValue
    private Long id;
	private String JobName;
	private String JobComment;
	
	
	
	@Column( columnDefinition="TEXT" )
	private String Jobjson;
	
	/*@Column( columnDefinition="TIMESTAMP" )
	private Date TimeStamp;
	*/
	
	/*@Temporal(TemporalType.TIMESTAMP)
	private Date TimeStamp;*/
 
	
	public Job() {
		// TODO Auto-generated constructor stub
	}



	public Job(User user ,ServerCredentials source ,ServerCredentials target ,ServerType source_Type, ServerType target_Type,JobType jobType, String JobName,String JobComment,String Jobjson) {
		super();
		this.user = user; 
		this.source = source; 
		this.target = target;
		this.JobName = JobName;
		this.JobComment = JobComment;
		this.Jobjson = Jobjson;
		this.source_Type= source_Type;
		this.jobType=jobType;
		this.target_Type= target_Type;
		//this.TimeStamp = TimeStamp;
	 
	}
      		
      		 
      		
  		@ManyToOne
  		public User getUser() {
  			return user;
  		}
  
  		public void setUser(User user) {
  			this.user = user;
  		}
  		
  		@ManyToOne
  		public ServerCredentials getSource() {
  			return source;
  		}
  
  		public void setSource(ServerCredentials source) {
  			this.source = source;
  		}
  		
  		@ManyToOne
  		public ServerCredentials getTarget() {
  			return target;
  		}
  
  		public void setTarget(ServerCredentials target) {
  			this.target = target;
  		}
  		
  		@ManyToOne
  		public ServerType getSourceType() {
  			return source_Type;
  		}
  
  		public void setSourceType(ServerType source_Type) {
  			this.source_Type = source_Type;
  		}
  		
  		
  		
  		@ManyToOne
  		public ServerType getTargetType() {
  			return target_Type;
  		}
  
  		public void setTargetType(ServerType target_Type) {
  			this.target_Type = target_Type;
  		}
  		
  		@ManyToOne
  		public JobType getJobType() {
  			return jobType;
  		}
  
  		public void setJobType(JobType jobType) {
  			this.jobType = jobType;
  		}
  		
  		public void setId(Long id) {
  			this.id = id;
  		}
  		
  		public Long getId() {
  	        return id;
  	    }
      	
  		public String getJobName() {
			return JobName;
		}

		public void setJobName(String JobName) {
			this.JobName = JobName;
		}
		
	
		public void setJobComment(String JobComment) {
			this.JobComment = JobComment;
		}
		
		public String getJobComment() {
			return JobComment;
		}

		public String getJobjson() {
			return Jobjson;
		}

		public void setJobjson(String Jobjson) {
			this.Jobjson = Jobjson;
		}
 
	 /*	public Date getTimeStamp() {
			return TimeStamp;
		}

		public void setTimeStamp(Date TimeStamp) {
			this.TimeStamp = TimeStamp;
		}*/
  
		 
  		
}