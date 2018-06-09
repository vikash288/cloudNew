package app.dto;

 
import java.util.List;
import java.util.stream.Collectors;



import app.model.Job;
import app.model.JobDependent;
import app.model.JobType;
import app.model.ServerCredentials;
import app.model.ServerType;
import app.model.User;
 

public class JobDTO {
	
    private Long id;
    private Long sourceId;
    private Long targetId;
    private Long sourceType; 
    private Long targetType; 
    private Long jobType; 
    private Long parentId;
    
    private String jobName;
	private String jobComment;
	private String jobjson;
	
	private String sorcebucketName;
	private String sourcefolderPath;
	private String sourcefileKey;
	
	private String destinationbucketName;
	private String destinationfolderPath;
	private String destinationfileKey;
	
	
	private Boolean sourcerdbmsnewtable;
 	private String sourcerdbmstableName;
 	private Boolean sourcerdbmsnewtableTruncate;
 	
	private Boolean destinationrdbmsnewtable;
 	private String destinationrdbmstableName;
 	private Boolean destinationrdbmsnewtableTruncate;
 	
 	 
 	private String sourcerhashtag;
	private int sourcerbatchsize;
	private String sourcerkafkaName;
	private String dumpaccessKey;
	private String dumpsecretKey;
	private String dumpbucketName;
	private String dumpKey;
	private String dumpbucketlocation;
	private String trainaccessKey;
	private String trainsecretKey;
	private String trainbucketName;
	private String trainKey;
	
	private String mlalgorithm;
 	private String mlVariable;
 	
 	private String transformquery;
 	
	public JobDTO() {  
	}
	
	public JobDTO(Long id) {
		this.id = id;
	}
	 
	public JobDTO(Long id,User user,ServerCredentials sourceId ,ServerCredentials targetId,ServerType sourceType, ServerType targetType,JobType jobType ,String jobName,String jobComment,
				 String jobjson) {
		this.id = id;
		this.jobName = jobName;
		this.jobComment = jobComment;
  		this.jobjson = jobjson;
		this.parentId = user.getId();
		this.sourceId = sourceId.getId();
		this.sourceType = sourceType.getId();
		this.targetType = targetType.getId();
		this.jobType = jobType.getId();
 		this.targetId = targetId.getId();
		
	}	
	
	public JobDTO( Job job,String sorcebucketName,String sourcefolderPath,String sourcefileKey,String destinationbucketName,String destinationfolderPath,
			String destinationfileKey,Boolean sourcerdbmsnewtable,String sourcerdbmstableName, Boolean sourcerdbmsnewtableTruncate,
			Boolean destinationrdbmsnewtable,String destinationrdbmstableName,Boolean destinationrdbmsnewtableTruncate, String sourcerhashtag,
			int sourcerbatchsize ,String sourcerkafkaName , String dumpaccessKey ,String dumpsecretKey ,String dumpbucketName,String dumpKey , String dumpbucketlocation,String trainaccessKey ,String trainsecretKey ,String trainbucketName ,String trainKey ,
			String mlalgorithm,String mlVariable,String transformquery) {
		
	 this.id = job.getId();
 	 this.jobName = job.getJobName();
	 this.jobComment = job.getJobComment();
 	 this.jobjson = job.getJobjson();
	 this.parentId = job.getUser().getId();
	 this.sourceId = job.getSource().getId();
	 this.sourceType = job.getSourceType().getId();
	 this.targetType = job.getTargetType().getId();
	 this.jobType = job.getJobType().getId();
 	 this.targetId = job.getTarget().getId();
	 this.sorcebucketName = sorcebucketName;
	 this.sourcefolderPath = sourcefolderPath;
	 this.sourcefileKey = sourcefileKey;
	 this.destinationbucketName = destinationbucketName;
	 this.destinationfolderPath = destinationfolderPath;
	 this.destinationfileKey = destinationfileKey;
	 this.sourcerdbmsnewtable = sourcerdbmsnewtable;
	 this.sourcerdbmstableName = sourcerdbmstableName;
	 this.sourcerdbmsnewtableTruncate = sourcerdbmsnewtableTruncate;
	 this.destinationrdbmsnewtable = destinationrdbmsnewtable;
	 this.destinationrdbmstableName = destinationrdbmstableName;
	 this.destinationrdbmsnewtableTruncate = destinationrdbmsnewtableTruncate;
	 this.sourcerhashtag = sourcerhashtag;
	 this.sourcerbatchsize =sourcerbatchsize;
	 this.sourcerkafkaName = sourcerkafkaName;
	 this.dumpaccessKey = dumpaccessKey;
	 this.dumpsecretKey = dumpsecretKey;
	 this.dumpbucketName = dumpbucketName;
	 this.dumpKey = dumpKey;
	 this.dumpbucketlocation=dumpbucketlocation;
	 this.trainaccessKey = trainaccessKey;
	 this.trainsecretKey = trainsecretKey;
	 this.trainbucketName = trainbucketName;
	 this.trainKey = trainKey;
	 this.mlalgorithm = mlalgorithm;
	 this.mlVariable = mlVariable;
	 this.transformquery = transformquery;
	 
    }	
	public static JobDTO mapFromJobEntity(Job job) {
        return new JobDTO( job.getId(), job.getUser(),job.getSource(),job.getTarget(),job.getSourceType() ,job.getTargetType(),job.getJobType(),job.getJobName(),job.getJobComment(),job.getJobjson());
   }
 
