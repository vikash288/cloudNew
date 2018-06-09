/* Setup bucket page controller */
angular.module('WebApp').controller('MLController' , ['$state', '$stateParams', '$rootScope', '$scope','$filter', 'settings','ListBucket','Bucket','ListAWSCredential','ListServerCredential','ListJob','RDBMS','Report', function( $state, $stateParams ,$rootScope, $scope,$filter,settings,ListBucket,Bucket,ListAWSCredential,ListServerCredential,ListJob,RDBMS,Report ) {
	
	$scope.$on('$viewContentLoaded', function() {   
        // initialize core components
    App.initAjax();
    
    $scope.userId=1;
    $scope.sourcetable=0;
    $scope.attrvalue=0;
    $scope.formData={};
    $scope.formData.charttype=1;
    $scope.JobFilter_data;
    $('.bs-select').selectpicker({
        iconBase: 'fa',
        tickIcon: 'fa-check'
    });
    
    $scope.getjobs = function()
	{ 
     	ListJob.searchJobDependents($scope.userId).then(function (data) {
     	                $scope.Job_data=data.jobs;
     	                 
     	                $('select[name="jobml"]').html('');
     	  			    $('select[name="jobml"]').html('<option data-icon="icon-info" value="Select">Select ML Job</option>');
     	  			    
     	  			    var filtered=$filter('filter')($scope.Job_data, { jobType: 3},true);
     	  			    $scope.JobFilter_data=filtered;
     	  			     console.log($scope.JobFilter_data);
     	  			    $.each( filtered, function (index, valueobj) {
	     	              	 $('select[name="jobml"]').append('<option data-icon="icon-info" value="'+valueobj.id+'">'+valueobj.jobName+'</option>').selectpicker('refresh');
	     	            });
	     	              
    	            },function (errorMessage) {
    	            	 $state.go('dashboard', {},{reload: true});
     	            }); 
    	  
	}
    $scope.getjobs();
     
    $scope.getserverCredentials = function()
	{  
		ListServerCredential.searchServerCredentials($scope.userId).then(function (data) {
             $rootScope.buildjson_ServerCredentials_data=data.serverCredential;
              
          },function (errorMessage) { 
        	 $state.go('dashboard', {},{reload: true});
        });
 	}
	$scope.getserverCredentials();

    //Onchange on select job 
    $(document).on('change', 'select[name="jobml"]', function(){
    	if(   $(this).val() !="Select" ) 
		{   
    		var jobId=$(this).val();
    		 console.log( jobId);
    		 
    		 var filtered=$filter('filter')($scope.JobFilter_data, { id:parseInt(jobId)},true);
    	    console.log( filtered);
    		var filtered2=$filter('filter')($scope.buildjson_ServerCredentials_data, { id: parseInt(filtered[0].targetId)},true);
    		 //console.log( filtered2);
    		 $scope.MLReportJson='{ "classname": "'+filtered2[0].className+'","dburl": "'+filtered2[0].hosturl+'", "dbport": "'+filtered2[0].port+'", "dbusername": "'+filtered2[0].username+'","dbpassword": "'+filtered2[0].password+'", "dbname": "'+filtered2[0].databaseName+'","tablename": "'+filtered[0].destinationrdbmstableName+'" }';
    	     $scope.MLReportJson=JSON.parse( $scope.MLReportJson); 	 	
    	     //console.log( $scope.MLReportJson);
    	     Report.MLReport($scope.MLReportJson).then(function (data) {
    	    	// console.log(data);
    	    	 if(data.final_status)
    	    	{
    	    		  $scope.chart1s(data);
    	    	}
    			},function (errorMessage) {
    	    	});  
 		}
    	else
    	{
    		$('#chart_div').html('');
    	}
    		
    	
    });
    
    $scope.chart1s= function(data)
    {
    	var dataAll =  data.allcol;
    	var selectedlength=data.colnames.length;
 		 
        var length=   dataAll.length;
        var Alldata=[]
        var Cluster=0;
        var localpush=[];
        
        
		 
        $(dataAll).each(function(index, val){
          	localCluster= parseInt(val[selectedlength-1]);
            if(Cluster ==  localCluster)
            {
            	 
              localpush.push([parseFloat(val[0]),parseFloat(val[1])])
            }
            else
           {
              
             Alldata.push({
                 name: 'Cluster '+ Cluster,
                 data: localpush,
             });
              localpush=[];
             Cluster=parseInt(val[selectedlength-1]);
             localpush.push([parseFloat(val[0]),parseFloat(val[1])])
            }
            	
            if(index == length-1)
            {
               Alldata.push({
                   name: 'Cluster '+ Cluster,
                   data: localpush,
               });
                console.log(Alldata);
               //format_sets(Alldata)
               scatterCharts(Alldata)
            }  
        }); 
        
    }
    
    $scope.charts= function(data)
    {
    	var dataAll =  data.allcol;
    	var selectedlength=data.colnames.length;
 		 
 		 
        var length=   dataAll.length;
        var Alldata=[]
        var Cluster=1;
        var localpush=[];
        
        
		 
        $(dataAll).each(function(index, val){
              
            //localCluster= parseInt(val[2]);
        	localCluster= parseInt(val[selectedlength-1]);
            if(Cluster ==  localCluster)
            {
            	var localtemp=[];
            	for( var i=0; i< selectedlength - 1 ;i++)
       		     {
             		//localpush.push([parseFloat(val[0]),parseFloat(val[1])])
          		  localtemp.push(parseFloat(val[i]))
       		     }
             	 localpush.push(localtemp);
             }
            else
           {
              
             Alldata.push(localpush);
             localpush=[];
             //Cluster=parseInt(val[2]);
             Cluster=parseInt(val[selectedlength-1]);
             var localtemp=[];
         	 for( var i=0; i< selectedlength - 1 ;i++)
    		     {
        		  localtemp.push(parseFloat(val[i]))
    		     }
          	 localpush.push(localtemp);
             //localpush.push([parseFloat(val[0]),parseFloat(val[1])])
            }
            	
            if(index == length-1)
            {
               Alldata.push(localpush);
              // console.log(Alldata);
               var sets_count = Alldata.length;
                
                Alldata.forEach(function(set, i) {
                 set.forEach(function(row, j) {
                   var new_row = new Array(sets_count + 1);
                   new_row[0] = row[0];
                   new_row[1 + i] = row[1];

                   set[j] = new_row;
                 });
               });   
                
               
               //format_sets(Alldata)
                drawChart(Alldata)
            }  
        }); 
        
    }
    $rootScope.settings.layout.pageContentWhite = true;
    $rootScope.settings.layout.pageBodySolid = false;
    $rootScope.settings.layout.pageSidebarClosed = false;
    
    
});
}]);