package app.dto;

import java.util.List;
import java.util.stream.Collectors;

import app.model.AWSCredentials;
import app.model.User;

/**
*
* DTO used only for posting new S3 Credentials for creation
*
*/

public class AWSCredentialDTO {

    private Long id;
	private String secretKey;
	private String accessKey;
	private String awscredentialsName;
	private Long parentId;
	private String trashbucketName;
	private int mainaccountStatus;

 
    public AWSCredentialDTO() {
    }
    
	public AWSCredentialDTO(Long id, String awscredentialsName, String secretKey ,String accessKey,String trashbucketName, User user,int mainaccountStatus) {
		this.id = id;
		this.awscredentialsName=awscredentialsName;
		this.secretKey = secretKey;
		this.accessKey = accessKey;
		this.trashbucketName=trashbucketName;
		this.parentId = user.getId();
		this.mainaccountStatus=mainaccountStatus;
	}	

    public static AWSCredentialDTO mapFromS3credentialEntity(AWSCredentials awscredential) {
         return new AWSCredentialDTO(awscredential.getId(), awscredential.getawscredentialsName(), awscredential.getsecretKey(),awscredential.getaccessKey(),awscredential.gettrashbucketName(),  awscredential.getUser(),awscredential.getmainaccountStatus());
    }
    
    public static List<AWSCredentialDTO> mapFromAWScredentialEntities(List<AWSCredentials> awscredentials) {
        return awscredentials.stream().map((awscredential) -> mapFromS3credentialEntity(awscredential)).collect(Collectors.toList());
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
	
	public String getawscredentialsName() {
		return awscredentialsName;
	}

	public void setawscredentialsName(String awscredentialsName) {
		this.awscredentialsName = awscredentialsName;
	}
	
	public String getsecretKey() {
		return secretKey;
	}

	public void setsecretKey(String secretKey) {
		this.secretKey = secretKey;
	}

	public String getaccessKey() {
		return this.accessKey;  
	}

	public void setaccessKey(String accessKey) {
		this.accessKey = accessKey;
	}
	

	public String gettrashbucketName() {
		return trashbucketName;
	}

	public void settrashbucketName(String trashbucketName) {
		this.trashbucketName = trashbucketName;
	}
	
	public int getmainaccountStatus() {
		return mainaccountStatus;
	}

	public void setmainaccountStatus(int mainaccountStatus) {
		this.mainaccountStatus = mainaccountStatus;
	}
}
