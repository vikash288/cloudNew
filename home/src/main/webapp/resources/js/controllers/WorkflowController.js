/* Setup bucket page controller */
angular.module('WebApp').controller('WorkflowController' , ['$state', '$stateParams','$rootScope', '$scope', 'settings','$filter','ListJob','Workflow','Schedule','ListWorkFlow', function($state , $stateParams, $rootScope, $scope,settings,$filter,  ListJob,Workflow,Schedule,ListWorkFlow ) {

		$scope.$on('$viewContentLoaded', function() {   
        // initialize core components
        App.initAjax();
        $('.bs-select').selectpicker({
            iconBase: 'fa',
            tickIcon: 'fa-check'
        });
        
        $scope.userId= $rootScope.user_data.userId; 
        $scope.getjobs = function()
    	{ 
         	ListJob.searchJobs($scope.userId).then(function (data) {
         	                $scope.Job_data=data.jobs;
          	            },function (errorMessage) { 
    						   $state.go('dashboard', {},{reload: true});
         	            }); 
        	  
    	}
        $scope.getjobs();
         
        $scope.getschedules = function()
    	{ 

        			Schedule.searchSchedules($scope.userId).then(function (data) {
        				$('select[name="schedule"]').html('');
        				$('select[name="schedule"]').html('<option data-icon="icon-info" value="Select">Select Schedule</option>');
        				$('select[name="schedule"]').append('<option data-icon="icon-info" value="0">Do want Schedule on workflow</option>');
        				
        				$.each(data.schedules, function (index, valueobj) {
        		        	 $('select[name="schedule"]').append('<option data-icon="icon-info" value="'+valueobj.id+'">'+valueobj.scheduleName+'</option>').selectpicker('refresh');
        		           });
        		        
        	            },function (errorMessage) { 
        	            	$state.go('dashboard', {},{reload: true}); 
        	            }); 
        		
    	}
        $scope.getschedules();
        
        $scope.formMain={};
        $scope.formMain.workflowname='';
        $scope.workflowArray=[]; 
        var workflowArray=[];
        var sequenceIdValue;
       
        
       
        
        $scope.JobSelectFunction = function(workflowjson)
        {
        	
        	
        	$scope.nodeDataArray=workflowjson.nodeDataArray;
            $scope.linkDataArray= workflowjson.linkDataArray;
            
            
            var filtered=$filter('filter')($scope.linkDataArray, { "from" : 1},true);
            $scope.workFlowDependentDTO=[];
         	
            angular.forEach(filtered, function( value, key){
             	 var filtered=$filter('filter')($scope.nodeDataArray, { "key" : value.to},true);
        		 $scope.workFlowDependentDTO.push({predecessorId:1,successorId:Math.abs(value.to),jobId:parseInt(filtered[0].jobId),active:1,start:1,end:0});
        		 $scope.arraypush(value.to);
    		 }); 
            
           var filtered=$filter('filter')($scope.workFlowDependentDTO, { "predecessorId" : 1},true);
            angular.forEach(filtered, function( value, key){
            	 sequenceIdValue=1;
            	 value.sequenceId=sequenceIdValue;
            	 $scope.arraypush2(value.successorId);
   		 	}); 
            var schedule= $('select[name="schedule"]').val();
            $scope.saveWorkFlowJson=[{
    			id: null,
    			workflowName:$scope.formMain.workflowname,
    			workjson: null,
    			schedulestatus: 0,
    			scheduleId: parseInt(schedule),
    			parentId: 1,
    			workFlowDependentDTO: $scope.workFlowDependentDTO
    		}];
        	
            
         //$scope.saveWorkFlowJson=[{"id":null,"workflowName":"zxas","workjson":"sasas","schedulestatus":0,"scheduleId":2,"parentId":1,"workFlowDependentDTO":[{"predecessorId":1,"successorId":3,"jobId":108,"active":1,"start":1,"end":1,"sequenceId":1}],}];
     	 
           swal.setDefaults({
       			   confirmButtonColor: "#DD6B55", 
       	 	       confirmButtonText: 'Wait &rarr;',
       	   		   animation: false,
       	 		   showLoaderOnConfirm: true,
       	 		   progressSteps: ['1', '2'],
       	 		   progressStepsDistance:'80px',
       	 		   allowEscapeKey:false,
       	 		   allowOutsideClick:false,
       	 		   onOpen: function(){
       	              swal.clickConfirm();
       	           },
       	 		   preConfirm: function() {
       	   			 return new Promise(function (resolve, reject) {
       	   				var step=swal.getQueueStep();	
       	   				 
       	   				if(step == '0')
       	   				{
       	   				 var workflowjson={"workflowID": 41};
     	   				   resolve()
     	   				 Workflow.WorkflowCheck(workflowjson).then(function(data)
     	   								{
     	   				   		     // console.log(data);
	   						     //   resolve()
     	   							    },function (errorMessage) {
     	   			     })
     	   								
     	   			  /*ListWorkFlow.saveWorkFlow($scope.saveWorkFlowJson).then(function (data) {
       	   				   var workflowjson={"workflowID": 41};
       	   				   resolve()
       	   				   			Workflow.WorkflowCheck(workflowjson).then(function(data)
       	   								{
       	   				   		     // console.log(data);
	   						     //   resolve()
       	   							    },function (errorMessage) {
       	   								})
       	   								
       	        		    //swal("Success!", "Your WorkFlow is added.", "success");
       	  	  		       },function (errorMessage) {
        	  	 		    });*/
       	  	 		 
       	   				}
       	   				 
       	   			    if(step == '1')
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
       			    text: 'Validating WorkFlow' 
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
       			   $state.go('workflow', {},{reload: true});
       			}, function () {
       			  swal.resetDefaults()
       			})
       	 
       		 	
       			
        	
           
        }
        $scope.arraypush = function(key)
        {
        		  
        		  var localfiltered=$filter('filter')($scope.linkDataArray, { "from" : key},true);
       			  if(localfiltered.length ==  1   && localfiltered.length != 0 )
      				  {
             		  if( localfiltered[0].to != "2" ) {  
            			  var filterednodeData=$filter('filter')($scope.nodeDataArray, { "key" : localfiltered[0].to},true);
              			  $scope.workFlowDependentDTO.push({ predecessorId:Math.abs(key),successorId: Math.abs(localfiltered[0].to),jobId:parseInt(filterednodeData[0].jobId),active:1,start:0,end:0});   
            			  $scope.arraypush(localfiltered[0].to,true); 
            		      }
             		 else
        			  {
             			 var localfilteredCheck=$filter('filter')( $scope.workFlowDependentDTO, { "successorId" : Math.abs(localfiltered[0].from)},true);            			  
             			 localfilteredCheck[0].end=1;
        			  }
       				 }
      			   else if(localfiltered.length  > 1 && localfiltered.length != 0)
      				  {
      				 
      				 angular.forEach(localfiltered, function( value, key1){
      					  if( localfiltered[0].to != "2" ) {  
      						 var filterednodeData=$filter('filter')($scope.nodeDataArray, { "key" : value.to},true);  
	           			    $scope.workFlowDependentDTO.push({ predecessorId:Math.abs(key) ,successorId:Math.abs(value.to),jobId:parseInt(filterednodeData[0].jobId),active:1,start:0,end:0});   
	           		        $scope.arraypush(value.to,true); 
      					  }
      					  else
      						  {
      						 var localfilteredCheck=$filter('filter')( $scope.workFlowDependentDTO, { "successorId" : Math.abs(localfiltered[0].from)},true);            			  
                 			 localfilteredCheck[0].end=1;
            			   
      						  }
     				  });
 
      				  }
         		else
        			{} 
        	
        }
        
        $scope.arraypush2 = function(key)
        {
        		  
        		  var localfiltered=$filter('filter')($scope.workFlowDependentDTO, { "predecessorId" : key},true);
    			  var localfiltered2=$filter('filter')($scope.workFlowDependentDTO, { "successorId" : key},true);

    			  if(localfiltered.length ==  1   && localfiltered.length != 0 )
       			  {
       				localfiltered[0].sequenceId= parseInt(localfiltered2[0].sequenceId)+ 1;
       			    $scope.arraypush2(localfiltered[0].successorId);
       			    //$scope.workFlowDependentDTO.push({ PredecessorId:key,SuccessorId: localfiltered[0].to,jobId:parseInt(filterednodeData[0].jobId),active:true});   
       			  }
      			  else if(localfiltered.length  > 1 && localfiltered.length != 0)
      				  {
       				 angular.forEach(localfiltered, function( value, key1){
       					   if(key1 == 0) 
       						   {
       						 value.sequenceId = parseInt(localfiltered2[0].sequenceId)+ 1;
        					   }
       					   else
       						   {
       						value.sequenceId = localfiltered[0].sequenceId;
       						   }
       					  /* if( typeof value.sequenceId == 'undefined') { value.sequenceId = sequenceIdValue++; }  
       					    else {
       					    	value.sequenceId = value.sequenceId;
       					    }*/
  	           		        $scope.arraypush2(value.successorId); 
      				  });
 
      				  }
         		else
        			{} 
        	 
        }
      /*  
          
            //tree = $scope.unflatten(arr);
            //tree = getNestedChildren($scope.linkDataArray, parent)
            
             var arr = [
                       {'id':1 ,'parentid' : 0},
                       {'id':2 ,'parentid' : 1},
                       {'id':3 ,'parentid' : 1},
                       {'id':4 ,'parentid' : 2},
                       {'id':5 ,'parentid' : 3},
                       {'id':6 ,'parentid' : 3},
                       {'id':7 ,'parentid' : 4}
               ];
            var ar=[
                    {id: 1, title: 'hello', parent: 0},
                    {id: 2, title: 'hello', parent: 0},
                    {id: 3, title: 'hello', parent: 1},
                    {id: 4, title: 'hello', parent: 3},
                    {id: 5, title: 'hello', parent: 4},
                    {id: 6, title: 'hello', parent: 4},
                    {id: 7, title: 'hello', parent: 3},
                    {id: 8, title: 'hello', parent: 2}
                ]
        function getNestedChildren(arr, parent) {
            var out = []
            for(var i in arr) {
            	
                if(arr[i].from == from) {
                    var children = getNestedChildren(arr, arr[i].to)

                    if(children.length) {
                        arr[i].children = children
                    }
                    out.push(arr[i])
                }
            }
            return out
        }
        
        $scope.unflatten = function( array, parent, tree ){
        	   
            tree = typeof tree !== 'undefined' ? tree : [];
            parent = typeof parent !== 'undefined' ? parent : { id: 0 };
                
            var children = _.filter( array, function(child){ return child.parentid == parent.id; });
            
            if( !_.isEmpty( children )  ){
                if( parent.id == 0 ){
                   tree = children;   
                }else{
                   parent['children'] = children
                }
                _.each( children, function( child ){  $scope.unflatten( array, child ) } );                    
            }
            
            return tree;
        }

        
       
       "linkDataArray": [ 
{"from":1, "to":3},

{"from":3, "to":4},

{"from":1, "to":5},

{"from":4, "to":6},
{"from":6, "to":2},
{"from":5, "to":7},
{"from":7, "to":2},

{"from":4, "to":-8},
{"from":-8, "to":2}
 ]}
3,4,6,-8
       * 
       *  
       *  
       *  
       *  
       *  $scope.arraypush = function(workflowjson)
        {
        			console.log(workflowjson);
        	       
      			  var filtered=$filter('filter')($scope.linkDataArray, { "from" : key},true);
      			 
      			  if(filtered.length ==  1)
      				  {
      				    
      				   $scope.workflowArray
      				   workflowjson[key][filtered[0].to] =[];
      				   console.log(workflowjson);
      				   //$scope.workflowArray[key][filtered[0].to]= [];
      				   $scope.arraypush(workflowjson[key][filtered[0].to]);
       	
      				  }
        }*/
        	/*ListCredential.saveWorkFlow($scope.saveWorkFlowJson).then(function (data) {
        		console.log(data); 
  				// swal("Success!", "Your job is added.", "success");
  	  		},function (errorMessage) {
  	 			alert(errorMessage);
  	 		});
  	 		
        	
        }
       
        workFlowDependentDTO:[
    			                      { id:null,sequenceId:2,predecessorId:1,successorId:2,active:true},
    			                      { id:null,sequenceId:1,predecessorId:5,successorId:2,active:true}
    			                     ],
  	 		  *
  	 		  */
        	
        	/* $scope.nodeDataArray=workflowjson.nodeDataArray;
           $scope.linkDataArray= workflowjson.linkDataArray;
           */
   		  /* var filtered=$filter('filter')($scope.linkDataArray, { "from" : 1},true);
   		  // console.log(filtered);  
   		   angular.forEach(filtered, function( value, key){
    			 $scope.workflowArray[value.to]= [];
    			 
   		   });*/
   		//console.log( $scope.workflowArray);
	   		/*angular.forEach($scope.workflowArray, function(value, key){
	   				$scope.arraypush( value);
	   			 
	    		});
   			*/
   		/*function l(e) {
            e.selected = !1, e.children.length > 0 && e.children.forEach(function(e) {
                l(e)
            })
        }
    	dataSourceObject.forEach(function(e) {
            l(e)
        })*/
       
   		/*angular.forEach($scope.workflowArray, function(value, key){
			   var filtered=$filter('filter')($scope.linkDataArray, { "from" : key},true);
			 
			  if(filtered.length ==  1)
				  {
				   //console.log(filtered[0].to); 
				   $scope.workflowArray[key][filtered[0].to]= [];
				   //$scope.workflowArray[key][0]=value.to;
				   //$scope.workflowArray[key][filtered[0].to]="test";
				   //console.log($scope.workflowArray); 
				  }
			    
			
	      });*/
   		 
   		 // console.log($scope.workflowArray); 
   		   
        	
      			 /* else
      				 {
      				     angular.forEach(filtered, function(value, key){
      				    	 workflowjson[key][filtered[0].to] =[];
      				     });
      				     
   		
   		       
        	 // $scope.workflowArra= workflowjson;
        }
        
        /*$scope.models = {
                selected: null,
                templates: [
                    {type: "item", id: 2},
                    {type: "container", id: 1, columns: [[], []]}
                ],
                dropzones: {
                    "A": [
                        {
                            "type": "container",
                            "id": 1,
                            "columns": [
                                [
                                    {
                                        "type": "item",
                                        "id": "1"
                                    },
                                    {
                                        "type": "item",
                                        "id": "2"
                                    }
                                ],
                                [
                                    {
                                        "type": "item",
                                        "id": "3"
                                    }
                                ]
                            ]
                        },
                        {
                            "type": "item",
                            "id": "4"
                        },
                        {
                            "type": "item",
                            "id": "5"
                        },
                        {
                            "type": "item",
                            "id": "6"
                        }
                    ],
                    "B": [ ]
                }
            };*/
        /*$scope.$watch('models.dropzones', function(model) {
            $scope.modelAsJson = angular.toJson(model, true);
        }, true);*/
       
        $rootScope.settings.layout.pageContentWhite = true;
        $rootScope.settings.layout.pageBodySolid = false;
        $rootScope.settings.layout.pageSidebarClosed = false;
    });
}]);
 