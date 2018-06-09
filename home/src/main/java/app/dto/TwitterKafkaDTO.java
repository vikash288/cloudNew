package app.dto;

import java.util.List;
import java.util.stream.Collectors;

import app.model.TwitterKafka;

public class TwitterKafkaDTO {
	
	private Long id;
	private String twitterKafkaName;
	
	public TwitterKafkaDTO(){
    }
 	
 	public TwitterKafkaDTO( Long id, String twitterKafkaName) {
 		this.id = id;
 		this.twitterKafkaName = twitterKafkaName;
 	}
  	
 	public static TwitterKafkaDTO mapFromTwitterKafkaEntity(TwitterKafka twitterKafka) {
          return new TwitterKafkaDTO(twitterKafka.getId(), twitterKafka.gettwitterKafkaName() );
     }
     
    public static List<TwitterKafkaDTO> mapFromTwitterKafkaEntities(List<TwitterKafka> twitterKafkas) {
         return twitterKafkas.stream().map((twitterKafka) -> mapFromTwitterKafkaEntity(twitterKafka)).collect(Collectors.toList());
     }
     
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
