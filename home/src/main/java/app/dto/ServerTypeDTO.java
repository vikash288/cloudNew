package app.dto;

import java.util.List;
import java.util.stream.Collectors;

import app.model.ServerType;

 

public class ServerTypeDTO {

	 private Long id;
	 private String ServerTypename;
		
	 public ServerTypeDTO() {
		// TODO Auto-generated constructor stub
	}
	 
	 public ServerTypeDTO(Long id,String ServerTypename ) {
			this.id = id;
			this.ServerTypename = ServerTypename; 			 
		}	
	 
	 public static ServerTypeDTO mapFromserverTypeEntity(ServerType serverType) {
	        return new ServerTypeDTO( serverType.getId(), serverType.getServerType() );
	   }
	 
	   public static List<ServerTypeDTO> mapFromServerTypeEntities(List<ServerType> serverTypes) {
	       return serverTypes.stream().map((serverType) -> mapFromserverTypeEntity(serverType)).collect(Collectors.toList());
	   }
	   
	   public void setId(Long id) {
			this.id = id;
		}
		
		public Long getId() {
	        return id;
	    }
	public String getServerType() {
		return ServerTypename;
	}

	public void setServerType(String ServerTypename) {
		this.ServerTypename = ServerTypename;
	}
}
