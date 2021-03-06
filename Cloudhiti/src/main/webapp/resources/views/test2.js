/* Setup bucket page controller */
angular.module('WebApp').controller('JobController' , ['$state', '$stateParams', '$rootScope', '$scope','$filter', 'settings','ListBucket','Bucket','ListAWSCredential','ListServerCredential','ListJob','RDBMS','TwiiterKafka','Kafka','ML','Workflow', function( $state, $stateParams ,$rootScope, $scope,$filter,settings,ListBucket,Bucket,ListAWSCredential,ListServerCredential,ListJob,RDBMS,TwiiterKafka,Kafka,ML,Workflow ) {
	
	$scope.$on('$viewContentLoaded', function() {   
        // initialize core components
    App.initAjax();
   
    $('.bs-select').selectpicker({
        iconBase: 'fa',
        tickIcon: 'fa-check'
    });
    $("input[data-role=tagsinput]").tagsinput();
    /*var elt = $('#object_tagsinput');
    
    elt.tagsinput({
      itemValue: 'value',
      itemText: 'text',
    });*/

   
      /*$scope.switchViewCallback = function(scopeObj) {

    	    if (scopeObj.switchViewLabel == 'test2') {
    	      scopeObj.switchViewLabel = 'test1';
    	      scopeObj.inputModel = data1;
    	      scopeObj.selectOnlyLeafs = true;
    	    } else {
    	      scopeObj.switchViewLabel = 'test2';
    	      scopeObj.inputModel = data3;
    	      scopeObj.selectOnlyLeafs = false;
    	    }
    	  }*/
	//For hide n show
    $scope.rdbmsServerType=0;
	$scope.newTableName=0;
 
	$scope.MLJobType= 0;
	$scope.MLJobTypeSource =0;
	$scope.MLTainFile=0;
	$scope.twittersource=0;
	$scope.transformation=0;
	//For store temp variable
	$scope.TeampMysqldataDestinationObject;
	$scope.TeampselectedDestinationItem;
	
	//for sending json object
    $scope.GetAllSourceJson;
	$scope.GetAllDestinationJson;
	
	//for Select  server type
	$scope.JobType=1;
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
	
	$scope.radioModel={ JobTypeChecked :1};
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
             //console.log(data.serverCredential);
             $.each($rootScope.buildjson_ServerCredentials_data, function (index, valueobj) {
            	
            	 $('select[name="destination"]').append('<option data-icon="icon-info" value="'+valueobj.id+'_'+valueobj.servertypeid+'">'+valueobj.serverName+'</option>').selectpicker('refresh');
            });
            
            $.each($rootScope.buildjson_ServerCredentials_data, function (index, valueobj) {
             if(valueobj.servertypeid != "2")
          	  {
            	 $('select[name="source"]').append('<option data-icon="icon-info" value="'+valueobj.id+'_'+valueobj.servertypeid+'">'+valueobj.serverName+'</option>').selectpicker('refresh');
           	  } 
           	});
          
         },function (errorMessage) { 
        	 $state.go('dashboard', {},{reload: true});
        });
		
	 	
     	
  	}
	$scope.getserverCredentials();
	
	$scope.getTwitter = function()
	{  
		 
 		TwiiterKafka.searchTwitterKafkaTopics(1).then(function (data) {
			 $.each(data.twitterKafkaTopic, function (index, valueobj) {
            	 $('select[name="kafkatopicname"]').append('<option data-icon="icon-info" value="'+valueobj.twitterKafkaName+',">'+valueobj.twitterKafkaName+'</option>').selectpicker('refresh');
             });
			 
			 //console.log(data.twitterKafkaTopic);
        },function (errorMessage) { 
       	 $state.go('dashboard', {},{reload: true});
       });
 	}
	
	//$scope.getTwitter();
	//{positive:10,negative:15,nutal:20,totatweets:45,timestamp:1500230492}
	
	$scope.jobtypeCheckedValue = function(JobTypeChecked)
	{
			$('select[name="Algorithm"]').html('');
			$('select[name="Algorithm"]').append('<option data-icon="icon-info" value="Kmean">Kmean Algorithm</option><option data-icon="icon-info" value="LR">LR Algorithm</option>').selectpicker('refresh');
			
		    if(JobTypeChecked == null)
		    {
		    	return false;
		    }
		    $('#sourcediv').removeClass('col-md-12').addClass('col-md-6');
		    $('#sourceresult').removeClass('col-md-12').addClass('col-md-6');
		    
			$('#destinationdiv').show();
			$('#destinationresult').show();
			
			$scope.JobType=JobTypeChecked;
		    $('select[name="VariablesDependent"]').html('');
			$('select[name="VariablesDependent"]').html('<option value="">No Variables</option>').selectpicker('refresh');
			
			$('select[name="VariablesInDependent"]').html('');
			$('select[name="VariablesInDependent"]').html('<option value="">No Variables</option>').selectpicker('refresh');
			$('select[name="Algorithm"]').html('');
 			$('select[name="Algorithm"]').append('<option data-icon="icon-info" value="Kmean">Kmean Algorithm</option>').selectpicker('refresh');;
			$('select[name="Algorithm"]').append('<option data-icon="icon-info" value="LR">LR Algorithm</option>').selectpicker('refresh');;
			//$('select[name="Algorithm"]  option:selected').remove();
			 
			//$( ".AlgorithmType1" ).removeClass( "col-md-4" ).addClass( "col-md-8" );
			//$( ".AlgorithmType2" ).removeClass( "col-md-4" );
			$scope.AlgorithmType1=1;
			$scope.AlgorithmType2=0;
			$scope.selectedBucketDump=null;	 
			
			if(JobTypeChecked == 3)
			{
			$scope.dataSourceObject=[];
		    $scope.dataDestinationObject=[];
		    $scope.selectedSourceItem=null;
		    $scope.selectedDestinationItem=null;
		    $scope.rdbmsServerType=0;
			$scope.newTableName=0;
 		    $scope.MLJobType= 1;
 		    $scope.twittersource=0;
 		    $scope.transformation=0;
 		    
 		    
			var filtered=$filter('filter')($rootScope.buildjson_ServerCredentials_data, { servertypeid: 2},true);
		 
			$('select[name="source"]').html('');
			$('select[name="source"]').html('<option data-icon="icon-info" value="Select">Select Source</option>');
			$('select[name="destination"]').html('');
			$('select[name="destination"]').html('<option data-icon="icon-info" value="Select">Select Destination</option>');
		/*	$('select[name="DumpBucket"]').html('');
			$('select[name="DumpBucket"]').html('<option value="Select">Select S3 Bucket</option>');
			*/
			$.each( filtered, function (index, valueobj) {
            	 $('select[name="destination"]').append('<option data-icon="icon-info" value="'+valueobj.id+'_'+valueobj.servertypeid+'">'+valueobj.serverName+'</option>').selectpicker('refresh');
            });
            
            $.each( filtered, function (index, valueobj) {
             	 $('select[name="source"]').append('<option data-icon="icon-info" value="'+valueobj.id+'_'+valueobj.servertypeid+'">'+valueobj.serverName+'</option>').selectpicker('refresh');
            });
            
            $scope.selectBucket=[];
            $scope.selectBucketData = [];
            var i=0;
            $.each( $rootScope.buildjson_AWSCredentials_data, function (index, valueobj) {
            	var obj = {
                        id: valueobj.id,
                        name: valueobj.awscredentialsName,
                        object:'Dump AWS' ,
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
            	// $('select[name="DumpBucket"]').append('<optgroup label="Picnic">  </optgroup>').selectpicker('refresh');
                		  //<option data-icon="icon-refresh" value="'+valueobj.id+'">'+valueobj.awscredentialsName+'</option>').selectpicker('refresh');
             });
            
             $scope.selectBucket = angular.copy($scope.selectBucketData);
 
			}
		else if( JobTypeChecked == 4 )
		{

			$('#sourcediv').removeClass('col-md-6').addClass('col-md-12');
			$('#sourceresult').removeClass('col-md-6').addClass('col-md-12');
			$('#destinationdiv').hide();
			$('#destinationresult').hide();
			
			$scope.dataSourceObject=[];
		    $scope.dataDestinationObject=[];
		    $scope.selectedSourceItem=null;
		    $scope.selectedDestinationItem=null;
		    $scope.rdbmsServerType=0;
			$scope.newTableName=0;
 		    $scope.MLJobType= 0;
 		    $scope.twittersource=0; 
 		    $scope.transformation=1;
		    $scope.selectBucket=[];
		    
			
			var filtered=$filter('filter')($rootScope.buildjson_ServerCredentials_data, { servertypeid: 2},true);
			 
			$('select[name="source"]').html('');
			$('select[name="source"]').html('<option data-icon="icon-info" value="Select">Select Source</option>');
  	 
			$.each( filtered, function (index, valueobj) {
				 //if(valueobj.databaseType == 'Mysql' )
				//	{
					$('select[name="source"]').append('<option data-icon="icon-info" value="'+valueobj.id+'_'+valueobj.servertypeid+'">'+valueobj.serverName+'</option>').selectpicker('refresh');
					//}
            });
            
			
		}
				
		else if( JobTypeChecked == 5 )
		{

			$('#sourcediv').removeClass('col-md-6').addClass('col-md-12');
			$('#sourceresult').removeClass('col-md-6').addClass('col-md-12');
			$('#destinationdiv').hide();
			$('#destinationresult').hide();
			
			$scope.dataSourceObject=[];
		    $scope.dataDestinationObject=[];
		    $scope.selectedSourceItem=null;
		    $scope.selectedDestinationItem=null;
		    $scope.rdbmsServerType=0;
			$scope.newTableName=0;
 		    $scope.MLJobType= 0;
 		    $scope.twittersource=0; 
 		    $scope.transformation=1;
		    $scope.selectBucket=[];
		    
			
			var filtered=$filter('filter')($rootScope.buildjson_ServerCredentials_data, { servertypeid: 2},true);
			 
			$('select[name="source"]').html('');
			$('select[name="source"]').html('<option data-icon="icon-info" value="Select">Select Source</option>');
  	 
			$.each( filtered, function (index, valueobj) {
 					$('select[name="source"]').append('<option data-icon="icon-info" value="'+valueobj.id+'_'+valueobj.servertypeid+'">'+valueobj.serverName+'</option>').selectpicker('refresh');
             });
            
			
		}
		
		else if( JobTypeChecked == 6 )
		{

			//$('#sourcediv').removeClass('col-md-6').addClass('col-md-12');
			//$('#sourceresult').removeClass('col-md-6').addClass('col-md-12');
			//$('#destinationdiv').hide();
			//$('#destinationresult').hide();
			
			$scope.dataSourceObject=[];
		    $scope.dataDestinationObject=[];
		    $scope.selectedSourceItem=null;
		    $scope.selectedDestinationItem=null;
		    $scope.rdbmsServerType=0;
			$scope.newTableName=0;
 		    $scope.MLJobType= 1;
 		    $scope.twittersource=0; 
 		    $scope.transformation=0;
 		    $scope.selectBucket=[];
 		    $('select[name="Algorithm"]').html('');
			$('select[name="Algorithm"]').append('<option data-icon="icon-info" value="LRTrain">LR Train</option>').selectpicker('refresh');
			 //$( ".AlgorithmType1" ).removeClass( "col-md-8" ).addClass( "col-md-4" );
			// $( ".AlgorithmType2" ).addClass( "col-md-4" );
			 $scope.AlgorithmType1=1;
			 $scope.AlgorithmType2=1;
			 
			
		    $('select[name="source"]').html('');
			$('select[name="source"]').html('<option data-icon="icon-info" value="Select">Select Source</option>');
			$('select[name="destination"]').html('');
			$('select[name="destination"]').html('<option data-icon="icon-info" value="Select">Select Destination</option>');
			 
			var filtered=$filter('filter')($rootScope.buildjson_ServerCredentials_data, { servertypeid: 2},true);
			
			$.each( filtered, function (index, valueobj) {
           	  $('select[name="source"]').append('<option data-icon="icon-info" value="'+valueobj.id+'_'+valueobj.servertypeid+'">'+valueobj.serverName+'</option>').selectpicker('refresh');
            });
			
            $.each( $rootScope.buildjson_ServerCredentials_data, function (index, valueobj) {
            	if(valueobj.servertypeid == "3")
           	  	{
                	$('select[name="destination"]').append('<option data-icon="icon-info" value="'+valueobj.id+'_'+valueobj.servertypeid+'">'+valueobj.serverName+'</option>').selectpicker('refresh');
            	  }
            });
			
		}
		else
			{
			$scope.dataSourceObject=[];
		    $scope.dataDestinationObject=[];
		    $scope.selectedSourceItem=null;
		    $scope.selectedDestinationItem=null;
		    $scope.rdbmsServerType=0;
			$scope.newTableName=0;
 		    $scope.MLJobType= 0;
 		    $scope.twittersource=0;
 		    $scope.transformation=0;
 		    
 		    
		    $scope.selectBucket=[];  
			$('select[name="source"]').html('');
			$('select[name="source"]').html('<option data-icon="icon-info" value="Select">Select Source</option>');
			$('select[name="destination"]').html('');
			$('select[name="destination"]').html('<option data-icon="icon-info" value="Select">Select Destination</option>');
			 
			$.each( $rootScope.buildjson_ServerCredentials_data, function (index, valueobj) {
            	 $('select[name="destination"]').append('<option data-icon="icon-info" value="'+valueobj.id+'_'+valueobj.servertypeid+'">'+valueobj.serverName+'</option>').selectpicker('refresh');
            });
            
            $.each( $rootScope.buildjson_ServerCredentials_data, function (index, valueobj) {
            	if(valueobj.servertypeid != "2")
           	  	{
                	$('select[name="source"]').append('<option data-icon="icon-info" value="'+valueobj.id+'_'+valueobj.servertypeid+'">'+valueobj.serverName+'</option>').selectpicker('refresh');
            	  }
            });
            
            
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
    		hasgtag:'Amsterdam'
    };
    
    //Select Algorithm
    $(document).on('change', 'select[name="Algorithm"]', function(){
    	 
    	$scope.selectedSourceItem=null;
    	function l(e) {
            e.selected = !1, e.children.length > 0 && e.children.forEach(function(e) {
                l(e)
            })
        }
    	$scope.dataSourceObject.forEach(function(e) {
            l(e)
        })
        
        if(   $(this).val() !="" ) 
		{
    		 if($(this).val() == 'LR')
    		 {
    			// $( ".AlgorithmType1" ).removeClass( "col-md-8" ).addClass( "col-md-4" );
    			 //$( ".AlgorithmType2" ).addClass( "col-md-4" );
    			 $('select[name="VariablesDependent"]').selectpicker({maxOptions: 1});
    			// $('select[name="VariablesDependent"]').multiselect('disable');
    			 $('select[name="VariablesDependent"]').html('');
 				 $('select[name="VariablesDependent"]').html('<option value="">No Variables</option>').selectpicker('refresh');
 				
 				 $('select[name="VariablesInDependent"]').html('');
				 $('select[name="VariablesInDependent"]').html('<option value="">No Variables</option>').selectpicker('refresh');
				 
				 $scope.MLTainFile=1;
    			 $scope.AlgorithmType1=1;
    			 $scope.AlgorithmType2=1;
    			 
    			 $scope.selectTrain=[];
	             $scope.selectTrainData = [];
	             var i=0;
	              $.each( $rootScope.buildjson_AWSCredentials_data, function (index, valueobj) {
	            	var obj = {
	                        id: valueobj.id,
	                        name: valueobj.awscredentialsName,
	                        object:'Train AWS' ,
	                        Key:valueobj.accessKey+','+valueobj.secretKey,
	                        checkbox: false,
	                        children: [],
	                      };
	            	 var obj2 = {
	                        id: i++,
	                        name: 'Node 1' ,
	                        children: []
	                       };
	                obj.children.push(obj2); 
	                $scope.selectTrainData.push(obj);
 	              }); 
	            
	              $scope.selectTrain = angular.copy($scope.selectTrainData);
    	             
    	             
    			 $scope.$apply();
    		 }
    		
    		 else
    		 {
    			 //$( ".AlgorithmType1" ).removeClass( "col-md-4" ).addClass( "col-md-8" );
    			 //$( ".AlgorithmType2" ).removeClass( "col-md-4" );
    			 $('select[name="VariablesDependent"]').selectpicker({maxOptions: 50});
    			 $('select[name="VariablesDependent"]').html('');
 				 $('select[name="VariablesDependent"]').html('<option value="">No Variables</option>').selectpicker('refresh');
 				
 				 $('select[name="VariablesInDependent"]').html('');
				 $('select[name="VariablesInDependent"]').html('<option value="">No Variables</option>').selectpicker('refresh');
				 $scope.MLTainFile=0;
				 ;$scope.AlgorithmType1=1;
    			 $scope.AlgorithmType2=0;
    			 $scope.$apply();
    		 }
 		}
    	else
    	{
    		 $scope.AlgorithmType1=0;
			 $scope.AlgorithmType2=0;
			 $scope.$apply();
    	}
    	
    	
    });
    
    $rootScope.onExpandBucket = function(event, item)
    {
     	
     	if(item.isExpanded)
    		{
     		 
     		item.isExpanded = !item.isExpanded;
    		return false;
     		}
     	else
     	{
     		 
     		var S3Info= item.Key.split(','); 
     		var object= item.object; 
     		var i=0;
     		if(object == 'Dump AWS' )
     		{
     			$scope.GetAllBucketJson='{"accesskey": "'+S3Info[0]+'", "secretKey": "'+S3Info[1]+'" }';
                $scope.GetAllBucketJson=JSON.parse( $scope.GetAllBucketJson)
                
                ListBucket.GetAllBucket($scope.GetAllBucketJson).then(function (data) {
                	item.children=[]; 
                	if(data.status == 1)
                	{
                		angular.forEach(data.buckets, function(value1, key1) {
      	 					 
      	 					 var obj = {
         	 				            id:  i,
         	 				            name: value1.name,
         	 				            icon:'fa fa-bitbucket',
         	 				            Key: item.Key,
          	 				            selected: false,
         	 				            isExpanded:false,
         	 				            checkbox:true,
          	 				        };
    				           	  
      	 			            item.children.push(obj);
          	 					i++;
      	 				 
     	 				
     	 				}); 
                		 item.isExpanded = !item.isExpanded; 
                		  
                	}
                	else
                	{
                		item.isExpanded = !item.isExpanded; 
                	}
               
                    },function (errorMessage) { 
                    	item.isExpanded = !item.isExpanded;
        		 });
     		}
     		
     		if(object == "Train AWS" )
     		{
     			$scope.GetAllBucketJson='{"accesskey": "'+S3Info[0]+'", "secretKey": "'+S3Info[1]+'" }';
                $scope.GetAllBucketJson=JSON.parse( $scope.GetAllBucketJson)
                
                ListBucket.GetAllBucket($scope.GetAllBucketJson).then(function (data) {
                	item.children=[]; 
                	if(data.status == 1)
                	{
                		angular.forEach(data.buckets, function(value1, key1) {
      	 					 
      	 					 var obj = {
         	 				            id:  i,
         	 				            name: value1.name,
         	 				            icon:'fa fa-bitbucket',
         	 				            Key: item.Key,
          	 				            selected: false,
         	 				            isExpanded:true,
         	 				            checkbox:false,
         	 				            object:"Train Model", 
         	 				            path: "",
          	 				            children: []
         	 				        };
    				           	 var obj2 = {
    				                      id: i++,
    				                      name: 'Node 1' ,
    				                      children: []
    				                     };
    				            obj.children.push(obj2);
      	 			            item.children.push(obj);
          	 					i++;
      	 				 
     	 				
     	 				}); 
                		 item.isExpanded = !item.isExpanded; 
                		  
                	}
                	else
                	{
                		item.isExpanded = !item.isExpanded; 
                	}
               
                    },function (errorMessage) { 
                    	item.isExpanded = !item.isExpanded;
        		 });
     		}
     		if( object == "Train Model")
     		{
     			console.log(item);
     			if(item.path == "")
         		{
         			var bucketName=item.name;
         			var keypath="";
         			var itempath=item.name+'|';
                  	var checkvalue='';
                	var checkId=0;
         		}
         		else
         		{
         			var bucketName=(item.path).split('|')[0];
         			var keypath=(item.path).split('|')[1]+item.name+'/';
                  	 
         			var itempath=item.path+item.name+'/';
         			var checkId=( keypath ).split('/').length;
                 	checkId=checkId-1; 
                	var checkvalue= (keypath ).split('/')[checkId-1];
           		}
     			$scope.GetAllBucketJson='{"accesskey": "'+S3Info[0]+'", "secretKey": "'+S3Info[1]+'" , "bucketName": "'+bucketName+'","key":"'+keypath+'"}';
                $scope.GetAllBucketJson=JSON.parse( $scope.GetAllBucketJson)
                
              	Bucket.getBucketContian($scope.GetAllBucketJson).then(function (data) {
              		item.children=[];
              		if(data.status)
             		{
             			
             			 var main=$scope.extractbucketobject(data.bucket_contents);
              			  angular.forEach( main, function(value, key){
            		    	  
        			          angular.forEach( value, function(value1, key1){
        			        	  i++;if( checkId == 0)
        			        	  {
        			        		 if(value1.id == checkId     )
    		    		        		  {
    		    		        		   if(typeof value1.files == 'undefined')
    			    		        		   {
    			      		        			   var found = item.children.some(function (el) {
    			   		        				    return el.name === value1.value && el.icon == 'fa fa-folder';
    			   		        				  });
    			    		        			   
    			    		        			   if (!found) { var obj = {
    			    	      	 				            id: i,
    			    	      	 				            name: value1.value,
    			    	      	 				            icon:'fa fa-folder',
    			    	      	 				        	object:"Train Model",
    			    	      	 				        	Key: item.Key,
    			    	      	 				            selected: false,
    			    	      	 				            isExpanded:false,
    			    	      	 				            checkbox:false,
    			    	      	 				            path:itempath,
    			    	      	 				            callback:"node",
    			    	      	 				            children: []
    			    	      	 				        };
    			    	      		    		  var obj2 = {
    			    	      	 			                id: i+'sub',
    			    	      	 			                name: 'file.xml',
    			    	      	 			                icon:'fa fa-file',
    			    	      	 			                callback:"node",
    			    	      	 			                children: [],
    			    	      	 			                selected: false
    			    	      	 			            };
    			    	      	 			      obj.children.push(obj2);
    			    	      			          item.children.push(obj);
    			    	      			          
    			    		        			   }
    			    		        			   
    			    	      			       
    			    		        		   }
    		    		        		   else
    		    		        		   {
    		    		        			   var found = item.children.some(function (el) {
    			   		        				    return el.name === value1.value && el.icon == 'fa fa-file';;
    			   		        				  });
    		    		        			    if (!found) { 
    		    		        			    
    		    		        			    	 if( $scope.selectedSourceItem != null  && $scope.selectedSourceItem.path == itempath && $scope.selectedSourceItem.name == value1.value &&  $scope.selectedSourceItem.selected == true) 
    		    		   							{
    		    		   							   
    		    		        			    		 var obj = {
    				      			  	 				            id: i,
    				      			  	 				            name: value1.value,
    				      			  	 				            icon:'fa fa-file',
     				      			  	 				       		selected: true,
    				      			  	 				            isExpanded:false,
    				      			  	 				            checkbox:true,
    				      			  	 				            path:itempath,
    				      			  	 				            Key: item.Key,
    				      			  	 				       		callback:"node",
    				      			  	 				            children: []
    				      			  	 				        };
    				      			   			              item.children.push(obj);
    		    		   								 
    		    		   							}
    		    		   							  else
    		    		   								  {
    		    		   								  
    		    		   								 var obj = {
    				      			  	 				            id: i,
    				      			  	 				            name: value1.value,
    				      			  	 				            icon:'fa fa-file',
    				      			  	 				            selected: false,
    				      			  	 				            isExpanded:false,
    				      			  	 				            checkbox:true,
    				      			  	 				            path:itempath,
    				      			  	 				            Key: item.Key,
    				      			  	 				       		callback:"node",
    				      			  	 				            children: []
    				      			  	 				        };
    				      			   			              item.children.push(obj);
    		    		   								  }
    		    		        			    	 
    		    		        			    	 
    		    		        			    	
    		    		        			    	
    		    		        			    }; 
    		    		        		   }
    		    		        	 }
        			        	  }
        			        	  else
        			        		 { 
         			        		  if(value1.id == checkId    &&   value[checkId-1].value ==  checkvalue )
    	    		        		  {
    	    		        		   if(typeof value1.files == 'undefined')
    		    		        		   {
    		      		        			   var found = item.children.some(function (el) {
    		   		        				    return el.name === value1.value  && el.icon == 'fa fa-folder';
    		   		        				  });
    		    		        			   
    		    		        			   if (!found) { var obj = {
    		    	      	 				            id: i,
    		    	      	 				            name: value1.value,
    		    	      	 				            icon:'fa fa-folder',
    		    	      	 				            Key: item.Key,
    		    	      	 				            selected: false,
    		    	      	 				            isExpanded:false,
    		    	      	 				            checkbox:false,
    		    	      	 				            path:itempath,
    		    	      	 				            object:"Train Model",
    		    	      	 				            callback:"node",
    		    	      	 				            children: []
    		    	      	 				        };
    		    	      		    		  var obj2 = {
    		    	      	 			                id: i+'sub',
    		    	      	 			                name: 'file.xml',
    		    	      	 			                icon:'fa fa-file',
    		    	      	 			                callback:"node",
    		    	      	 			                children: [],
    		    	      	 			                selected: false
    		    	      	 			            };
    		    	      	 			      obj.children.push(obj2);
    		    	      			          item.children.push(obj);
    		    	      			          
    		    		        			   }
     		    		        		   }
    	    		        		   else
    	    		        		   {
    	    		        			   var found = item.children.some(function (el) {
    		   		        				    return el.name === value1.value  && el.icon == 'fa fa-file';
    		   		        				  });
    	    		        			    if (!found) { 
    	    		        			    	
    	    		        			    	if( $scope.selectedTainBucket != null  && $scope.selectedTainBucket.path == itempath && $scope.selectedTainBucket.name == value1.value &&  $scope.selectedTainBucket.selected == true) 
    	    		   							{
    	    		   							   
    	    		        			    		var obj = {
    		      			  	 				            id: i,
    		      			  	 				            name: value1.value,
    		      			  	 				            icon:'fa fa-file',
    		      			  	 				            selected: false,
    		      			  	 				            isExpanded:false,
    		      			  	 				            checkbox:true,
    		      			  	 				            Key: item.Key,
    		      			  	 				            path:itempath,
    		      			  	 				            callback:"node",
    		      			  	 				            children: []
    		      			  	 				        };
    		      			   			              item.children.push(obj);
    	    		   								 
    	    		   							}
    	    		   							  else
    	    		   								  {
    	    		   								  
    	    		   								var obj = {
    		      			  	 				            id: i,
    		      			  	 				            name: value1.value,
    		      			  	 				            icon:'fa fa-file',
    		      			  	 				            selected: false,
    		      			  	 				            isExpanded:false,
    		      			  	 				            checkbox:true,
    		      			  	 				            Key: item.Key,
    		      			  	 				            path:itempath,
    		      			  	 				            callback:"node",
    		      			  	 				            children: []
    		      			  	 				        };
    		      			   			              item.children.push(obj);
    	    		   								  }
    	    		        			    	 
    	    		        			    	
    	    		        			    	
    	    		        			    	
    	    		        			    }; 
    	    		        		   }
        			        		  
         			        		 }
        			         }
        		          });

        			      });
             			   
             			  item.isExpanded = !item.isExpanded;
             		}
              		else
             		{
             			item.isExpanded=false;
             		}
             		
          	     	},function (errorMessage) {
          	       		item.isExpanded = false;
         	 		});	
              		
              		
     		}
     		
            
     	}
    };
    
    $scope.CustomCallbackBucket = function(item, selectedItems) {
    	$scope.selectedBucketDump= item;
    	 
       // console.log($scope.selectedBucketDump);
         
   };
      
   $scope.CustomCallbackTrain = function(item, selectedItems) {
   	$scope.selectedTainBucket= item;
      console.log($scope.selectedTainBucket);
        
   };
         
      
    $scope.CustomCallbackSource = function(item, selectedItems,dataSourceObject)
    {
    	 
    	function l(e) {
            e.selected = !1, e.children.length > 0 && e.children.forEach(function(e) {
                l(e)
            })
        }
    	dataSourceObject.forEach(function(e) {
            l(e)
        })
       
    	$scope.selectedSourceItem=item;
    	
    	if($scope.JobType == 3 || $scope.JobType == 6) 
    	{  
    		
    		$('select[name="VariablesDependent"]').html('');
    		$scope.GetAllSourceJson['tablename']=$scope.selectedSourceItem.name;
    		RDBMS.AllColumns($scope.GetAllSourceJson).then(function (data) {
        		if(data.status)
        			{
	        			if(data.columnname.length > 0 )
	        			{
	        				$('select[name="VariablesDependent"]').html('');
	        				$('select[name="VariablesInDependent"]').html('');
	        				$.each(data.columnname, function (index, valueobj) {
	           				 $('select[name="VariablesDependent"]').append('<option  value="'+valueobj+'">'+valueobj+'</option>').selectpicker('refresh');
	           				 $('select[name="VariablesInDependent"]').append('<option  value="'+valueobj+'">'+valueobj+'</option>').selectpicker('refresh');
	                          });
	        			}
	        			else
	        			{
	        				$('select[name="VariablesDependent"]').html('');
	        				$('select[name="VariablesDependent"]').html('<option value="">No Columns</option>').selectpicker('refresh');
	        				$('select[name="VariablesInDependent"]').html('');
	        				$('select[name="VariablesInDependent"]').html('<option value="">No Columns</option>').selectpicker('refresh');
	        			}
        			//data.statuscolumnname
        			}
        	},function (errorMessage) { 
     	    	//$state.go('dashboard', {},{reload: true});
    	      });
    		//$scope.selectedSourceItem.name='account';
    		/*var filtered=$filter('filter')($rootScope.buildjson_ServerCredentials_data, {id:$scope.SourceId },true);
    		 
    		$scope.AllColumnsJson='{"classname": "com.mysql.jdbc.Driver","dburl":"'+filtered[0].ipaddress+'","port":"'+filtered[0].port+'","dbusername":"'+filtered[0].username+'","dbpassword":"'+filtered[0].password+'","dbname":"'+filtered[0].databaseName+'","tablename":"'+ $scope.selectedSourceItem.name+'" }'; 			//$scope.GetAllSourceJson=JSON.parse( $scope.GetAllSourceJson); 
          	$scope.AllColumnsJson=JSON.parse( $scope.AllColumnsJson)
        	RDBMS.AllColumns($scope.AllColumnsJson).then(function (data) {
        		alert(data);
        	},function (errorMessage) { 
     	    	//$state.go('dashboard', {},{reload: true});
    	      }); */
    	}
    	else if($scope.JobType == 4)
    	{
    		$scope.selectedDestinationItem=item;
    	}
    	 
     }
    
    $scope.CustomCallbackDestination = function(item, selectedItems,dataDestinationObject)
    {
    	function l(e) {
            e.selected = !1, e.children.length > 0 && e.children.forEach(function(e) {
                l(e)
            })
        }
    	dataDestinationObject.forEach(function(e) {
            l(e)
        })
        
        $scope.selectedDestinationItem=item;
    	if($scope.SourceServerType == 4)
     	{
     		$scope.selectedSourceItem=item;
     	}
    	 
    	//console.log($scope.selectedDestinationItem);
     }
    
    $scope.createNewTableCheckedValue= function(Value)
    {
    	if(Value == '1')
    	{
    		 $scope.TeampMysqldataDestinationObject =  $scope.dataDestinationObject;
    		 $scope.TeampselectedDestinationItem= $scope.selectedDestinationItem;
    		 $scope.dataDestinationObject = [];
    		 $scope.selectedDestinationItem = '';
    		 $scope.newTableName=1;
    		// $scope.$apply();
    	}
    	else
    	{
    		
    		$scope.dataDestinationObject= $scope.TeampMysqldataDestinationObject; 
    		$scope.selectedDestinationItem= $scope.TeampselectedDestinationItem;
    		$scope.newTableName=0;
     		//$scope.$apply();
    	}
    }
    
     
    
    $scope.creteKafkaTopic = function(TopicName)
    {
    	
    	$scope.twitterKafkaJson=[{
    		id: null,
    		twitterKafkaName:TopicName ,
     	}];
    	$scope.KafkaJson='{"zookeeperURL":"127.0.0.1","zookeeperPort":2181,"sessionTimeOut":10000,"connectionTimeOut":10000,"topicName":"'+TopicName+'","noOfPartitions":1,"noOfReplications":1}';
    	$scope.KafkaJson=JSON.parse( $scope.KafkaJson); 
    	Kafka.createtopic($scope.KafkaJson).then(function (data) {
	        if(data.status)
	        	{ 
		          TwiiterKafka.saveTopics( $scope.twitterKafkaJson).then(function (data) {
		        	  $('#static').modal('hide');
		        	  swal("Success!", "Your Kafka topic is added.", "success");
	        				
		            },function (errorMessage) { 
		        	   //$('#twitterstatus').html('Error ! Please Retry ')
		           });
	        	}
	        else
	         {
	        	//$('#twitterstatus').html( )
	         }
	       },function (errorMessage) { 
	    	   $('#twitterstatus').html('Error ! Please Retry ')
	      });
  
    }
 
    $scope.upload = function()
    {
    	
    	//console.log($scope.selectedSourceItem ); 
    	if($scope.formData.createNewTable == '1' && $scope.formData.newTableName == '')
	        {
         		swal(
        				  'Error !',
        				  'Please enter new table name.',
        				  'question'
        				)
	    			 return;
	        	 
	        }	
    	
    	if(  $scope.selectedSourceItem != null  && $scope.selectedDestinationItem != null )
        {
    		$scope.savejobJson=[{
    			id: null,
    			jobName:$scope.formData.jobname,
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
    			sourcerhashtag:null,
    			sourcerbatchsize:null,
    			sourcerkafkaName:null,
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
     			dumpaccessKey: null,
     			dumpsecretKey:null,
     			dumpbucketName:null,
     			dumpKey:null,
     			trainaccessKey: null,
     			trainsecretKey:null,
     			trainbucketName:null,
     			trainKey:null,
     			    			
    		}];
    		 
    		 if($scope.SourceServerType == 1)
        	{
    			$scope.savejobJson[0].sourcefolderPath= $scope.selectedSourceItem.path +  $scope.selectedSourceItem.name;
    			$scope.savejobJson[0].sourcefileKey = $scope.selectedSourceItem.name;
         	}
    		else if($scope.SourceServerType == 2   )
    		{
    			$scope.savejobJson[0].sourcerdbmsnewtable = parseInt($scope.formData.createNewTable);
    			$scope.savejobJson[0].sourcerdbmsnewtableTruncate = parseInt($scope.formData.overWriteTableData);
    			$scope.savejobJson[0].sourcerdbmstableName =   $scope.selectedSourceItem.name;
     			
     		}
    		/*else if($scope.DestinationServerType == 2 && $scope.JobType == 4 && $scope.JobType != 4)
    		{
    			$scope.savejobJson[0].sourcerdbmstableName =   $scope.selectedSourceItem.name;
    		}*/
    		else if($scope.SourceServerType == 3)
    		{
    			
    			var Sourcebucket=$scope.selectedSourceItem.path.split('|')[0];  
    			if(typeof $scope.selectedSourceItem.path.split('|')[1] == 'undefined')
    			{
    				var Sourcekey= $scope.selectedSourceItem.name;
    				
    			}
    			else
    			{
    				var Sourcekey= $scope.selectedSourceItem.path.split('|')[1]+$scope.selectedSourceItem.name;
    			}
     			//$scope.savejobJson[0].sorcebucketName= Sourcebucket + '/' +Sourcekey;
    			$scope.savejobJson[0].sorcebucketName= Sourcebucket;
    			$scope.savejobJson[0].sourcefileKey = Sourcekey;
     			//$scope.savejobJson[0].sourcefileKey = $scope.selectedSourceItem.name;
    		}
    		else
    		{}
    		
	 
    			
    		if($scope.DestinationServerType == 1)
        	{
    			$scope.savejobJson[0].destinationfolderPath= $scope.selectedDestinationItem.path +  $scope.selectedDestinationItem.name;
         	}
    		else if($scope.DestinationServerType == 2 && $scope.JobType != 4 )
    		{
    			 
    			$scope.savejobJson[0].destinationrdbmsnewtable = parseInt($scope.formData.createNewTable);
    			
    			if($scope.formData.createNewTable == '1')
    			{
    				$scope.savejobJson[0].destinationrdbmstableName =  $scope.formData.newTableName;
    				$scope.savejobJson[0].destinationrdbmsnewtableTruncate = 0;
    			}
    			else
    			{
    				$scope.savejobJson[0].destinationrdbmstableName =   $scope.selectedDestinationItem.name;
    				$scope.savejobJson[0].destinationrdbmsnewtableTruncate = parseInt($scope.formData.overWriteTableData);
    			}
    			 
    			
    		}
    	/*	else if($scope.DestinationServerType == 2 && $scope.JobType == 4)
    		{
         		$scope.savejobJson[0].destinationrdbmstableName =   $scope.selectedSourceItem.name;
     		}*/
    		else if($scope.DestinationServerType == 3)
    		{
    			 
    			var Destinationbucket=$scope.selectedDestinationItem.path.split('|')[0];  
    			
    			if(typeof $scope.selectedDestinationItem.path.split('|')[1] == 'undefined')
    			{
    				var Destinationkey= $scope.savejobJson[0].sourcefileKey;
    				Destinationbucket=  $scope.selectedDestinationItem.name;
    			}
    			else
    			{
    				var Destinationkey= $scope.selectedDestinationItem.path.split('|')[1]+$scope.selectedDestinationItem.name+'/'+$scope.savejobJson[0].sourcefileKey;
    			}
    			$scope.savejobJson[0].destinationbucketName= Destinationbucket;
    			$scope.savejobJson[0].destinationfileKey = Destinationkey;
    			//$scope.savejobJson[0].destinationbucketName= Destinationbucket + '/' + Destinationkey;
    			//$scope.savejobJson[0].destinationbucketPath= $scope.selectedDestinationItem.path +  $scope.selectedDestinationItem.name;
    		}
    		else
    		{} 
    		
    		 
    		if($scope.JobType  == 3  || $scope.JobType  == 6 )
    		{
    			 
    			     $scope.savejobJson[0].mlalgorithm=$('select[name="Algorithm"] option:selected').val();
    			     if($scope.savejobJson[0].mlalgorithm  == 'Kmean')
    			     {
    			    	 var MLVariableDependents = $('select[name="VariablesDependent"] option:selected');
    			    	 var selected =[];
    			    	 $(MLVariableDependents).each(function(index, brand){
    	    		            selected.push([$(this).val()]);
    	    		         });
    	    		         selected = selected.join();
    	    		         $scope.savejobJson[0].mlVariable=selected;
    			     }
    			     else
    			     {
    			    	 var MLVariableDependents = $('select[name="VariablesDependent"] option:selected');
    			    	 var MLVariableInDependents = $('select[name="VariablesInDependent"] option:selected');
    			    	 var selected =[]; var selected1 =[];
    			    	 $(MLVariableDependents).each(function(index, brand){
    			    		 selected1.push([$(this).val()]);
 	    		         });
    			    	 $(MLVariableInDependents).each(function(index, brand){
    	    		            selected.push([$(this).val()]);
    	    		         });
    	    		         selected = selected1.join()+','+selected.join();
    	    		         $scope.savejobJson[0].mlVariable=selected;
    			     }
    			     
    			     
    				 
    				 
    		         
    		        
    		         
    		}
    	    if($scope.JobType  == 4 )
    	    {
    	    	   $scope.savejobJson[0].transformquery=$scope.formData.tranformation;
    	    }
				
      
     swal.setDefaults({
    			   confirmButtonColor: "#DD6B55", 
    	 	       confirmButtonText: 'Wait &rarr;',
    	   		   animation: false,
    	 		   showLoaderOnConfirm: true,
    	 		   progressSteps: ['1', '2','3'],
    	 		   progressStepsDistance:'80px',
    	 		   allowEscapeKey:false,
    	 		   allowOutsideClick:false,
    	 		   allowEnterKey:false,
    	 		   onOpen: function(){
    	           swal.clickConfirm();
    	           },
    	 		   preConfirm: function() {
    	   			 return new Promise(function (resolve, reject) {
    	   				var step=swal.getQueueStep();	
    	   				 
    	   				if(step == '0')
    	   				{
    	   					 
    	   					if( $scope.SourceServerType == 1 && $scope.DestinationServerType == 3 && $scope.JobType == 1)
    	   		    		{
    	   		    			$scope.FtpToS3UploadJson='{"ftphostName":"'+$scope.GetAllSourceJson['ftphostName']+'","ftpPort":"'+$scope.GetAllSourceJson['ftpPort']+'","ftpUsername":"'+$scope.GetAllSourceJson['ftpUsername']+'","ftppassword":"'+$scope.GetAllSourceJson['ftppassword']+'","ftpPath":"'+$scope.savejobJson[0].sourcefolderPath+'","accesskey":"'+$scope.GetAllDestinationJson['accesskey']+'","secretKey":"'+$scope.GetAllDestinationJson['secretKey']+'","bucketName":"'+Destinationbucket+'","key":"'+Destinationkey+'"}';
    	   		    			$scope.savejobJson[0].jobjson=$scope.FtpToS3UploadJson;
    	   		    			$scope.FtpToS3UploadJson=JSON.parse( $scope.FtpToS3UploadJson); 
    	   			        	ListBucket.FtpToS3Upload($scope.FtpToS3UploadJson).then(function (data) {
    	   							if(data.ftpconnect)
    	   								{
    	   								resolve();
    	   								}
    	   							else
    	   								{
    	   								swal(
    	   									  'Oops...',
    	   									  'Something went wrong!',
    	   									  'error'
    	   									)
    	   								swal.close() 
    	   								}
    	   		    	  		},function (errorMessage) {
    	   		    	  		swal.resetDefaults();swal(
	   									  'Oops...',
	   									  'Something went wrong!',
	   									  'error'
	   									)
    	   		    	  		  //alert(errorMessage);
    	   		    	 		}); 
    	   		    		}  
    	   	   		
    	   					else if( $scope.SourceServerType == 1 && $scope.DestinationServerType == 2 && $scope.JobType == 1)
    	   		    		{
    	   	 	    			
    	   		    		    if($scope.formData.createNewTable == "1")
    	   		    			{
    	   		    		    	var createNewTable= true;
    	   		    		    	var overWriteTableData=false
    	   		    			}
    	   		    		    else
    	   		    		    {
    	   		    		    	var createNewTable=false;
    	   		    		    	var	overWriteTableData= false;
    	   		    		    	if($scope.formData.overWriteTableData == "1")
        	   		    			{
    	   		    		    		var	overWriteTableData= true;
        	   		    			}
    	   		    		    }
    	   		    		    
    	   		    			$scope.FtpToMysqlJson='{"ftphostName":"'+$scope.GetAllSourceJson['ftphostName']+'","ftpPort":"'+$scope.GetAllSourceJson['ftpPort']+'","ftpUsername":"'+$scope.GetAllSourceJson['ftpUsername']+'","ftppassword":"'+$scope.GetAllSourceJson['ftppassword']+'","ftpPath":"'+$scope.savejobJson[0].sourcefolderPath+'","ftpfileName":"'+$scope.savejobJson[0].sourcefileKey+'","classname": "'+ $scope.GetAllDestinationJson['classname']+'","dburl":"'+$scope.GetAllDestinationJson['dburl']+'","dbport":"'+ $scope.GetAllDestinationJson['dbport']+'","dbusername":"'+ $scope.GetAllDestinationJson['dbusername']+'","dbpassword":"'+$scope.GetAllDestinationJson['dbpassword']+'","dbname":"'+ $scope.GetAllDestinationJson['dbname']+'","createnewtable":"'+createNewTable+'","tableoverride":"'+ overWriteTableData+'","tablename":"'+$scope.savejobJson[0].destinationrdbmstableName+'","fieldseparator":","}';
    	   		    			$scope.savejobJson[0].jobjson=$scope.FtpToMysqlJson;
    	   		    			$scope.FtpToMysqlJson=JSON.parse( $scope.FtpToMysqlJson);  
    	   		        	    ListBucket.FtpToMysql($scope.FtpToMysqlJson).then(function (data) {
    	   		        	    	if(data.final_status)
	   								{
	   								resolve();
	   								}
	   							else
	   								{
	   							 swal.resetDefaults();
	   							 swal(
	  	   									  'Oops...',
	  	   									  'Something went wrong!',
	  	   									  'error'
	  	   									)
	  	   							 
	   								}
    	   		    	  		},function (errorMessage) {
    	   		    	  		 swal.resetDefaults();swal(
	   									  'Oops...',
	   									  'Something went wrong!',
	   									  'error'
	   									)
	   								
    	   		    	 		}); 
    	   		    		}  
    	   	   		 
    	   					else if(  $scope.SourceServerType == 3 && $scope.DestinationServerType == 2  && $scope.JobType == 1)
    	   					{
    	   						
	    	   					 if($scope.formData.createNewTable == "1")
	 	   		    			{
	 	   		    		    	var createNewTable= true;
	 	   		    		    	var overWriteTableData=false
	 	   		    			}
	 	   		    		    else
	 	   		    		    {
	 	   		    		    	var createNewTable=false;
	 	   		    		        var	overWriteTableData= false;
	 	   		    		        if($scope.formData.overWriteTableData == "1")
	     	   		    			{
	     	   		    				overWriteTableData= true;
	     	   		    			}
	 	   		    		    }
    	   		    			 
	    	   					if( $scope.GetAllDestinationJson['databaseType'] == "Redshift" )
	    	   					{
	    	   					   
	    	   			            	$scope.getBucketPropertiesJson='{"accesskey": "'+$scope.GetAllSourceJson['accesskey']+'", "secretKey": "'+$scope.GetAllSourceJson['secretKey']+'","bucketName": "'+Sourcebucket+'" }'; 
	    	   			            	$scope.getBucketPropertiesJson=JSON.parse( $scope.getBucketPropertiesJson); 
	    	   			         		Bucket.getBucketProperties($scope.getBucketPropertiesJson).then(function (data) {
	    	   			         		var bucketLocation;
	    	   			         		if(data.bucketLocation == "US")
	    	   			         		{
	    	   			         		bucketLocation='us-east-1';
	    	   			         		}
	    	   			         		else
	    	   			         		{
	    	   			         		bucketLocation=	data.bucketLocation;
	    	   			         		}
	    	   			         		$scope.S3ToRedShiftJson='{"accesskey":"'+$scope.GetAllSourceJson['accesskey']+'","secretKey":"'+$scope.GetAllSourceJson['secretKey']+'","bucketName":"'+Sourcebucket+'","key":"'+Sourcekey+'","classname": "'+ $scope.GetAllDestinationJson['classname']+'","dburl":"'+$scope.GetAllDestinationJson['dburl']+'","dbport":"'+ $scope.GetAllDestinationJson['dbport']+'","dbusername":"'+ $scope.GetAllDestinationJson['dbusername']+'","dbpassword":"'+$scope.GetAllDestinationJson['dbpassword']+'","dbname":"'+ $scope.GetAllDestinationJson['dbname']+'","createnewtable":"'+createNewTable+'","tableoverride":"'+ overWriteTableData+'","tablename":"'+$scope.savejobJson[0].destinationrdbmstableName+'","fieldseparator":",","s3region":"'+bucketLocation+'"}';
		    	   		    			$scope.savejobJson[0].jobjson=$scope.S3ToRedShiftJson;
		    	   		    			$scope.S3ToRedShiftJson=JSON.parse( $scope.S3ToRedShiftJson);  
		    	   		    			ListBucket.S3ToRedShift($scope.S3ToRedShiftJson).then(function (data) {
		    	   		    				if(data.final_status)
			   								{
			   								resolve();
			   								}
			   							else
			   								{
			   							 swal.resetDefaults();swal(
			  	   									  'Oops...',
			  	   									  'Something went wrong!',
			  	   									  'error'
			  	   									)
			  	   								 
			   								}
		    	   						  
		    	   		    			},function (errorMessage) {
		    	   		    			 swal.resetDefaults();swal(
		  	   									  'Oops...',
		  	   									  'Something went wrong!',
		  	   									  'error'
		  	   									)
		  	   								 
		    	   		    			}); 
	    	   			         			
	    	   					     	},function (errorMessage) {
	    	   					     	 swal.resetDefaults();swal(
		  	   									  'Oops...',
		  	   									  'Something went wrong!',
		  	   									  'error'
		  	   									)
	    	   					 		});	
	    	   						 	 
	    	   			       
	    	   					  
	    	   					}
	    	   					else 
	    	   					{
	    	   						$scope.S3ToMysqlJson='{"accesskey":"'+$scope.GetAllSourceJson['accesskey']+'","secretKey":"'+$scope.GetAllSourceJson['secretKey']+'","bucketName":"'+Sourcebucket+'","key":"'+Sourcekey+'","classname": "'+ $scope.GetAllDestinationJson['classname']+'","dburl":"'+$scope.GetAllDestinationJson['dburl']+'","dbport":"'+ $scope.GetAllDestinationJson['dbport']+'","dbusername":"'+ $scope.GetAllDestinationJson['dbusername']+'","dbpassword":"'+$scope.GetAllDestinationJson['dbpassword']+'","dbname":"'+ $scope.GetAllDestinationJson['dbname']+'","createnewtable":"'+createNewTable+'","tableoverride":"'+ overWriteTableData+'","tablename":"'+$scope.savejobJson[0].destinationrdbmstableName+'","fieldseparator":","}';
	    	   		    			$scope.savejobJson[0].jobjson=$scope.S3ToMysqlJson;
	    	   		    			$scope.S3ToMysqlJson=JSON.parse( $scope.S3ToMysqlJson);  
	    	   		    			ListBucket.S3ToMysql($scope.S3ToMysqlJson).then(function (data) {
	    	   		    				if(data.final_status)
		   								{
		   								resolve();
		   								}
		   							else
		   								{
		   							 swal.resetDefaults();swal(
		  	   									  'Oops...',
		  	   									  'Something went wrong!',
		  	   									  'error'
		  	   									)
		  	   								 
		   								}
	    	   						  
	    	   		    			},function (errorMessage) {
	    	   		    			 swal.resetDefaults();swal(
	  	   									  'Oops...',
	  	   									  'Something went wrong!',
	  	   									  'error'
	  	   									)
	  	   								 
	    	   		    			}); 
	    	   					}
	    	   					 
     	   		        	     
    	   					}
    	   					//&& $scope.SourceServerType == 2 && $scope.DestinationServerType == 2
    	   					else if($scope.JobType == 3 )
    	   					{
    	   						 
	    	   					 if($scope.formData.createNewTable == "1")
	 	   		    			{
	 	   		    		    	var createNewTable= true;
	 	   		    		    	var overWriteTableData=false
	 	   		    			}
	 	   		    		    else
	 	   		    		    {
	 	   		    		    	var createNewTable=false;
	 	   		    		    	var	overWriteTableData= false;
	 	   		    		    	if($scope.formData.overWriteTableData == "1")
	     	   		    			{
	     	   		    				overWriteTableData= true;
	     	   		    			}
	 	   		    		    }
	    	   					 //107.180.2.11
	    	   					//jdbc:mysql://107.180.2.11:
	    	   					 
	    	   					var dburlstring=$scope.GetAllSourceJson['dburl'].split(':');
		    	   				dburlstring= dburlstring[2].split('//')[1];
		    	   				
		    	   				var dburlstring2=$scope.GetAllDestinationJson['dburl'].split(':');
		    	   				dburlstring2= dburlstring2[2].split('//')[1];
			    	   				
 		    	   				if( $scope.savejobJson[0].mlalgorithm  == 'Kmean' )
		    	   				{
	 		    	   				
	 		    	   				if( $scope.GetAllDestinationJson['databaseType'] == "Redshift" )
		    	   					{
			    	   					
			    	   					var fileName= "Dump_"+Date.now()+'.csv'; 
			    	   					var Keys=$scope.selectedBucketDump.Key.split(',');
			   							$scope.getBucketPropertiesJson='{"accesskey": "'+Keys[0]+'", "secretKey": "'+Keys[1]+'","bucketName": "'+$scope.selectedBucketDump.name+'" }'; 
			   			            	$scope.getBucketPropertiesJson=JSON.parse( $scope.getBucketPropertiesJson); 
			   			         		Bucket.getBucketProperties($scope.getBucketPropertiesJson).then(function (data) {
			   			         		var bucketLocation;
			   			         		if(data.bucketLocation == "US")
			   			         		{
			   			         		bucketLocation='us-east-1';
			   			         		}
			   			         		else
			   			         		{
			   			         		bucketLocation=	data.bucketLocation;
			   			         		}
				   			         		
			   			         		$scope.KmeanJson='{ "source": { "dburl": "'+dburlstring+'", "dbport": "'+$scope.GetAllSourceJson['dbport']+'", "classname": "'+$scope.GetAllSourceJson['classname']+'","dbusername": "'+$scope.GetAllSourceJson['dbusername']+'","dbpassword": "'+$scope.GetAllSourceJson['dbpassword']+'", "dbname": "'+$scope.GetAllSourceJson['dbname']+'","tablename": "'+$scope.savejobJson[0].sourcerdbmstableName+'", "fields": "'+$scope.savejobJson[0].mlVariable+'"}, "destination": {"classname": "'+$scope.GetAllDestinationJson['classname']+'","dburl": "'+dburlstring2+'", "dbport": "'+$scope.GetAllDestinationJson['dbport']+'", "dbusername": "'+$scope.GetAllDestinationJson['dbusername']+'", "dbpassword": "'+$scope.GetAllDestinationJson['dbpassword']+'","dbname": "'+$scope.GetAllDestinationJson['dbname']+'","createnewtable": "'+createNewTable+'","tableoverride": "'+overWriteTableData+'","tablename": "'+$scope.savejobJson[0].destinationrdbmstableName+'" }, "s3dump":{"accesskey":"'+Keys[0]+'","secretKey":"'+Keys[1]+'","bucketName":"'+$scope.selectedBucketDump.name+'","key":"'+fileName+'","s3region":"'+bucketLocation+'"} }';
			   			         		$scope.savejobJson[0].jobjson=$scope.KmeanJson;
			   			         		$scope.KmeanJson=JSON.parse( $scope.KmeanJson);
			   			         		console.log($scope.KmeanJson);
			   			         		
			   			         	ML.Kmean($scope.KmeanJson).then(function (data) {
			       	   		    				if(data.status)
			   	   								{
			   	   								resolve();
			   	   								}
			   	   							else
			   	   								{
			   	   							 swal.resetDefaults();swal(
			   	  	   									  'Oops...',
			   	  	   									  'Something went wrong!',
			   	  	   									  'error'
			   	  	   									)
 			   	   								}
			       	   			    			},function (errorMessage) {
			       	   			    			 swal.resetDefaults();swal(
			   	  	   									  'Oops...',
			   	  	   									  'Something went wrong!',
			   	  	   									  'error'
			   	  	   									)
 			       	   			    			}); 
  			   			         		
 			   			         		},function (errorMessage) {
	      	   			    			 swal.resetDefaults();swal(
	  	  	   									  'Oops...',
	  	  	   									  'Something went wrong!',
	  	  	   									  'error'
	  	  	   									)
	  	  	   								 
	      	   			    			}); 
			   			         		
		    	   					}
			    	   				else
			    	   				{
			    	   					$scope.KmeanJson='{ "source": { "dburl": "'+dburlstring+'", "dbport": "'+$scope.GetAllSourceJson['dbport']+'", "classname": "'+$scope.GetAllSourceJson['classname']+'","dbusername": "'+$scope.GetAllSourceJson['dbusername']+'","dbpassword": "'+$scope.GetAllSourceJson['dbpassword']+'", "dbname": "'+$scope.GetAllSourceJson['dbname']+'","tablename": "'+$scope.savejobJson[0].sourcerdbmstableName+'", "fields": "'+$scope.savejobJson[0].mlVariable+'"}, "destination": {"classname": "'+$scope.GetAllDestinationJson['classname']+'","dburl": "'+dburlstring2+'", "dbport": "'+$scope.GetAllDestinationJson['dbport']+'", "dbusername": "'+$scope.GetAllDestinationJson['dbusername']+'", "dbpassword": "'+$scope.GetAllDestinationJson['dbpassword']+'","dbname": "'+$scope.GetAllDestinationJson['dbname']+'","createnewtable": "'+createNewTable+'","tableoverride": "'+overWriteTableData+'","tablename": "'+$scope.savejobJson[0].destinationrdbmstableName+'" } }';
			   			         		$scope.savejobJson[0].jobjson=$scope.KmeanJson;
			   			         		$scope.KmeanJson=JSON.parse( $scope.KmeanJson);
			   			         		//console.log($scope.KmeanJson);
			   			         		
			   			         	ML.Kmean($scope.KmeanJson).then(function (data) {
		       	   		    				if(data.status)
		   	   								{
		   	   								resolve();
		   	   								}
		   	   							else
		   	   								{
		   	   							 swal.resetDefaults();swal(
		   	  	   									  'Oops...',
		   	  	   									  'Something went wrong!',
		   	  	   									  'error'
		   	  	   									)
		   	  	   								 
		   	   								}
		       	   			    			},function (errorMessage) {
		       	   			    			 swal.resetDefaults();swal(
		   	  	   									  'Oops...',
		   	  	   									  'Something went wrong!',
		   	  	   									  'error'
		   	  	   									)
		   	  	   								 
		       	   			    			}); 
			   			         		
			    	   					
			    	   				}
 		    	   				
	 		    	   				 
        	   						
		    	   				}
		    	   				else if( $scope.savejobJson[0].mlalgorithm  == 'LR' ) 
		    	   				{
		    	   					
		    	   					var trainkey= $scope.selectedTainBucket.Key.split(',');
		    	   					var Sourcebucket=$scope.selectedTainBucket.path.split('|')[0];  
		    	   					if(typeof $scope.selectedTainBucket.path.split('|')[1] == 'undefined'  || typeof $scope.selectedTainBucket.path.split('|')[1] == '')
		    	   	    			{
		    	   	    				var Sourcekey= $scope.selectedTainBucket.name;
 		    	   	    			}
		    	   	    			else
		    	   	    			{
		    	   	    				var Sourcekey= $scope.selectedTainBucket.path.split('|')[1]+$scope.selectedTainBucket.name;
 		    	   	    			}
		    	   					
		    	   					if( $scope.GetAllDestinationJson['databaseType'] == "Redshift" )
		    	   					{
			    	   					 
		    	   						var fileName= "Dump_"+Date.now()+'.csv'; 
			    	   					var Keys=$scope.selectedBucketDump.Key.split(',');
			   							$scope.getBucketPropertiesJson='{"accesskey": "'+Keys[0]+'", "secretKey": "'+Keys[1]+'","bucketName": "'+$scope.selectedBucketDump.name+'" }'; 
			   			            	$scope.getBucketPropertiesJson=JSON.parse( $scope.getBucketPropertiesJson); 
			   			         		Bucket.getBucketProperties($scope.getBucketPropertiesJson).then(function (data) {
			   			         		var bucketLocation;
			   			         		if(data.bucketLocation == "US")
			   			         		{
			   			         		bucketLocation='us-east-1';
			   			         		}
			   			         		else
			   			         		{
			   			         		bucketLocation=	data.bucketLocation;
			   			         		}
				   			         	
			   			         	    
			   			         		$scope.LRJson='{ "source": { "dburl": "'+dburlstring+'", "dbport": "'+$scope.GetAllSourceJson['dbport']+'", "classname": "'+$scope.GetAllSourceJson['classname']+'","dbusername": "'+$scope.GetAllSourceJson['dbusername']+'","dbpassword": "'+$scope.GetAllSourceJson['dbpassword']+'", "dbname": "'+$scope.GetAllSourceJson['dbname']+'","tablename": "'+$scope.savejobJson[0].sourcerdbmstableName+'", "fields": "'+$scope.savejobJson[0].mlVariable+'"}, "destination": {"classname": "'+$scope.GetAllDestinationJson['classname']+'","dburl": "'+dburlstring2+'", "dbport": "'+$scope.GetAllDestinationJson['dbport']+'", "dbusername": "'+$scope.GetAllDestinationJson['dbusername']+'", "dbpassword": "'+$scope.GetAllDestinationJson['dbpassword']+'","dbname": "'+$scope.GetAllDestinationJson['dbname']+'","createnewtable": "'+createNewTable+'","tableoverride": "'+overWriteTableData+'","tablename": "'+$scope.savejobJson[0].destinationrdbmstableName+'" }, "s3dump":{"accesskey":"'+Keys[0]+'","secretKey":"'+Keys[1]+'","bucketName":"'+$scope.selectedBucketDump.name+'","key":"'+fileName+'","s3region":"'+bucketLocation+'"},"s3train":{"accesskey":"'+trainkey[0]+'","secretKey":"'+trainkey[1]+'","bucketName":"'+Sourcebucket+'","key":"'+Sourcekey+'"} }';
			   			         		$scope.savejobJson[0].jobjson=$scope.LRJson;
			   			         		$scope.LRJson=JSON.parse( $scope.LRJson);
 			   			         		ML.LR($scope.LRJson).then(function (data) {
			       	   		    				if(data.status)
			   	   								{
			   	   								resolve();
			   	   								}
			   	   							else
			   	   								{
			   	   							 swal.resetDefaults();swal(
			   	  	   									  'Oops...',
			   	  	   									  'Something went wrong!',
			   	  	   									  'error'
			   	  	   									)
 			   	   								}
			       	   			    			},function (errorMessage) {
			       	   			    			 swal.resetDefaults();swal(
			   	  	   									  'Oops...',
			   	  	   									  'Something went wrong!',
			   	  	   									  'error'
			   	  	   									)
 			       	   			    			});  
  			   			         		
 			   			         		},function (errorMessage) {
	      	   			    			 swal.resetDefaults();swal(
	  	  	   									  'Oops...',
	  	  	   									  'Something went wrong!',
	  	  	   									  'error'
	  	  	   									)
	  	  	   								 
	      	   			    			}); 
			   			         		
		    	   					}
			    	   				else
			    	   				{
 			    	   					$scope.LRJson='{ "source": { "dburl": "'+dburlstring+'", "dbport": "'+$scope.GetAllSourceJson['dbport']+'", "classname": "'+$scope.GetAllSourceJson['classname']+'","dbusername": "'+$scope.GetAllSourceJson['dbusername']+'","dbpassword": "'+$scope.GetAllSourceJson['dbpassword']+'", "dbname": "'+$scope.GetAllSourceJson['dbname']+'","tablename": "'+$scope.savejobJson[0].sourcerdbmstableName+'", "fields": "'+$scope.savejobJson[0].mlVariable+'"}, "destination": {"classname": "'+$scope.GetAllDestinationJson['classname']+'","dburl": "'+dburlstring2+'", "dbport": "'+$scope.GetAllDestinationJson['dbport']+'", "dbusername": "'+$scope.GetAllDestinationJson['dbusername']+'", "dbpassword": "'+$scope.GetAllDestinationJson['dbpassword']+'","dbname": "'+$scope.GetAllDestinationJson['dbname']+'","createnewtable": "'+createNewTable+'","tableoverride": "'+overWriteTableData+'","tablename": "'+$scope.savejobJson[0].destinationrdbmstableName+'" },"s3train":{"accesskey":"'+trainkey[0]+'","secretKey":"'+trainkey[1]+'","bucketName":"'+Sourcebucket+'","key":"'+Sourcekey+'"} }';
			   			         		$scope.savejobJson[0].jobjson=$scope.LRJson;
			   			         		$scope.LRJson=JSON.parse( $scope.LRJson);
 			   			         		
			   			         	ML.LR($scope.LRJson).then(function (data) {
		       	   		    				if(data.status)
		   	   								{
		   	   								resolve();
		   	   								}
		   	   							else
		   	   								{
		   	   							 swal.resetDefaults();swal(
		   	  	   									  'Oops...',
		   	  	   									  'Something went wrong!',
		   	  	   									  'error'
		   	  	   									)
		   	  	   								 
		   	   								}
		       	   			    			},function (errorMessage) {
		       	   			    			 swal.resetDefaults();swal(
		   	  	   									  'Oops...',
		   	  	   									  'Something went wrong!',
		   	  	   									  'error'
		   	  	   									)
		   	  	   								 
		       	   			    			}); 
			   			         		
			    	   					
			    	   				}
		    	   					
		    	   				 	
		    	   				}
		    	   				
		    	   				
	    	   					/*if( $scope.GetAllDestinationJson['databaseType'] == "Redshift" )
	    	   					{
	    	   					   
	    	   							var Keys=$scope.selectedBucketDump.Key.split(',');
	    	   							$scope.getBucketPropertiesJson='{"accesskey": "'+Keys[0]+'", "secretKey": "'+Keys[1]+'","bucketName": "'+$scope.selectedBucketDump.name+'" }'; 
	    	   			            	$scope.getBucketPropertiesJson=JSON.parse( $scope.getBucketPropertiesJson); 
	    	   			         		Bucket.getBucketProperties($scope.getBucketPropertiesJson).then(function (data) {
	    	   			         		var bucketLocation;
	    	   			         		if(data.bucketLocation == "US")
	    	   			         		{
	    	   			         		bucketLocation='us-east-1';
	    	   			         		}
	    	   			         		else
	    	   			         		{
	    	   			         		bucketLocation=	data.bucketLocation;
	    	   			         		}
	    	   			         		$scope.MlMysqlJson='{ "sourceMysql": { "dburl": "'+dburlstring+'", "dbport": "'+$scope.GetAllSourceJson['dbport']+'","classname": "'+$scope.GetAllSourceJson['classname']+'", "dbusername": "'+$scope.GetAllSourceJson['dbusername']+'","dbpassword": "'+$scope.GetAllSourceJson['dbpassword']+'", "dbname": "'+$scope.GetAllSourceJson['dbname']+'","tablename": "'+$scope.savejobJson[0].sourcerdbmstableName+'", "fields": "'+$scope.savejobJson[0].mlVariable+'"}, "destinationMysql": {"classname": "'+$scope.GetAllDestinationJson['classname']+'","dburl": "'+$scope.GetAllDestinationJson['dburl']+'", "dbport": "'+$scope.GetAllDestinationJson['dbport']+'", "dbusername": "'+$scope.GetAllDestinationJson['dbusername']+'", "dbpassword": "'+$scope.GetAllDestinationJson['dbpassword']+'","dbname": "'+$scope.GetAllDestinationJson['dbname']+'","createnewtable": "'+createNewTable+'","tableoverride": "'+overWriteTableData+'","tablename": "'+$scope.savejobJson[0].destinationrdbmstableName+'","fieldseparator": ",","filename": "'+fileName+'" },"s3dump":{"accesskey":"'+Keys[0]+'","secretKey":"'+Keys[1]+'","bucketName":"'+$scope.selectedBucketDump.name+'","key":"'+fileName+'","s3region":"'+bucketLocation+'" } }';
	    	   			         		$scope.savejobJson[0].jobjson=$scope.MlMysqlJson;
	    	   			         		$scope.MlMysqlJson=JSON.parse( $scope.MlMysqlJson);
	    	   			         	    ListBucket.MlMysql($scope.MlMysqlJson).then(function (data) {
			    	   		    				if(data.final_status)
				   								{
				   								resolve();
				   								}
				   							   else
				   								{
				   							    swal.resetDefaults();swal(
				  	   									  'Oops...',
				  	   									  'Something went wrong!',
				  	   									  'error'
				  	   									)
				  	   								 
				   								}
			    	   			    			},function (errorMessage) {
			    	   			    			 swal.resetDefaults();swal(
				  	   									  'Oops...',
				  	   									  'Something went wrong!',
				  	   									  'error'
				  	   									)
				  	   								 
			    	   			    			});
	    	   			         	
	    	   			         	
	    	   			         		},function (errorMessage) {
		    	   			    			 swal.resetDefaults();swal(
			  	   									  'Oops...',
			  	   									  'Something went wrong!',
			  	   									  'error'
			  	   									)
	    	   			         		});
	    	   			         
	    	   			        }
	    	   					else
	    	   					{
    	    	   					$scope.MlMysqlJson='{ "sourceMysql": { "dburl": "'+dburlstring+'", "dbport": "'+$scope.GetAllSourceJson['dbport']+'", "classname": "'+$scope.GetAllSourceJson['classname']+'","dbusername": "'+$scope.GetAllSourceJson['dbusername']+'","dbpassword": "'+$scope.GetAllSourceJson['dbpassword']+'", "dbname": "'+$scope.GetAllSourceJson['dbname']+'","tablename": "'+$scope.savejobJson[0].sourcerdbmstableName+'", "fields": "'+$scope.savejobJson[0].mlVariable+'"}, "destinationMysql": {"classname": "'+$scope.GetAllDestinationJson['classname']+'","dburl": "'+$scope.GetAllDestinationJson['dburl']+'", "dbport": "'+$scope.GetAllDestinationJson['dbport']+'", "dbusername": "'+$scope.GetAllDestinationJson['dbusername']+'", "dbpassword": "'+$scope.GetAllDestinationJson['dbpassword']+'","dbname": "'+$scope.GetAllDestinationJson['dbname']+'","createnewtable": "'+createNewTable+'","tableoverride": "'+overWriteTableData+'","tablename": "'+$scope.savejobJson[0].destinationrdbmstableName+'","fieldseparator": ",","filename": "'+fileName+'" },"s3dump":{"accesskey":"","secretKey":"","bucketName":"","key":"","s3region":"" } }';
    	    	   					$scope.savejobJson[0].jobjson=$scope.MlMysqlJson;
        	   						$scope.MlMysqlJson=JSON.parse( $scope.MlMysqlJson);
        	   		    			ListBucket.MlMysql($scope.MlMysqlJson).then(function (data) {
        	   		    				if(data.final_status)
    	   								{
    	   								resolve();
    	   								}
    	   							else
    	   								{
    	   							 swal.resetDefaults();swal(
    	  	   									  'Oops...',
    	  	   									  'Something went wrong!',
    	  	   									  'error'
    	  	   									)
    	  	   								 
    	   								}
        	   			    			},function (errorMessage) {
        	   			    			 swal.resetDefaults();swal(
    	  	   									  'Oops...',
    	  	   									  'Something went wrong!',
    	  	   									  'error'
    	  	   									)
    	  	   								 
        	   			    			});  
	    	   						
	    	   					}
	    	   					*/
	    	   					
	    	   			       
     	   						 
    	    	   			   //$scope.MlMysqlJson='{ "sourceMysql": { "dburl": "'+dburlstring+'", "dbport": "'+$scope.GetAllSourceJson['dbport']+'", "dbusername": "'+$scope.GetAllSourceJson['dbusername']+'","dbpassword": "'+$scope.GetAllSourceJson['dbpassword']+'", "dbname": "'+$scope.GetAllSourceJson['dbname']+'","tablename": "'+$scope.savejobJson[0].sourcerdbmstableName+'", "fields": "'+$scope.savejobJson[0].mlVariable+'"}, "destinationMysql": {"classname": "'+$scope.GetAllDestinationJson['classname']+'","dburl": "'+$scope.GetAllDestinationJson['dburl']+'", "dbport": "'+$scope.GetAllDestinationJson['dbport']+'", "dbusername": "'+$scope.GetAllDestinationJson['dbusername']+'", "dbpassword": "'+$scope.GetAllDestinationJson['dbpassword']+'","dbname": "'+$scope.GetAllDestinationJson['dbname']+'","createnewtable": "'+createNewTable+'","tableoverride": "'+overWriteTableData+'","tablename": "'+$scope.savejobJson[0].destinationrdbmstableName+'","fieldseparator": ",","filename": "'+fileName+'" },"s3dump":{"accesskey":"","secretKey":"","bucketName":"","key":"","s3region":"" } }';

     	   						 
	    	   					//$scope.MlMysqlJson='{ "sourceMysql": { "dburl": "'+dburlstring+'", "dbport": "'+$scope.GetAllSourceJson['dbport']+'", "dbusername": "'+$scope.GetAllSourceJson['dbusername']+'","dbpassword": "'+$scope.GetAllSourceJson['dbpassword']+'", "dbname": "'+$scope.GetAllSourceJson['dbname']+'","tablename": "'+$scope.savejobJson[0].sourcerdbmstableName+'", "fields": "'+$scope.savejobJson[0].mlVariable+'"}, "destinationMysql": {"classname": "'+$scope.GetAllDestinationJson['classname']+'","dburl": "'+$scope.GetAllDestinationJson['dburl']+'", "dbport": "'+$scope.GetAllDestinationJson['dbport']+'", "dbusername": "'+$scope.GetAllDestinationJson['dbusername']+'", "dbpassword": "'+$scope.GetAllDestinationJson['dbpassword']+'","dbname": "'+$scope.GetAllDestinationJson['dbname']+'","createnewtable": "'+createNewTable+'","tableoverride": "'+overWriteTableData+'","tablename": "'+$scope.savejobJson[0].destinationrdbmstableName+'","fieldseparator": ",","filename": "'+Date.now()+'.csv" },"s3dump":{"accesskey":"","secretKey":"","bucketName":"","key":"","s3region":"" } }';
	    	   					/*$scope.savejobJson[0].jobjson=$scope.MlMysqlJson;
    	   						$scope.MlMysqlJson=JSON.parse( $scope.MlMysqlJson);  
      	   		    			
    	   		    			ListBucket.MlMysql($scope.MlMysqlJson).then(function (data) {
    	   		    				if(data.final_status)
	   								{
	   								resolve();
	   								}
	   							else
	   								{
	   							 swal.resetDefaults();swal(
	  	   									  'Oops...',
	  	   									  'Something went wrong!',
	  	   									  'error'
	  	   									)
	  	   								 
	   								}
    	   			    			},function (errorMessage) {
    	   			    			 swal.resetDefaults();swal(
	  	   									  'Oops...',
	  	   									  'Something went wrong!',
	  	   									  'error'
	  	   									)
	  	   								 
    	   			    			});*/  
    	   					}
    	   					else if( $scope.JobType == 4 )
    	   					{

    	   					
    	   						
    	   						
    	   						$scope.MysqltransformationsJson='{ "dburl": "'+$scope.GetAllSourceJson['dburl']+'", "dbport": "'+$scope.GetAllSourceJson['dbport']+'", "classname": "'+$scope.GetAllSourceJson['classname']+'","dbusername": "'+$scope.GetAllSourceJson['dbusername']+'","dbpassword": "'+$scope.GetAllSourceJson['dbpassword']+'", "dbname": "'+$scope.GetAllSourceJson['dbname']+'","query": "'+$scope.savejobJson[0].transformquery+'"}';
   	    	   					$scope.savejobJson[0].jobjson=$scope.MysqltransformationsJson;
       	   						$scope.MysqltransformationsJson=JSON.parse( $scope.MysqltransformationsJson);
       	   					    RDBMS.Mysqltransformations($scope.MysqltransformationsJson).then(function (data) {
       	   		    				if(data.status)
   	   								{
   	   								resolve();
   	   								}
   	   							else
   	   								{
   	   							 swal.resetDefaults();swal(
   	  	   									  'Oops...',
   	  	   									  'Something went wrong!',
   	  	   									  'error'
   	  	   									)
   	  	   								 
   	   								}
       	   			    			},function (errorMessage) {
       	   			    			 swal.resetDefaults();swal(
   	  	   									  'Oops...',
   	  	   									  'Something went wrong!',
   	  	   									  'error'
   	  	   									)
   	  	   								 
       	   			    			});  
	    	   					 
    	   					
    	   					}
    	   					else if( $scope.JobType == 6 )
    	   					{

    	   						
    	   						var dburlstring=$scope.GetAllSourceJson['dburl'].split(':');
		    	   				dburlstring= dburlstring[2].split('//')[1];
 		    	    			
		    	    			if(typeof $scope.selectedDestinationItem.path.split('|')[1] == 'undefined')
		    	    			{
		    	    				var fileName= "Train_"+Date.now()+'.zip';
 		    	    			}
		    	    			else
		    	    			{
		    	    				var fileName= $scope.selectedDestinationItem.path.split('|')[1]+$scope.selectedDestinationItem.name+'/'+"Train_"+Date.now()+'.zip' ;
		    	    			}
		    	    			
		    	    			$scope.TrainJson='{ "source": { "dburl": "'+dburlstring+'", "dbport": "'+$scope.GetAllSourceJson['dbport']+'", "classname": "'+$scope.GetAllSourceJson['classname']+'","dbusername": "'+$scope.GetAllSourceJson['dbusername']+'","dbpassword": "'+$scope.GetAllSourceJson['dbpassword']+'", "dbname": "'+$scope.GetAllSourceJson['dbname']+'","tablename": "'+$scope.savejobJson[0].sourcerdbmstableName+'", "fields": "'+$scope.savejobJson[0].mlVariable+'" }, "destinationS3": {"accesskey":"'+$scope.GetAllDestinationJson['accesskey']+'","secretKey":"'+$scope.GetAllDestinationJson['secretKey']+'","bucketName":"'+Destinationbucket+'" ,"key": "'+fileName+'"} }';
   	    	   					$scope.savejobJson[0].jobjson=$scope.TrainJson;
       	   						$scope.TrainJson=JSON.parse( $scope.TrainJson);
        	   						ML.Train($scope.TrainJson).then(function (data) {
       	   		    				if(data.status)
   	   								{
   	   								resolve();
   	   								}
   	   							else
   	   								{
   	   							 swal.resetDefaults();swal(
   	  	   									  'Oops...',
   	  	   									  'Something went wrong!',
   	  	   									  'error'
   	  	   									)
   	  	   								 
   	   								}
       	   			    			},function (errorMessage) {
       	   			    			 swal.resetDefaults();swal(
   	  	   									  'Oops...',
   	  	   									  'Something went wrong!',
   	  	   									  'error'
   	  	   									)
   	  	   								 
       	   			    			});  
	    	   					 
    	   					
    	   					}
    	   					else if( $scope.JobType == 1 && $scope.SourceServerType == 4 && $scope.DestinationServerType == 3 )
    	   					{
    	   						var hasgtag = $("input[name=hasgtag]").val();
    	   						var twitterbatch = $("input[name=twitterbatch]").val();
    	   						var kafkatopicname = $('select[name="kafkatopicname"]').val();
    	   						if(typeof $scope.selectedDestinationItem.path.split('|')[1] == 'undefined')
    	   		    			{
    	   		    				var DestinationkeyNew= $scope.savejobJson[0].sourcefileKey;
     	   		    			}
    	   		    			else
    	   		    			{
    	   		    				var DestinationkeyNew= $scope.selectedDestinationItem.path.split('|')[1]+$scope.selectedDestinationItem.name+'/';
    	   		    			}
    	   						
    	   						
	    	   					$scope.TwittersteamingJson='{"consumerKey" :"'+$scope.GetAllSourceJson['consumerKey']+'","consumerSecret" : "'+$scope.GetAllSourceJson['consumersecret']+'","accessToken" : "'+$scope.GetAllSourceJson['accessToken']+'","accessTokenSecret" : "'+$scope.GetAllSourceJson['accessTokenSecret']+'","keyword" : "'+hasgtag+'", "topicName": "'+kafkatopicname+'","batchSize" : "'+twitterbatch+'","accesskey" : "'+$scope.GetAllDestinationJson['accesskey']+'","secretKey" : "'+$scope.GetAllDestinationJson['secretKey']+'","bucketName" : "'+Destinationbucket+'","key" : "'+DestinationkeyNew+'" } ';
     	    	   				$scope.savejobJson[0].jobjson=$scope.TwittersteamingJson;
       	   						$scope.TwittersteamingJson=JSON.parse( $scope.TwittersteamingJson);
       	   						console.log($scope.TwittersteamingJson); 
       	   				 	Kafka.Twittersteaming($scope.TwittersteamingJson).then(function (data) {
       	   		    				if(data.status)
   	   								{
   	   								resolve();
   	   								}
   	   							else
   	   								{
   	   							 swal.resetDefaults();swal(
   	  	   									  'Oops...',
   	  	   									  'Something went wrong!',
   	  	   									  'error'
   	  	   									)
   	  	   								 
   	   								}
       	   			    			},function (errorMessage) {
       	   			    			 swal.resetDefaults();swal(
   	  	   									  'Oops...',
   	  	   									  'Something went wrong!',
   	  	   									  'error'
   	  	   									)
   	  	   								 
       	   			    			}); 
	    	   					 
    	   					
    	   					}
    	   					else
    	   					{
    	   						setTimeout(function() {
         	   				          resolve()
         	   				      }, 2000) 
    	   					}
    	   					
    	   				}
    	   				if(step == '1')
    	   				{
    	   					
    	   					setTimeout(function() {
   	   				          resolve()
   	   				      }, 2000) 
   	   				      
   	   				   /*   ListJob.saveJob($scope.savejobJson).then(function (data) {
    	   					//console.log(data);
    	   					setTimeout(function() {
     	   				          resolve()
     	   				      }, 2000) 
    	   					//alert(data);
    	     				// swal("Success!", "Your job is added.", "success");
    	     				// $rootScope.buildjson_Job_data=  data[0];
    	     				// $state.go('dashboard' );
    	     	  		},function (errorMessage) {
    	     	 			//alert(errorMessage);
    	     	 		});  */
    	   				}
    	   			    if(step == '2')
    	   			    	{
    	   			    	setTimeout(function() {
   	   				          resolve()
   	   				      }, 2000) 
    	   			    	}
    	 			    })
    	 		    },
     	 		})
    	 		 
    			var steps = [
    			  {
    			    title: 'Validating',
    			    text: 'Validating job' 
    			  },
    			  {
    				title: 'Saving',
    				text: 'Saving job'
    			   },
    			   {
    					title: 'Complete',
    					text: 'Done'
    			   },
    	 		]
    			
    			swal.queue(steps).then(function (result) {
    	 			 swal.resetDefaults()
    			  swal({
    			    title: 'All done!',
     			    confirmButtonText: 'Done!',
    			    showCancelButton: false
    			  }) 
    			 $state.go('job', {},{reload: true});
    			}, function () {
    			  swal.resetDefaults()
    			})
    	 
    		 
     
    
    		
        }	
        else if($scope.selectedSourceItem == null  && $scope.selectedDestinationItem != null)
        {
        	swal(
				    'Error!',
				    'Please select Source Server.',
				    'question'
				  )
        }
        else if($scope.selectedSourceItem !=null  && $scope.selectedDestinationItem ==null)
        {
        	swal(
				    'Error!',
				    'Please select Destination Server.',
				    'question'
				  )
        }
        else
        {
        	swal(
				    'Error!',
				    'Please select Source & Destination Server.',
				    'question'
				  )
        	
        }
	
     }
    
    
     //on expnad tree node after select source  
     $rootScope.onExpandTreesource = function(item, selectedItems)
    {
     	if(item.isExpanded)
    		{
    		item.isExpanded = !item.isExpanded;
    		return false;
     		}
		var dataObject = [];
		var i=0; 
     	
     	// ServerType for ftp  Source
     	if($scope.SourceServerType == 1)
    	{
    		if(item.isExpanded  == false)
    		{
    		var sourceId=item.id.split('_')[0];
        	var itempath=item.path+item.name;
        	
        	$scope.GetAllSourceJson['ftpPath']=itempath;
        	 
        	ListBucket.GetAllServeFoldersFile($scope.GetAllSourceJson).then(function (data) {
        	
        		if(data.ftpconnect  )
	 				{
        			item.children=[];
	 				angular.forEach(data.allContents, function(value, key) {
      	 				if(key == 'folderList')
     	 				{
          	 				angular.forEach(value, function(value1, key1) {
         	 					
         	 					if(  value1 !="" && value1 !="." && value1 !="..")  {
          	 						 var obj = {
	         	 				            id: sourceId+'_'+i,
	         	 				            name: value1,
	         	 				            icon:'fa fa-folder',
	         	 				            selected: false,
	         	 				            isExpanded:false,
	         	 				            path:itempath+'/',
	         	 				             checkbox:false,
	         	 				            callback:"source",
	         	 				            children: []
	         	 				        };
         	 					    var obj2 = {
         	 			                id: i+'sub',
         	 			                name: 'file.xml',
         	 			                icon:'fa fa-file',
         	 			                callback:"node",
         	 			                checkbox:false,
         	 			                children: [],
         	 			                selected: false
         	 			            };
         	 			            obj.children.push(obj2);
         	 			            item.children.push(obj);
 	         	 					i++;
          	 					}
         	 				
         	 				}); 
  	

     	 				}
     	 				if( key == 'fileList')
     	 				{
      	 				var selectedItemName;
      	 				angular.forEach(value, function(value1, key1) {
     	 					 if(  value1 !="" )  { 
     	 						if( $scope.selectedSourceItem != null ) 
     	 							{
     	 							  if($scope.selectedSourceItem.path == itempath+'/' && $scope.selectedSourceItem.name == value1 &&  $scope.selectedSourceItem.selected == true )
     	 								  {
     	 								var obj = {
     		         	 		                id: sourceId+'_'+i,
     		         	 		                name: value1,
     		         	 		                icon:'fa fa-file',
     		         	 		                selected: true,
     		         	 		                isExpanded:false,
     		         	 		              path:itempath+'/',
     		         	 		              checkbox:true,
     		         	 		                callback:"source",
     		         	 		                children: []
     		         	 		            };
     	 								  }
     	 							  else
     	 								  {
     	 								var obj = {
     		         	 		                id: sourceId+'_'+i,
     		         	 		                name: value1,
     		         	 		                icon:'fa fa-file',
     		         	 		                selected: false,
     		         	 		                isExpanded:false,
     		         	 		              path:itempath+'/',
     		         	 		              checkbox:true,
     		         	 		                callback:"source",
     		         	 		                children: []
     		         	 		            };
     	 								  }
     	 							}
     	 						 else
 								  {
     	 							var obj = {
 		         	 		                id: sourceId+'_'+i,
 		         	 		                name: value1,
 		         	 		                icon:'fa fa-file',
 		         	 		                selected: false,
 		         	 		                isExpanded:false,
 		         	 		              path:itempath+'/',
 		         	 		              checkbox:true,
 		         	 		                callback:"source",
 		         	 		                children: []
 		         	 		            };
 								  }
     	 						
  	         	 			    i++;
	         	 			   item.children.push(obj);	}
                                            
         	 				});
 	
     	 					
     	 				}

	 				});
	 				item.isExpanded = !item.isExpanded;
	 		  }
        	  
	 				
        	},function (errorMessage) {
         		item.isExpanded = false;
       		});
    		
	    	}
	    	else
	    	{
	    		item.isExpanded = false;
	    	}
    		
    	}
     	
     // ServerType for s3  Source
     	else if($scope.SourceServerType == 3) 
    	{
     		if(item.isExpanded  == false)
    		{
     		var serverId=item.id.split('_')[0];
    		 
     		
     		if(item.path == "")
     		{
     			var bucketName=item.name;
     			var itempath=item.name+'|';
     			$scope.GetAllSourceJson['bucketName']=bucketName;
             	$scope.GetAllSourceJson['key']="";
             	var checkvalue='';
            	var checkId=0;
     		}
     		else
     		{
     			var bucketName=(item.path).split('|')[0];
     			var key=(item.path).split('|')[1]+item.name+'/';
     			$scope.GetAllSourceJson['bucketName']=bucketName;
             	$scope.GetAllSourceJson['key']=key;
             	 
             	
     			var itempath=item.path+item.name+'/';
     			var checkId=( key ).split('/').length;
             	checkId=checkId-1; 
            	var checkvalue= (key ).split('/')[checkId-1];
       		}
         	
          	Bucket.getBucketContian($scope.GetAllSourceJson).then(function (data) {
         		
         		item.children=[];
         		if(data.status)
         		{
         			
         			 var main=$scope.extractbucketobject(data.bucket_contents);
         			 console.log(main);
         			  angular.forEach( main, function(value, key){
        		    	  
    			          angular.forEach( value, function(value1, key1){
    			        	  i++;if( checkId == 0)
    			        	  {
    			        		 if(value1.id == checkId     )
		    		        		  {
		    		        		   if(typeof value1.files == 'undefined')
			    		        		   {
			      		        			   var found = item.children.some(function (el) {
			   		        				    return el.name === value1.value && el.icon == 'fa fa-folder';
			   		        				  });
			    		        			   
			    		        			   if (!found) { var obj = {
			    	      	 				            id: sourceId+'_'+i,
			    	      	 				            name: value1.value,
			    	      	 				            icon:'fa fa-folder',
			    	      	 				            selected: false,
			    	      	 				            isExpanded:false,
			    	      	 				            checkbox:false,
			    	      	 				            path:itempath,
			    	      	 				            callback:"source",
			    	      	 				            children: []
			    	      	 				        };
			    	      		    		  var obj2 = {
			    	      	 			                id: i+'sub',
			    	      	 			                name: 'file.xml',
			    	      	 			                icon:'fa fa-file',
			    	      	 			                callback:"node",
			    	      	 			                children: [],
			    	      	 			                selected: false
			    	      	 			            };
			    	      	 			      obj.children.push(obj2);
			    	      			          item.children.push(obj);
			    	      			          
			    		        			   }
			    		        			   
			    	      			       
			    		        		   }
		    		        		   else
		    		        		   {
		    		        			   var found = item.children.some(function (el) {
			   		        				    return el.name === value1.value && el.icon == 'fa fa-file';;
			   		        				  });
		    		        			    if (!found) { 
		    		        			    
		    		        			    	 if( $scope.selectedSourceItem != null  && $scope.selectedSourceItem.path == itempath && $scope.selectedSourceItem.name == value1.value &&  $scope.selectedSourceItem.selected == true) 
		    		   							{
		    		   							   
		    		        			    		 var obj = {
				      			  	 				            id: sourceId+'_'+i,
				      			  	 				            name: value1.value,
				      			  	 				            icon:'fa fa-file',
				      			  	 				            selected: true,
				      			  	 				            isExpanded:false,
				      			  	 				            checkbox:true,
				      			  	 				            path:itempath,
				      			  	 				            callback:"source",
				      			  	 				            children: []
				      			  	 				        };
				      			   			              item.children.push(obj);
		    		   								 
		    		   							}
		    		   							  else
		    		   								  {
		    		   								  
		    		   								 var obj = {
				      			  	 				            id: sourceId+'_'+i,
				      			  	 				            name: value1.value,
				      			  	 				            icon:'fa fa-file',
				      			  	 				            selected: false,
				      			  	 				            isExpanded:false,
				      			  	 				            checkbox:true,
				      			  	 				            path:itempath,
				      			  	 				            callback:"source",
				      			  	 				            children: []
				      			  	 				        };
				      			   			              item.children.push(obj);
		    		   								  }
		    		        			    	 
		    		        			    	 
		    		        			    	
		    		        			    	
		    		        			    }; 
		    		        		   }
		    		        	 }
    			        	  }
    			        	  else
    			        		 { 
     			        		  if(value1.id == checkId    &&   value[checkId-1].value ==  checkvalue )
	    		        		  {
	    		        		   if(typeof value1.files == 'undefined')
		    		        		   {
		      		        			   var found = item.children.some(function (el) {
		   		        				    return el.name === value1.value  && el.icon == 'fa fa-folder';
		   		        				  });
		    		        			   
		    		        			   if (!found) { var obj = {
		    	      	 				            id: sourceId+'_'+i,
		    	      	 				            name: value1.value,
		    	      	 				            icon:'fa fa-folder',
		    	      	 				            selected: false,
		    	      	 				            isExpanded:false,
		    	      	 				            checkbox:false,
		    	      	 				            path:itempath,
		    	      	 				            callback:"source",
		    	      	 				            children: []
		    	      	 				        };
		    	      		    		  var obj2 = {
		    	      	 			                id: i+'sub',
		    	      	 			                name: 'file.xml',
		    	      	 			                icon:'fa fa-file',
		    	      	 			                callback:"node",
		    	      	 			                children: [],
		    	      	 			                selected: false
		    	      	 			            };
		    	      	 			      obj.children.push(obj2);
		    	      			          item.children.push(obj);
		    	      			          
		    		        			   }
 		    		        		   }
	    		        		   else
	    		        		   {
	    		        			   var found = item.children.some(function (el) {
		   		        				    return el.name === value1.value  && el.icon == 'fa fa-file';
		   		        				  });
	    		        			    if (!found) { 
	    		        			    	
	    		        			    	if( $scope.selectedSourceItem != null  && $scope.selectedSourceItem.path == itempath && $scope.selectedSourceItem.name == value1.value &&  $scope.selectedSourceItem.selected == true) 
	    		   							{
	    		   							   
	    		        			    		var obj = {
		      			  	 				            id: sourceId+'_'+i,
		      			  	 				            name: value1.value,
		      			  	 				            icon:'fa fa-file',
		      			  	 				            selected: false,
		      			  	 				            isExpanded:false,
		      			  	 				            checkbox:true,
		      			  	 				            path:itempath,
		      			  	 				            callback:"source",
		      			  	 				            children: []
		      			  	 				        };
		      			   			              item.children.push(obj);
	    		   								 
	    		   							}
	    		   							  else
	    		   								  {
	    		   								  
	    		   								var obj = {
		      			  	 				            id: sourceId+'_'+i,
		      			  	 				            name: value1.value,
		      			  	 				            icon:'fa fa-file',
		      			  	 				            selected: false,
		      			  	 				            isExpanded:false,
		      			  	 				            checkbox:true,
		      			  	 				            path:itempath,
		      			  	 				            callback:"source",
		      			  	 				            children: []
		      			  	 				        };
		      			   			              item.children.push(obj);
	    		   								  }
	    		        			    	 
	    		        			    	
	    		        			    	
	    		        			    	
	    		        			    }; 
	    		        		   }
    			        		  
     			        		 }
    			         }
    		          });

    			      });
         			   
         			  item.isExpanded = !item.isExpanded;
         		}
         		else
         		{
         			item.isExpanded=false;
         		}
         		
      	     	},function (errorMessage) {
      	       		item.isExpanded = false;
     	 		});
    		}
    	}
    	//console.log(item);
    }
     
     
     $scope.extractbucketobject =  function(data)
	 {
		 
		 var main=[];
		 $scope.buildjson_bucketFolder=[];
	     $scope.buildjson_bucketObject=[];
		     //console.log(data);
		     
	      angular.forEach(data, function(value, key1){
	    	
	    	  	var Newkey= value.key.split('/');
	    	    var bool;
	    	    var lastlength=Newkey.length;
		    	     if((value.key).slice(-1) != "/")
	    	    {
	    	    	 
	    	    	bool=true;
	    	    }
	    	    else
	    	    {
	    	    	bool=false;
	    	    } 
	    		var new2=[];
	         	 angular.forEach( Newkey, function(value1, key){
		         		 if(value1 !="")
	         			{
	         			  if(key == (lastlength-1) && bool)
	         				{new2.push({ id:key , value: value1 ,"files":'1','size':value.size ,'lastModified':value.lastModified});}else
	         					{
	         					new2.push({ id:key , value: value1 });
	         					}
		         			}
	         		
	 		      });
	         	  
	         	main.push(new2);
		      });
	      return main;
	 }
     
     
    $rootScope.onExpandTreedestination = function(item, selectedItems)
    {
    	if(item.isExpanded)
		{
		item.isExpanded = !item.isExpanded;
		return false;
 		}
    
    	var dataObject = [];
    	var i=0; 
 	
    	// ServerType for ftp  Destination
    	if($scope.DestinationServerType == 1)
	   {
			if(item.isExpanded  == false)
			{
			var destinationId=item.id.split('_')[0];
	    	var itempath=item.path+item.name;
	    	
	    	$scope.GetAllDestinationJson['ftpPath']=itempath;
	    	 
	    	ListBucket.GetAllServeFoldersFile($scope.GetAllDestinationJson).then(function (data) {
	    	
	    		if(data.ftpconnect  )
	 				{
	    			item.children=[];
	 				angular.forEach(data.allContents, function(value, key) {
	  	 				if(key == 'folderList')
	 	 				{
	      	 				angular.forEach(value, function(value1, key1) {
	     	 					
	     	 					if(  value1 !="" && value1 !="." && value1 !="..")  {
	     	 						 i++; 
     	 							  if(  $scope.selectedDestinationItem != null && $scope.selectedDestinationItem.path == itempath+'/' && $scope.selectedDestinationItem.name == value1 &&  $scope.selectedDestinationItem.selected == true )
     	 								  {
     	 								var obj = {
    	         	 				            id: destinationId+'_'+i,
    	         	 				            name: value1,
    	         	 				            icon:'fa fa-folder',
    	         	 				            selected: true,
    	         	 				            isExpanded:false,
    	         	 				            path:itempath+'/',
    	         	 				            checkbox:true,
    	         	 				            callback:"destination",
    	         	 				            children: []
    	         	 				        };
             	 					    var obj2 = {
             	 			                id: i+'sub',
             	 			                name: 'file.xml',
             	 			                icon:'fa fa-file',
             	 			                callback:"node",
             	 			                checkbox:false,
             	 			                children: [],
             	 			                selected: false
             	 			            };
             	 			            obj.children.push(obj2);
             	 			            item.children.push(obj);
     	         	 					i++;
     	         	 					
     	 								  }
     	 							  else
     	 								  {
     	 								var obj = {
    	         	 				            id: destinationId+'_'+i,
    	         	 				            name: value1,
    	         	 				            icon:'fa fa-folder',
    	         	 				            selected: false,
    	         	 				            isExpanded:false,
    	         	 				            path:itempath+'/',
    	         	 				             checkbox:true,
    	         	 				            callback:"destination",
    	         	 				            children: []
    	         	 				        };
             	 					    var obj2 = {
             	 			                id: i+'sub',
             	 			                name: 'file.xml',
             	 			                icon:'fa fa-file',
             	 			                callback:"node",
             	 			                checkbox:false,
             	 			                children: [],
             	 			                selected: false
             	 			            };
             	 			            obj.children.push(obj2);
             	 			            item.children.push(obj);
     	         	 					i++;
     	         	 					
     	 								  }
     	 							 
	      	 					}
	     	 				
	     	 				}); 
	      	 				
	
	 	 				}
	 	 				 
 
		 		  
	 				});
	 				item.isExpanded = !item.isExpanded;
 	 		  }
	    		else
	    	 {
	    			item.isExpanded = false;
	    	 }
	 				
	    	},function (errorMessage) {
	     		item.isExpanded = false;
	   		});
			
	    	}
	    	else
	    	{
	    		item.isExpanded = false;
	    	}
			
		}
 	
     	 
    	else if($scope.DestinationServerType == 3) 
    	{
    		 
    		    			 

     		if(item.isExpanded  == false)
    		{
     		var destinationId=item.id.split('_')[0];
    		 
     		
     		if(item.path == "")
     		{
     			var bucketName=item.name;
     			var itempath=item.name+'|';
     			$scope.GetAllDestinationJson['bucketName']=bucketName;
             	$scope.GetAllDestinationJson['key']="";
             	var checkvalue='';
            	var checkId=0;
     		}
     		else
     		{
     			var bucketName=(item.path).split('|')[0];
     			var key=(item.path).split('|')[1]+item.name+'/';
     			$scope.GetAllDestinationJson['bucketName']=bucketName;
             	$scope.GetAllDestinationJson['key']=key;
             	 
             	
     			var itempath=item.path+item.name+'/';
     			var checkId=( key ).split('/').length;
             	checkId=checkId-1; 
            	var checkvalue= (key ).split('/')[checkId-1];
       		}
         	
          	Bucket.getBucketContian($scope.GetAllDestinationJson).then(function (data) {
         		
         		item.children=[];
         		if(data.status)
         		{

         			
        			 var main=$scope.extractbucketobject(data.bucket_contents);
       			  angular.forEach( main, function(value, key){
      		    	  
  			          angular.forEach( value, function(value1, key1){
  			        	  i++;if( checkId == 0)
  			        	  {
  			        		 if(value1.id == checkId     )
		    		        		  {
		    		        		   if(typeof value1.files == 'undefined')
			    		        		   {
			      		        			   var found = item.children.some(function (el) {
			   		        				    return el.name === value1.value;
			   		        				  });
			    		        			   
			    		        			   if (!found) {
			    		        				   
			    		        				   if( $scope.selectedDestinationItem != null  && $scope.selectedDestinationItem.path == itempath && $scope.selectedDestinationItem.name == value1.value &&  $scope.selectedDestinationItem.selected == true) 
			    		   							{
			    		   							   
			    		        					   var obj = {
					    	      	 				            id: destinationId+'_'+i,
					    	      	 				            name: value1.value,
					    	      	 				            icon:'fa fa-folder',
					    	      	 				            selected: true,
					    	      	 				            isExpanded:false,
					    	      	 				            checkbox:true,
					    	      	 				            path:itempath,
					    	      	 				            callback:"destination",
					    	      	 				            children: []
					    	      	 				        };
					    	      		    		  var obj2 = {
					    	      	 			                id: i+'sub',
					    	      	 			                name: 'file.xml',
					    	      	 			                icon:'fa fa-file',
					    	      	 			                callback:"node",
					    	      	 			                children: [],
					    	      	 			                selected: false
					    	      	 			            };
					    	      	 			      obj.children.push(obj2);
					    	      			          item.children.push(obj);
			    		   								 
			    		   							}
			    		   							  else
			    		   								  {
			    		   								  var obj = {
						    	      	 				            id: destinationId+'_'+i,
						    	      	 				            name: value1.value,
						    	      	 				            icon:'fa fa-folder',
						    	      	 				            selected: false,
						    	      	 				            isExpanded:false,
						    	      	 				            checkbox:true,
						    	      	 				            path:itempath,
						    	      	 				            callback:"destination",
						    	      	 				            children: []
						    	      	 				        };
						    	      		    		  var obj2 = {
						    	      	 			                id: i+'sub',
						    	      	 			                name: 'file.xml',
						    	      	 			                icon:'fa fa-file',
						    	      	 			                callback:"node",
						    	      	 			                children: [],
						    	      	 			                selected: false
						    	      	 			            };
						    	      	 			      obj.children.push(obj2);
						    	      			          item.children.push(obj);
			    		        				   
			    		        				 
			    	      			          
			    		        			   }
			    		        			   
			    	      			       
			    		        		   }
		    		        		   
		    		        	 }
  			        	  }
  			        	  
  			        	  }
  			        	  else
  			        		 { 
   			        		  if(value1.id == checkId    &&   value[checkId-1].value ==  checkvalue )
	    		        		  {
	    		        		   if(typeof value1.files == 'undefined')
		    		        		   {
		      		        			   var found = item.children.some(function (el) {
		   		        				    return el.name === value1.value;
		   		        				  });
		    		        			   
		    		        			   if (!found) { 
		    		        				   if( $scope.selectedDestinationItem != null  && $scope.selectedDestinationItem.path == itempath && $scope.selectedDestinationItem.name == value1.value &&  $scope.selectedDestinationItem.selected == true) 
		    		   							{
		    		        					   var obj = {
				    	      	 				            id: destinationId+'_'+i,
				    	      	 				            name: value1.value,
				    	      	 				            icon:'fa fa-folder',
				    	      	 				            selected: true,
				    	      	 				            isExpanded:false,
				    	      	 				            checkbox:true,
				    	      	 				            path:itempath,
				    	      	 				            callback:"destination",
				    	      	 				            children: []
				    	      	 				        };
				    	      		    		  var obj2 = {
				    	      	 			                id: i+'sub',
				    	      	 			                name: 'file.xml',
				    	      	 			                icon:'fa fa-file',
				    	      	 			                callback:"node",
				    	      	 			                children: [],
				    	      	 			                selected: false
				    	      	 			            };
				    	      	 			      obj.children.push(obj2);
				    	      			          item.children.push(obj);
		    		   							}
		    		        				   else
		    		        					{
		    		        					   var obj = {
				    	      	 				            id: destinationId+'_'+i,
				    	      	 				            name: value1.value,
				    	      	 				            icon:'fa fa-folder',
				    	      	 				            selected: false,
				    	      	 				            isExpanded:false,
				    	      	 				            checkbox:true,
				    	      	 				            path:itempath,
				    	      	 				            callback:"destination",
				    	      	 				            children: []
				    	      	 				        };
				    	      		    		  var obj2 = {
				    	      	 			                id: i+'sub',
				    	      	 			                name: 'file.xml',
				    	      	 			                icon:'fa fa-file',
				    	      	 			                callback:"node",
				    	      	 			                children: [],
				    	      	 			                selected: false
				    	      	 			            };
				    	      	 			      obj.children.push(obj2);
				    	      			          item.children.push(obj); 
		    		        					}
		    		        				   
		    		        				   
		    		        				   
		    	      			          
		    		        			   }
		    		        		   }
	    		        		   
  			        		  
   			        		 }
  			         }
  		          });

  			      });
       			   
       			  item.isExpanded = !item.isExpanded;
       		
         		}
        		else
        		{
        			item.isExpanded=false;
        		}
        		
     	     	 
          	},function (errorMessage) {
      	       		item.isExpanded = false;
     	 		});
    		}
    	
     		
     		 
    		/*var destinationId=item.id.split('_')[0];
         	var itempath=item.path+item.name;
         	$scope.GetAllDestinationJson['bucketName']=itempath;
         	console.log($scope.GetAllDestinationJson['bucketName']);
         	Bucket.getBucketContian($scope.GetAllDestinationJson).then(function (data) {
         		//console.log( data);
         		item.children=[];
         		var i=0;
         		angular.forEach(data, function(value, key){
    		    	  if((value.key).slice(-1) =="/")
    		    		  {
    		    		  if( $scope.selectedDestinationItem != null  && $scope.selectedDestinationItem.path == itempath+'/' && $scope.selectedDestinationItem.name == value.key &&  $scope.selectedDestinationItem.selected == true) 
							{
    		    			  
    		    			  var obj = {
							 
    	 				            id: destinationId+'_'+i,
    	 				            name: value.key,
    	 				            icon:'fa fa-folder',
    	 				            selected: true,
    	 				            isExpanded:false,
    	 				            checkbox:true,
    	 				            path:itempath+'/',
    	 				            callback:"server2",
    	 				            children: []
    	 				        };
    		    		  var obj2 = {
    	 			                id: i+'sub',
    	 			                name: 'file.xml',
    	 			                icon:'fa fa-file',
    	 			                callback:"server2",
    	 			                children: [],
    	 			                selected: false
    	 			            };
    	 			      obj.children.push(obj2);
    			          item.children.push(obj);
							}
    		    		  else
    		    			 {
    		    			  
    		    			  var obj = {
    									 
      	 				            id: destinationId+'_'+i,
      	 				            name: value.key,
      	 				            icon:'fa fa-folder',
      	 				            selected: false,
      	 				            isExpanded:false,
      	 				            checkbox:true,
      	 				            path:itempath+'/',
      	 				            callback:"server2",
      	 				            children: []
      	 				        };
      		    		  var obj2 = {
      	 			                id: i+'sub',
      	 			                name: 'file.xml',
      	 			                icon:'fa fa-file',
      	 			                callback:"server2",
      	 			                children: [],
      	 			                selected: false
      	 			            };
      	 			      obj.children.push(obj2);
      			          item.children.push(obj);
      			          
      			          
    		    			 }
    			          
    		    		  }
     		    	  i++;
      		      });
         		item.isExpanded = !item.isExpanded;
         		//alert(angular.toJson(data,true));
     	     	},function (errorMessage) {
      	       		item.isExpanded = !item.isExpanded;
     	 		});*/
    	}
    	
    	/*var destinationId=item.id.split('_')[0];
     	var itempath=item.path+item.name;
     	$scope.GetAllBucketJson['bucketName']=item.name;
        
     	Bucket.getBucketContian($scope.GetAllBucketJson).then(function (data) {
     		//alert(angular.toJson(data,true));
     		item.children=[];
     		angular.forEach(data, function(value, key1){
		    	  if((value.key).slice(-1) =="/")
		    		  {
		    		  var obj = {
	 				            id: s3Id+'_'+i,
	 				            name: value.key,
	 				            icon:'fa fa-folder',
	 				            selected: false,
	 				            isExpanded:false,
	 				            checkbox:true,
	 				            path:itempath+'/',
	 				            callback:"s3",
	 				            children: []
	 				        };
		    		  var obj2 = {
	 			                id: i+'sub',
	 			                name: 'file.xml',
	 			                icon:'fa fa-file',
	 			                callback:"s3",
	 			                children: [],
	 			                selected: false
	 			            };
	 			      obj.children.push(obj2);
			          item.children.push(obj);
		    		  }
  		      });
     		item.isExpanded = !item.isExpanded;
     		//alert(angular.toJson(data,true));
 	     	},function (errorMessage) {
  	       		item.isExpanded = !item.isExpanded;
 	 		});*/
     	
    	//console.log(item);
    }
   
    
    
    //Onchange on select source 
    $(document).on('change', 'select[name="source"]', function(){
  	  		
    	/*$scope.Realtime_predictJson='{"value": "10.1,2,3,4,7",  "s3train":{"accesskey":"AKIAJ6CSCKGR37I5LMJA","secretKey":"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","bucketName":"vikash2017","key":"Train_1499957884604.zip"}}';
        $scope.Realtime_predictJson=JSON.parse( $scope.Realtime_predictJson)
        
      	ML.Realtime_predictJson($scope.Realtime_predictJson).then(function (data) {
      		
      	},function (errorMessage) { 
          	 //$state.go('dashboard', {},{reload: true});
        });*/
        
        /*
    		$('#sourcediv').removeClass('col-md-12').addClass('col-md-6');
    		$('#destinationdiv').removeClass('col-md-12').addClass('col-md-6');
    		$('#sourceresult').show();
    		$('#destinationresult').show();*/
		  
		    $scope.selectedSourceItem=null;
    		$scope.dataSourceObject=[];
    		$scope.MLJobTypeSource=0;
    		$scope.twittersource=0;
    		$('#SourceProgress').hide();
    		$('#SourceEmpty').hide();
    	    var dataObject = [];
    	    var i=0;
    	    
     		if(   $(this).val() !="Select" ) 
			//{     
     		
     		{
     		    $('#SourceProgress').hide();
    		    $('#SourceEmpty').hide();
     			$('#sourceresult').hide();
     			$('#destinationresult').removeClass('col-md-6').addClass('col-md-12');
     		}
     		
     		$('#SourceProgress').show();
    		var sourceArray=($(this).val() ).split('_');
   	  	    $scope.SourceServerType=parseInt(sourceArray[1]);
   	  	    $scope.SourceId=parseInt(sourceArray[0]);
   	  	    
   	  	    //filter from all ServerCredentials_data by select ones
  	  	    var filtered=$filter('filter')($rootScope.buildjson_ServerCredentials_data, {id: $scope.SourceId },true);
   	  	    // ServerType for ftp  Source
   	  	    if($scope.SourceServerType == 1)
  	  	    	{
     			$scope.GetAllSourceJson='{"ftphostName": "'+filtered[0].hosturl+'","ftpPort":"'+filtered[0].port+'","ftpUsername":"'+filtered[0].username+'","ftppassword":"'+filtered[0].password+'"}'; 
				$scope.GetAllSourceJson=JSON.parse( $scope.GetAllSourceJson); 
  				ListBucket.GetAllServeFile($scope.GetAllSourceJson).then(function (data) {
   					$('#SourceProgress').hide();
  					if(data.ftpconnect  )
 	 				{
  	 				angular.forEach(data.allContents, function(value, key) {
          	 				if(key == 'folderList')
         	 				{
	         	 				var j=0;
	         	 				angular.forEach(value, function(value1, key1) {
	         	 					j++;
	         	 					if(j >2 ) {
	         	 						var obj = {
		         	 				            id: $scope.SourceId+'_'+i,
		         	 				            name: value1,
		         	 				            icon:'fa fa-folder',
		         	 				            selected: false,
		         	 				            isExpanded:false,
		         	 				            callback:"source",
		         	 				            path:"/",
		         	 				            checkbox:false,
		         	 				            children: []
		         	 				        };
	         	 					    var obj2 = {
	         	 			                id: i+'sub',
	         	 			                name: ' file.xml',
	         	 			                icon:'fa fa-file',
 	         	 			                children: [],
	         	 			                checkbox:false,
 	         	 			            };
	         	 			            obj.children.push(obj2);
		         	 					dataObject.push(obj);
		         	 					i++;
	         	 						 
	         	 					}
	         	 				
	         	 				});

         	 				}
         	 				if( key == 'fileList')
         	 				{
         	 					
         	 					angular.forEach(value, function(value1, key1) {

         	 						var obj = {
		         	 		                id: $scope.SourceId+'_'+i,
		         	 		                name: value1,
		         	 		                icon:'fa fa-file',
		         	 		                selected: false,
		         	 		                isExpanded:false,
		         	 		                callback:"source",
		         	 		                checkbox:true,
		         	 		                path:"/",
		         	 		                children: []
		         	 		            };
         	 						  
		         	 			          i++;
		         	 				dataObject.push(obj);
		         	 				 
	         	 				});
         	 					
         	 				}

 	 				});
 	 				$scope.dataSourceObject = angular.copy(dataObject); 
 	 				 
 	 				}
 	 			else
 	 			{
  	 				  
 	 				 $scope.sourceerror(data.status);
 	 			}
 	 			
	 		},function (errorMessage) {
	 			$scope.sourceerror("Wrong credentials");
	 		});

		 
  	  	    	
  	  	    	}
   	  	    
   	  	    // ServerType for SQL  Source
  	  	    else if ($scope.SourceServerType == 2)
  	  	    	{
 		  	  	    
 		  	  	    $scope.GetAllSourceJson='{"classname": "'+ filtered[0].className+'","dburl":"'+filtered[0].hosturl+'","dbport":"'+ filtered[0].port+'","dbusername":"'+ filtered[0].username+'","dbpassword":"'+ filtered[0].password+'","dbname":"'+ filtered[0].databaseName+'","databaseType":"'+filtered[0].databaseType+'"}'; 
 		  	  	    
					$scope.GetAllSourceJson=JSON.parse( $scope.GetAllSourceJson); 
 					RDBMS.AllTables($scope.GetAllSourceJson).then(function (data) {
						if(data.status)
						{
 							$('#SourceProgress').hide();
		  	  	    	    angular.forEach(data.tables, function(value, key) {
				  	  	    	    var obj = {
								            id: $scope.SourceId+'_'+i,
								            name: value,
								            icon:'fa fa-table',
								            selected: false,
								            isExpanded:false,
								            callback:"node",
								            path:"/",
								            checkbox:true,
								            children: []
								        };
								    var obj2 = {
						                id: i+'sub',
						                name: ' file.xml',
						                icon:'fa fa-file',
						                callback:"node",
						                children: [],
						                checkbox:false,
						                selected: false
						            };
						            obj.children.push(obj2);
									dataObject.push(obj);
									i++;
								  
			  	  	    	    });
		  	  	    	 $scope.dataSourceObject = angular.copy(dataObject);  
 							 
						}
						else
						{
							$scope.sourceerror(data.Comment);
						}
						 
					},function (errorMessage) {
						$scope.sourceerror("Wrong credentials");
			 		});

					 
						 
  	  	    	  	
  	  	    	}
			
   	  	 // ServerType for S3  Source 
  	  	   else if ($scope.SourceServerType == 3)
 	    	{
   	  		
   	    		$scope.GetAllSourceJson='{"accesskey": "'+filtered[0].accessKey+'", "secretKey": "'+filtered[0].secretKey+'" }';
	  	        $scope.GetAllSourceJson=JSON.parse( $scope.GetAllSourceJson)
	  	           
	  	           		ListBucket.GetAllBucket($scope.GetAllSourceJson).then(function (data) {
	  	           		 $('#SourceProgress').hide();
  	  	           		 if(data.status == 1)
	  	            	 {
  	  	           		 angular.forEach(data.buckets, function(value, key) {
	     
				         	 						var obj = {
					         	 				            id: $scope.SourceId+'_'+i,
					         	 				            name: value.name,
					         	 				            icon:'fa fa-bitbucket',
					         	 				            selected: false,
					         	 				            isExpanded:false,
					         	 				            checkbox:false,
					         	 				            path:"",
					         	 				            callback:"source",
					         	 				            children: []
					         	 				        };
				         	 					    var obj2 = {
				         	 			                id: i+'sub',
				         	 			                name: ' file.xml',
				         	 			                icon:'fa fa-file',
				         	 			                children: [],
				         	 			                checkbox:false,
 				         	 			                selected: false
				         	 			            };
				         	 			            obj.children.push(obj2);
					         	 					dataObject.push(obj);
					         	 					i++;
	       	 				});					 
	       	 			
	       	 			$scope.dataSourceObject = angular.copy(dataObject); 
	  	            	 }
	  	           		 else
	  	           		 {  
	  	           			 $scope.sourceerror(data.comment);
 	  	           		 }
	  	            	},function (errorMessage) {
	  	            		$scope.sourceerror("Wrong credentials");
		  		 		});
        
 	    	
 	    	 }
  	  	   else if($scope.SourceServerType == 4)
  	  		   {
  	  		$scope.twittersource=1;
 			$scope.GetAllSourceJson='{"consumerKey": "'+filtered[0].consumerKey+'", "consumersecret": "'+filtered[0].consumersecret+'" ,"accessToken" : "'+filtered[0].appkey+'","accessTokenSecret" : "'+filtered[0].appsecret+'" }';
 			$scope.GetAllSourceJson=JSON.parse( $scope.GetAllSourceJson)
  	  	    $('#SourceProgress').hide();
		    $('#SourceEmpty').hide();
 			$('#sourceresult').hide();
 			$('#destinationresult').removeClass('col-md-6').addClass('col-md-12');
			
  	  	    $scope.$apply();
  	  		   }
  	  	    
			//}
    		/*else
    		{
    			$scope.rdbmsServerType=0;
    			$scope.dataSourceObject = [];
    			$scope.$apply();
    			$('#SourceProgress').hide();
    			$('#SourceEmpty').hide();
    		}*/
  	  	     
  	});
    //Source Error showing
    $scope.sourceerror = function(messages)
    {
    	     $('#SourceProgress').hide();
			 $('#SourceEmpty').html('<strong> Info! </strong>'+messages);
			 $('#SourceEmpty').show();
    }
    
    
    
    
    //Onchange on select destination
    $(document).on('change', 'select[name="destination"]', function(){
     	 
    /*	 
    	$('#sourcediv').removeClass('col-md-12').addClass('col-md-6');
		$('#destinationdiv').removeClass('col-md-12').addClass('col-md-6');
		$('#sourceresult').show();
		$('#destinationresult').show();*/
  		  
		$scope.selectedDestinationItem=null;
    	$scope.dataDestinationObject=[];
		$('#DestinationProgress').hide();
		$('#DestinationEmpty').hide();
		var dataObject = [];
		var i=0;
		
		$scope.rdbmsServerType=0;
		$scope.newTableName=0;
		$scope.formData.createNewTable =  '0';
		$scope.formData.overWriteTableData =  '0';
		$scope.formData.newTableName =  '';
 	    		 
		
		if(   $(this).val() !="Select" ) 
		{     
		
		$('#DestinationProgress').show();
		var destinationArray=($(this).val() ).split('_');
 	    $scope.DestinationId = parseInt(destinationArray[0]);
   	    $scope.DestinationServerType=parseInt(destinationArray[1]);
  	    
  	    //filter from all ServerCredentials_data by select ones
  	    var filtered=$filter('filter')($rootScope.buildjson_ServerCredentials_data, {id:$scope.DestinationId },true);
  	    
  	    // ServerType for ftp  Destination
  	    if($scope.DestinationServerType == 1)
  	    	{
  
 			$scope.GetAllDestinationJson='{"ftphostName": "'+filtered[0].hosturl+'","ftpPort":"'+filtered[0].port+'","ftpUsername":"'+filtered[0].username+'","ftppassword":"'+filtered[0].password+'"}'; 
			$scope.GetAllDestinationJson=JSON.parse( $scope.GetAllDestinationJson); 
			   
				ListBucket.GetAllServeFile($scope.GetAllDestinationJson).then(function (data) {
 					$('#DestinationProgress').hide();
					if(data.ftpconnect  )
	 				{
 	 				angular.forEach(data.allContents, function(value, key) {
      	 				if(key == 'folderList')
     	 				{
         	 				var j=0;
         	 				angular.forEach(value, function(value1, key1) {
         	 					j++;
         	 					if(j >2 ) {
         	 						var obj = {
	         	 				            id: $scope.DestinationId+'_'+i,
	         	 				            name: value1,
	         	 				            icon:'fa fa-folder',
	         	 				            selected: false,
	         	 				            isExpanded:false,
	         	 				            callback:"destination",
	         	 				            path:"/",
	         	 				            checkbox:true,
	         	 				            children: []
	         	 				        };
         	 					    var obj2 = {
         	 			                id: i+'sub',
         	 			                name: ' file.xml',
         	 			                icon:'fa fa-file',
         	 			                callback:"destination",
         	 			                children: [],
         	 			                checkbox:false,
         	 			                selected: false
         	 			            };
         	 			            obj.children.push(obj2);
	         	 					dataObject.push(obj);
	         	 					i++;
         	 						 
         	 					}
         	 				
         	 				});

     	 				}
 
	 				});
	 				$scope.dataDestinationObject = angular.copy(dataObject); 
	 				}
	 			else
	 			{
	 				 $scope.destinationerror(data.Comment);
 	 			}
	 			
 		},function (errorMessage) {
 			     $scope.destinationerror("Wrong credentials");
 		});

			 
	  	    	}
  	    
  	    // ServerType for SQL  Destination
	  	    else if ($scope.DestinationServerType == 2)
	  	    	{
	  	    	 
	  	    	    if(filtered[0].databaseType == 'Mysql')
		  	  	    {
		  	  	    	$scope.MLJobTypeSource=0;
		  	  	    }
		  	  	    else
		  	  	    {
		  	  	    	$scope.MLJobTypeSource=1;
		  	  	    }
	  	    	    $scope.GetAllDestinationJson='{"classname": "'+ filtered[0].className+'","dburl":"'+filtered[0].hosturl+'","dbport":"'+ filtered[0].port+'","dbusername":"'+ filtered[0].username+'","dbpassword":"'+ filtered[0].password+'","dbname":"'+ filtered[0].databaseName+'","databaseType":"'+filtered[0].databaseType+'"}'; 
					$scope.GetAllDestinationJson=JSON.parse( $scope.GetAllDestinationJson); 
 					RDBMS.AllTables($scope.GetAllDestinationJson).then(function (data) {
 						$scope.rdbmsServerType=1;if(data.status)
						{
 							$('#DestinationProgress').hide();
		  	  	    	    angular.forEach(data.tables, function(value, key) {
				  	  	    	    var obj = {
								            id: $scope.DestinationId+'_'+i,
								            name: value,
								            icon:'fa fa-table',
								            selected: false,
								            isExpanded:false,
								            callback:"node",
								            path:"/",
								            checkbox:true,
								            children: []
								        };
								    var obj2 = {
						                id: i+'sub',
						                name: ' file.xml',
						                icon:'fa fa-file',
						                callback:"node",
						                children: [],
						                 checkbox:false,
						                selected: false
						            };
						            obj.children.push(obj2);
									dataObject.push(obj);
									i++;
								  
			  	  	    	    });
		  	  	    	 
		  	  	    	
 						$scope.dataDestinationObject = angular.copy(dataObject);  
						}
						else
						{
							$scope.destinationerror(data.status);
						}
						 
					},function (errorMessage) {
						 $scope.destinationerror("Wrong credentials");
			 		});
					
 	  	    	}
  	// ServerType for S3  Destination  
	  	   else if ($scope.DestinationServerType == 3)
	    	{
	  		
	  		    $scope.accessKey=filtered[0].accessKey;
    		$scope.secretKey=filtered[0].secretKey;	
    		// $scope.dataSourceObject=[];
     		$scope.GetAllDestinationJson='{"accesskey": "'+$scope.accessKey+'", "secretKey": "'+$scope.secretKey+'" }';
  	        $scope.GetAllDestinationJson=JSON.parse( $scope.GetAllDestinationJson)
  	           
  	           		ListBucket.GetAllBucket($scope.GetAllDestinationJson).then(function (data) {
  	           		$('#DestinationProgress').hide();
  	           		if(data.status == 1)
  	           		{	
  	           		angular.forEach(data.buckets, function(value, key) {
 			         	 						var obj = {
				         	 				            id: $scope.DestinationId+'_'+i,
				         	 				            name: value.name,
				         	 				            icon:'fa fa-bitbucket',
				         	 				            selected: false,
				         	 				            isExpanded:false,
				         	 				            checkbox:true,
				         	 				            path:"",
				         	 				            callback:"destination",
				         	 				            children: []
				         	 				        };
			         	 					    var obj2 = {
			         	 			                id: i+'sub',
			         	 			                name: ' file.xml',
			         	 			                icon:'fa fa-file',
			         	 			                children: [],
			         	 			                callback:"destination",
			         	 			                checkbox:false,
			         	 			                selected: false
			         	 			            };
			         	 			            obj.children.push(obj2);
				         	 					dataObject.push(obj);
				         	 					i++;
       	 				});	
  	           		$scope.dataDestinationObject = angular.copy(dataObject); 
  	           		}
  	           		else
  	           		{
  	           		$scope.destinationerror(data.comment);	
  	           		}
       	 			
 	  	           	},function (errorMessage) {
 	  	           	 $scope.destinationerror("Wrong credentials");
	  		 		});  	    	
	    	 }
	
	  	    
		}
		else
		{
			 
			$scope.rdbmsServerType=0;
			$scope.dataDestinationObject = [];
			$scope.$apply();
			$('#DestinationProgress').hide();
			$('#DestinationEmpty').hide();
		}
	});
         
    //Destination Error showing
    $scope.destinationerror = function(messages)
    {
    	     $('#DestinationProgress').hide();
			 $('#DestinationEmpty').html('<strong> Info! </strong>'+messages);
			 $('#DestinationEmpty').show();
    }
    
    $scope.kafkamodal = function()
    {
    	$('#twitterstatus').html('');
    	$('#static').modal('show');
    }
    
    
 
    $rootScope.settings.layout.pageContentWhite = true;
    $rootScope.settings.layout.pageBodySolid = false;
    $rootScope.settings.layout.pageSidebarClosed = false;
});
}]);

//{"destination":{"createnewtable":true,"dbport":3306,"classname":"com.mysql.jdbc.Driver","dbname":"cloudhitiMain","dbpassword":"cloudhitiadmin2017","tableoverride":false,"dbusername":"cloudhitiadmin","tablename":"newclient_data","dburl":"107.180.2.11"},"source":{"dbport":3306,"dbname":"cloudhitiMain","dbpassword":"cloudhitiadmin2017","dbusername":"cloudhitiadmin","tablename":"clientMain","fields":"Age,Income","dburl":"107.180.2.11"}}