   public static List<JobDTO> mapFromJobEntities(List<Job> jobs) {
       return jobs.stream().map((job) -> mapFromJobEntity(job)).collect(Collectors.toList());
   }
   
	public static JobDTO mapFromJobDependentEntity(JobDependent jobdependent) {
        return new JobDTO(  jobdependent.getJob(),jobdependent.getSorcebucketPath(),jobdependent.getSourcefolderPath(),jobdependent.getSourcefileKey(),
        		jobdependent.getDestinationbucketPath(),jobdependent.getDestinationfolderPath(),jobdependent.getDestinationKey(),
        		jobdependent.getSourcerdbmsnewtable(),jobdependent.getSourcerdbmstableName(),jobdependent.getSourcerdbmsnewtableTruncate(),
        		jobdependent.getDestinationrdbmsnewtable(),jobdependent.getDestinationrdbmstableName(),jobdependent.getDestinationrdbmsnewtableTruncate(),
        		jobdependent.getSourcerhashtag(),jobdependent.getSourcerbatchsize(), jobdependent.getSourcerkafkaName(),jobdependent.getDumpaccessKey(),
        		jobdependent.getDumpsecretKey(),jobdependent.getDumpbucketName(),jobdependent.getDumpKey(), jobdependent.getDumpbucketlocation(), jobdependent.getTrainaccessKey(),
        		jobdependent.getTrainsecretKey(),jobdependent.getTrainbucketName(),jobdependent.getTrainaccessKey(),
        jobdependent.getmlalgorithm(),jobdependent.getmlVariable(),jobdependent.gettransformquery());
   }
 
 
	
