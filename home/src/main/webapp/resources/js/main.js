/***
Metronic AngularJS App Main Script
***/

/* Metronic App */
var WebApp = angular.module("WebApp", [
    "ui.router", 
    "ui.bootstrap", 
    "oc.lazyLoad",  
    "ngSanitize",
    "spring-security-csrf-token-interceptor",
    "frontendServices",
   "multiselect-searchtree",
   "multi-select-tree"
 
 ]); 


/* Configure ocLazyLoader(refer: https://github.com/ocombe/ocLazyLoad) */
WebApp.config(['$ocLazyLoadProvider', function($ocLazyLoadProvider) {
    $ocLazyLoadProvider.config({
        // global configs go here
    });
}]);

//AngularJS v1.3.x workaround for old style controller declarition in HTML
WebApp.config(['$controllerProvider', function($controllerProvider) {
  // this option might be handy for migrating old apps, but please don't use it
  // in new ones!
  $controllerProvider.allowGlobals();
}]);

/********************************************
 END: BREAKING CHANGE in AngularJS v1.3.x:
*********************************************/

/* Setup global settings */
WebApp.factory('settings', ['$rootScope', function($rootScope) {
	// supported languages
    var settings = {
        layout: {
            pageSidebarClosed: false, // sidebar menu state
            pageContentWhite: true, // set page content layout
            pageBodySolid: false, // solid body color state
            pageAutoScrollOnLoad: 1000 // auto scroll to top on page load
        },
        assetsPath: './assets',
        globalPath: './assets/global',
        layoutPath: './assets/layouts/layout',
    };

    $rootScope.settings = settings;

    return settings;
}]);

