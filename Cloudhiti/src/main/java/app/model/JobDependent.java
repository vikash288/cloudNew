package app.model;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
@Table(name = "jobdependent")
@NamedQueries({
	   @NamedQuery(
	           name =  JobDependent.FIND_BY_JOBID,
	           query = "select j from JobDependent j where id = :job_id"
	   )
	 
	})
public class JobDependent {
	
	public static final String FIND_BY_JOBID = "Job.findByJobId";
	
    @ManyToOne
    @JoinColumn(name="job_id")
    private Job job;
    
    @Id
    @GeneratedValue
    private Long id;
	//private String SorcebucketName;
	private String SorcebucketName;
	private String SourcefolderPath;
	private String SourcefileKey;
	
	private String DestinationbucketName;
	private String DestinationfolderPath;
	private String DestinationfileKey;
	
	private Boolean Sourcerdbmsnewtable;
 	private String SourcerdbmstableName;
 	private Boolean SourcerdbmsnewtableTruncate;
 	
	private Boolean Destinationrdbmsnewtable;
 	private String DestinationrdbmstableName;
 	private Boolean DestinationrdbmsnewtableTruncate;
 	
	private String mlalgorithm;
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
	
	@Column( columnDefinition="TEXT" )
 	private String mlVariable;
	@Column( columnDefinition="TEXT" )
	private String transformquery;
	
 	/*@Column( columnDefinition="TIMESTAMP" )
	private Date TimeStamp; */
	
    public JobDependent() {
		// TODO Auto-generated constructor stub
	}
    
    public JobDependent(Job job,String SorcebucketName,String SourcefolderPath,String SourcefileKey, String DestinationbucketName,String DestinationfolderPath,String DestinationfileKey,
    		Boolean Sourcerdbmsnewtable,Boolean SourcerdbmsnewtableTruncate,String SourcerdbmstableName ,
    		Boolean Destinationrdbmsnewtable,Boolean DestinationrdbmsnewtableTruncate,String DestinationrdbmstableName,  String sourcerhashtag,
    		int sourcerbatchsize ,String sourcerkafkaName , String dumpaccessKey ,String dumpsecretKey ,String dumpbucketName,String dumpKey ,String dumpbucketlocation, String trainaccessKey ,String trainsecretKey ,String trainbucketName ,String trainKey ,String mlalgorithm,String mlVariable,String transformquery ) {
    	super();
    	this.job = job; 
		this.SorcebucketName = SorcebucketName; 
		this.SourcefolderPath = SourcefolderPath;
		this.SourcefileKey = SourcefileKey;
		this.DestinationbucketName = DestinationbucketName;
		this.DestinationfolderPath = DestinationfolderPath;
		this.DestinationfileKey = DestinationfileKey; 
		this.Sourcerdbmsnewtable = Sourcerdbmsnewtable;
		this.SourcerdbmstableName = SourcerdbmstableName;
 		this.SourcerdbmsnewtableTruncate = SourcerdbmsnewtableTruncate;
		this.Destinationrdbmsnewtable = Destinationrdbmsnewtable;
		this.DestinationrdbmstableName = DestinationrdbmstableName;
 		this.DestinationrdbmsnewtableTruncate = DestinationrdbmsnewtableTruncate;
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
 		// TODO Auto-generated constructor stub
	}
    
    
        @ManyToOne
		public Job getJob() {
			return job;
		}

		public void setJob(Job job) {
			this.job = job;
		}
		
		public void setId(Long id) {
  			this.id = id;
  		}
  		
  		public Long getId() {
  	        return id;
  	    }
      	
  		public String getSorcebucketPath() {
			return SorcebucketName;
		}

		public void setSorcebucketPath(String SorcebucketName) {
			this.SorcebucketName = SorcebucketName;
		}
		
		public String getSourcefolderPath() {
			return SourcefolderPath;
		}

		public void setSourcefolderPath(String SourcefolderPath) {
			this.SourcefolderPath = SourcefolderPath;
		}
		
		

		public String getSourcefileKey() {
			return SourcefileKey;
		}

		public void setSourcefileKey(String SourcefileKey) {
			this.SourcefileKey = SourcefileKey;
		}
		
		
		public String getDestinationbucketPath() {
			return DestinationbucketName;
		}

		public void setDestinationbucketPath(String DestinationbucketName) {
			this.DestinationbucketName = DestinationbucketName;
		}
		
		public String getDestinationfolderPath() {
			return DestinationfolderPath;
		}
		
		
		public void setDestinationfolderPath(String DestinationfolderPath) {
			this.DestinationfolderPath = DestinationfolderPath;
		}
		
		public String getDestinationKey() {
			return DestinationfileKey;
		}

		public void setDestinationKey(String DestinationfileKey) {
			this.DestinationfileKey = DestinationfileKey;
		}
		
		public Boolean getSourcerdbmsnewtable() {
			return Sourcerdbmsnewtable;
		}

		public void setSourcerdbmsnewtable(Boolean Sourcerdbmsnewtable) {
			this.Sourcerdbmsnewtable = Sourcerdbmsnewtable;
		}
		
		public Boolean getSourcerdbmsnewtableTruncate() {
			return SourcerdbmsnewtableTruncate;
		}

		public void setSourcerdbmsnewtableTruncate(Boolean SourcerdbmsnewtableTruncate) {
			this.SourcerdbmsnewtableTruncate = SourcerdbmsnewtableTruncate;
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
		
		
		
		public Boolean getDestinationrdbmsnewtable() {
			return Destinationrdbmsnewtable;
		}

		public void setDestinationrdbmsnewtable(Boolean Destinationrdbmsnewtable) {
			this.Destinationrdbmsnewtable = Destinationrdbmsnewtable;
		}
		
		public Boolean getDestinationrdbmsnewtableTruncate() {
			return DestinationrdbmsnewtableTruncate;
		}

		public void setDestinationrdbmsnewtableTruncate(Boolean DestinationrdbmsnewtableTruncate) {
			this.DestinationrdbmsnewtableTruncate = DestinationrdbmsnewtableTruncate;
		}
		
		public String getDestinationrdbmstableName() {
			return DestinationrdbmstableName;
		}

		public void setDestinationrdbmstableName(String DestinationrdbmstableName) {
			this.DestinationrdbmstableName = DestinationrdbmstableName;
		}
		
		public String getSourcerdbmstableName() {
			return SourcerdbmstableName;
		}

		public void setSourcerdbmstableName(String SourcerdbmstableName) {
			this.SourcerdbmstableName = SourcerdbmstableName;
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
		/*public Date getTimeStamp() {
			return TimeStamp;
		}

		public void setTimeStamp(Date TimeStamp) {
			this.TimeStamp = TimeStamp;
		}*/
}
