/* Setup bucket page controller */
angular.module('WebApp').controller('S3Controller' , [ '$state', '$stateParams','$state','$rootScope', '$scope','$timeout','$compile','$filter','settings','ListBucket','Bucket','UserService', function( $state, $stateParams ,$state, $rootScope, $scope,$timeout,$compile,$filter,settings,ListBucket,Bucket,UserService ) {

		$scope.$on('$viewContentLoaded', function() {   
        // initialize core components
        App.initAjax();
		$scope.bucketcontentUrl = 'grid.html';
		$("#list").show();
	    $("#grid").hide();
	    $('#bucketmessage').hide();
	     
	    
 		if($state.params.AWSCredentialId ==""){ $state.go('awscredential' , { 'Account': 'new' ,'Id':''} ,{reload: true}); }
  		$scope.AWSCredentialId=parseInt( $state.params.AWSCredentialId); 
  		//console.log($scope.AWSCredentialId);
		
		var filtered=$filter('filter')($rootScope.buildjson_AWSCredentials_data, {id: $scope.AWSCredentialId},true);
		 
		if(filtered.length == 0 || filtered == undefined || $scope.AWSCredentialId==NaN) {
 			$state.go('awscredential' , { 'Account': 'new' ,'Id':''} ,{reload: true});
		}
 		else
		{
			$scope.accessKey=filtered[0].accessKey;
			$scope.secretKey=filtered[0].secretKey;
			$scope.awscredentialsName= filtered[0].awscredentialsName; 
			$scope.trashbucketName=filtered[0].trashbucketName;
 		}
	 
        $scope.reload = function () {
            $scope.GetAllBucketJson='{"accesskey": "'+$scope.accessKey+'", "secretKey": "'+$scope.secretKey+'" }';
            $scope.GetAllBucketJson=JSON.parse( $scope.GetAllBucketJson)
           
            ListBucket.GetAllBucket($scope.GetAllBucketJson).then(function (data) {
            	
            	if(data.status == 1)
            	{
            		 $scope.buildjson_bucket=data.buckets;   
            		 
            	}
            	else
            	{
            		if(data.buckets == null)
            		{
            			 swal(
       						    'Error!',
       						    'Wrong AWS Account Credentials.',
       						    'error'
       						  )
       						 $state.go('awscredential' , { 'Account': 'new' ,'Id':''} ,{reload: true});
            		}
            		else
            		{
            			 $('#bucketmessage').show();
            		}
            	}
           
             	 $('.loader').hide();
             		},function (errorMessage) { 
    		 });
           
      /*  $timeout(function(){
            $scope.reload();
          },5000);*/
        }
        
        if( $scope.accessKey !="" && $scope.secretKey !="")
        	{
        	$scope.reload();
        	}
      
        toastr.options = {
        		  "closeButton": true,
        		  "debug": false,
        		  "positionClass": "toast-bottom-right",
        		  "onclick": null,
        		  "showDuration": "1000",
        		  "hideDuration": "1000",
        		  "timeOut": "5000",
        		  "extendedTimeOut": "1000",
        		  "showEasing": "swing",
        		  "hideEasing": "linear",
        		  "showMethod": "fadeIn",
        		  "hideMethod": "fadeOut"
        		}
        $scope.menuOptions = [
                              ['Get Properties', function ($itemScope) {
                            	  	$scope.getBucketProperties($itemScope.buildjson.name);
                            	  	$( ".drop-zone-bucket"  ).removeClass( "drop" );  $( "#"+$itemScope.buildjson.name ).addClass( "drop" );  
                            	  	$( "#drop-zone" ).removeClass( "col-md-12" ).addClass( "col-md-8" ); 
                            	  	$('#details').after().find('.caption-subject.bold').html($itemScope.buildjson.name); 
                            	  	$('#details').show(100);
                            	  	$('#detailsvalue').html('<h1>Loading....</h1>');
                            		//alert($itemScope.buildjson.key); //$scope.player.gold -= $itemScope.item.cost;
                              }],

                              ['Delete Bucket', function ($itemScope) {
                            	  $scope.deletebucket($itemScope.buildjson.name); 
                              }]
                          ]; 
        
        $scope.custommenu=function(value)
        {
        	var id=$(event.target).attr("id");
        	 
        	switch(value) {
	        case "getProperties":  $scope.getBucketProperties(id); 
	        $( ".drop-zone-bucket"  ).removeClass( "drop" );  $( "#"+id ).addClass( "drop" );      
	        $( "#drop-zone" ).removeClass( "col-md-12" ).addClass( "col-md-8" ); $('#details').after().find('.caption-subject.bold').html(id); $('#details').show(100);$('#detailsvalue').html('<h1>Loading....</h1>');break;
	        case "getLink": alert("second"); break;
	        case "deleteBucket": $scope.deletebucket(id);  break;
        	}
        	$(".custom-menu").hide(100);
        }
        
        $scope.getBucketProperties=function(bucketName)
        {
             	
            	$scope.getBucketPropertiesJson='{"accesskey": "'+$scope.accessKey+'", "secretKey": "'+$scope.secretKey+'","bucketName": "'+bucketName+'" }'; 
            	$scope.getBucketPropertiesJson=JSON.parse( $scope.getBucketPropertiesJson); 
         		Bucket.getBucketProperties($scope.getBucketPropertiesJson).then(function (data) {
        			$('#detailsvalue').html('<div class="general-item-list" style="word-wrap: break-word;"><div class="item" ><div class="item-details"><a href="javascript:;" class="item-name primary-link">Bucket:</a> <span class="item-label">  '+data.bucketname+'</span></div> </div> <div class="item"><div class="item-details"><a href="javascript:;" class="item-name primary-link">Region:</a> <span class="item-label">'+data.bucketLocation+'</span></div> </div> <div class="item"><div class="item-details"><a href="javascript:;" class="item-name primary-link">Owner</a> <span class="item-label">'+data.owner+'</span></div> </div><div class="item"><div class="item-details"><a href="javascript:;" class="item-name primary-link">Creation Date:</a> <span class="item-label">'+data.creationtime+'</span></div> </div></div>');
        			//alert(angular.toJson(data,true)); 
		     	},function (errorMessage) {
		     		
		 		});	
			 	 
        }
        
        
        $('#refresh').click(function(event){event.preventDefault(); 
        		$scope.reload();
        });
        
        $('#list').click(function(event){event.preventDefault(); 
        $scope.bucketcontentUrl='list.html';
        $("#list").hide();
        $("#grid").show();
        $scope.$apply();
        
        });
        $('#grid').click(function(event){event.preventDefault(); 
         $scope.bucketcontentUrl='grid.html';
        $("#list").show();
        $("#grid").hide();
        $scope.$apply();
        });
        
        
        // set default layout mode
  
        $scope.createbucket=function()
    	{
        	swal({
    			  title: 'Create Bucket',
    			  text: 'Bucket will create under Amazon S3 Server.',
    			  input: 'text',
    			  showCancelButton: true,
    			  confirmButtonText: 'Create!',
    			  confirmButtonColor: '#c14067',
     			  showLoaderOnConfirm: true,
     			  allowOutsideClick:false,
     			  allowEscapeKey:false,
    			  preConfirm: function(foldername) {
    				
    				  return new Promise(function(resolve, reject) {
    				  if (foldername === '') {
    				    reject("Bucket Name Feild Can't be Empty .")
    				  } 
    				  //alert( foldername.slice(-1) );
    				  else if (foldername.length  > 63 || foldername.length  < 3) {
        				    reject("Bucket Name Can't be less than 3 or greater than 63 characters long.")
        			  } 
    				  else if ( foldername.slice(-1) =="-") {
        				    reject("Bucket Name Can't be End with Dash .")
        				  } 
    				  else if (foldername.match(/\..*\./)  ) {
    					  reject("Bucket Name Can't be adjacent Dots.")
    					}   
    				  else
    				  {
    		            	 $scope.CreateBucketJson='{"accesskey": "'+$scope.accessKey+'", "secretKey": "'+$scope.secretKey+'","bucketName": "'+foldername+'" }'; 
    		            	 $scope.CreateBucketJson=JSON.parse( $scope.CreateBucketJson); 
    		            	 //$scope.CreateBucketJson={"accesskey":"AKIAJZJDCKYE224FBKUA","secretKey":"U+RBTBz3M6UBt1muMxfN2hlX\/bkIUs9DAZQiypiq","bucketName":foldername}
    	    				 $scope.$apply(function(){
    	    					  Bucket.CreateBucket($scope.CreateBucketJson).then(function (data) {
    	    						 	 
    	    						  $('#bucketmessage').hide(); //show
    	    						   if(data.status !="" && data.status==1)
    	    						  	 {   
    	    							 toastr["success"]("Bucket Create successfully", "Created Bucket");
    	    	    					 $scope.buildjson_bucket=data.allBuckets;
    	    	    					 resolve();
    	    						  	 }
    	    						  	 else
    	    						  	 {
    	    						  	 toastr["error"]("Bucket not Cretaed successfully", "Please try again");
    	     	    		     		 swal(
    	     	    						    'Error!',
    	     	    						    'Bucket not Cretaed successfully.',
    	     	    						    'error'
    	     	    						  )
    	    						  	 }
    	    						  //alert(angular.toJson(data.allBuckets,true));
    	    	    		     	},function (errorMessage) {
    	    	    		     		 toastr["error"]("Bucket not cretaed successfully", "Please try again");
    	    	    		     		//alert(angular.toJson(errorMessage,true));
    	    	    		     		swal(
    	    	    						    'Error!',
    	    	    						    'Bucket not cretaed successfully.',
    	    	    						    'error'
    	    	    						  )
    	    	    				    
    	    	    		 		});	
    	    					  
    	    			            });
    	    			            
    	    			    
    				  }
    			    })
    			     
    			  },
    			  allowOutsideClick: false,
    			}).then(function(foldername) {
    				 swal({
 	    			    type: 'success',
 	    			    title: 'Request finished!',
 	    			    html: 'Submitted Bucket Name: ' + foldername
 	    			  })
    			})
		};
		
		$scope.deletebucket=function(bucketName)
		{
			swal({
				  title: 'Are you sure?',
				  text: "Deleting '<b>"+bucketName+"</b>' bucket and its objects cannot be undone! <br/> Type the name of the bucket to confirm deletion:",
				  type: 'warning',
				  input: 'text',
				  showCancelButton: true,
				  confirmButtonColor: '#c14067',
 				  cancelButtonColor: '#d33',
				  confirmButtonText: 'Yes, delete it!',
				  showLoaderOnConfirm: true,
				  allowOutsideClick:false,
     			  allowEscapeKey:false,
     			  preConfirm: function(foldername) {
    			  	
    				  return new Promise(function(resolve, reject) {
    				  if (foldername === '' || foldername!=bucketName) {
    				    reject("Type the exact name of the bucket for delete..")
    				  } 
    				  else
    				  {
    					  //$scope.DeleteBucketJson={"accesskey":"AKIAJZJDCKYE224FBKUA","secretKey":"U+RBTBz3M6UBt1muMxfN2hlX\/bkIUs9DAZQiypiq","bucketName":bucketName}
 		            	  $scope.DeleteBucketJson='{"accesskey": "'+$scope.accessKey+'", "secretKey": "'+$scope.secretKey+'","bucketName": "'+bucketName+'" , "trashBucket":"testing4123"}'; 
 		            	  $scope.DeleteBucketJson=JSON.parse( $scope.DeleteBucketJson); 
 		            	  $scope.$apply(function(){
       					  Bucket.deleteBucket($scope.DeleteBucketJson).then(function (data) {
       						  	//alert(angular.toJson(data,true));
       						  	if(data.bucketname !="" && data.bucketname==bucketName && data.status== 1)
       						  	 {   toastr["success"]("Bucket Delete successfully", "Deleted Bucket");
    	   	    					 $scope.buildjson_bucket=data.allBuckets;
    	   	    					 resolve();
       						  	 }
       						  	 else
       						  	 {
       						  		 toastr["error"]("Bucket not Delete successfully", "Please try again");
        	    		     		 swal(
        	    						    'Error!',
        	    						    'Bucket not deleted successfully.',
        	    						    'error'
        	    						  )
       						  	 }
       	    		     	},function (errorMessage) {
       	    		     		 toastr["error"]("Bucket not Delete successfully", "Please try again");
       	    		     		//alert(angular.toJson(errorMessage,true));
       	    		     		swal(
       	    						    'Error!',
       	    						    'Bucket not deleted successfully.',
       	    						    'error'
       	    						  )
       	    				    
       	    		 		});	
      
     					  }) 
    				  }
  			    })
     			     
			  },
			  allowOutsideClick: false,
				}).then(function () {
  					 swal(
    						    'Deleted!',
    						    'Your Bucket Name-'+bucketName+' has been deleted.',
    						    'success'
    						    )
				 });
		}
		
		$scope.getbucketobject = function(AWSCredentialId,bucketname) {
			bucketname=bucketname+"|"+"";
 			$state.go('bucket' , { 'AWSCredentialId':AWSCredentialId,'BucketName': bucketname });
	    };
	   // $scope.GetAllBucketJson='{"accesskey": "'+$scope.accessKey+'", "secretKey": "'+$scope.secretKey+'" }'; 
	    AWS.config.update({
            accessKeyId : $scope.accessKey,
            secretAccessKey : $scope.secretKey
        });
        AWS.config.apiVersions = {
        		  s3: '2006-03-01',
        		};
	    var startUpload = function(e,bucketName) {
	    	
 	    	var files = e.dataTransfer.files;
 		    var id =  Math.floor(Math.random() * 26) + Date.now();
  		    var myHTML =' <div id="'+id+'" class="toast toast-success progresstoast" ><button type="button" class="toast-close-button"   ng-click="progressHide('+id+')">×</button><div class="toast-title">File Upload Under Bucket : '+ bucketName +'</div><div class="toast-message" id="messageid'+id+'"> Uploading....</div></div>';
 		    var myHTML = $compile(myHTML)($scope);
 		    //console.log(myHTML);
 		    $('#toast-container-main').append( myHTML);
 		    
	    	toastr.options = {
	        		  "closeButton": true,
	        		  "debug": false,
	        		  "positionClass": "toast-bottom-right",
	        		  "onclick": null,
	        		  "showDuration": "0",
	        		  "hideDuration": "0",
	        		  "timeOut": "0",
	        		  "extendedTimeOut": "0",
	        		  "showEasing": "swing",
	        		  "hideEasing": "linear",
	        		  "showMethod": "fadeIn",
	        		  "hideMethod": "fadeOut"
	        		}
	    	//toastr["success"]("Uploading....", "Upload");
	       var files = e.dataTransfer.files;
	       for (var i = 0, f; f = files[i]; i++) { // iterate in the files dropped
	             if (!f.type && f.size % 4096 == 0) {  console.dir("no");}
	             else {   
	            	 var bucket = new AWS.S3({params: {Bucket: bucketName}});
	            	 var options = {partSize: 10 * 1024 * 1024, queueSize: 1};
	            	 var params = {Key: files[i].name, ContentType: files[i].type, Body: files[i]}; 
	            	 var fileName= files[i].name;
	            	 bucket.upload( params,options ).
	           	    on('httpUploadProgress', function(evt) {
	         	   // console.log('Progress:', evt.loaded, '/', evt.total);
	         	   //messageid'+id+' $('.toast-message').html('Error');  $('.toast-message').html('Done');
	         	  $('#messageid'+id).html("Upload File: "+fileName+" :: " + parseInt((evt.loaded * 100) / evt.total)+'%' ) 
	           	    }).
	         	  send(function(err, data) { 
	         		 if(err) { $('#'+id).removeClass('toast toast-success progresstoast').addClass('toast toast-error progresstoast'); 
	         		 $('#messageid'+id).html("Error On Upload File: "+fileName); } 
	         		 else {  $('#messageid'+id).html("Uploaded File: "+fileName+" :: Done" );  }
 	         	     //console.log(err, data) 
 	         	     }); 
	              //console.dir(files[i]); 
	              }
	         }  
	    	
	   /* 	var form = document.getElementById('orderform');
	        //var form = $('#orderform').val();
	        var formData = new FormData(form);
	       
	   

	    $.ajax({
	    url: base_url+"shopping/place_order",
	    type: "POST",
	    data: formData,
	    dataType: 'json',
	    enctype: 'multipart/form-data',
	    processData: false,  // tell jQuery not to process the data
	    contentType: false,
	    success: function(data){
	     
	    },error: function (xhr, ajaxOptions, thrownError) {alert("ERROR:" + xhr.responseText+" - "+thrownError);}
	    */
	    
	   /*   var formData=new FormData(files[0]);
	      var fd = new FormData();
	      fd.append('file', files[0]);
	        //formData.append("file",file.files[0]);
	    	
       	  $scope.uploadfileBucketJson='{"accesskey": "'+$scope.accessKey+'", "secretkey": "'+$scope.secretKey+'","bucketName": "'+bucketName+'" ,"key": "'+files[i].name+'","file" : "'+fd+'"}'; 
     	  $scope.uploadfileBucketJson=JSON.parse( $scope.uploadfileBucketJson); 
     	  //alert(angular.toJson($scope.uploadfileBucketJson,true));
     	  $scope.BucketObjectDetailsJson={"accesskey":"AKIAJ6E34VVCK6A7RTAQ","secretkey":"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","bucketName": bucketName,"key":files[i].name ,"file" :""}

		  Bucket.uploadfileBucket($scope.BucketObjectDetailsJson).then(function (data) {
				  	alert(angular.toJson(data,true));
     	  			},function (errorMessage) {
     	  			alert(angular.toJson(errorMessage,true));	
     	  			}); 
				  
     	console.dir(fd); 
     	console.dir(formData); */
	        }
	   
	    $scope.progressHide= function(id)
	    {
 	    	$('#'+id).hide();
	    }
	    $scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
 	    var classname =  document.querySelectorAll('.drop-zone-bucket');
        //console.log('test'+classname.length); 
        for (var i = 0; i < classname.length; i++) {
        var dropZone = classname[i];
 
        dropZone.ondrop = function(e) {
            e.preventDefault();
        	e.preventDefault();
        	$( "#overlaydiv" ).removeClass( "showdiv" ).addClass( "hidediv" );
            $scope.$apply();
           // console.log(this.id);
            startUpload(e,this.id)
        }

        dropZone.ondragover = function(e) {
        	//console.log('innerover'+this.id);
        	$( "#overlaydiv" ).removeClass( "hidediv" ).addClass( "showdiv" );
        	if(this.id !='drop')	$( "#"+this.id ).removeClass( "drop" ); $( "#"+this.id ).addClass( "drop" );
        	$scope.$apply();
        	e.stopPropagation();
        	e.preventDefault();
            return false;
        }

        dropZone.ondragleave = function(e) {
        	e.stopPropagation();
        	e.preventDefault();
        	//console.log('ineerleave'+this.className);
        	if(this.id !='drop')	$( "#"+this.id ).removeClass( "drop" );
        	$scope.$apply();
        	
        	
        	return false;
        }
        }
		});
    
		var dropZone = document.getElementById('drop');


	    dropZone.ondragover = function(e) {
	    	//console.log('outerover'+this.id);
	    	$( "#overlaydiv" ).removeClass( "hidediv" ).addClass( "showdiv" );
	    	$scope.$apply();
	    	e.stopPropagation();
	    	e.preventDefault();
	    	return false;
	    }

   
	    var dropZone = document.getElementById('overlaydiv');
    
    
	    dropZone.ondrop = function(e) {
	
	    	$( "#overlaydiv" ).removeClass( "showdiv" ).addClass( "hidediv" );
	        $scope.$apply();
	       // console.log(this.id);
	        e.preventDefault();
	        e.stopPropagation();
	        return false;
	    }
    
     
	    dropZone.ondragleave = function(e) {
	    	//console.log('outerleave'+this.id);
	    	$( "#overlaydiv" ).removeClass( "showdiv" ).addClass( "hidediv" ); 
	    	$scope.$apply();
	    	e.stopPropagation();
	    	e.preventDefault();
	    	return false;
	    } 
     
	    
    
        $scope.bucketname=$state.params.BucketName;
        $rootScope.settings.layout.pageContentWhite = true;
        $rootScope.settings.layout.pageBodySolid = false;
        $rootScope.settings.layout.pageSidebarClosed = false;
    });
}]);
