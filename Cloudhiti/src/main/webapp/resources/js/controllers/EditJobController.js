/* Setup bucket page controller */
angular.module('WebApp').controller('EditJobController' , ['$state', '$stateParams', '$rootScope', '$scope','$filter', 'settings','ListBucket','Bucket','ListAWSCredential','ListServerCredential','ListJob','RDBMS', function( $state, $stateParams ,$rootScope, $scope,$filter,settings,ListBucket,Bucket,ListAWSCredential,ListServerCredential,ListJob,RDBMS ) {
	
	$scope.$on('$viewContentLoaded', function() {   
        // initialize core components
    App.initAjax();
    $scope.jobId=parseInt( $stateParams.Id);
    $('.bs-select').selectpicker({
        iconBase: 'fa',
        tickIcon: 'fa-check'
    });
       
 
   
      
 	//For hide n show
    $scope.rdbmsServerType=0;
	$scope.newTableName=0;
	$scope.prcocess = 1;
	$scope.MLJobType= 0;
	$scope.MLJobTypeSource =0;
	//For store temp variable
	$scope.TeampMysqldataDestinationObject;
	$scope.TeampselectedDestinationItem;
	
	//for sending json object
    $scope.GetAllSourceJson;
	$scope.GetAllDestinationJson;
	
	//for Select  server type
	
	$scope.SourceServerType;
	$scope.DestinationServerType;
	
	//for select Id
	
	$scope.DestinationId;
	$scope.SourceId;
	
	//for multi select
    $scope.dataSourceObject;
    $scope.dataDestinationObject;
    
    $scope.selectedSourceItem=null;
    $scope.selectedDestinationItem=null;
	
    //For dump bucket
    $scope.selectedBucketDump=null;
    $scope.AlgorithmType1=1;
    $scope.AlgorithmType2=0;
	$('select[name="source"]').html('');
	$('select[name="source"]').html('<option data-icon="icon-info" value="Select">Select Source</option>');
	$('select[name="destination"]').html('');
	$('select[name="destination"]').html('<option data-icon="icon-info" value="Select">Select Destination</option>');
	
	
	$scope.searchJobType = function()
	{
		ListJob.searchJobType(1).then(function (data) {
 			$scope.JobTypes=data.jobType;
          },function (errorMessage) { 
       	   $state.go('dashboard', {},{reload: true});
       });
	}
	$scope.searchJobType();
	$scope.getserverCredentials = function()
	{  
		ListServerCredential.searchServerCredentials(1).then(function (data) {
             $rootScope.buildjson_ServerCredentials_data=data.serverCredential;
             $scope.ViewJob(); 
            /* $.each($rootScope.buildjson_ServerCredentials_data, function (index, valueobj) {
            	
            	 $('select[name="destination"]').append('<option data-icon="icon-info" value="'+valueobj.id+'_'+valueobj.servertypeid+'">'+valueobj.serverName+'</option>').selectpicker('refresh');
            });
            
            $.each($rootScope.buildjson_ServerCredentials_data, function (index, valueobj) {
             if(valueobj.servertypeid != "2")
          	  {
            	 $('select[name="source"]').append('<option data-icon="icon-info" value="'+valueobj.id+'_'+valueobj.servertypeid+'">'+valueobj.serverName+'</option>').selectpicker('refresh');
           	  } 
           	});*/
          
         },function (errorMessage) { 
        	 $state.go('dashboard', {},{reload: true});
        });
 	}
	$scope.getserverCredentials();
	
	 /*jobName:$scope.formData.jobname,
	jobComment: $scope.formData.comments,
	sorcebucketName: null,
	sourcefolderPath:null,
	sourcefileKey:null,
	destinationbucketName:null ,
	destinationfolderPath:null,
	destinationfileKey:null,
	sourcerdbmsnewtable:null,
	sourcerdbmstableName: null,
	sourcerdbmsnewtableTruncate:null,
	destinationrdbmsnewtable:null,
	destinationrdbmstableName: null,
	destinationrdbmsnewtableTruncate:null,
	mlalgorithm:null,
	mlVariable:null,
	transformquery:null,
	jobjson:null,
	jobType:  parseInt($scope.JobType), 
		parentId:1,
		sourceType: parseInt($scope.SourceServerType),
		targetType: parseInt($scope.DestinationServerType),
		sourceId: $scope.SourceId,
		targetId: $scope.DestinationId,
    */
	
	
	$scope.ViewJob = function()
	{  
	ListJob.searchJobByID(1,$scope.jobId).then(function (data) {
	    	$scope.jobInformation=data.jobs[0];
	    	$scope.radioModel={ JobTypeChecked : parseInt( data.jobs[0].jobType)};
	    	$scope.jobtypeCheckedValue($scope.radioModel.JobTypeChecked);
	    	 
	    	
	    	$('select[name="destination"]').html('');
	    	$('select[name="source"]').html('');
	    	$.each($rootScope.buildjson_ServerCredentials_data, function (index, valueobj) {
 	    		if( data.jobs[0].targetId+'_'+data.jobs[0].targetType  == valueobj.id+'_'+valueobj.servertypeid )
	           {
	            	 $('select[name="destination"]').html('<option data-icon="icon-info" value="'+valueobj.id+'_'+valueobj.servertypeid+'">'+valueobj.serverName+'</option>').selectpicker('refresh');

	           }
            });
            
            $.each($rootScope.buildjson_ServerCredentials_data, function (index, valueobj) {
             if( data.jobs[0].sourceId+'_'+data.jobs[0].sourceType  == valueobj.id+'_'+valueobj.servertypeid)
          	  {
            	 $('select[name="source"]').html('<option data-icon="icon-info" value="'+valueobj.id+'_'+valueobj.servertypeid+'">'+valueobj.serverName+'</option>').selectpicker('refresh');
           	  } 
           	});
            if(data.jobs[0].targetType == 2)
            {
            	$scope.rdbmsServerType=1;
            }
            if(data.jobs[0].destinationrdbmsnewtable == 1  )
            {
            	$scope.newTableName =1;
            	$scope.newTableName =1;
            }
 			
			
			//$('select[name="VariablesInDependent"]').html('');
			//$('select[name="VariablesInDependent"]').html('<option value="">No Variables</option>').selectpicker('refresh');
            if(data.jobs[0].mlVariable !="" && data.jobs[0].mlVariable != null && data.jobs[0].mlalgorithm != null)
            {
            	$scope.mlVariable= data.jobs[0].mlVariable;
            	$scope.mlVariableArray=$scope.mlVariable.split(',');
     			
                 angular.forEach($scope.mlVariableArray, function(value, key) {
                 	$('select[name="VariablesDependent"]').append('<option value="'+value+'" selected>'+value+'</option>').selectpicker('refresh');
                 });
                 $('select[name="Algorithm"]').html('');
      			 $('select[name="Algorithm"]').append('<option data-icon="icon-info" >'+data.jobs[0].mlalgorithm+'Algorithm</option>').selectpicker('refresh');;
       			 
            }
           
            /*if(data.jobs[0].mlalgorithm == 'Kmean')
            }
            {
				<option value="1" selected>2</option>
                <option value="2" selected>2</option>
                $('select[name="VariablesDependent"]').append('<option value="">No Variables</option>').selectpicker('refresh');
            }*/
          
			
			
			
            $scope.viewsource(data.jobs[0]);
            $scope.viewdestination(data.jobs[0]);
            //$scope.editsource(data.jobs[0]);	
	     
 	        },function (errorMessage) { 
	   	   $state.go('dashboard', {},{reload: true});
	});
	
	};
	
	 
	 
	$scope.jobtypeCheckedValue = function(JobTypeChecked)
	{
		    if(JobTypeChecked == null)
		    {
		    	return false;
		    }
		    $scope.JobType=JobTypeChecked;
		    
			$( ".AlgorithmType1" ).removeClass( "col-md-4" ).addClass( "col-md-8" );
			$( ".AlgorithmType2" ).removeClass( "col-md-4" );
			$scope.AlgorithmType1=1;
			$scope.AlgorithmType2=0;
 		    $scope.MLJobType= 1;

			if(JobTypeChecked == 3)
			{
			$scope.dataSourceObject=[];
		    $scope.dataDestinationObject=[];
		     
		    $scope.rdbmsServerType=0;
			$scope.newTableName=0;
  			 
      /*       var i=0;
            $.each( $rootScope.buildjson_AWSCredentials_data, function (index, valueobj) {
            	var obj = {
                        id: valueobj.id,
                        name: valueobj.awscredentialsName,
                        Key: valueobj.accessKey+','+valueobj.secretKey,
                        checkbox:false,
                        children: [],
                      };
            	 var obj2 = {
                        id: i++,
                        name: 'Node 1' ,
                        children: []
                       };
                obj.children.push(obj2); 
                $scope.selectBucketData.push(obj);
               });
            
             $scope.selectBucket = angular.copy($scope.selectBucketData);*/
 
			}
		else
			{
			$scope.dataSourceObject=[];
		    $scope.dataDestinationObject=[];
		    $scope.selectedSourceItem=null;
		    $scope.selectedDestinationItem=null;
		    $scope.rdbmsServerType=0;
			$scope.newTableName=0;
			$scope.prcocess = 1;
		    $scope.MLJobType= 0;
		    $scope.selectBucket=[];  
			 
            
            
			}
	}
	 
 
    $scope.formData = {
    		jobname:'',
    		source: '',
    		destination: '',
    		comments: '',
    		createNewTable:'0',
    		overWriteTableData:'0',
    		newTableName:'',
    		processs:'0',
    };
    
     
    $scope.viewsource = function(jobSource)
    {
    	$scope.SourceId =jobSource.sourceId;
    	$scope.SourceServerType=jobSource.sourceType;
   	    var dataObject = [];  
	   	 if($scope.SourceServerType == 1 )
	 	{
	   		 var keyArray= jobSource.sourcefolderPath.split('/');
	   		 var item = {
			            id: $scope.SourceId+'_'+0,
			            name: keyArray[1],
			            icon:'fa fa-folder',
			            selected: false,
			            isExpanded:true,
 			            checkbox:false,
 			            children: []
			        };
	 		
	 		   
 			    it(item,2,keyArray.length-1,keyArray);
			     
			    dataObject.push(item);
			    $scope.dataSourceObject = angular.copy(dataObject); 
 				       
	    }
   	 
	   	 if($scope.SourceServerType == 2 )
		 	{
		   		  
		   		     var item = {
			            id: $scope.SourceId,
			            name: jobSource.destinationrdbmstableName,
			            icon:'fa fa-table',
			            selected: true,
			            isExpanded:false,
 			            checkbox:true,
			            children: []
			         };
		 		
 				    dataObject.push(item);
				    $scope.dataSourceObject = angular.copy(dataObject); 
	 				       
		    }
	   	 
	   	 if($scope.SourceServerType == 3 )
	    	{
	    		var item = {
			            id: $scope.SourceId+'_'+0,
			            name: jobSource.sorcebucketName,
			            icon:'fa fa-bitbucket',
			            selected: false,
			            isExpanded:true,
			            checkbox:false,
			            path:"",
	 		            children: []
			        };
	    		
	    		var keyArray= jobSource.sourcefileKey.split('/');
 			    it(item,0,keyArray.length-1,keyArray);
			     
			    dataObject.push(item);
			    console.log(item);
			    $scope.dataSourceObject = angular.copy(dataObject); 
	   			       
	       }
	    		   
			
    }
    
    
    $scope.viewdestination = function(jobDestination)
    {
    	$scope.targetId =jobDestination.targetId;
    	$scope.targetType=jobDestination.targetType;
   	    var dataObject = [];  
	   	 if($scope.targetType == 1 )
	 	{
	   		 var keyArray= jobDestination.destinationfolderPath.split('/');
	   		 var item = {
			            id: $scope.targetId,
			            name: keyArray[1],
			            icon:'fa fa-folder',
			            selected: false,
			            isExpanded:true,
 			            checkbox:false,
 			            children: []
			        };
	 		
	 		   
 			    it(item,2,keyArray.length-1,keyArray);
 			    dataObject.push(item);
			    $scope.dataDestinationObject = angular.copy(dataObject); 
 				       
	    }
   	 
	   	 if($scope.targetType == 2 )
		 	{
	   	   var item = {
		            id: $scope.targetId,
		            name: jobDestination.destinationrdbmstableName,
		            icon:'fa fa-table',
		            selected: true,
		            isExpanded:false,
		            checkbox:true,
		            children: []
		         };
	 		
			    dataObject.push(item);
			    $scope.dataDestinationObject = angular.copy(dataObject); 
	 				       
		    }
	   	 
	   	 if($scope.targetType == 3 )
	    	{
	    		var item = {
			            id: $scope.targetId,
			            name: jobDestination.destinationbucketName,
			            icon:'fa fa-bitbucket',
			            selected: false,
			            isExpanded:true,
			            checkbox:false,
			            path:"",
	 		            children: []
			        };
	    		
	    		var keyArray= jobDestination.destinationfileKey.split('/');
 			    it(item,0,keyArray.length-1,keyArray);
			     
			    dataObject.push(item);
 			    $scope.dataDestinationObject = angular.copy(dataObject); 
	   			       
	       }
    }
    
    function it(object,loop,length,keyArray)
    {
    
		if(loop !=  length)
		{
			 
			var obj = {
		            id: loop+10,
		            name: keyArray[loop],
		            icon:'fa fa-folder',
		            selected: false,
		            isExpanded:true,
		            checkbox:false,
 		            children: []
		        };
	     
	       object.children.push(obj);
 	       it(obj,parseInt(loop)+1,length,keyArray);
		}
		else
		{
			var obj = {
		                id: loop+20,
		                name:  keyArray[loop],
		                icon:'fa fa-file',
		                selected: true,
		                isExpanded:false,
		                callback:"source",
		                checkbox:true,
		                path:"/",
		                children: []
		            };
			 object.children.push(obj);
		}
			
     }
    
/*    destinationrdbmsnewtable:null,
	destinationrdbmstableName: null,
	destinationrdbmsnewtableTruncate:null,
	mlalgorithm:null,
	mlVariable:null,
	transformquery:null,
	jobjson:null,
	jobType:  parseInt($scope.JobType), 
		parentId:1,
		sourceType: parseInt($scope.SourceServerType),
		targetType: parseInt($scope.DestinationServerType),
		sourceId: $scope.SourceId,
		targetId: $scope.DestinationId,
    */
    $rootScope.settings.layout.pageContentWhite = true;
    $rootScope.settings.layout.pageBodySolid = false;
    $rootScope.settings.layout.pageSidebarClosed = false;
});
}]);