package app.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

@Entity
@Table(name = "jobtype")

@NamedQueries({
    
	   @NamedQuery(
	           name =  JobType.FIND_BY_JOBTYPEID,
	           query = "select jobType from  JobType jobType where id = :id"
	   )
	 
	})
public class JobType {

	public static final String FIND_BY_JOBTYPEID = "JobType.findById";
	
	@Id
    @GeneratedValue
    private Long id;
    
 
    private String JobTypeName;
    
    public JobType() {
		// TODO Auto-generated constructor stub
	}
    
    public JobType(String JobTypeName) {
		super();
 		this.JobTypeName  = JobTypeName;
	 
	}
    
    public Long getId() {
        return id;
    }
	
	 
	public String getJobTypeName() {
		return JobTypeName;
	}

	public void setJobTypeName(String JobTypeName) {
		this.JobTypeName = JobTypeName;
	}
}
