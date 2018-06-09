package app.services;


 
import static org.springframework.util.Assert.notNull;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.stream.Collectors;
 
 
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import app.dao.ScheduleRepository;
import app.dao.UserRepository;
import app.dto.ScheduleDTO;
import app.model.Job;
import app.model.JobDependent;
import app.model.Schedule;
import app.model.SearchResult;
import app.model.User;
 
/**
 *
 * Business service for Schedule-related operations.
 *
 */
@Service
public class ScheduleService {

    @SuppressWarnings("unused")
	private static final Logger LOGGER = LoggerFactory.getLogger(ScheduleService.class);
	
	
    @Autowired
    private ScheduleRepository scheduleRepository;
    
    @Autowired
    UserRepository userRepository;
    /**
     *
     * searches schedules by date/time
     *
     * @param userId - the currently logged in user
     * @return - the found results
     */
    @Transactional(readOnly = true)
    public SearchResult<Schedule> findSchedules(Long userId) {

        Long resultsCount = scheduleRepository.countSchedules(userId);

        List<Schedule> schedules = scheduleRepository.findSchedules(userId);

        return new SearchResult<>(resultsCount, schedules);
    }

    /**
     *
     * Pauses trigger by name
     *
     * @param triggerName - the currently logged in user
     * @return - the found results
     */
 //   @Transactional(readOnly = false)
   /* public SearchResult<Schedule> pauseSchedule(String triggerName) {
        notNull(triggerName, "triggerName is mandatory");

		try{
			Scheduler scheduler = schedulerFactoryBean.getScheduler();
			scheduler.pauseTrigger(new TriggerKey(triggerName, "syra"));
		} catch (SchedulerException ex) {
			throw new RuntimeException(ex);
		} 			

        List<Schedule> schedules = scheduleRepository.findTrigger(triggerName);

        return new SearchResult<>(schedules.size(), schedules);
    }	*/

    /**
     *
     * Resumes trigger by name
     *
     * @param triggerName - the currently logged in user
     * @return - the found results
     */
    /*@Transactional(readOnly = false)
    public SearchResult<Schedule> resumeSchedule(String triggerName) {
        notNull(triggerName, "triggerName is mandatory");

		try{
			Scheduler scheduler = schedulerFactoryBean.getScheduler();
			scheduler.resumeTrigger(new TriggerKey(triggerName, "syra"));
		} catch (SchedulerException ex) {
			throw new RuntimeException(ex);
		} 			

        List<Schedule> schedules = scheduleRepository.findTrigger(triggerName);

        return new SearchResult<>(schedules.size(), schedules);
    }	*/

	/**
     *
     * Unschedules trigger by name
     *
     * @param triggerName - the currently logged in user
     * @return - the found results
     */
    /*@Transactional(readOnly = false)
    public boolean deleteSchedule(String triggerName) {
        notNull(triggerName, "triggerName is mandatory");

		try{
			Scheduler scheduler = schedulerFactoryBean.getScheduler();
			return scheduler.unscheduleJob(new TriggerKey(triggerName, "syra"));
		} catch (SchedulerException ex) {
			throw new RuntimeException(ex);
		}
    }	*/
	
    /**
     *
     * deletes a list of schedules, given their Ids
     *
     * @param deletedScheduleIds - the list of schedules to delete
     */
    /*@Transactional
    public void deleteSchedules(List<Long> deletedScheduleIds) {
        notNull(deletedScheduleIds, "deletedSchedulesId is mandatory");
        deletedScheduleIds.stream().forEach((deletedScheduleId) -> scheduleRepository.delete(deletedScheduleId));
    }*/

    /**
     *
     * saves a schedule (new or not) into the database.
     *
     * @param jobname - - the currently logged in user
     * @param id - the database ud of the schedule
     * @return - the new version of the schedule
     */

    @Transactional
    public Schedule saveSchedule( Long id, Long user_id ,String scheduleName, String scheduleDetails, String scheduleTime ) {

        notNull(scheduleName, "scheduleName is mandatory");
        notNull(scheduleDetails, "scheduleDetails is mandatory");
		
            
        Schedule schedule = null;
        if(id != null  ){

				// Do nothing if Job / Trigger already exists !!
				
			} else {
 				
				User user = userRepository.findUserByUserID(user_id);
				if (user != null) {  
		       		
					schedule = scheduleRepository.save(new Schedule(user,scheduleName,scheduleDetails,scheduleTime));
		       		 
 		           } else {
		               LOGGER.warn("A S3Credentials was attempted to be saved for a non-existing user: " + user_id);
					}
				 

			}
		 
        return schedule;
    }

    /**
     *
     * saves a list of schedules (new or not) into the database
     *
     * @param schedules - the list of schedules to be saved
     * @return - the new versions of the saved schedules
     */
    @Transactional
    public List<Schedule> saveSchedules(List<ScheduleDTO> schedules)  {
        return schedules.stream()
                .map((schedule) -> saveSchedule(schedule.getId(),
						schedule.getParentId(),
						schedule.getscheduleName(),
						schedule.getscheduleDetails(),
						schedule.getscheduleTime()
					 ))
                .collect(Collectors.toList());
    }
}
