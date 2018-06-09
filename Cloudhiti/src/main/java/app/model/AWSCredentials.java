package app.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

/**
*
* The S3CREDENTIALS JPA entity
*
*/
@Entity
@Table(name = "awscredentials")

@NamedQueries({
   @NamedQuery(
           name =  AWSCredentials.FIND_BY_USERID,
           query = "select aws from AWSCredentials aws where user_id = :user_id"
   ),
   @NamedQuery(
           name =  AWSCredentials.FIND_BY_AWSCREDENTIALSID,
           query = "select aws from AWSCredentials aws where id = :id"
   )
 
})

public class AWSCredentials {

	 		
		public static final String FIND_BY_USERID = "AWSCredentials.findByUserId";
		public static final String FIND_BY_AWSCREDENTIALSID = "AWSCredentials.findById";
		
		@Id
	    @GeneratedValue
	    private Long id;
	    
	    @ManyToOne
	    private User user;

 
		private String awscredentialsName;
		private String secretKey;
		private String accessKey;
		private int mainaccountStatus;
		private String trashbucketName;
		public AWSCredentials(){
		}
		
		public AWSCredentials(User user ,String awscredentialsName, String secretKey,String accessKey,String trashbucketName,int mainaccountStatus) {
			super();
			this.user = user;
			this.awscredentialsName = awscredentialsName;
			this.secretKey = secretKey;
			this.accessKey = accessKey;
			this.trashbucketName=trashbucketName;
			this.mainaccountStatus= mainaccountStatus;
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
			return accessKey;
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
