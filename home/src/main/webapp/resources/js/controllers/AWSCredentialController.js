/* Setup bucket page controller */
angular.module('WebApp').controller('AWSCredentialsController', ['$state', '$stateParams', '$rootScope', '$scope', '$filter', 'settings', 'ListAWSCredential', 'Bucket', function($state, $stateParams, $rootScope, $scope, $filter, settings, ListAWSCredential, Bucket) {


    $scope.$on('$viewContentLoaded', function() {

        // initialize core components
        App.initAjax();
        $scope.Account = $stateParams.Account;
        $scope.AwsId = parseInt($stateParams.Id);
        $scope.userId= $rootScope.user_data.userId; 

        //initialize form value
        $scope.formData = {
            CredentialsName: '',
            accesskey: '',
            secretKey: '',
        };

       //validate url for add/edit
        if ($scope.Account == 'edit')

        {
            if ($scope.AwsId == "") {
                $state.go('awscredential', {
                    'Account': 'new',
                    'Id': ''
                }, {
                    reload: true
                });
            }
        }
        if ($scope.Account == "edit" && $scope.AwsId != "") {

            if ($rootScope.buildjson_AWSCredentials_data != null) {
                var filtered = $filter('filter')($rootScope.buildjson_AWSCredentials_data, {
                    id: $scope.AwsId
                }, true);

                if (filtered.length == 0 || filtered == undefined) {
                    $state.go('awscredential', {
                        'Account': 'new',
                        'Id': ''
                    }, {
                        reload: true
                    });
                } else {
                    $scope.Id = filtered[0].id;
                    $scope.mainaccountStatus = filtered[0].mainaccountStatus;
                    $scope.formData = {
                        CredentialsName: filtered[0].awscredentialsName,
                        accesskey: filtered[0].accessKey,
                        secretKey: filtered[0].secretKey
                    };
                }
            }

        }

        //Add/Edit S3Credential value
        $scope.S3CredentialSubmit = function() {


            if ($scope.Account == "edit" && $scope.AwsId != "") {
                if ($scope.formData.CredentialsName != "" && $scope.formData.accesskey != "" && $scope.formData.secretKey != "" && $scope.mainaccountStatus != 1); {
                    $scope.saveS3CredentialJson = [{
                        id: $scope.Id,
                        awscredentialsName: $scope.formData.CredentialsName,
                        secretKey: $scope.formData.secretKey,
                        accessKey: $scope.formData.accesskey,
                        parentId: $scope.userId,
                        mainaccountStatus: $scope.mainaccountStatus,
                    }];
                    ListAWSCredential.saveAWSCredential($scope.saveS3CredentialJson).then(function(data) {
                        if(data[0] != null){
                        swal({
                            type: 'success',
                            title: 'Request finished!',
                            html: 'AWS account :"' + $scope.formData.CredentialsName + '" edit successfully: '
                        });
                        $rootScope.buildjson_AWSCredentials_data = data[0];
                        }else
                        { swal(  'Error!','Wrong AWS Account Credentials.', 'error' ); } 
                        
                        $state.go('awscredential', {
                            'Account': 'new',
                            'Id': ''
                        }, {
                            reload: true
                        });
                    }, function(errorMessage) {
                    	swal(  'Error!','Wrong AWS Account Credentials.', 'error' );
                    });
                }

            } else {

                var trashbucketName = "tashbucket" + Date.now() + '.' + $scope.userId;
                $scope.CreateBucketJson = '{"accesskey": "' + $scope.formData.accesskey + '", "secretKey": "' + $scope.formData.secretKey + '","bucketName": "' + trashbucketName + '" }';
                $scope.CreateBucketJson = JSON.parse($scope.CreateBucketJson);

                Bucket.CreateBucket($scope.CreateBucketJson).then(function(data) {
                    if (data.status != "" && data.status == 1) {
                        if ($scope.formData.CredentialsName != "" && $scope.formData.accesskey != "" && $scope.formData.secretKey != ""); {
                            $scope.saveS3CredentialJson = [{
                                id: null,
                                awscredentialsName: $scope.formData.CredentialsName,
                                secretKey: $scope.formData.secretKey,
                                accessKey: $scope.formData.accesskey,
                                parentId: $scope.userId,
                                trashbucketName: trashbucketName,
                                mainaccountStatus: 0,
                            }];
                            ListAWSCredential.saveAWSCredential($scope.saveS3CredentialJson).then(function(data) {
                            	if(data[0] != null){
                            		swal({
                                    type: 'success',
                                    title: 'Request finished!',
                                    html: 'AWS account : "' + $scope.formData.CredentialsName + '" added successfully: '
                                });

                                $rootScope.buildjson_AWSCredentials_data = data[0];
                            	}
                            	else
                                { swal(  'Error!','Wrong AWS Account Credentials.', 'error' ); } 
                                $state.go('awscredential', {
                                    'Account': 'new',
                                    'Id': ''
                                }, {
                                    reload: true
                                });
                            }, function(errorMessage) {
                            	swal({
                                    type: 'success',
                                    title: 'Request finished!',
                                    html: 'AWS account :"' + $scope.formData.CredentialsName + '" edit successfully: '
                                });
                            });

                        }

                    } else {
                    	swal(  'Error!','Wrong AWS Account Credentials.', 'error' );
                    }
                }, function(errorMessage) {
                    swal(
                        'Error!',
                        'Wrong AWS Account Credentials.',
                        'error'
                    )
 
                });
            }
        };



        $rootScope.settings.layout.pageContentWhite = true;
        $rootScope.settings.layout.pageBodySolid = false;
        $rootScope.settings.layout.pageSidebarClosed = false;
    });
}]);