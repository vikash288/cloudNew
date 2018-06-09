package app.dto;

  
import java.util.List;
import java.util.stream.Collectors;

import app.model.Schedule;
import app.model.ServerType;
import app.model.User;
   
/**
 *
 * JSON serializable DTO containing Schedule data
 *
 */
public class ScheduleDTO {

	private Long id;
	private Long parentId;

	private String scheduleName;
	private String scheduleDetails;
	private String scheduleTime;
 
    public ScheduleDTO() {
    }
	
	public ScheduleDTO(Long id, String scheduleName, String scheduleDetails, String scheduleTime, User user) {
		this.id = id;
		this.scheduleName = scheduleName;
		this.scheduleDetails = scheduleDetails;
		this.scheduleTime = scheduleTime;
	 
		this.parentId = user.getId();	
		}	

	 
   public static ScheduleDTO mapFromSchedulesEntity(Schedule schedule) {
        return new ScheduleDTO( schedule.getId(), schedule.getscheduleName(), schedule.getscheduleDetails(),schedule.getscheduleTime(),schedule.getUser());
   }
 
   public static List<ScheduleDTO> mapFromSchedulesEntities(List<Schedule> schedules) {
       return schedules.stream().map((schedule) -> mapFromSchedulesEntity(schedule)).collect(Collectors.toList());
   }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

	public Long getParentId() {
		return parentId;
	}

	public void setParentId(Long parentId) {
		this.parentId = parentId;
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
