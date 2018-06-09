package app.dto;

import java.util.List;
import java.util.stream.Collectors;

 
import app.model.ServerCredentials;
import app.model.ServerType;
import app.model.User;

public class ServerCredentialDTO {
	
	private Long id;
	private Long servertypeid;
	private String serverName;
	private Long  port;
	private String username;
	private String password;
	private String hosturl;
	private String className;
	private Long parentId;
	
	private String databaseType;
	private String databaseName;
	
	private String secretKey;
	private String accessKey;
	private String reason;
	
	private String appkey;
	private String consumersecret;
	private String consumerKey;
	private String appsecret;
	
	public ServerCredentialDTO() {  
	}
	
	public ServerCredentialDTO( Long id,ServerType servertypeid,String ServerName, Long port,String username,String password,String hosturl,String className,String databaseType,String databaseName,String secretKey,String accessKey,String reason,String appkey,String consumersecret,
			String consumerKey,String appsecret,User user) {
 		this.id = id;
 		this.servertypeid  = servertypeid.getId();
 		this.serverName  = ServerName;
		this.port  = port;
		this.username = username;
		this.password = password;
		this.hosturl = hosturl;
		this.className=className;
		this.parentId = user.getId();
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
    
 	public static ServerCredentialDTO mapFromServercredentialEntity(ServerCredentials servercredential) {
         return new ServerCredentialDTO(servercredential.getId(),servercredential.getServerType(), servercredential.getServerName(), servercredential.getport(), servercredential.getusername(),servercredential.getpassword(),servercredential.getipaddress(),servercredential.getclassName(),
        		 servercredential.getdatabaseType(),servercredential.getdatabaseName(),servercredential.getsecretKey(),servercredential.getaccessKey(),servercredential.getreason(),servercredential.getappkey(),servercredential.getconsumersecret(), servercredential.getconsumerKey(), 	servercredential.getappsecret(), servercredential.getUser());
    }
    
    public static List<ServerCredentialDTO> mapFromServercredentialEntities(List<ServerCredentials> servercredentials) {
        return servercredentials.stream().map((servercredential) -> mapFromServercredentialEntity(servercredential)).collect(Collectors.toList());
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
	
 
	public Long getservertypeid() {
		return servertypeid;
	}

	public void setservertypeid(Long servertypeid) {
		this.servertypeid = servertypeid;
	}
	 
	
	public String getServerName() {
		return serverName;
	}

	public void setServerName(String ServerName) {
		this.serverName = ServerName;
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
	
	public String gethosturl() {
		return hosturl;
	}

	public void sethosturl(String hosturl) {
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
