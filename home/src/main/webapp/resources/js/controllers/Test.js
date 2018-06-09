angular.module('WebApp').controller('TestController', function($rootScope, $scope, $http, $timeout,$compile,$state) {
    $scope.$on('$viewContentLoaded', function() {   
        // initialize core components
        App.initAjax();
        
    });
  
    // set sidebar closed and body solid layout mode
    $rootScope.settings.layout.pageContentWhite = true;
    $rootScope.settings.layout.pageBodySolid = false;
    $rootScope.settings.layout.pageSidebarClosed = false;
});