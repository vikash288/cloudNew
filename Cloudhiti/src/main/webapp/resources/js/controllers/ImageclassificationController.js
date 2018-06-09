angular.module('WebApp').controller('ImageclassificationController' , ['$state', '$stateParams','$rootScope', '$scope', 'settings','$filter','Schedule','Imageprocessing','ListBucket', function($state , $stateParams, $rootScope, $scope,settings,$filter,Schedule,Imageprocessing ,ListBucket) {

		$scope.$on('$viewContentLoaded', function() {   
        // initialize core components
        App.initAjax();
        
        //$('.imgupload').imgUpload();
        
        var $imageupload = $('.imageupload');
       
        $imageupload.imageupload();
         // $imageupload.imageupload();

      /*  $('#imageupload-disable').on('click', function() {
            $imageupload.imageupload('disable');
            $(this).blur();
        })

        $('#imageupload-enable').on('click', function() {
            $imageupload.imageupload('enable');
            $(this).blur();
        })

        $('#imageupload-reset').on('click', function() {
            $imageupload.imageupload('reset');
            $(this).blur();
        });*/
        
        $scope.selectBucket=[];
        $scope.selectBucketData=[];
        var i=0;
        var file=null;
        $scope.selectedBucketDump=null;
        
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
        	// $('select[name="DumpBucket"]').append('<optgroup label="Picnic">  </optgroup>').selectpicker('refresh');
            		  //<option data-icon="icon-refresh" value="'+valueobj.id+'">'+valueobj.awscredentialsName+'</option>').selectpicker('refresh');
         });
        
         $scope.selectBucket = angular.copy($scope.selectBucketData);
         
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
          		 
          		$scope.GetAllBucketJson='{"accesskey": "'+S3Info[0]+'", "secretKey": "'+S3Info[1]+'" }';
                 $scope.GetAllBucketJson=JSON.parse( $scope.GetAllBucketJson)
                 var i=0;
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
           	 				            children: []
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
         }
         
         
         $scope.CustomCallbackBucket = function(item, selectedItems) {
         	$scope.selectedBucketDump= item;
        };
        
        $('input[type="file"]').change(function(e){
        	files = e.target.files;
        }); 
        $('#remove').on('click', function() {
        	files=null;
        });
        $(".range_1").ionRangeSlider({
            min: 0,
            max: 100,
            from: 55,
            from_fixed: true
        });
        //$(".range_1").ionRangeSlider();
        
        
        $('#predict').on('click', function() {
        	
        	$('#output_predict').html('');
        	if($scope.selectedBucketDump == null) 
        	 {
        		 swal(
     				    'Error!',
     				    'Please select S3 Bucket for Dump Image.',
     				    'question'
     				  )
        	 }
        	 else
        	 {
        		  
      		     $('#predict').attr("disabled","disabled"); //console.dir(files); 
            	 
            	 var imageurl= $("#image-url").val();        	 
            	 
            	 var Keys=$scope.selectedBucketDump.Key.split(',');
    			 var bucketName=$scope.selectedBucketDump.name;
    			 var FileName=null;
     			 AWS.config.update({
    			      accessKeyId :Keys[0],
    			      secretAccessKey :Keys[1]
    			  });
    			  AWS.config.apiVersions = {
    			  		  s3: '2006-03-01',
    			  };
    			  
    			  
    							  if( imageurl == "")
    							  {
    								   
    								  for (var i = 0, f; f = files[i]; i++) { // iterate in the files dropped
    										 if (!f.type && f.size % 4096 == 0) {}
    										 else {   
    											 var bucket = new AWS.S3({params: {Bucket: bucketName}});
    											 FileName = Math.floor(Math.random() * 26) + Date.now()+files[i].name;
    											 //FileName="image.png";
    											 var options = {partSize: 10 * 1024 * 1024, queueSize: 1};
    											 var params = {Key: FileName, ContentType: files[i].type, Body: files[i]}; 
     											 bucket.upload( params ,options).
    										    on('httpUploadProgress', function(evt) {
    										    }).
    										  send(function(err, data) { 
    											 if(err) {  
    												 console.dir(err); 
    											 } 
    											 else { 
    												// console.dir(data); 
    												 //console.log('1');
    												 $scope.ImageprocessingJson='{"access_key":"'+Keys[0]+'" ,"secret_key":"'+Keys[1]+'","bucket_name":"'+bucketName+'","key":"'+FileName+'"}'
    										           ImageprocessingJson =  JSON.parse($scope.ImageprocessingJson);
    									               Imageprocessing.imageprocessing(ImageprocessingJson).then(function (data) {
    									            	   $('#output_predict').html('');
      									            	   $.each(data, function (index, valueobj) {
       									            		 $('#output_predict').append('<div class="row"><div class="col-md-6" style="text-align:right;"><h4>'+valueobj[0]+'</h4></div> <div class="col-md-6" >  <input class="range_1" id="range_'+index+'" type="text" /> </div></div><br/>');
       									            		 
       									            		  $("#range_"+index).ionRangeSlider({
     									                       min: 0,
     									                       max: 100,
     									                       from: parseInt(valueobj[1]),
     									                       from_fixed: true
     									                      });
        									            		 
        									              });
      									            	 $('#predict').removeAttr("disabled","disabled");	 
    									 	  		  },function (errorMessage) {
    									 	  		  console.log(errorMessage);//alert(errorMessage);
    									 	 		  }); 
    									        	   
    											 }
    										     //console.log(err, data) 
    										     }); 
    										  //console.dir(files[i]); 
    										      }
    										 }  
    								  
    							  }
    							  else
    							 {
    								 
    								    var blob = null;
    							        var xhr = new XMLHttpRequest();
    							        xhr.open("GET", imageurl);
    							        xhr.responseType = "blob";//force the HTTP response, response-type header to be blob
    							        xhr.onload = function()
    							        {
    							            blob = xhr.response;//xhr.response is now a blob object
    							            var file = new File([blob], "image.png", {type:"image/png"});


    							            var bucket = new AWS.S3({params: {Bucket: bucketName}});
    										FileName = Math.floor(Math.random() * 26) + Date.now()+'.png';
    							            //FileName="imagenow.png";
    										var options = {partSize: 10 * 1024 * 1024, queueSize: 1};
    										var params = {Key: FileName, ContentType: file.type, Body: file}; 
     										 bucket.upload( params,options ).
    									    on('httpUploadProgress', function(evt) {
    									    }).
    									   send(function(err, data) { 
    										 if(err) {  
    											 console.dir(err); 
    										 } 
    										 else { 
    											 //console.log('2');
    											  $scope.ImageprocessingJson='{"access_key":"'+Keys[0]+'" ,"secret_key":"'+Keys[1]+'","bucket_name":"'+bucketName+'","key":"'+FileName+'"}'
    									           ImageprocessingJson =  JSON.parse($scope.ImageprocessingJson);
    								               Imageprocessing.imageprocessing(ImageprocessingJson).then(function (data) {
    								            	   $('#output_predict').html('');
  									            	   $.each(data, function (index, valueobj) {
   									            		 $('#output_predict').append('<div class="row"><div class="col-md-6" style="text-align:right;"><h4>'+valueobj[0]+'</h4></div> <div class="col-md-6" >  <input class="range_1" id="range_'+index+'" type="text" /> </div></div><br/>');
   									            		 
   									            		  $("#range_"+index).ionRangeSlider({
 									                       min: 0,
 									                       max: 100,
 									                       from: parseInt(valueobj[1]),
 									                       from_fixed: true
 									                      });
   									            		 $('#predict').removeAttr("disabled","disabled");	 
    									              });
    								 	  		  },function (errorMessage) {
    								 	  		  console.log(errorMessage);//alert(errorMessage);
    								 	 		  }); 
    								        	   
    										 }
    									     //console.log(err, data) 
    									     }); 
    										  
    							        }
    							        xhr.send();
    							        
    							 }
        		 
        		 
        	 }	 
        	 
            
			 
  	    	
      	       
      	       
      	       
      	       //var imageurl="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Nagarhole_Kabini_Karnataka_India%2C_Leopard_September_2013.jpg/220px-Nagarhole_Kabini_Karnataka_India%2C_Leopard_September_2013.jpg";
        	  //var img="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Nagarhole_Kabini_Karnataka_India%2C_Leopard_September_2013.jpg/220px-Nagarhole_Kabini_Karnataka_India%2C_Leopard_September_2013.jpg";
        	  //{"img":"https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Nagarhole_Kabini_Karnataka_India%2C_Leopard_September_2013.jpg/220px-Nagarhole_Kabini_Karnataka_India%2C_Leopard_September_2013.jpg"}
        	/*var imageurl= $("#image-url").val();
        	if(imageurl != "")
        	   {
        	   $scope.ImageprocessingJson= '{"type":"URL" ,"data":"'+imageurl+'"}';
        	   }
           else
        	   {
        	   var imagefile= $("#image_files").attr("src"); 
         	   $scope.ImageprocessingJson= '{"type":"FILE" ,"data":"'+imagefile+'"}';
        	   }
        	   */
		   
        	
        	
        	
        	 
        })
        
        
        
        $rootScope.settings.layout.pageContentWhite = true;
        $rootScope.settings.layout.pageBodySolid = false;
        $rootScope.settings.layout.pageSidebarClosed = false;
    });
}]);