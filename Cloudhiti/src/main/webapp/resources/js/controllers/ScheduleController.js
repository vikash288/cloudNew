/* Setup bucket page controller */
angular.module('WebApp').controller('ScheduleController' , ['$state', '$stateParams','$rootScope', '$scope', 'settings','$filter','Schedule', function($state , $stateParams, $rootScope, $scope,settings,$filter,Schedule ) {

		$scope.$on('$viewContentLoaded', function() {   
        // initialize core components
        App.initAjax();
        $scope.formData = {
        		scheduleName:'',
        		scheduleDetails:'Weekly',
        		scheduleTime: '',
         };
        
        $('.timepicker-24').timepicker({
                autoclose: true,
                minuteStep: 5,
                showSeconds: false,
                showMeridian: false
            });	
        
        $('.timepicker').parent('.input-group').on('click', '.input-group-btn', function(e){
            e.preventDefault();
            $(this).parent('.input-group').find('.timepicker').timepicker('showWidget');
        });

        
        
        
       
        $scope.scheduleSubmit = function()
        {
        	 $scope.ScheduleJson =[{
     			id: null,
     			parentId:1,
     			scheduleName: $scope.formData.scheduleName,
     			scheduleDetails: $scope.formData.scheduleDetails,
      			scheduleTime:$scope.formData.scheduleTime
      			}];
             
         	 
        	 Schedule.saveSchedules($scope.ScheduleJson).then(function (data) {
             	if(data)
             		{
             		swal({
		  			    type: 'success',
		  			    title: 'Request finished!',
		  			    html: 'Schedule :"'+$scope.formData.scheduleName+'" added successfully: '
		  			  });
             		 $state.go('schedule',{},{reload: true});;
             		}
             });
        }
        //Client client = ClientBuilder.newClient();
        
        $rootScope.settings.layout.pageContentWhite = true;
        $rootScope.settings.layout.pageBodySolid = false;
        $rootScope.settings.layout.pageSidebarClosed = false;
    });
}]);
 