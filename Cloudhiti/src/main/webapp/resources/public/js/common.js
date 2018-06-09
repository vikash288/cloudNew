angular.module('common', ['ngMessages'])
    .controller('BaseFormCtrl', ['$scope', '$http', function ($scope, $http) {

        var fieldWithFocus;

        $scope.vm = {
            submitted: false,
			appReady: true,
        };
		
         $scope.preparePostData = function () {
            var username = $scope.vm.username != undefined ? $scope.vm.username : '';
            var password = $scope.vm.password != undefined ? $scope.vm.password : '';
             return 'username=' + username + '&password=' + password;
        }

        $scope.login = function (username, password) {
        	//$('.wronginput').hide();
        	//$('.wrongresponse').show();
        	var postData = $scope.preparePostData();

            $http({
                method: 'POST',
                url: 'authenticate',
                data: postData,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "X-Login-Ajax-call": 'true'
                }
            })
            .then(function(response) {
                 if (response.data == 'ok') {
                     window.location.replace('resources/index.html');
                }
                else {
                	$('.wronginput').hide();
                	$('.wrongresponse').show();
                 }
            });
        }


    }])