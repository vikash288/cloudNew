package app.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

@Entity
@Table(name = "servertype")

@NamedQueries({
	    
	   @NamedQuery(
	           name =  ServerType.FIND_BY_SERVERTYPEID,
	           query = "select server from ServerType server where id = :id"
	   )
	 
	})

public class ServerType {
	
 	public static final String FIND_BY_SERVERTYPEID = "ServerType.findById";
	
	@Id
    @GeneratedValue
    private Long id;
    
 
    private String ServerTypeName;
   
    
    public ServerType() {
		// TODO Auto-generated constructor stub
	}
    
    
    public ServerType(String ServerTypeName) {
		super();
 		this.ServerTypeName  = ServerTypeName;
	 
	}
    
     
	public Long getId() {
        return id;
    }
	
	 
	public String getServerType() {
		return ServerTypeName;
	}

	public void setServerType(String ServerTypeName) {
		this.ServerTypeName = ServerTypeName;
	}
}
