angular.module('WebApp').controller('KafkaServiceController' , ['$state', '$stateParams', '$rootScope', '$scope','$filter', 'settings','ListBucket','Bucket','ListAWSCredential','ListServerCredential','ListJob','RDBMS','TwiiterKafka','Kafka','ML','Workflow', function( $state, $stateParams ,$rootScope, $scope,$filter,settings,ListBucket,Bucket,ListAWSCredential,ListServerCredential,ListJob,RDBMS,TwiiterKafka,Kafka,ML,Workflow ) {
	$scope.$on('$viewContentLoaded', function() {   
        // initialize core components
    App.initAjax();
   
    
    $scope.KafkaServiceSubmit = function()
    {
    	 
    }
 
    
    $rootScope.settings.layout.pageContentWhite = true;
    $rootScope.settings.layout.pageBodySolid = false;
    $rootScope.settings.layout.pageSidebarClosed = false;
});
}]);