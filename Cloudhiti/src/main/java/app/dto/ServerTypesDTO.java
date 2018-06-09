package app.dto;

import java.util.List;

public class ServerTypesDTO {

	  List<ServerTypeDTO> serverTypeDTO;
		
		public ServerTypesDTO(List<ServerTypeDTO> serverTypeDTO) {
			 this.serverTypeDTO = serverTypeDTO;
		}
		
		public List<ServerTypeDTO> getServerType() {
		       return serverTypeDTO;
		 }

		public void setServerType(List<ServerTypeDTO> serverTypeDTO) {
		        this.serverTypeDTO = serverTypeDTO;
		  }

}
