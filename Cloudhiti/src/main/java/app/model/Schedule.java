package app.model;


  
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

 
/**
 *
 * The Schedule JPA entity
 *
 */
@Entity
@Table(name = "schedule")
@NamedQueries({
	   @NamedQuery(
	           name =  Schedule.FIND_BY_USERID,
	           query = "select sch from Schedule sch where user_id = :user_id"
	   ),
	   @NamedQuery(
               name = Schedule.FIND_BY_ID,
               query = "select sch from Schedule sch where id = :id"
       )
 	})
 
public class Schedule {

	public static final String FIND_BY_USERID = "schedule.findByUserId";
	public static final String FIND_BY_ID = "user.findById";
	 
	@Id
    @GeneratedValue
    private Long id;
    
    @ManyToOne
    @JoinColumn(name="user_id")
    private User user;
    
 	private String scheduleName;
	private String scheduleDetails;
	private String scheduleTime;
	
	  
	public Schedule(){
	}
	
	public Schedule(User user ,String scheduleName, String scheduleDetails, String scheduleTime) {
		super();
		this.user = user;
		this.scheduleName = scheduleName;
		this.scheduleDetails = scheduleDetails;
		this.scheduleTime = scheduleTime;
		  
	}
	
	@ManyToOne
	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}
	
	public void setId(Long id) {
		this.id = id;
	}
	
	public Long getId() {
        return id;
    }
	
	public void setscheduleName(String scheduleName) {
		this.scheduleName = scheduleName;
	}

	public String getscheduleName() {
		return scheduleName;
	}

	public void setscheduleDetails(String scheduleDetails) {
		this.scheduleDetails = scheduleDetails;
	}

	public String getscheduleDetails() {
		return scheduleDetails;
	}
	
	public void setscheduleTime(String scheduleTime) {
		this.scheduleTime = scheduleTime;
	}

	public String getscheduleTime() {
		return scheduleTime;
	}
}
