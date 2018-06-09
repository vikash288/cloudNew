package app.dto;

import java.util.List;

/**
 *
 * JSON serializable DTO containing data concerning a S3Credentials search request.
 *
 */

public class AWSCredentialsDTO {

	List<AWSCredentialDTO> awscredential;
	
	public AWSCredentialsDTO(List<AWSCredentialDTO> awscredential) {
		 this.awscredential = awscredential;
	}
	
	public List<AWSCredentialDTO> getAWSCredential() {
	       return awscredential;
	 }

	public void setAWSCredential(List<AWSCredentialDTO> awscredential) {
	        this.awscredential = awscredential;
	  }
}