/* Setup App Main Controller */
WebApp.controller('AppController', ['$scope', '$rootScope','UserService','ListAWSCredential','ListServerCredential','ListJob','$state','$window','ListBucket','Schedule','ListWorkFlow', function($scope, $rootScope,UserService,ListAWSCredential,ListServerCredential,ListJob,$state,$window,ListBucket,Schedule,ListWorkFlow) {
	
	//Init Variable
	$rootScope.buildjson_AWSCredentials_data=null;
 	$rootScope.buildjson_ServerCredentials_data = null;
	$rootScope.buildjson_Job_data= null;
	$rootScope.user_data;
	$scope.userId=null;
	
	//the Context Menu
	$scope.menuawsaccountS3Credentials = [
	     		                         ['Edit Account', function ($itemScope) {
	     		                        	 $state.go('awscredential' , { 'Account': 'edit','Id':$itemScope.buildjson.id },{reload: true});
	     		                             }],
	                                      ['Delete Account', function ($itemScope) {
	                                    	  $scope.deleteawsacount($itemScope.buildjson.id);
	                                      }]
	                                  ]; 
	
	$scope.menuawsaccount = [
                             ['Configure AWS Account', function ($itemScope) {
                           	  $state.go('awscredential' , { 'Account': 'new' ,'Id':''} ,{reload: true});
                             }]
                         ]; 
   	$scope.menuserver = [
                                ['Configure Server', function ($itemScope) {
                              	  $state.go('servercredentials',{'Source':'new','Id':''},{reload: true});
                                }]
                            ]; 
   	$scope.menujob = [
                            ['Configure Job', function ($itemScope) {
                          	  $state.go('job', {},{reload: true});
                            }]
                        ]; 
	$scope.menuWorkflow = [
                      ['Configure WorkFlow', function ($itemScope) {
                    	  $state.go('workflow', {},{reload: true});
                      }]
                  ]; 
   	
	
	$scope.menuSchedule = [
	                       ['Configure Schedule', function ($itemScope) {
	                     	  $state.go('schedule', {},{reload: true});
	                       }]
	                   ]; 
	    	
	
	
   	$scope.menujobOndemand = [
 	     		                         /*['View Job', function ($itemScope) {
 	     		                        	// console.log($itemScope.buildjson);
 	     		                        	 $state.go('editjob',{'Id': $itemScope.buildjson.id},{reload: true});     
 	     		                             }]
 	     		                         ,*/
 	     		                         ['Run On demand', function ($itemScope) {
 	     		                        	 $scope.menujobOndemandfunction($itemScope.buildjson);     
 	     		                             }]
 	                                  ]; 
   	
 
   	$scope.menuserverCredentials = [
   	     		                         ['Edit Source', function ($itemScope) {
   	     		                         $state.go('servercredentials' , { 'Source': 'edit','Id':$itemScope.buildjson.id },{reload: true});   
   	     		                             }],
   	                                      /*['Delete Source', function ($itemScope) {
   	                                    	 $scope.deletesourceacount($itemScope.buildjson.id); 
   	                                      }]*/
   	                                  ]; 
    
	
   	$scope.AWSCredentialsData = function()
   	{
 		 
   		ListAWSCredential.searchAWSCredentials($scope.userId).then(function (data) {
				$rootScope.buildjson_AWSCredentials_data=data.awscredential;
				//console.log($rootScope.buildjson_AWSCredentials_data);//alert(angular.toJson($rootScope.buildjson_AWSCredentials_data,true));
		},function (errorMessage) { 
			$window.location.reload();
		});
   	}
   	//
 	
	$scope.getUserInfo = function()
   	{
 		 
		UserService.getUserInfo().then(function (data) {
				$rootScope.user_data=data;
				$scope.userId= $rootScope.user_data.userId;  
				$scope.AWSCredentialsData();//alert(angular.toJson($rootScope.buildjson_AWSCredentials_data,true));
		},function (errorMessage) { 
			$window.location.reload();
		});
   	}
    /*//Is localStorage available? 
    function supports_html5_storage() {
    try {
    return 'localStorage' in window && window['localStorage'] !== null;
    } catch (e) {
    return false;
    }}
     
    //And how to get and set variables?
     
    // get
    var foo = localStorage.getItem("bar");
    // or with use of brackets
    var foo = localStorage["bar"];
     
    //set
    localStorage.setItem("bar", foo);
    // or with use of brackets 
    localStorage["bar"] = foo;*/
    
    if($rootScope.user_data == null  )
   	{
   		 $scope.getUserInfo();
   	}
	 
   	
   	$scope.getawsacount = function(obj)
	{ 

   	    var className=angular.element('#AWSAccount').attr('class');
    		if(className == 'nav-item')
   		{
    	ListAWSCredential.searchAWSCredentials($scope.userId).then(function (data) {
 				 $rootScope.buildjson_AWSCredentials_data=data.awscredential;
 	    	    //alert(angular.toJson($rootScope.buildjson_S3Credentials_data,true));
   			},function (errorMessage) { 
 			    angular.element('#AWSAccount').removeClass('open');
	   			angular.element('#AWSAccount').children().next().hide()
   			});
   	    }
     	
	}
   	 
	$scope.getserverCredentials = function(obj)
	{ 

   	    var className=angular.element('#ServerCredentials').attr('class');
    		if(className == 'nav-item')
   		{
    			ListServerCredential.searchServerCredentials($scope.userId).then(function (data) {
     	                $rootScope.buildjson_ServerCredentials_data=data.serverCredential;
     	            },function (errorMessage) { 
     	            	angular.element('#ServerCredentials').removeClass('open');
     		   			angular.element('#ServerCredentials').children().next().hide()
    	            });
    	  }
    		
  
	}
	
	$scope.getjobs = function(obj)
	{ 

   	    var className=angular.element('#AllJobs').attr('class');
    		if(className == 'nav-item')
   		{
    			  
    			ListJob.searchJobs($scope.userId).then(function (data) {
     					$rootScope.buildjson_Job_data= null;
    					$rootScope.buildjson_Job_data=data.jobs;
//    					console.log(data.jobs);
    	            },function (errorMessage) { 
    	            	angular.element('#AllJobs').removeClass('open');
     		   			angular.element('#AllJobs').children().next().hide()
    	            }); 
    	  }
    		
  
	}
	
	$scope.getworkflows = function(obj)
	{ 

   	    var className=angular.element('#AllWorkFlows').attr('class');
    		if(className == 'nav-item')
   		{
     			ListWorkFlow.searchWorkFlows($scope.userId).then(function (data) {
     	               $rootScope.buildjson_WorkFlow_data=data.workflows;
    	            },function (errorMessage) { 
    	            	angular.element('#AllWorkFlows').removeClass('open');
     		   			angular.element('#AllWorkFlows').children().next().hide()
    	            }); 
    	  }
    		
  
	}
	
	$scope.getschedules = function(obj)
	{ 

   	    var className=angular.element('#AllSchedules').attr('class');
    		if(className == 'nav-item')
   		{
    			Schedule.searchSchedules($scope.userId).then(function (data) {
     	               
     	               $rootScope.buildjson_Schedule_data=data.schedules;
    	            },function (errorMessage) { 
    	            	angular.element('#AllSchedules').removeClass('open');
     		   			angular.element('#AllSchedules').children().next().hide()
    	            }); 
    	  }
    		
  
	}
	
	//$scope.getserverCredentials();
	$scope.deleteawsacount = function(awsId)
	{
		 
		
		swal({
  		  title: "Are you sure?",
  		  text: "You will not be able to recover this account information!",
  		  type: "warning",
  		  showCancelButton: true,
  		  confirmButtonColor: "#c14067",
  		  cancelButtonColor: '#d33',
  		  confirmButtonText: "Yes, delete it!",
  		  cancelButtonText: "No, cancel plz!",
 		}).then(function () {
			  var s3credentialIds=[parseInt(awsId)];
 			  ListAWSCredential.deleteS3Credentials(s3credentialIds).then(function (data) {
  				swal("Deleted!", "Your AWS Account has been deleted.", "success");
  				 $window.location.reload();
  				 $state.go('dashboard', {},{reload: true});
           	 },function (errorMessage) { 
           		swal("warning!", "Plz try again !", "warning");
           		 $window.location.reload();
           		 $state.go('dashboard', {},{reload: true});
           	 });   
  		    
  		 });
	}
	 
 	$scope.menujobOndemandfunction = function(data)
	{
		  
 		swal.setDefaults({
			   confirmButtonColor: "#DD6B55", 
	 	       confirmButtonText: 'Wait &rarr;',
	   		   animation: false,
	 		   showLoaderOnConfirm: true,
	 		   progressSteps: ['1', '2'],
	 		   progressStepsDistance:'80px',
	 		   allowEscapeKey:false,
	 		   allowOutsideClick:false,
	 		//   allowEnterKey:false,
	 		   onOpen: function(){
	           swal.clickConfirm();
	           },
	 		   preConfirm: function() {
	   			 return new Promise(function (resolve, reject) {
	   			 var step=swal.getQueueStep();	
	   				 
	   				if(step == '0')
	   				{
	   					$scope.Json=JSON.parse( data.jobjson);
	   					$scope.Json["jobId"]= data.id;
	   					resolve()
	   				}
	   				if(step == '1')
	   				{
	   					 
	   				     ListServerCredential.runjob($scope.Json,$scope.Json.api).then(function (data) {
	   						if(data.ftpconnect ||  data.final_status || data.status)
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
							   swal.resetDefaults();
								}
		   	        	 },function (errorMessage) { 
		   	        		 swal.resetDefaults();
		   	        	 });  
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
	    				title: 'Running',
	    				text: 'Running job'
	    			   }
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
	  
	   		 
			 
	};   
    
	$scope.logout = function()
	{
		UserService.logout().then(function (data) {
		},function (errorMessage) { 
    		alert(errorMessage);
    	});
	}
	 
	$scope.$on('$viewContentLoaded', function() {
        App.initComponents(); // init core components
     	Layout.initContent();
    	//Layout.init(); //  Init entire layout(header, footer, sidebar, etc) on page load if the partials included in server side instead of loading with ng-include directive 
    });
}]);

/***
Layout Partials.
By default the partials are loaded through AngularJS ng-include directive. In case they loaded in server side(e.g: PHP include function) then below partial 
initialization can be disabled and Layout.init() should be called on page load complete as explained above.
***/

/* Setup Layout Part - Header */
WebApp.controller('HeaderController', ['$scope','UserService', function($scope,UserService) {
 
		$scope.$on('$includeContentLoaded', function() {
			 //Layout.init();
			 Layout.initHeader();// init header
        
    });
}]);

/* Setup Layout Part - Sidebar */
WebApp.controller('SidebarController', ['$state', '$scope','$rootScope', function($state, $scope,$rootScope) {
    
	$scope.$on('$includeContentLoaded', function() {
    	 
        Layout.initSidebar($state); // init sidebar
    });
}]);

 // Setup Layout Part - Quick Sidebar 
WebApp.controller('QuickSidebarController', ['$scope', function($scope) {    
   /* $scope.$on('$includeContentLoaded', function() {
       setTimeout(function(){
            QuickSidebar.init(); // init quick sidebar        
        }, 2000)
    });*/
}]); 

/* Setup Layout Part - Theme Panel */
WebApp.controller('ThemePanelController', ['$scope', function($scope) {    
    $scope.$on('$includeContentLoaded', function() {
       // Demo.init(); // init theme panel
    });
}]); 

/* Setup Layout Part - Footer */
WebApp.controller('FooterController', ['$scope', function($scope) {
    $scope.$on('$includeContentLoaded', function() {
        Layout.initFooter(); // init footer
    });
}]);

/* Setup Rounting For All Pages */
WebApp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    // Redirect any unmatched url
    $urlRouterProvider.otherwise("/dashboard.html");  

    $stateProvider

        // Dashboard
        .state('dashboard', {
            url: "/dashboard.html",
            templateUrl: "views/dashboard.html",            
            data: {pageTitle: 'Admin Dashboard'},
            controller: "DashboardController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            './js/controllers/DashboardController.js',
                        ] 
                    });
                }]
            }
        })
        
        // AWS ACCOUNT Page
        .state('awscredential', {
            url: "/awscredential/:Account/:Id",
            templateUrl: "views/awscredential.html",
            //params: { 'BucketName': $stateParams.portfolioId },
            data: {pageTitle: 'AWS Account'},
            controller: "AWSCredentialsController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
    							'./js/controllers/AWSCredentialController.js'
                        ] 
                    });
                }]
            }
        })
        
        
        
        // S3 Page
        .state('s3', {
            url: "/s3/:AWSCredentialId",
            templateUrl: "views/s3.html", 
           /* params: { 'S3CredentialId': 'some default' },*/
            data: {pageTitle: 'AWS S3'},
            controller: "S3Controller",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
							'./assets/global/plugins/bootstrap-toastr/toastr.min.css',
							'./assets/global/plugins/bootstrap-toastr/toastr.min.js',
                            './js/controllers/S3Controller.js'
                        ] 
                    });
                }]
            }
        })
        
        
        // Blank Page
        .state('blank', {
            url: "/blank",
            templateUrl: "views/blank.html",
            //params: { 'BucketName': $stateParams.portfolioId },
            data: {pageTitle: 'Blank Page Template'},
            controller: "BlankController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            './js/controllers/BlankController.js'
                        ] 
                    });
                }]
            }
        })
        
      
         // Blank Page
        .state('servercredentials', {
            url: "/servercredentials/:Source/:Id",
            templateUrl: "views/servercredentials.html",
            //params: { 'BucketName': $stateParams.portfolioId },
            data: {pageTitle: 'Source Credentials'},
            controller: "ServerCredentialsController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            	'./assets/global/plugins/bootstrap-select/css/bootstrap-select.min.css',
    							'./assets/global/plugins/bootstrap-select/js/bootstrap-select.min.js',
    							/*'./assets/global/plugins/ladda/ladda-themeless.min.cs',*/
    							/*'./assets/global/plugins/ladda/spin.min.js',*/
    							/*'./assets/global/plugins/ladda/ladda.min.js',*/
    							/*'./assets/pages/scripts/ui-buttons.js',*/
    							'./js/controllers/ServerCredentialsController.js'
                        ] 
                    });
                }]
            }
        })
        
         // Blank Page
        .state('job', {
            url: "/job",
            templateUrl: "views/job.html",
            //params: { 'BucketName': $stateParams.portfolioId },
            data: {pageTitle: 'Job'},
            controller: "JobController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                                './assets/global/plugins/bootstrap-multiselect/css/bootstrap-multiselect.css',
                                './assets/global/plugins/bootstrap-multiselect/js/bootstrap-multiselect.js',
                                 './assets/global/plugins/components-bootstrap-multiselect.min.js',
    							 './assets/global/plugins/bootstrap-select/css/bootstrap-select.min.css',
    							'./assets/global/plugins/bootstrap-select/js/bootstrap-select.min.js',
    							
    							 
    							'./js/controllers/JobController.js'  
                        ] 
                    });
                }]
            }
        })
        
         // Blank Page
        .state('editjob', {
            url: "/editjob/:Id",
            templateUrl: "views/editjob.html",
            //params: { 'BucketName': $stateParams.portfolioId },
            data: {pageTitle: 'Edit Job'},
            controller: "EditJobController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                                './assets/global/plugins/bootstrap-multiselect/css/bootstrap-multiselect.css',
                                './assets/global/plugins/bootstrap-multiselect/js/bootstrap-multiselect.js',
                                 './assets/global/plugins/components-bootstrap-multiselect.min.js',
    							 './assets/global/plugins/bootstrap-select/css/bootstrap-select.min.css',
    							'./assets/global/plugins/bootstrap-select/js/bootstrap-select.min.js',
    							
    							'./js/controllers/EditJobController.js'  
                        ] 
                    });
                }]
            }
        })
        
          // Blank Page
        .state('redshift', {
            url: "/redshift",
            templateUrl: "views/redshift.html",
            //params: { 'BucketName': $stateParams.portfolioId },
            data: {pageTitle: 'Blank Page Template'},
            controller: "RedshiftController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
    							'./assets/global/plugins/bootstrap-select/css/bootstrap-select.min.css',
    							'./assets/global/plugins/bootstrap-select/js/bootstrap-select.min.js',
    							"./assets/global/plugins/select2/js/select2.full.min.js",
    						    "./assets/global/plugins/jquery-validation/js/jquery.validate.min.js", 
    						    "./assets/global/plugins/jquery-validation/js/additional-methods.min.js" ,		
    						      './assets/global/plugins/bootstrap-wizard/jquery.bootstrap.wizard.min.js',  
    							
    							'./js/controllers/RedshiftController.js'
                        ] 
                    });
                }]
            }
        })

         // Blank Page
        .state('workflow', {
            url: "/workflow",
            templateUrl: "views/workflow.html",
            //params: { 'BucketName': $stateParams.portfolioId },
            data: {pageTitle: 'Workflow Page Template'},
            controller: "WorkflowController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
      							 
      							 "./assets/global/plugins/Gojs/go.js" , 
      							'./assets/global/plugins/bootstrap-select/css/bootstrap-select.min.css',
    							'./assets/global/plugins/bootstrap-select/js/bootstrap-select.min.js',
       							'./js/controllers/WorkflowController.js',
      							/* 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css',*/
                        ] 
                    });
                }]
            }
        })
        
            // Blank Page
        .state('schedule', {
            url: "/schedule",
            templateUrl: "views/schedule.html",
            //params: { 'BucketName': $stateParams.portfolioId },
            data: {pageTitle: 'Workflow Page Template'},
            controller: "ScheduleController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
      							 
        						'./js/controllers/ScheduleController.js',
      							/* 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css',*/
                        ] 
                    });
                }]
            }
        })
        
  // Blank Page
        .state('imageclassification', {
            url: "/imageclassification",
            templateUrl: "views/imageclassification.html",
            //params: { 'BucketName': $stateParams.portfolioId },
            data: {pageTitle: 'Workflow Page Template'},
            controller: "ImageclassificationController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
      							 
        						//'./assets/global/plugins/bootstrap-fileinput/bootstrap-fileinput.css',
        						//'./assets/global/plugins/bootstrap-fileinput/bootstrap-fileinput.js',
        						"./assets/global/plugins/ion.rangeslider/css/ion.rangeSlider.css",
        						"./assets/global/plugins/ion.rangeslider/css/ion.rangeSlider.skinFlat.css",
        						"./assets/global/plugins/ion.rangeslider/js/ion.rangeSlider.min.js",
         						'./assets/global/plugins/bootstrap-imageupload/css/bootstrap-imageupload.css',
        						'./assets/global/plugins/bootstrap-imageupload/js/bootstrap-imageupload.js',
         						'./js/controllers/ImageclassificationController.js',
      							/* 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css',*/
                        ] 
                    });
                }]
            }
        })
  // Report Page
        .state('dynamicreport', {
            url: "/dynamicreport",
            templateUrl: "views/dynamicreport.html",
            //params: { 'BucketName': $stateParams.portfolioId },
            data: {pageTitle: 'Dynamic Report Page'},
            controller: "DynamicreportController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
      							 
        						'./assets/global/plugins/bootstrap-select/css/bootstrap-select.min.css',
    							'./assets/global/plugins/bootstrap-select/js/bootstrap-select.min.js',
    							 'https://code.highcharts.com/highcharts.js',
    							/*  'https://code.highcharts.com/modules/exporting.js',*/
    							  'https://d3js.org/d3.v4.min.js',
    							'./js/controllers/DynamicreportController.js',
      							/* 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css',*/
                        ] 
                    });
                }]
            }
        })
        
         .state('kafkaservice', {
            url: "/kafkaservice",
            templateUrl: "views/kafkaservice.html",
            //params: { 'BucketName': $stateParams.portfolioId },
            data: {pageTitle: 'Kafka Service Page'},
            controller: "KafkaServiceController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
      						  './js/controllers/KafkaServiceController.js',
                         ] 
                    });
                }]
            }
        })
        
        
        .state('mlreport', {
            url: "/mlreport",
            templateUrl: "views/mlreport.html",
            //params: { 'BucketName': $stateParams.portfolioId },
            data: {pageTitle: 'ML Report Page'},
            controller: "MLController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
      						 
        						'./assets/global/plugins/bootstrap-select/css/bootstrap-select.min.css',
    							'./assets/global/plugins/bootstrap-select/js/bootstrap-select.min.js',
    							'./assets/apps/scripts/mlcharts.js',
    							
    							'https://code.highcharts.com/highcharts.js',
    							'https://code.highcharts.com/modules/exporting.js',
    							'./js/controllers/MLController.js',
                         ] 
                    });
                }]
            }
        })
        
        .state('metadatareport', {
            url: "/metadatareport",
            templateUrl: "views/metadatareport.html",
            //params: { 'BucketName': $stateParams.portfolioId },
            data: {pageTitle: 'Metadata Report Page'},
            controller: "MetaDataReportController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
      						
    							'./js/controllers/MetaDataReportController.js',
                         ] 
                    });
                }]
            }
        })
       
        
         .state('operationaldashboard', {
            url: "/operationaldashboard",
            templateUrl: "views/operationaldashboard.html",
            //params: { 'BucketName': $stateParams.portfolioId },
            data: {pageTitle: 'Operational Dashboard Page'},
            controller: "OperationalDashboardController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
      						 
        						'./assets/global/plugins/bootstrap-select/css/bootstrap-select.min.css',
    							'./assets/global/plugins/bootstrap-select/js/bootstrap-select.min.js',
    							'./assets/global/plugins/datatables/datatables.min.css', 
    	                        './assets/global/plugins/datatables/plugins/bootstrap/datatables.bootstrap.css',

    	                        './assets/global/plugins/datatables/datatables.all.min.js',
    	                        './assets/apps/scripts/mlcharts.js',
    							
    							/*'https://code.highcharts.com/highcharts.js',
    							'https://code.highcharts.com/modules/exporting.js',*/
    							'./js/controllers/OperationalDashboardController.js',
                         ] 
                    });
                }]
            }
        })
        
         
        .state('operational', {
            url: "/operational",
            templateUrl: "views/operational.html",
            //params: { 'BucketName': $stateParams.portfolioId },
            data: {pageTitle: 'Operational Dashboard Page'},
            controller: "OperationalController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
      						 './assets/global/plugins/datatables/datatables.min.css', 
                   './assets/global/plugins/datatables/plugins/bootstrap/datatables.bootstrap.css',

                    './assets/global/plugins/datatables/datatables.all.min.js',
     							'./js/controllers/OperationalController.js',
                         ] 
                    });
                }]
            }
        })
       
         .state('marketingdashboard', {
            url: "/marketingdashboard",
            templateUrl: "views/marketingdashboard.html",
            //params: { 'BucketName': $stateParams.portfolioId },
            data: {pageTitle: 'Marketing Dashboard Page'},
            controller: "MarketingDashboardController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
      						 
     							'./assets/global/plugins/datatables/datatables.min.css', 
    	                        './assets/global/plugins/datatables/plugins/bootstrap/datatables.bootstrap.css',

    	                        './assets/global/plugins/datatables/datatables.all.min.js',
    	                        './js/controllers/MarketingDashboardController.js',
                         ] 
                    });
                }]
            }
        })
        
        .state('twitterdashboard', {
            url: "/twitterdashboard",
            templateUrl: "views/twitterdashboard.html",
            //params: { 'BucketName': $stateParams.portfolioId },
            data: {pageTitle: 'Operational Dashboard Page'},
            controller: "TwitterDashboardController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
      						 
     							'./js/controllers/TwitterDashboardController.js',
                         ] 
                    });
                }]
            }
        })
        
       // Blank Page
        .state('test', {
            url: "/test",
            templateUrl: "views/testview.html",            
            //params: { 'BucketName': 'some default' },
            data: {pageTitle: 'TestController'},
            controller: "TestController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
 							'./js/controllers/Test.js'
                        ] 
                    });
                }]
            }
        }) 
        
        // Blank Page
        .state('bucket', {
            url: "/bucket/:AWSCredentialId/:BucketName",
            templateUrl: "views/bucket.html",            
            //params: { 'BucketName': 'some default' },
            data: {pageTitle: 'Bucket'},
            controller: "BucketController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
/*                            './assets1/global/plugins/dropzone/dropzone.css',
                            './assets1/global/plugins/dropzone/dropzone.js',*/
							'./assets/global/plugins/bootstrap-toastr/toastr.min.css',
							'./assets/global/plugins/bootstrap-toastr/toastr.min.js',
							'./assets/global/plugins/bootstrap-table/bootstrap-table.min.css',
							'./assets/global/plugins/bootstrap-table/bootstrap-table.js',
					        "./assets/global/plugins/icheck/skins/all.css",
					        "./assets/global/plugins/icheck/icheck.min.js",
 
							'./assets/global/plugins/jquery-file-upload/css/jquery.fileupload.css',
							'./assets/global/plugins/bootstrap-select/css/bootstrap-select.min.css',
							'./assets/global/plugins/bootstrap-select/js/bootstrap-select.min.js',
							'./js/controllers/BucketController.js'
                        ] 
                    });
                }]
            }
        }) 

  
}]);

/* Init global settings and run the app */
WebApp.run(["$rootScope", "settings", "$state", function($rootScope, settings, $state) {
    $rootScope.$state = $state; // state to be accessed from view
    $rootScope.$settings = settings; // state to be accessed from view
}]);