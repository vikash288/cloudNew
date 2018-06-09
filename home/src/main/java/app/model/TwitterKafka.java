package app.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

/**
*
* The Schedule JPA entity
*
*/
@Entity
@Table(name = "twitterkafka")
 
public class TwitterKafka {
	
 	
	@Id
    @GeneratedValue
    private Long id;
	
	/*@ManyToOne
    @JoinColumn(name="user_id")
    private User user;*/
    
	
	private String twitterKafkaName;
  	
 	public TwitterKafka(){
    }
 	
 	public TwitterKafka( String twitterKafkaName) {
		super();
		//this.user = user;
		this.twitterKafkaName = twitterKafkaName;
 	}
  	
 	/*@ManyToOne
	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}*/
	
	
	public void setId(Long id) {
		this.id = id;
	}
	
	public Long getId() {
        return id;
    }
	
	public void settwitterKafkaName(String twitterKafkaName) {
		this.twitterKafkaName = twitterKafkaName;
	}

	public String gettwitterKafkaName() {
		return twitterKafkaName;
	}
}
