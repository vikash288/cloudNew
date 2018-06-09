/* Setup bucket page controller */
angular.module('WebApp').controller('BucketController' , ['$state', '$stateParams','$rootScope', '$scope', 'settings','$filter','$compile','ListAWSCredential','ListBucket','Bucket','BucketContain','ListServerCredential','RDBMS', function($state , $stateParams, $rootScope, $scope,settings,$filter,$compile,ListCredential,ListBucket,Bucket,BucketContain,ListServerCredential,RDBMS ) {

		$scope.$on('$viewContentLoaded', function() {   
        // initialize core components
        App.initAjax();
        //console.log($state.params);
        //$(".slimScrollDiv").css("background-color", "yellow");
        $("#list").show();
        $("#grid").hide();
        
        $scope.bucketname=$state.params.BucketName;
        
        $scope.Arraybucketname = $scope.bucketname.split('|');
        $scope.bucketname= $scope.Arraybucketname[0];
        $scope.Path= $scope.Arraybucketname[1].split('/');
        
        $scope.key="";
        if( typeof $scope.Arraybucketname[1] == 'undefined' || $scope.Arraybucketname[1]=='')
        	{
        	$scope.key=""; 
        	var checkvalue='';
        	var checkId=0;
        	  
        	}
        else
        {
        	
        	$scope.key=$scope.Arraybucketname[1];
         	var checkId=$scope.key.split('/').length;
         	checkId=checkId-1; 
        	var checkvalue= $scope.key.split('/')[checkId-1];
          }
         
        //console.log($scope.Arraybucketname[1]) 
        //console.log($scope.Path)
        $scope.AWSCredentialId=parseInt( $state.params.AWSCredentialId); 
		
        var filtered=$filter('filter')($rootScope.buildjson_AWSCredentials_data, {id: $scope.AWSCredentialId},true);
		//console.log(filtered)
		$scope.accessKey=filtered[0].accessKey;
		$scope.secretKey=filtered[0].secretKey;
		$scope.awscredentialsName= filtered[0].awscredentialsName;
		$scope.trashbucketName=filtered[0].trashbucketName;
		$scope.bucketcontentUrl = 'grid.html';
		
  		
		
		$scope.reload = function () {
			 
			$scope.getBucketContianJson='{"accesskey": "'+$scope.accessKey+'", "secretKey": "'+$scope.secretKey+'","bucketName":"'+$scope.bucketname+'" , "key":"'+$scope.key+'"}';
			$scope.getBucketContianJson=JSON.parse( $scope.getBucketContianJson)
			Bucket.getBucketContian($scope.getBucketContianJson).then(function (data) {
    				     //console.log(data);
			 		$scope.extractbucketobject(data.bucket_contents);
 				    $('.loader').hide(); 
		     	},function (errorMessage) {
 		     		swal(
						    'Error!',
						    'Wrong credentials.',
						    'error'
						  )
				  $state.go('dashboard', {},{reload: true});
				    
		 		});	
			    
      
		 };
		 $scope.reload();
		 
		 
		 $scope.userId= $rootScope.user_data.userId; 
		 $scope.getserverCredentials = function()
			{  
				ListServerCredential.searchServerCredentials($scope.userId).then(function (data) {
		             $rootScope.buildjson_ServerCredentials_data=data.serverCredential;
 		         },function (errorMessage) { 
 		        });
		 	}
		 $scope.getserverCredentials();
			
		 
		 
		 $('#refresh').click(function(event){event.preventDefault(); 
 		  $scope.reload();
		 });
		 
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
		     //console.log(main);
		      angular.forEach( main, function(value, key){
		    	  
			          angular.forEach( value, function(value1, key1){
			        	  if( checkId == 0)
			        	  {
			        		 if(value1.id == checkId     )
		        		  {
		        		   if(typeof value1.files == 'undefined')
		        		   {
		        			   var found = $scope.buildjson_bucketFolder.some(function (el) {
		        				    return el.value === value1.value;
		        				  });
		        			   if (!found) { $scope.buildjson_bucketFolder.push(value1) };
		        		   }
		        		   else
		        		   {
		        			   var found = $scope.buildjson_bucketObject.some(function (el) {
		        				    return el.value === value1.value;
		        				  });
		        			   if (!found) { $scope.buildjson_bucketObject.push(value1)  }; 
		        		   }
		        		  }
			        	  }
			        	  else
			        		 {
			        		 if(value1.id == checkId  &&   value[checkId-1].value ==  checkvalue)
		        		  {
		        		   if(typeof value1.files == 'undefined')
		        		   {
		        			   var found = $scope.buildjson_bucketFolder.some(function (el) {
		        				    return el.value === value1.value;
		        				  });
		        			   if (!found) { $scope.buildjson_bucketFolder.push(value1) };
		        		   }
		        		   else
		        		   {
		        			   var found = $scope.buildjson_bucketObject.some(function (el) {
		        				    return el.value === value1.value;
		        				  });
		        			   if (!found) { $scope.buildjson_bucketObject.push(value1)  }; 
		        		   }
		        		  }
			        		 }
		        	 
		          });

			      });
		       
		 }
		 
        
        $scope.getbucketobject = function(AWSCredentialId,bucketpath) {
          	var bucketname= $scope.bucketname+ "|" + $scope.key + bucketpath + '/';
          	$state.go('bucket' , { 'AWSCredentialId':AWSCredentialId,'BucketName': bucketname });
	    };
          
	    
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
        
        //$scope.buildjson_bucket=[{"name":"amazon-aws-immersion-project","owner":{"displayName":"results","id":"c1ec7d2c5c956704d7cd836b30b9bebbedec045b7b46ced7e19c075161bfaa05"},"creationDate":1471529135000},{"name":"amazon-immersion-project","owner":{"displayName":"results","id":"c1ec7d2c5c956704d7cd836b30b9bebbedec045b7b46ced7e19c075161bfaa05"},"creationDate":1471522562000},{"name":"amazon-mockupdata","owner":{"displayName":"results","id":"c1ec7d2c5c956704d7cd836b30b9bebbedec045b7b46ced7e19c075161bfaa05"},"creationDate":1471606750000},{"name":"anjansoftans-06899-s3disk-3","owner":{"displayName":"results","id":"c1ec7d2c5c956704d7cd836b30b9bebbedec045b7b46ced7e19c075161bfaa05"},"creationDate":1479048404000},{"name":"attunity-bucket","owner":{"displayName":"results","id":"c1ec7d2c5c956704d7cd836b30b9bebbedec045b7b46ced7e19c075161bfaa05"},"creationDate":1478521976000},{"name":"aws-testing-bucket","owner":{"displayName":"results","id":"c1ec7d2c5c956704d7cd836b30b9bebbedec045b7b46ced7e19c075161bfaa05"},"creationDate":1471600124000},{"name":"awssoftnas-storage","owner":{"displayName":"results","id":"c1ec7d2c5c956704d7cd836b30b9bebbedec045b7b46ced7e19c075161bfaa05"},"creationDate":1472129182000},{"name":"basebucket-55862-s3disk-0","owner":{"displayName":"results","id":"c1ec7d2c5c956704d7cd836b30b9bebbedec045b7b46ced7e19c075161bfaa05"},"creationDate":1479139804000},{"name":"cf-templates-2q3n4syooaxx-us-west-2","owner":{"displayName":"results","id":"c1ec7d2c5c956704d7cd836b30b9bebbedec045b7b46ced7e19c075161bfaa05"},"creationDate":1472588867000},{"name":"syratesting","owner":{"displayName":"results","id":"c1ec7d2c5c956704d7cd836b30b9bebbedec045b7b46ced7e19c075161bfaa05"},"creationDate":1481097063000},{"name":"test-bucket-aws-immersion","owner":{"displayName":"results","id":"c1ec7d2c5c956704d7cd836b30b9bebbedec045b7b46ced7e19c075161bfaa05"},"creationDate":1473769075000},{"name":"amazon-aws-immersion-project","owner":{"displayName":"results","id":"c1ec7d2c5c956704d7cd836b30b9bebbedec045b7b46ced7e19c075161bfaa05"},"creationDate":1471529135000},{"name":"amazon-aws-immersion-project","owner":{"displayName":"results","id":"c1ec7d2c5c956704d7cd836b30b9bebbedec045b7b46ced7e19c075161bfaa05"},"creationDate":1471529135000},{"name":"amazon-aws-immersion-project","owner":{"displayName":"results","id":"c1ec7d2c5c956704d7cd836b30b9bebbedec045b7b46ced7e19c075161bfaa05"},"creationDate":1471529135000},{"name":"amazon-aws-immersion-project","owner":{"displayName":"results","id":"c1ec7d2c5c956704d7cd836b30b9bebbedec045b7b46ced7e19c075161bfaa05"},"creationDate":1471529135000},{"name":"amazon-aws-immersion-project","owner":{"displayName":"results","id":"c1ec7d2c5c956704d7cd836b30b9bebbedec045b7b46ced7e19c075161bfaa05"},"creationDate":1471529135000},{"name":"amazon-aws-immersion-project","owner":{"displayName":"results","id":"c1ec7d2c5c956704d7cd836b30b9bebbedec045b7b46ced7e19c075161bfaa05"},"creationDate":1471529135000},{"name":"amazon-aws-immersion-project","owner":{"displayName":"results","id":"c1ec7d2c5c956704d7cd836b30b9bebbedec045b7b46ced7e19c075161bfaa05"},"creationDate":1471529135000},{"name":"amazon-aws-immersion-project","owner":{"displayName":"results","id":"c1ec7d2c5c956704d7cd836b30b9bebbedec045b7b46ced7e19c075161bfaa05"},"creationDate":1471529135000},{"name":"amazon-aws-immersion-project","owner":{"displayName":"results","id":"c1ec7d2c5c956704d7cd836b30b9bebbedec045b7b46ced7e19c075161bfaa05"},"creationDate":1471529135000},{"name":"amazon-aws-immersion-project","owner":{"displayName":"results","id":"c1ec7d2c5c956704d7cd836b30b9bebbedec045b7b46ced7e19c075161bfaa05"},"creationDate":1471529135000},{"name":"amazon-aws-immersion-project","owner":{"displayName":"results","id":"c1ec7d2c5c956704d7cd836b30b9bebbedec045b7b46ced7e19c075161bfaa05"},"creationDate":1471529135000},{"name":"amazon-aws-immersion-project","owner":{"displayName":"results","id":"c1ec7d2c5c956704d7cd836b30b9bebbedec045b7b46ced7e19c075161bfaa05"},"creationDate":1471529135000},{"name":"amazon-aws-immersion-project","owner":{"displayName":"results","id":"c1ec7d2c5c956704d7cd836b30b9bebbedec045b7b46ced7e19c075161bfaa05"},"creationDate":1471529135000},{"name":"amazon-aws-immersion-project","owner":{"displayName":"results","id":"c1ec7d2c5c956704d7cd836b30b9bebbedec045b7b46ced7e19c075161bfaa05"},"creationDate":1471529135000},{"name":"amazon-aws-immersion-project","owner":{"displayName":"results","id":"c1ec7d2c5c956704d7cd836b30b9bebbedec045b7b46ced7e19c075161bfaa05"},"creationDate":1471529135000},{"name":"amazon-aws-immersion-project","owner":{"displayName":"results","id":"c1ec7d2c5c956704d7cd836b30b9bebbedec045b7b46ced7e19c075161bfaa05"},"creationDate":1471529135000},{"name":"amazon-aws-immersion-project","owner":{"displayName":"results","id":"c1ec7d2c5c956704d7cd836b30b9bebbedec045b7b46ced7e19c075161bfaa05"},"creationDate":1471529135000},{"name":"amazon-aws-immersion-project","owner":{"displayName":"results","id":"c1ec7d2c5c956704d7cd836b30b9bebbedec045b7b46ced7e19c075161bfaa05"},"creationDate":1471529135000},{"name":"amazon-aws-immersion-project","owner":{"displayName":"results","id":"c1ec7d2c5c956704d7cd836b30b9bebbedec045b7b46ced7e19c075161bfaa05"},"creationDate":1471529135000},{"name":"amazon-aws-immersion-project","owner":{"displayName":"results","id":"c1ec7d2c5c956704d7cd836b30b9bebbedec045b7b46ced7e19c075161bfaa05"},"creationDate":1471529135000},{"name":"amazon-aws-immersion-project","owner":{"displayName":"results","id":"c1ec7d2c5c956704d7cd836b30b9bebbedec045b7b46ced7e19c075161bfaa05"},"creationDate":1471529135000},{"name":"amazon-aws-immersion-project","owner":{"displayName":"results","id":"c1ec7d2c5c956704d7cd836b30b9bebbedec045b7b46ced7e19c075161bfaa05"},"creationDate":1471529135000},{"name":"amazon-aws-immersion-project","owner":{"displayName":"results","id":"c1ec7d2c5c956704d7cd836b30b9bebbedec045b7b46ced7e19c075161bfaa05"},"creationDate":1471529135000}]
        //$scope.buildjson_bucket=[{"name":"amazon-aws-immersion-project","owner":{"displayName":"results","id":"c1ec7d2c5c956704d7cd836b30b9bebbedec045b7b46ced7e19c075161bfaa05"},"creationDate":1471529135000},{"name":"amazon-immersion-project","owner":{"displayName":"results","id":"c1ec7d2c5c956704d7cd836b30b9bebbedec045b7b46ced7e19c075161bfaa05"},"creationDate":1471522562000},{"name":"amazon-mockupdata","owner":{"displayName":"results","id":"c1ec7d2c5c956704d7cd836b30b9bebbedec045b7b46ced7e19c075161bfaa05"},"creationDate":1471606750000},{"name":"anjansoftans-06899-s3disk-3","owner":{"displayName":"results","id":"c1ec7d2c5c956704d7cd836b30b9bebbedec045b7b46ced7e19c075161bfaa05"},"creationDate":1479048404000},{"name":"attunity-bucket","owner":{"displayName":"results","id":"c1ec7d2c5c956704d7cd836b30b9bebbedec045b7b46ced7e19c075161bfaa05"},"creationDate":1478521976000},{"name":"aws-testing-bucket","owner":{"displayName":"results","id":"c1ec7d2c5c956704d7cd836b30b9bebbedec045b7b46ced7e19c075161bfaa05"},"creationDate":1471600124000},{"name":"awssoftnas-storage","owner":{"displayName":"results","id":"c1ec7d2c5c956704d7cd836b30b9bebbedec045b7b46ced7e19c075161bfaa05"},"creationDate":1472129182000},{"name":"basebucket-55862-s3disk-0","owner":{"displayName":"results","id":"c1ec7d2c5c956704d7cd836b30b9bebbedec045b7b46ced7e19c075161bfaa05"},"creationDate":1479139804000},{"name":"cf-templates-2q3n4syooaxx-us-west-2","owner":{"displayName":"results","id":"c1ec7d2c5c956704d7cd836b30b9bebbedec045b7b46ced7e19c075161bfaa05"},"creationDate":1472588867000},{"name":"syratesting","owner":{"displayName":"results","id":"c1ec7d2c5c956704d7cd836b30b9bebbedec045b7b46ced7e19c075161bfaa05"},"creationDate":1481097063000},{"name":"test-bucket-aws-immersion","owner":{"displayName":"results","id":"c1ec7d2c5c956704d7cd836b30b9bebbedec045b7b46ced7e19c075161bfaa05"},"creationDate":1473769075000}]
        AWS.config.update({
            accessKeyId : $scope.accessKey,
            secretAccessKey : $scope.secretKey
        });
        AWS.config.apiVersions = {
        		  s3: '2006-03-01',
        		};
        var startUpload = function(e,KeyValue,local) {
       	 if(local)
       		 {
       		 var files = e.target.files;
       		 }
       	 else
       		 {
       		var files = e.dataTransfer.files;
       		 }
       	 var id= Math.floor(Math.random() * 26) + Date.now();
  		    var myHTML =' <div id="'+id+'" class="toast toast-success progresstoast" ><button type="button" class="toast-close-button"   ng-click="progressHide('+id+')">×</button><div class="toast-title">File Upload Under Bucket : '+ $scope.bucketname +'</div><div class="toast-message" id="messageid'+id+'"> Uploading....</div></div>';
 		    var myHTML = $compile(myHTML)($scope);
 		    //console.log(myHTML);
 		    $('#toast-container-main').append( myHTML);
 		    
 		    for (var i = 0, f; f = files[i]; i++) { // iterate in the files dropped
             if (!f.type && f.size % 4096 == 0) {  console.dir("no");}
             else {  
            	 var bucket = new AWS.S3({params: {Bucket: $scope.bucketname}});
            	 var options = {partSize: 10 * 1024 * 1024, queueSize: 1};
            	 if(KeyValue == null)
            	 {
            		 var params = { Key:$scope.key+files[i].name,key: files[i].name, ContentType: files[i].type, Body: files[i]}; 
            	 }
            	 else
            		 {
            		 var params = { Key:$scope.key+KeyValue+'/'+files[i].name,key: files[i].name, ContentType: files[i].type, Body: files[i]}; 
            		 }
            	 var fileName= files[i].name;
            	 bucket.upload( params,options ).
           	    on('httpUploadProgress', function(evt) {
         	    //console.log('Progress:', evt.loaded, '/', evt.total);
          	    $('#messageid'+id).html("Upload File: "+fileName+" :: " + parseInt((evt.loaded * 100) / evt.total)+'%' ) 
           	    }).send(function(err, data) { 
	         		 if(err) { $('#'+id).removeClass('toast toast-success progresstoast').addClass('toast toast-error progresstoast'); 
	         		 $('#messageid'+id).html("Error On Upload File: "+fileName); } 
	         		 else {  $('#messageid'+id).html("Uploaded File: "+fileName+" :: Done" );   $scope.reload(); }
 	         	     //console.log(err, data) 
 	         	     }); 
              
            	 }
         }
       	
        }
        
        $scope.progressHide= function(id)
	    {
 	    	$('#'+id).hide();
	    }
        
        $('input[type="file"]').change(function(e){
            var file = e.target.files;
            
            startUpload(e,null,true)
            
        });
        
        
        
        
        //console.dir(files);
         $scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
    		var classname =  document.querySelectorAll('.drop-zone-bucket');
           
            for (var i = 0; i < classname.length; i++) {
            var dropZone = classname[i];
     
            dropZone.ondrop = function(e) {
                e.preventDefault();
            	e.preventDefault();
            	$( "#overlaydiv" ).removeClass( "showdiv" ).addClass( "hidediv" );
                $scope.$apply();
                 //console.log(this.id);
               startUpload(e,this.id)
            }

            dropZone.ondragover = function(e) {
            	//console.log('innerover'+this.id);
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
            	if(this.id !='drop')  $( "#"+this.id ).removeClass( "drop" );
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
    	        //console.log(this.id);
    	        e.preventDefault();
    	        e.stopPropagation();
    	        startUpload(e,null)
    	    }
          
         
    	    dropZone.ondragleave = function(e) {
    	    	//console.log('outerleave'+this.id);
    	    	$( "#overlaydiv" ).removeClass( "showdiv" ).addClass( "hidediv" ); 
    	    	$scope.$apply();
    	    	e.stopPropagation();
    	    	e.preventDefault();
    	    	return false;
    	    } 
  
    	    $scope.createfolder=function()
        	{
            	swal({
        			  title: 'Create Folder',
        			  text: 'Folder will create under Amazon S3 <br/>Bucket:'+$scope.bucketname,
        			  input: 'text',
        			  showCancelButton: true,
        			  confirmButtonText: 'Create!',
        			  confirmButtonColor: '#c14067',
        			  confirmButtonColor:'#c14067',
        			  showLoaderOnConfirm: true,
        			  preConfirm: function(foldername) {
        				
        				  return new Promise(function(resolve, reject) {
        				  if (foldername === '') {
        				    reject("Folder Name Feild Can't be Empty .")
        				  } 
        				  else
        				  {
        	    				 
        						$scope.CreateBucketFolderJson='{"accesskey": "'+$scope.accessKey+'", "secretKey": "'+$scope.secretKey+'","bucketName":"'+$scope.bucketname+'","folderName":"'+$scope.key+foldername+'/"}';
        						$scope.CreateBucketFolderJson=JSON.parse( $scope.CreateBucketFolderJson);
        						//$scope.CreateBucke tFolderJson={"accesskey":"AKIAJZJDCKYE224FBKUA","secretKey":"U+RBTBz3M6UBt1muMxfN2hlX\/bkIUs9DAZQiypiq","bucketName":$scope.bucketname,"folderName":foldername}
        	    				 $scope.$apply(function(){
        	    					 BucketContain.CreateBucketFolder($scope.CreateBucketFolderJson).then(function (data) {
         	    						 if(data.foldername !=""  && data.status==1)
        	   						  	 {  toastr["success"]("Folder create successfully under Bucket:"+$scope.bucketname, "Created Folder");
        	   						  	 	$scope.extractbucketobject(data.allObjects);
        	   						  	    
        	   						  	    resolve();
        	   						  	 }
        	   						  	 else
        	   						  	 {
        	   						  		 toastr["error"]("Folder not cretaed successfully under Bucket:"+$scope.bucketname, "Please try again");
        	    	    		     		 swal(
        	    	    						    'Error!',
        	    	    						    'Folder not cretaed successfully.',
        	    	    						    'error'
        	    	    						  )
        	   						  	 }
 
        	    	    		     	},function (errorMessage) {
        	    	    		     		 toastr["error"]("Folder not cretaed successfully under Bucket:"+$scope.bucketname, "Please try again");
        	    	    		     		//alert(angular.toJson(errorMessage,true));
        	    	    		     		swal(
        	    	    						    'Error!',
        	    	    						    'Folder not cretaed successfully.',
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
     	    			    html: 'Submitted Folder Name: ' + foldername
     	    			  })
        			})
    		};    
    		
    		 
    		$scope.deletefolder=function(folderName)
    		{
    			swal({
    				  title: 'Are you sure?',
    				  text: "Deleting '<b>"+folderName+"</b>' Folder cannot be undone! <br/> Type the name of the folder to confirm deletion:",
    				  type: 'warning',
    				  input: 'text',
    				  showCancelButton: true,
    				  confirmButtonColor: '#c14067',
     				  cancelButtonColor: '#d33',
    				  confirmButtonText: 'Yes, delete it!',
    				  showLoaderOnConfirm: true,
    				  preConfirm: function(foldername) {
    	    				
        				  return new Promise(function(resolve, reject) {
        				  if (foldername === '' || foldername!=folderName) {
        				    reject("Type the exact name of the folder for delete..")
        				  } 
        				  else
        				  {

        					  $scope.DeleteBucketFolderJson='{"accesskey": "'+$scope.accessKey+'", "secretKey": "'+$scope.secretKey+'","bucketName":"'+$scope.bucketname+'","folderName":"'+$scope.key+folderName+'","trashBucket":"'+$scope.trashbucketName+'" }';
        					  $scope.DeleteBucketFolderJson=JSON.parse( $scope.DeleteBucketFolderJson)
        					  //$scope.DeleteBucketFolderJson={"accesskey":"AKIAJZJDCKYE224FBKUA","secretKey":"U+RBTBz3M6UBt1muMxfN2hlX\/bkIUs9DAZQiypiq","bucketName":$scope.bucketname,"folderName":foldername}
         					  $scope.$apply(function(){
         					  BucketContain.DeleteBucketFolder($scope.DeleteBucketFolderJson).then(function (data) {
           						  	//alert(angular.toJson(data,true));
           						  	if(data.foldername !=""   && data.status== 1)
           						  	 {   toastr["success"]("Folder Delete successfully", "Deleted Folder");
           						  	 	 $scope.extractbucketobject(data.allObjects);            						  	 	  
           						  		 resolve();
           						  	 }
           						  	 else
           						  	 {
           						  		 toastr["error"]("Folder not Delete successfully", "Please try again");
            	    		     		 swal(
            	    						    'Error!',
            	    						    'Folder not deleted successfully.',
            	    						    'error'
            	    						  )
           						  	 }
           	    		     	},function (errorMessage) {
           	    		     		 toastr["error"]("Folder not Delete successfully", "Please try again");
           	    		     		//alert(angular.toJson(errorMessage,true));
           	    		     		swal(
           	    						    'Error!',
           	    						    'Folder not deleted successfully.',
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
        						    'Your Folder Name-'+folderName+' has been deleted.',
        						    'success'
        						    )
    				 });
    		}
    		
    		
    		$scope.deleteObject=function(ObjectName)
    		{
    			swal({
    				  title: 'Are you sure?',
    				  text: "Deleting '<b>"+ObjectName+"</b>' Object cannot be undone! <br/> Type the name of the Object to confirm deletion:",
    				  type: 'warning',
    				  input: 'text',
    				  showCancelButton: true,
    				  confirmButtonColor: '#c14067',
     				  cancelButtonColor: '#d33',
    				  confirmButtonText: 'Yes, delete it!',
    				  showLoaderOnConfirm: true,
    				  preConfirm: function(Objectname) {
    	    				
        				  return new Promise(function(resolve, reject) {
        				  if (Objectname === '' || Objectname!=ObjectName) {
        				    reject("Type the exact name of the Object for delete..")
        				  } 
        				  else
        				  {

        					  $scope.DeleteBucketObjectJson='{"accesskey": "'+$scope.accessKey+'", "secretKey": "'+$scope.secretKey+'","bucketName":"'+$scope.bucketname+'","folderName":"'+$scope.key+ObjectName+'","trashBucket":"'+$scope.trashbucketName+'" }';
        					  $scope.DeleteBucketObjectJson=JSON.parse( $scope.DeleteBucketObjectJson)
          					  $scope.$apply(function(){
         					  BucketContain.DeleteBucketFolder($scope.DeleteBucketObjectJson).then(function (data) {
         						// console.log(data);//alert(angular.toJson(data,true)); allObjects
           						  	if(data.foldername !=""   && data.status== 1)
           						  	 {   toastr["success"]("Object Delete successfully", "Deleted Object");
           						  	 	 $scope.extractbucketobject(data.allObjects);
            						  	 resolve();
           						  	 }
           						  	 else
           						  	 {
           						  		 toastr["error"]("Object not Delete successfully", "Please try again");
            	    		     		 swal(
            	    						    'Error!',
            	    						    'Object not deleted successfully.',
            	    						    'error'
            	    						  )
           						  	 }
           	    		     	},function (errorMessage) {
           	    		     		 toastr["error"]("Object not Delete successfully", "Please try again");
           	    		     		//alert(angular.toJson(errorMessage,true));
           	    		     		swal(
           	    						    'Error!',
           	    						    'Object not deleted successfully.',
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
        						    'Your Object Name-'+ObjectName+' has been deleted.',
        						    'success'
        						    )
    				 });
    		}
    		$scope.ObjectPreview=function(ObjectKey)
    	        {
    				 	 
				  $scope.getBucketObjectPreviewJson='{"accesskey": "'+$scope.accessKey+'", "secretKey": "'+$scope.secretKey+'","bucketName":"'+$scope.bucketname+'","key":"'+$scope.key+ObjectKey+'" }';
 				  $scope.getBucketObjectPreviewJson=JSON.parse( $scope.getBucketObjectPreviewJson)
     				 	BucketContain.BucketObjectPreview($scope.getBucketObjectPreviewJson).then(function (data) {
     				 		//alert(angular.toJson(data,true));
     				 		var thead="<thead><tr>"
    				 		var i=1;
    				 		var headgo=true;
    				 		var tablebody="<tbody>";
     	          			angular.forEach(data, function(valueobj, key){
     	          				
     	          				if(headgo){ 
     	          					thead=thead+'<th   data-align="left">Col '+i+'</th>';
     	          				}
     	          				
     	          				tablebody=tablebody+"<tr><td>"+key+"</td>";
     	          						angular.forEach(valueobj, function(value, key1){
     	          							//alert(angular.toJson(value,true));
     	          							i++;
     	          							if(headgo){ 
     	          							thead=thead+'<th   data-align="left">Col '+i+'</th>';
     	          							
     	          							}     	          							
     	          						tablebody=tablebody+"<td>"+value+"</td>";
							});
     	          						tablebody=tablebody+"</tr>";
     	          						headgo=false;
     	          						
     	          			});
     	          			thead=thead+'</tr></thead>';
     	          		 	$('#detailsvalue').html('<table id="table-transform"   data-height="300"   data-show-toggle="true"   data-search="true"> '+thead+tablebody+'</tbody></table>');
                            $('#table-transform').bootstrapTable();
     	          			 
    			     	},function (errorMessage) {
    			     		
    			 		});	
    				 	 
    	    }
    		
    		$scope.ObjectDetails=function(ObjectKey)
	        {
				 	 
    			  $scope.BucketObjectDetailsJson='{"accesskey": "'+$scope.accessKey+'", "secretKey": "'+$scope.secretKey+'","bucketName":"'+$scope.bucketname+'","key":"'+$scope.key+ObjectKey+'" }';
				  $scope.BucketObjectDetailsJson=JSON.parse( $scope.BucketObjectDetailsJson)
				
 				 	BucketContain.BucketObjectDetails($scope.BucketObjectDetailsJson).then(function (data) {
	        			$('#detailsvalue').html('<div class="general-item-list" style="word-wrap: break-word;"><div class="item" ><div class="item-details"><a href="javascript:;" class="item-name primary-link">Bucket:</a> <span class="item-label">'+data.bucketname+'</span></div> </div> <div class="item"><div class="item-details"><a href="javascript:;" class="item-name primary-link">Link:</a> <span class="item-label">'+data.link+'</span></div> </div> <div class="item"><div class="item-details"><a href="javascript:;" class="item-name primary-link">Content Length </a> <span class="item-label">'+data.contentLength+'</span></div> </div>	<div class="item"><div class="item-details"><a href="javascript:;" class="item-name primary-link">E Tag:</a> <span class="item-label">'+data.etag+'</span></div> </div> 	<div class="item"><div class="item-details"><a href="javascript:;" class="item-name primary-link">LastModified:</a> <span class="item-label">'+data.lastModified+'</span></div> </div></div>');
 			     	},function (errorMessage) {
			     		
			 		});	
 	    }
    		$scope.menuOptions = [
                                 /* ['Get Properties', function ($itemScope) {
                                	  //$scope.ObjectPreview($itemScope.buildjson.value);
                                	  //alert($itemScope.buildjson.key); //$scope.player.gold -= $itemScope.item.cost;
                                  }],*/

                                  ['Delete Folder', function ($itemScope) {
                                	  $scope.deletefolder($itemScope.buildjson.value); 
                                  }]
                              ]; 
    		
    		$scope.menuOptions2 = [
                                  ['Get Object Detail', function ($itemScope) {
                                	  $scope.ObjectDetails($itemScope.buildjson.value);
                                	  var id="object"+$itemScope.$index;
                                  	  $( ".thumbnail"  ).removeClass( "drop" ); 
                                  	  $( ".thumbnailtable"  ).removeClass( "drop" ); 
                                  	  $( "#"+id).addClass( "drop" );  
                                	  $( "#drop-zone" ).removeClass( "col-md-12" ).addClass( "col-md-7" ); 
                                	  $('#details').after().find('.caption-subject.bold').html("Object: "+$itemScope.buildjson.value); 
                                	  $('#details').show(100);
                                	  $('#detailsvalue').html('<h1>Loading....</h1>');
                                	  	
                                	 
                                   }],

                                  ['Object Preview', function ($itemScope) {
                                	var id="object"+$itemScope.$index;
                                	$scope.ObjectPreview($itemScope.buildjson.value);
                                	$( ".thumbnail"  ).removeClass( "drop" ); 
                                	  $( ".thumbnailtable"  ).removeClass( "drop" ); 
                                	$( "#"+id).addClass( "drop" );  
                              	  	$( "#drop-zone" ).removeClass( "col-md-12" ).addClass( "col-md-7" ); 
                              	  	$('#details').after().find('.caption-subject.bold').html("Object: "+$itemScope.buildjson.value); 
                              	  	$('#details').show(100);
                              	  	$('#detailsvalue').html('<h1>Loading....</h1>');
                              	  	
                                  }],
                                  ['Delete Object', function ($itemScope) {
                                	  $scope.deleteObject($itemScope.buildjson.value);  // $scope.player.gold += $itemScope.item.cost;
                                    }]
                              ];     	
    		
    		 
    		
    		 
    		$scope.getObjectDetails=function(objectId)
    		{
    			alert(objectId);
    		}
    		
    		$('.btn.buttoncolor.start').click(function(){
 
    			 $scope.serverfilestatus=false;
    			 $scope.jobinputstatus=true;
    			 $scope.$apply();
    			 $('.bs-select').selectpicker({
    		        iconBase: 'fa',
    		        tickIcon: 'fa-check'
    		    });
    			  
			 $('#jobcheckbox').on('ifClicked', function(event){
	    		   
				 if($(this).is(":checked")) 
	    			{
		   			 
		   			 $scope.jobinputstatus=true;
	    			 $scope.$apply();
	    			}
				 else
					{
	    			 
	    			 $scope.jobinputstatus=false;
	    			 $scope.$apply();
					}
	    		  
			});
			 	$scope.SourceServerType;
			 	$scope.SourceId;
			 	$scope.dataSourceObject;
			 	$scope.selectedSourceItem=null;
			 	 
     		    $('select[name="source"]').html('');
    		    $('select[name="source"]').html('<option data-icon="icon-info" value="">Select Source</option>');
    		    
    		    $.each($rootScope.buildjson_ServerCredentials_data, function (index, valueobj) {
    		    	 if(valueobj.servertypeid == 1)
    		    		 {
        	           	 $('select[name="source"]').append('<option data-icon="icon-info" value="'+valueobj.id+'_'+valueobj.servertypeid+'">'+valueobj.serverName+'</option>').selectpicker('refresh');
    		    		 }
    	            });
    		     
    		    
    		    
    		    $(document).on('change', 'select[name="source"]', function(){
    		    	
    		    	$scope.selectedSourceItem=null;
    	    		$scope.dataSourceObject=[];
    	    		$('#SourceProgress').hide();
    	    		$('#SourceEmpty').hide();
    	    	    var dataObject = [];
    	    	    var i=0;
     	     		 
    		    	  if($(this).val() == ""){

    		    			$scope.rdbmsServerType=0;
    		    			$scope.dataSourceObject = [];
    		    			$scope.$apply();
    		    			$('#SourceProgress').hide();
    		    			$('#SourceEmpty').hide();
    		    		  
    		    	  }
    		    	  else
    		    		  {
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
    		     		  	  	    $scope.GetAllSourceJson='{"classname": "'+ filtered[0].className+'","dburl":"'+filtered[0].hosturl+'","dbport":"'+ filtered[0].port+'","dbusername":"'+ filtered[0].username+'","dbpassword":"'+ filtered[0].password+'","dbname":"'+ filtered[0].databaseName+'"}'; 
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
    		    		
    		      	  	    
    		     	  	    
    		    	  	  
    		    		  }  
    	  	  				 
    		    	});
    		    $('#static').modal('toggle');
    		});
    		
    	  
    		 $scope.sourceerror = function(messages)
    		    {
    		    	     $('#SourceProgress').hide();
    					 $('#SourceEmpty').html('<strong> Info! </strong>'+messages);
    					 $('#SourceEmpty').show();
    		    }
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
    	         			
    	         			 var main=$scope.extractbucketobjectTree(data.bucket_contents);
    	         			 //console.log(main);
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
    	     
    	     $scope.extractbucketobjectTree =  function(data)
    		 {
    			 
    			 var main=[];
       			     
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
     	      
    	     $scope.upload = function()
    		    {
    			 $scope.serverfilestatus=true;
    			 if(  $scope.selectedSourceItem != null    )
    		        {
    				
    				 if( $scope.SourceServerType == 1 )
	   		    		{
    					 	 
    		    			if($scope.key == "")
    		    			{
    		    				var FileKey=$scope.selectedSourceItem.name;
    		    			}
    		    			else
    		    			{
    		    				var FileKey=$scope.key+$scope.selectedSourceItem.name;
    		    			}
    		    			
    		    			$scope.FtpToS3UploadJson='{"ftphostName":"'+$scope.GetAllSourceJson['ftphostName']+'","ftpPort":"'+$scope.GetAllSourceJson['ftpPort']+'","ftpUsername":"'+$scope.GetAllSourceJson['ftpUsername']+'","ftppassword":"'+$scope.GetAllSourceJson['ftppassword']+'","ftpPath":"'+$scope.selectedSourceItem.path + $scope.selectedSourceItem.name+'","accesskey":"'+$scope.accessKey+'","secretKey":"'+$scope.secretKey+'","bucketName":"'+$scope.bucketname+'","key":"'+FileKey+'"}';  
	   		        	    $scope.FtpToS3UploadJson=JSON.parse( $scope.FtpToS3UploadJson); 
	   			        	ListBucket.FtpToS3Upload($scope.FtpToS3UploadJson).then(function (data) {
	   			        	 $('#static').modal('toggle');
	   			        	 if(data.status)
	   			        			{
	   			        			swal(
	   	        						    'Upload!',
	   	        						    'Your file Name-'+$scope.selectedSourceItem.name+' has been uploaded.',
	   	        						    'success'
	   	        						    )
	   	        				    $scope.reload();
	   			        			}
	   			        	 else
	   			        		 {
	   			        		swal(
   	        						    'Error!',
   	        						    'Your file Name-'+$scope.selectedSourceItem.name+' not uploaded.',
   	        						    'error'
   	        						    )
	   			        		 }
	   		    	  		},function (errorMessage) {
	   		    	 			//alert(errorMessage);
	   		    	 		}); 
	   		    		}  
	   	   		
    		        }
    		    }
        $rootScope.settings.layout.pageContentWhite = true;
        $rootScope.settings.layout.pageBodySolid = false;
        $rootScope.settings.layout.pageSidebarClosed = false;
    });
}]);

 
/*@RequestMapping(value = "/s3operation/fileupload", method = RequestMethod.POST, produces = "application/json")
public @ResponseBody Map<Object,Object> s3MultipartFileUpload(@RequestParam("accesskey") String accesskey,
                                                        @RequestParam("secretkey") String secretkey,
                                                        @RequestParam("bucketName") String bucketName,
                                                        @RequestParam("key") String key,
                                                        @RequestParam("file") MultipartFile file){*/