   public static List<JobDTO> mapFromJobDependentEntities(List<JobDependent> jobdependents) {
       return jobdependents.stream().map((jobdependent) -> mapFromJobDependentEntity(jobdependent)).collect(Collectors.toList());
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
	
	public Long getSourceId() {
			return sourceId;
		}

	public void setSourceId(Long sourceId) {
			this.sourceId = sourceId;
	}
		
		 
	public Long gettargetType() {
			return targetType;
	 }

	public void settargetType( Long targetType) {
			this.targetType = targetType;
	}
	
	 
	public Long getsourceType() {
			return sourceType;
	 }

	public void setsourceType( Long sourceType) {
			this.sourceType = sourceType;
	}
	
	public Long getjobType() {
		return jobType;
	 }
	
	public void setjobType( Long jobType) {
			this.jobType = jobType;
	}


	
	public Long getTargetId() {
			return targetId;
	 }

	public void setTargetId( Long targetId) {
			this.targetId = targetId;
	}
	
	public String getjobName() {
		return jobName;
	}

	public void setjobName(String jobName) {
		this.jobName = jobName;
	}
	

	public void setjobComment(String jobComment) {
		this.jobComment = jobComment;
	}
	
	public String getjobComment() {
		return jobComment;
	}

	public String getjobjson() {
		return jobjson;
	}

	public void setjobjson(String jobjson) {
		this.jobjson = jobjson;
	}
	
	public String getsorcebucketName() {
		return sorcebucketName;
	}

	public void setsorcebucketName(String sorcebucketName) {
		this.sorcebucketName = sorcebucketName;
	}
	
	public String getsourcefolderPath() {
		return sourcefolderPath;
	}

	public void setsourcefolderPath(String sourcefolderPath) {
		this.sourcefolderPath = sourcefolderPath;
	}
	
	

	public String getsourcefileKey() {
		return sourcefileKey;
	}

	public void setsourcefileKey(String sourcefileKey) {
		this.sourcefileKey = sourcefileKey;
	}
	
	
	public String getdestinationbucketName() {
		return destinationbucketName;
	}

	public void setdestinationbucketPath(String destinationbucketName) {
		this.destinationbucketName = destinationbucketName;
	}
	
	
	public String getdestinationfolderPath() {
		return destinationfolderPath;
	}

	public void setdestinationfolderPath(String destinationfolderPath) {
		this.destinationfolderPath = destinationfolderPath;
	}
	
	public String getdestinationfileKey() {
		return destinationfileKey;
	}

	public void setdestinationfileKey(String destinationfileKey) {
		this.destinationfileKey = destinationfileKey;
	}
	
	public Boolean getsourcerdbmsnewtable() {
		return sourcerdbmsnewtable;
	}

	public void setsourcerdbmsnewtable(Boolean sourcerdbmsnewtable) {
		this.sourcerdbmsnewtable = sourcerdbmsnewtable;
	}
	
	public Boolean getsourcerdbmsnewtableTruncate() {
		return sourcerdbmsnewtableTruncate;
	}

	public void setsourcerdbmsnewtableTruncate(Boolean sourcerdbmsnewtableTruncate) {
		this.sourcerdbmsnewtableTruncate = sourcerdbmsnewtableTruncate;
	}
	
	public String getsourcerdbmstableName() {
		return sourcerdbmstableName;
	}

	public void setsourcerdbmstableName(String sourcerdbmstableName) {
		this.sourcerdbmstableName = sourcerdbmstableName;
	}
	
	
	public Boolean getdestinationrdbmsnewtable() {
		return destinationrdbmsnewtable;
	}

	public void setdestinationrdbmsnewtable(Boolean destinationrdbmsnewtable) {
		this.destinationrdbmsnewtable = destinationrdbmsnewtable;
	}
	
	public Boolean getdestinationrdbmsnewtableTruncate() {
		return destinationrdbmsnewtableTruncate;
	}

	public void setdestinationrdbmsnewtableTruncate(Boolean destinationrdbmsnewtableTruncate) {
		this.destinationrdbmsnewtableTruncate = destinationrdbmsnewtableTruncate;
	}
	
	public String getdestinationrdbmstableName() {
		return destinationrdbmstableName;
	}

	public void setdestinationrdbmstableName(String destinationrdbmstableName) {
		this.destinationrdbmstableName = destinationrdbmstableName;
	}
	
	
	public String getSourcerhashtag() {
		return sourcerhashtag;
	}

	public void setSourcerhashtag(String sourcerhashtag) {
		this.sourcerhashtag = sourcerhashtag;
	}

	public int getSourcerbatchsize() {
		return sourcerbatchsize;
	}

	public void setSourcerbatchsize(int sourcerbatchsize) {
		this.sourcerbatchsize = sourcerbatchsize;
	}

	public String getSourcerkafkaName() {
		return sourcerkafkaName;
	}

	public void setSourcerkafkaName(String sourcerkafkaName) {
		this.sourcerkafkaName = sourcerkafkaName;
	}

	public String getDumpaccessKey() {
		return dumpaccessKey;
	}

	public void setDumpaccessKey(String dumpaccessKey) {
		this.dumpaccessKey = dumpaccessKey;
	}

	public String getDumpsecretKey() {
		return dumpsecretKey;
	}

	public void setDumpsecretKey(String dumpsecretKey) {
		this.dumpsecretKey = dumpsecretKey;
	}

	public String getDumpbucketName() {
		return dumpbucketName;
	}

	public void setDumpbucketName(String dumpbucketName) {
		this.dumpbucketName = dumpbucketName;
	}

	public String getDumpKey() {
		return dumpKey;
	}

	public void setDumpKey(String dumpKey) {
		this.dumpKey = dumpKey;
	}

	public String getDumpbucketlocation() {
		return dumpbucketlocation;
	}

	public void setDumpbucketlocation(String dumpbucketlocation) {
		this.dumpbucketlocation = dumpbucketlocation;
	}
	
	public String getTrainaccessKey() {
		return trainaccessKey;
	}

	public void setTrainaccessKey(String trainaccessKey) {
		this.trainaccessKey = trainaccessKey;
	}

	public String getTrainsecretKey() {
		return trainsecretKey;
	}

	public void setTrainsecretKey(String trainsecretKey) {
		this.trainsecretKey = trainsecretKey;
	}

	public String getTrainbucketName() {
		return trainbucketName;
	}

	public void setTrainbucketName(String trainbucketName) {
		this.trainbucketName = trainbucketName;
	}

	public String getTrainKey() {
		return trainKey;
	}

	public void setTrainKey(String trainKey) {
		this.trainKey = trainKey;
	}
	
	
	public String getmlalgorithm() {
		return mlalgorithm;
	}

	public void setmlalgorithm(String mlalgorithm) {
		this.mlalgorithm = mlalgorithm;
	}
	
	public String getmlVariable() {
		return mlVariable;
	}

	public void setmlVariable(String mlVariable) {
		this.mlVariable = mlVariable;
	}
	
	public String gettransformquery() {
		return transformquery;
	}

	public void settransformquery(String transformquery) {
		this.transformquery = transformquery;
	}
	
	 
	@Override
    public String toString() {
        return "Account{" +
                "account_id" + jobName + '\'' +
                ", account_name='" + jobComment + '\'' +
                '}';
    }
}
