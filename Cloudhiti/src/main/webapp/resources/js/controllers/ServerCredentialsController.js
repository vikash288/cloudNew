/* Setup bucket page controller */
angular.module('WebApp').controller('ServerCredentialsController', ['$state', '$stateParams', '$rootScope', '$scope', '$filter', 'settings', 'ListServerCredential', 'RDBMS', function($state, $stateParams, $rootScope, $scope, $filter, settings, ListServerCredential, RDBMS) {

	$scope.getServertype = function() {
		 
		ListServerCredential.searchServerTypes().then(function(data) {
             $scope.ServerTypes = data.serverType;
        }, function(errorMessage) {
            $state.go('dashboard', {}, {
                reload: true
            });
        });
    }
    //$scope.getServertype();
    
    $scope.$on('$viewContentLoaded', function() {
        // initialize core components
     	App.initAjax();
     	$scope.userId= $rootScope.user_data.userId; 
     	$scope.SqlType = 1;

        $('.bs-select').selectpicker({
            iconBase: 'fa',
            tickIcon: 'fa-check'
        });
 
        $scope.Source = $stateParams.Source;
        $scope.SourceId = parseInt($stateParams.Id);


        //initialize form value
        $scope.formMain = {
            ServerName: '',
            ID: null
        }
        $scope.formData = {
            port: '',
            ipaddress: '',
            username: '',
            password: '',
        };
        $scope.formData1 = {
            databaseType: 'Mysql',
            port: '',
            ipaddress: '',
            username: '',
            password: '',
            databaseName: ''
        };
        $scope.formData2 = {
            accessKey: '',
            secretKey: ''
        };

        $scope.formData3 = {
            appKey: '',
            appSecret: '',
            consumerKey: '',
            consumerSecret: '',
        };

   
        $scope.radioModel = {};
        $scope.radioModel = {
            servertypeChecked: 1
        };
        $scope.serverType = 'FTP';

        //Server type checked form change
        $scope.servertypeCheckedValue = function() {

            if ($scope.radioModel.servertypeChecked != "" && $scope.radioModel.servertypeChecked == 1) {
                $(".tab-pane").removeClass("active");
                $('#ftpserverform').addClass("active");
            } else if ($scope.radioModel.servertypeChecked != "" && $scope.radioModel.servertypeChecked == 2) {
                $(".tab-pane").removeClass("active");
                $('#sqlserverform').addClass("active");
            } else if ($scope.radioModel.servertypeChecked != "" && $scope.radioModel.servertypeChecked == 3) {
                $(".tab-pane").removeClass("active");
                $('#awss3serverform').addClass("active");
            } else if ($scope.radioModel.servertypeChecked != "" && $scope.radioModel.servertypeChecked == 4) {
                $(".tab-pane").removeClass("active");
                $('#socialmediaserverform').addClass("active");
            } else {}
        }
        
       //validate url for add/edit
        if ($scope.Source == 'edit') {
            if ($scope.SourceId == "") {
                $state.go('dashboard');
            }
        }
        if ($scope.Source == "edit" && $scope.SourceId != "") {
            ListServerCredential.searchServerCredential($scope.userId, parseInt($scope.SourceId)).then(function(data) {
                var filtered = data;

                if (filtered.length == 0 || filtered == undefined) {
                    $state.go('dashboard');
                } else {
                    $scope.Id = filtered.id;
                    $scope.servertypeid = filtered.serverType.id;
                    $scope.radioModel.servertypeChecked = $scope.servertypeid;
                    $scope.servertypeCheckedValue();
                    $scope.formMain = {
                        ServerName: filtered.serverName,
                        ID: $scope.SourceId
                    }

                    if ($scope.servertypeid == 1) {
                        $scope.formData = {
                            port: filtered.port,
                            ipaddress: filtered.ipaddress,
                            username: filtered.username,
                            password: filtered.password,
                        };
                    } else if ($scope.servertypeid == 2) {
                        $("#databaseType").val(filtered.databaseType).selectpicker('refresh');
                        var dburlstring = filtered.ipaddress.split(':');
                        dburlstring = dburlstring[2].split('//')[1];
                        $scope.formData1 = {
                            databaseType: filtered.databaseType,
                            port: filtered.port,
                            ipaddress: dburlstring,
                            username: filtered.username,
                            password: filtered.password,
                            databaseName: ''
                        };
                        if (filtered.databaseType != 'Redshift') {
                            $scope.getDatabase('edit', filtered);
                            $scope.SqlType = 1;

                        } else {
                            $scope.SqlType = 0;
                            $scope.formData1.databaseName = filtered.databaseName;
                        }
                       
                    } else if ($scope.servertypeid == 3) {
                        $scope.formData2 = {
                            accessKey: filtered.accessKey,
                            secretKey: filtered.secretKey
                        };

                    } else if ($scope.servertypeid == 4) {
                        $scope.formData3 = {
                            appKey: filtered.appkey,
                            appSecret: filtered.appsecret,
                            consumerKey: filtered.consumersecret,
                            consumerSecret: filtered.consumerKey,
                        };
                    } else {}

                }

            }, function(errorMessage) {
                $state.go('dashboard', {}, {
                    reload: true
                });
            });
            
        }
       

        $(document).on('change', 'select[name="databaseType"]', function() {
            $scope.formData1 = {
                databaseType: $(this).val(),
                port: '',
                ipaddress: '',
                username: '',
                password: '',
                databaseName: ''
            };
            if ($(this).val() == "Redshift") {

                $scope.SqlType = 0;
                $scope.$apply();
            } else {
                $scope.SqlType = 1;
                $scope.$apply();
            }
        });
        $('#testConnection').on('click', function() {

            $scope.getDatabase1();
        });

        $scope.getDatabase1 = function(formStatus, filtered) {
            if ($scope.formData1.databaseType == 'Mysql') {
                var className = 'com.mysql.jdbc.Driver';
                var hosturl = 'jdbc:mysql://' + $scope.formData1.ipaddress + ':';

            } else if ($scope.formData1.databaseType == 'Redshift') {
                var className = 'com.amazon.redshift.jdbc4.Driver';
                var hosturl = 'jdbc:redshift://' + $scope.formData1.ipaddress + ':';

            } else {
                var className = 'com.mysql.jdbc.Driver';
                var hosturl = 'jdbc:mysql://' + $scope.formData1.ipaddress + ':';

            }

            $scope.AllDatabaseJson = '{"classname": "' + className + '","dburl":"' + hosturl + '","dbport":"' + $scope.formData1.port + '","dbusername":"' + $scope.formData1.username + '","dbpassword":"' + $scope.formData1.password + '","dbname":"' + $scope.formData1.databaseName + '"}';
            $scope.AllDatabaseJson = JSON.parse($scope.AllDatabaseJson)

            RDBMS.AllDatabase($scope.AllDatabaseJson).then(function(data) {
                swal("Success!", "Connection tested", "success");
            }, function(errorMessage) {
                swal(
                    'Oops...',
                    'Wrong credentials',
                    'error'
                )
            });
        }

        $('#load').on('click', function() {
            $scope.formData1.databaseName = '';
            $('select[name="databaseName"]').html('');
            $('select[name="databaseName"]').html('<option  value="">No Database</option>').selectpicker('refresh');

            var $this = $(this);

            if ($scope.formData1.ipaddress != "" && $scope.formData1.port != "" && $scope.formData1.username != "" && $scope.formData1.password != "") {
                $this.button('loading');
                $scope.getDatabase('new', '');
            } else {
                $this.button('error');
                setTimeout(function() {
                    $this.button('reset');
                }, 1000);
            }
            
        });

        $scope.getDatabase = function(formStatus, filtered) {
            if ($scope.formData1.databaseType == 'Mysql') {
                var className = 'com.mysql.jdbc.Driver';
                var hosturl = 'jdbc:mysql://' + $scope.formData1.ipaddress + ':';

            } else if ($scope.formData1.databaseType == 'Redshift') {
                var className = 'com.amazon.redshift.jdbc4.Driver';
                var hosturl = 'jdbc:redshift://' + $scope.formData1.ipaddress + ':';

            } else {
                var className = 'com.mysql.jdbc.Driver';
                var hosturl = 'jdbc:mysql://' + $scope.formData1.ipaddress + ':';

            }

            $scope.AllDatabaseJson = '{"classname": "' + className + '","dburl":"' + hosturl + '","dbport":"' + $scope.formData1.port + '","dbusername":"' + $scope.formData1.username + '","dbpassword":"' + $scope.formData1.password + '"}';
            $scope.AllDatabaseJson = JSON.parse($scope.AllDatabaseJson)
 
            RDBMS.AllDatabase($scope.AllDatabaseJson).then(function(data) {
                $('select[name="databaseName"]').html('');
                $('select[name="databaseName"]').html('<option  value="">Select Database</option>');

                $.each(data.databases, function(index, valueobj) {

                    $('select[name="databaseName"]').append('<option  value="' + valueobj + '">' + valueobj + '</option>').selectpicker('refresh');
                });
                if (formStatus == 'edit') {
                    $scope.formData1.databaseName = filtered.databaseName;
                    $('select[name="databaseName"]').val(filtered.databaseName).selectpicker('refresh');
                }
                $('#load').button('reset');
            }, function(errorMessage) {
                $('#load').button('error');
                setTimeout(function() {
                    $('#load').button('reset');
                }, 1000);
            });

        }

       //Add/Edit ServerCredential value
        $scope.ServerCredentialSubmit = function(servertype) {


            if ($scope.formMain.ServerName == "" || $scope.formMain.ServerName == "undefined" || $scope.formMain.ServerName == undefined) {
                $scope.formMain.error = true;
            } else {

                if ($scope.radioModel.servertypeChecked != "" && servertype == 'FTP') {
                    $scope.saveServerCredentialJson = [{
                        id: $scope.formMain.ID,
                        serverName: $scope.formMain.ServerName,
                        port: parseInt($scope.formData.port),
                        password: $scope.formData.password,
                        username: $scope.formData.username,
                        hosturl: $scope.formData.ipaddress,
                        className: null,
                        databaseType: null,
                        databaseName: null,
                        secretKey: null,
                        accessKey: null,
                        reason: null,
                        appkey: null,
                        appsecret: null,
                        consumersecret: null,
                        consumerKey: null,
                        parentId: $scope.userId,
                        servertypeid: $scope.radioModel.servertypeChecked,
                    }];


                } else if ($scope.radioModel.servertypeChecked != "" && servertype == 'SQL') {
                    if ($scope.formData1.databaseType == 'Mysql') {
                        var className = 'com.mysql.jdbc.Driver';
                        var hosturl = 'jdbc:mysql://' + $scope.formData1.ipaddress + ':';

                    } else if ($scope.formData1.databaseType == 'Redshift') {
                        var className = 'com.amazon.redshift.jdbc4.Driver';
                        var hosturl = 'jdbc:redshift://' + $scope.formData1.ipaddress + ':';

                    } else {
                        var className = 'com.mysql.jdbc.Driver';
                        var hosturl = 'jdbc:mysql://' + $scope.formData1.ipaddress + ':';

                    }

                    $scope.saveServerCredentialJson = [{
                        id: $scope.formMain.ID,
                        servertypeid: $scope.radioModel.servertypeChecked,
                        serverName: $scope.formMain.ServerName,
                        port: parseInt($scope.formData1.port),
                        password: $scope.formData1.password,
                        username: $scope.formData1.username,
                        hosturl: hosturl,
                        className: className,
                        databaseType: $scope.formData1.databaseType,
                        databaseName: $scope.formData1.databaseName,
                        secretKey: null,
                        accessKey: null,
                        reason: null,
                        appkey: null,
                        appsecret: null,
                        consumersecret: null,
                        consumerKey: null,
                        parentId: $scope.userId,
                    }];




                } else if ($scope.radioModel.servertypeChecked != "" && servertype == 'AWS S3') {
                    $scope.saveServerCredentialJson = [{
                        id: $scope.formMain.ID,
                        servertypeid: $scope.radioModel.servertypeChecked,
                        serverName: $scope.formMain.ServerName,
                        port: null,
                        password: null,
                        username: null,
                        hosturl: null,
                        className: null,
                        databaseType: null,
                        databaseName: null,
                        secretKey: $scope.formData2.secretKey,
                        accessKey: $scope.formData2.accessKey,
                        reason: null,
                        appkey: null,
                        appsecret: null,
                        consumersecret: null,
                        consumerKey: null,
                        parentId: $scope.userId,
                    }];

                } else {
                    $scope.saveServerCredentialJson = [{
                        id: $scope.formMain.ID,
                        servertypeid: $scope.radioModel.servertypeChecked,
                        serverName: $scope.formMain.ServerName,
                        port: null,
                        password: null,
                        username: null,
                        hosturl: null,
                        className: null,
                        databaseType: null,
                        databaseName: null,
                        secretKey: null,
                        accessKey: null,
                        reason: null,
                        appkey: $scope.formData3.appKey,
                        appsecret: $scope.formData3.appSecret,
                        consumersecret: $scope.formData3.consumerKey,
                        consumerKey: $scope.formData3.consumerSecret,
                        parentId: $scope.userId,
                    }];

                }


                if ($scope.saveServerCredentialJson.length > 0) {

                    ListServerCredential.saveServerCredential($scope.saveServerCredentialJson).then(function(data) {
                        if ($scope.saveServerCredentialJson[0].id == null) {
                            swal({
                                type: 'success',
                                title: 'Request finished!',
                                html: 'Source Credentials : "' + $scope.formMain.ServerName + '" added successfully: '
                            });

                        } else {
                            swal({
                                type: 'success',
                                title: 'Request finished!',
                                html: 'Source Credentials :"' + $scope.formMain.ServerName + '" Edit successfully: '
                            });
                        }

                        $rootScope.buildjson_ServerCredentials_data = data[0];
                        $state.go('servercredentials', {
                            'Source': 'new',
                            'Id': ''
                        }, {
                            reload: true
                        });;
                    }, function(errorMessage) {
                        
                    });
                }
            }


        
        };
        $rootScope.settings.layout.pageContentWhite = true;
        $rootScope.settings.layout.pageBodySolid = false;
        $rootScope.settings.layout.pageSidebarClosed = false;
    });
}]);