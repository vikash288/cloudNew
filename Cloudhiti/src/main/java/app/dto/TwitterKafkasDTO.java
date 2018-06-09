package app.dto;

import java.util.List;

public class TwitterKafkasDTO {
	
	List<TwitterKafkaDTO> twitterKafkaDTO;
	
	public TwitterKafkasDTO(List<TwitterKafkaDTO> twitterKafkaDTO) {
		 this.twitterKafkaDTO = twitterKafkaDTO;
	}
	
	public List<TwitterKafkaDTO> getTwitterKafkaTopic() {
	       return twitterKafkaDTO;
	 }

	public void setTwitterKafkaTopic(List<TwitterKafkaDTO> twitterKafkaDTO) {
	        this.twitterKafkaDTO = twitterKafkaDTO;
	  }
}

 