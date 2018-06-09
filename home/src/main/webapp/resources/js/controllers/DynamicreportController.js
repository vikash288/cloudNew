/* Setup bucket page controller */
angular.module('WebApp').controller('DynamicreportController' , ['$state', '$stateParams', '$rootScope', '$scope','$filter', 'settings','ListBucket','Bucket','ListAWSCredential','ListServerCredential','ListJob','RDBMS','Report', function( $state, $stateParams ,$rootScope, $scope,$filter,settings,ListBucket,Bucket,ListAWSCredential,ListServerCredential,ListJob,RDBMS,Report ) {
	
	$scope.$on('$viewContentLoaded', function() {   
        // initialize core components
    App.initAjax();
    
    $scope.userId=1;
    $scope.sourcetable=0;
    $scope.attrvalue=0;
    $scope.formData={};
    $scope.formData.charttype='';
    $scope.SourceId;
    $('.bs-select').selectpicker({
        iconBase: 'fa',
        tickIcon: 'fa-check'
    });
    $scope.getjobs = function()
	{ 
     	ListJob.searchJobDependents($scope.userId).then(function (data) {
     	                $scope.Job_data=data.jobs;
     	                //console.log($scope.Job_data);
     	                $('select[name="jobml"]').html('');
     	  			    $('select[name="jobml"]').html('<option data-icon="icon-info" value="Select">Select ML Job</option>');
     	  			    
     	  			    var filtered=$filter('filter')($scope.Job_data, { jobType: 3},true);
     	  			    
	     	  			
     	  			    $.each( filtered, function (index, valueobj) {
	     	              	 $('select[name="jobml"]').append('<option data-icon="icon-info" value="'+valueobj.id+'">'+valueobj.jobName+'</option>').selectpicker('refresh');
	     	            });
	     	              
    	            },function (errorMessage) { 
     	            }); 
    	  
	}
    
    $scope.getserverCredentials = function()
	{  
		ListServerCredential.searchServerCredentials($scope.userId).then(function (data) {
             $rootScope.buildjson_ServerCredentials_data=data.serverCredential;
              $.each($rootScope.buildjson_ServerCredentials_data, function (index, valueobj) {
            	  if(valueobj.servertypeid == 2)
            	  {
            		  $('select[name="sourcerdbms"]').append('<option data-icon="icon-info" value="'+valueobj.id+'_'+valueobj.servertypeid+'">'+valueobj.serverName+'</option>').selectpicker('refresh');
            	  }
            	
            });
            
          },function (errorMessage) { 
        	 $state.go('dashboard', {},{reload: true});
        });
 	}
	$scope.getserverCredentials();
    
    //$scope.getjobs();
    
	 //Onchange on select rdbms source 
    $(document).on('change', 'select[name="sourcerdbms"]', function(){
    	 $scope.formData.charttype='';
    	 $('select[name="sourcetable"]').html('<option data-icon="icon-info" value="">Select Source Table</option>').selectpicker('refresh');
    	
    	if(   $(this).val() !="" ) 
		{   
     		var sourceArray=($(this).val() ).split('_');
   	  	    $scope.SourceServerType=parseInt(sourceArray[1]);
   	  	    $scope.SourceId=parseInt(sourceArray[0]);
   	  	    
   	  	    //filter from all ServerCredentials_data by select ones
  	  	    var filtered=$filter('filter')($rootScope.buildjson_ServerCredentials_data, {id: $scope.SourceId },true);
  	  	    
  	  	    $scope.GetAllSourceJson='{"classname": "'+ filtered[0].className+'","dburl":"'+filtered[0].hosturl+'","dbport":"'+ filtered[0].port+'","dbusername":"'+ filtered[0].username+'","dbpassword":"'+ filtered[0].password+'","dbname":"'+ filtered[0].databaseName+'"}'; 
				$scope.GetAllSourceJson=JSON.parse( $scope.GetAllSourceJson); 
				RDBMS.AllTables($scope.GetAllSourceJson).then(function (data) {
					$scope.sourcetable=1;
					if(data.status)
					{
						angular.forEach(data.tables, function(value, key) {
							$('select[name="sourcetable"]').append('<option value="'+value+'">'+value+'</option>').selectpicker('refresh');
						});
					}
					else
					{
						$scope.sourcetable=0; 
						swal(
	    						    'Error!',
	    						    'Wrong credentials.',
	    						    'error'
	    						  )
					}
				}
				,function (errorMessage) {
					$scope.sourcetable=0;
					swal(
 						    'Error!',
 						    'Wrong credentials.',
 						    'error'
 						  )
		 		});
 		}
    	else
    	{
    		$scope.sourcetable=0;
    		$scope.$apply();
    	}
    });
    $scope.columns;
    //Onchange on table 
    $(document).on('change', 'select[name="sourcetable"]', function(){
    	 $('#scatter-load').html('');
    	 $('#scatter-loadsvg').html('');
    	 $scope.attrvalue=0;
    	if(   $(this).val() !="" ) 
		{   
    		var tableName=$(this).val();
    		$scope.GetAllSourceJson['tablename']=tableName;
    		RDBMS.AllColumns($scope.GetAllSourceJson).then(function (data) {
        		if(data.status)
        			{
        			$scope.columns=data.columnname;
          			}
        		else
        			{
        			//$scope.attrvalue=0;
        			}
        		
        	},function (errorMessage) { 
        		//$scope.attrvalue=0;//$state.go('dashboard', {},{reload: true});
    	      });
		}
    });
    
    $scope.charttype;  
    $scope.setxy = function(charttype)
    {
    	 $('#scatter-load').html('');
    	 $('#scatter-loadsvg').html('');
    	 $scope.charttype=charttype;  
    	 if(charttype == null)
		    {
		    	return false;
		    }
    	  if(charttype == 1)
    		 {
    		  $('#message').html('The Area Chart is a Time series chart in which user select time on x-axis and integer value in y-axis')
    		 }
    	  if(charttype == 2)
 		 {
 		  $('#message').html('The Bar Chart is a series chart in which user select dependent attribute on x-axis and dependent attribute value in y-axis')
 		 }
    	  if($scope.columns.length > 0  && charttype != "")
		{
    		  
    		  $('select[name="xaxis"]').html('');
    		  $.each($scope.columns, function (index, valueobj) {
				 $('select[name="xaxis"]').append('<option  value="'+valueobj+'">'+valueobj+'</option>').selectpicker('refresh');
              });
    		  $('select[name="yaxis"]').html("");
				$.each($scope.columns, function (index, valueobj) {
					 $('select[name="yaxis"]').append('<option  value="'+valueobj+'">'+valueobj+'</option>').selectpicker('refresh');
	              });
				$scope.attrvalue=1;		
		}
		 
    }
    $scope.drawcharts = function()
    {
    	// "fields": "field_1,field_2"
    	 $('#scatter-load').html('');
    	 $('#scatter-loadsvg').html('');
    	 var yaxis = $('select[name="yaxis"] option:selected');
	         var selected =[];
         $(yaxis).each(function(index, brand){
            selected.push([$(this).val()]);
         });
         
         selected.push([$('select[name="xaxis"] option:selected').val()]) ;
         var selectedValue = selected.join();
         
         var dataObject=[];
      
        $scope.GetAllSourceJson['fields']=selectedValue;
        Report.MysqlReport($scope.GetAllSourceJson).then(function (data) {
    		if(data.final_status)
    			{
    			 if($scope.charttype == 1)
        		 {
    				 var selectedlength=data.colnames.length;
    				 $scope['xaxis']=[];
    				 for( var i=0; i< selectedlength - 1 ;i++)
					 {
    					 $scope['list'+i] = [];
						 /*dataObject.push({
     			        	    name: data.colnames[i]
     			        	}); */
					 }
    				 
    				 $.each( data.allcol, function (index, valueobj) {
    					   $scope['xaxis'].push(  valueobj[selectedlength -1] );
    					   $scope['xaxis'].sort(function(a, b) {
    						   return a - b;
    						 })
    					    for( var i=0; i< selectedlength -1 ;i++)
    						 {
    						   $scope['list'+i].push(parseInt(  valueobj[i] ));
    						   $scope['list'+i].sort(function(a, b) {
        						   return a - b;
        						 })
     						 }
    					   /*$.each( dataObject, function (index1, valueobj1) {
    						    
    						   $scope['list'+index1].push(parseInt(  valueobj[index1] ));
    						   valueobj1.date= $scope['list'+index1];
         				   });*/ 
    					 
    				 });
    				 
    				 for( var i=0; i< selectedlength -1 ;i++)
					 {
 						     dataObject.push({
 				        	    name: data.colnames[i],
 				        	    data: $scope['list'+i]
 				        	}); 
 						    console.log(dataObject);
					 }
    				 
     				 areaCharts($scope['xaxis'],dataObject);
        		 }
    			 
    			 if($scope.charttype == 2)
        		 {
    				 $.each( data.allcol, function (index, valueobj) {
    					   dataObject.push({
    						   Letter: valueobj[1],
    						   Freq:  parseInt(valueobj[0])
				        	});
    				  });
    				 BarCharts(dataObject)	  
        		 }
    			 
    			 if($scope.charttype == 3)
        		 {
    				 $.each( data.allcol, function (index, valueobj) {
    					   dataObject.push({
    						    "age": valueobj[1],
    						    "population": valueobj[0],
    						       
    						} );
    				  });
    				 pie(dataObject);	  
        		 }
    			 
    			 if($scope.charttype == 4)
        		 {
    				 $.each( data.allcol, function (index, valueobj) {
    					   dataObject.push({
    						    "date": valueobj[1],
    						    "close": parseInt(valueobj[0]),
    						       
    						} );
    				  });
    				 LineCharts(dataObject);	  
        		 }
    			 
    			 
    			}
    	},function (errorMessage) { 
    		//$scope.attrvalue=0;//$state.go('dashboard', {},{reload: true});
	      });
		 
    }
     
     
    $rootScope.settings.layout.pageContentWhite = true;
    $rootScope.settings.layout.pageBodySolid = false;
    $rootScope.settings.layout.pageSidebarClosed = false;
    
    
});
}]);