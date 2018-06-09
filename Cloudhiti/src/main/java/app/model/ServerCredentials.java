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
* The SERVERCREDENTIALS JPA entity
*
*/
@Entity
@Table(name = "servercredentials")

@NamedQueries({
   @NamedQuery(
           name =  ServerCredentials.FIND_BY_USERID,
           query = "select server from ServerCredentials server where user_id = :user_id"
   ),
   @NamedQuery(
           name =  ServerCredentials.FIND_BY_SERVERCREDENTIALSID,
           query = "select server from ServerCredentials server where id = :id"
   ),
   @NamedQuery(
           name =  ServerCredentials.FIND_BY_SERVERCREDENTIALSIDNUSERID,
           query = "select server from ServerCredentials server where id = :id and user_id = :user_id"
   )
 
})

public class ServerCredentials {

	public static final String FIND_BY_USERID = "ServerCredentials.findByUserId";
	public static final String FIND_BY_SERVERCREDENTIALSID = "ServerCredentials.findById";
	public static final String FIND_BY_SERVERCREDENTIALSIDNUSERID = "ServerCredentials.findByIdNUser";

	@Id
    @GeneratedValue
    private Long id;
    
    @ManyToOne
    @JoinColumn(name="user_id")
    private User user;
    
    @ManyToOne
    @JoinColumn(name="servertype_id")
    private ServerType serverType;
    
/*	ServerName: '',
 */
	 
	private String ServerName;
	private Long  port;
	private String username;
	private String password;
	private String hosturl;
	private String className;
	
	private String databaseType;
	private String databaseName;
	
	private String secretKey;
	private String accessKey;
	private String reason;
	
	private String appkey;
	private String consumersecret;
	private String consumerKey;
	private String appsecret;
	
	
	
	public ServerCredentials() {
		
	}
	
	 
	public ServerCredentials(User user ,ServerType serverType,String ServerName,Long port,String username,String password,String hosturl,
			String className,String databaseType,String databaseName,String secretKey,String accessKey,String reason,String appkey,String consumersecret,
			String consumerKey,String appsecret) {
		super();
		this.user = user;
		this.serverType  = serverType;
		this.ServerName  = ServerName;
		this.port  = port;
		this.username = username;
		this.password = password;
		this.hosturl = hosturl;
		this.className = className; 
		this.databaseType=databaseType;
		this.databaseName=databaseName;
		
		this.secretKey=secretKey;
		this.accessKey=accessKey;
		this.reason=reason;
		
		this.appkey=appkey;
		this.consumersecret=consumersecret;
		this.consumerKey=consumerKey;
		this.appsecret=appsecret;
		
	}
	
	@ManyToOne
	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}
	
	@ManyToOne
	public ServerType getServerType() {
		return serverType;
	}

	public void setServerType(ServerType serverType) {
		this.serverType = serverType;
	}
	 
	public void setId(Long id) {
		this.id = id;
	}
	
	public Long getId() {
        return id;
    }
	
	 
	public String getServerName() {
		return ServerName;
	}

	public void setServerName(String ServerName) {
		this.ServerName = ServerName;
	}

	public Long getport() {
		return port;
	}

	public void setport(Long port) {
		this.port = port;
	}

	public String getusername() {
		return username;
	}

	public void setusername(String username) {
		this.username = username;
	}
	
	public String getpassword() {
		return password;
	}

	public void setpassword(String password) {
		this.password = password;
	}
	
	public String getipaddress() {
		return hosturl;
	}

	public void setipaddress(String hosturl) {
		this.hosturl = hosturl;
	}
	
	public String getclassName() {
		return className;
	}

	public void setclassName(String className) {
		this.className = className;
	}
	
	
	public String getdatabaseType() {
		return databaseType;
	}

	public void setdatabaseType(String databaseType) {
		this.databaseType = databaseType;
	}
	
    public String getdatabaseName() {
		return databaseName;
	}

	public void setdatabaseName(String databaseName) {
		this.databaseName = databaseName;
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
	
	public String getreason() {
		return reason;
	}

	public void setreason(String reason) {
		this.reason = reason;
	}
	
	public String getappkey() {
		return appkey;
	}

	public void setappkey(String appkey) {
		this.appkey = appkey;
	}
	
	 
	public String getconsumersecret() {
		return consumersecret;
	}

	public void setconsumersecret(String consumersecret) {
		this.consumersecret = consumersecret;
	}
	
	public String getconsumerKey() {
		return consumerKey;
	}

	public void setconsumerKey(String consumerKey) {
		this.consumerKey = consumerKey;
	}
	
	public String getappsecret() {
		return appsecret;
	}

	public void setappsecret(String appsecret) {
		this.appsecret = appsecret;
	}
	
	
}
