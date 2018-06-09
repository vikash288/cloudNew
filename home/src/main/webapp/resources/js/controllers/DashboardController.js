angular.module('WebApp').controller('DashboardController', function($rootScope, $scope, $http, $timeout,$compile,$state) {
    $scope.$on('$viewContentLoaded', function() {   
        // initialize core components
        App.initAjax();
        $scope.userId= $rootScope.user_data.userId; 
        if( $scope.userId == 3)
        	{
        	$state.go('operational' , {} ,{reload: true});
        	}
    });
  /*  var id =  Math.floor(Math.random() * 26) + Date.now();
    var myHTML ='<div id="'+id+'" style="position: fixed;z-index: 999999;" class="toast-bottom-right"   role="alert"><div class="toast toast-success progresstoast" ><button type="button" class="toast-close-button"   ng-click="v()">×</button><div class="toast-title">File Upload</div><div class="toast-message" id="messageid'+id+'"> Uploading....</div></div></div>';
    var myHTML = $compile(myHTML)($scope);
    $('#drop-zone').append( myHTML);
    
    var id =  Math.floor(Math.random() * 26) + Date.now();
    id= id +1;
    var myHTML ='<div id="'+id+'" style="position: fixed;z-index: 999999;" class="toast-bottom-right"   role="alert"><div class="toast toast-success progresstoast" ><button type="button" class="toast-close-button"   ng-click="v()">×</button><div class="toast-title">File Upload</div><div class="toast-message" id="messageid'+id+'"> Uploading....</div></div></div>';
    var myHTML = $compile(myHTML)($scope);
    $('#drop-zone').append( myHTML);
     
    
	$scope.v = function () {
		 alert();
	}*/
	//$scope.v=Date.now();
	
    // set sidebar closed and body solid layout mode
    $rootScope.settings.layout.pageContentWhite = true;
    $rootScope.settings.layout.pageBodySolid = false;
    $rootScope.settings.layout.pageSidebarClosed = false;
});