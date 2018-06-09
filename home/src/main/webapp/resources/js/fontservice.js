var hostAddress="http://54.244.190.214:8080/";  

var hostAddress2='http://54.244.190.214:8080/';
/*var hostAddress3='http://54.218.79.158:8080/';

var hostAddress4='http://54.218.79.158:5001';
*/
//54.213.171.106:8080 54.218.230.76 http://192.168.1.192:8080/ localhost:18080
//http://192.168.1.166/
//http://35.164.158.207s

angular.module('frontendServices', [])
    .service('ListBucket', ['$http', '$q', function($http, $q) {
        return {
        	GetAllBucket: function(GetAllBucketJson) {
                var deferred = $q.defer();
                $http({
                    method: 'POST',
                    url: hostAddress+'Syra/api/s3operation/bucketlists',
                    data: GetAllBucketJson,
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    }
                })
                .then(function (response) {
                    if (response.status == 200) {
                        deferred.resolve(response.data);
                    }
                    else {
                    	deferred.reject("Error" + response.data);
                    }
                });
                
                return deferred.promise;
            },
            GetAllServeFile: function(GetAllServeFileJson) {
                var deferred = $q.defer();
                $http({
                    method: 'POST',
                    url: hostAddress+'Syra/api/ftp/getfileslist',
                    data: GetAllServeFileJson,
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    }
                })
                .then(function (response) {
                    if (response.status == 200) {
                        deferred.resolve(response.data);
                    }
                    else {
                    	deferred.reject("Error" + response.data);
                    }
                });
                
                return deferred.promise;
            },
            GetAllServeFoldersFile: function(GetAllServeFileJson) {
                var deferred = $q.defer();
                $http({
                    method: 'POST',
                    url: hostAddress+'Syra/api/ftp/getfolderfilelist',
                    data: GetAllServeFileJson,
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    }
                })
                .then(function (response) {
                    if (response.status == 200) {
                        deferred.resolve(response.data);
                    }
                    else {
                    	deferred.reject("Error" + response.data);
                    }
                });
                
                return deferred.promise;
            },
            
            FtpToS3Upload: function(FtpToS3UploadJson) {
                var deferred = $q.defer();
                $http({
                    method: 'POST',
                    url: hostAddress+'Syra/api/ftp/ftptos3upload',
                    data: FtpToS3UploadJson,
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    }
                })
                .then(function (response) {
                    if (response.status == 200) {
                        deferred.resolve(response.data);
                    }
                    else {
                    	deferred.reject("Error" + response.data);
                    }
                });
                
                return deferred.promise;
            },
            FtpToMysql: function(FtpToMysqlJson) {
                var deferred = $q.defer();
                $http({
                    method: 'POST',
                    url: hostAddress+'Syra/api/sourcetodestination/ftptodatabase',
                    data: FtpToMysqlJson,
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    }
                })
                .then(function (response) {
                    if (response.status == 200) {
                        deferred.resolve(response.data);
                    }
                    else {
                    	deferred.reject("Error" + response.data);
                    }
                });
                
                return deferred.promise;
            },
            S3ToMysql: function(S3ToMysqlJson) {
                var deferred = $q.defer();
                $http({
                    method: 'POST',
                    url: hostAddress+'Syra/api/sourcetodestination/s3todatabase',
                    data: S3ToMysqlJson,
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    }
                })
                .then(function (response) {
                    if (response.status == 200) {
                        deferred.resolve(response.data);
                    }
                    else {
                    	deferred.reject("Error" + response.data);
                    }
                });
                
                return deferred.promise;
            },
            S3ToRedShift: function(S3ToRedShiftJson) {
                var deferred = $q.defer();
                $http({
                    method: 'POST',
                    url: hostAddress+'Syra/api/sourcetodestination/redshiftdataload',
                    data: S3ToRedShiftJson,
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    }
                })
                .then(function (response) {
                    if (response.status == 200) {
                        deferred.resolve(response.data);
                    }
                    else {
                    	deferred.reject("Error" + response.data);
                    }
                });
                
                return deferred.promise;
            },
            MlMysql: function(MlMysqlJson) {
                var deferred = $q.defer();
                $http({
                    method: 'POST',
                    url: hostAddress+'Syra/api/sourcetodestination/mlkmean',
                    //url: hostAddress+'Syra/api/reporting/getkmeans',
                    data: MlMysqlJson,
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    }
                })
                .then(function (response) {
                    if (response.status == 200) {
                        deferred.resolve(response.data);
                    }
                    else {
                    	deferred.reject("Error" + response.data);
                    }
                });
                
                return deferred.promise;
            },
            
        }
   
	}])	
	
	
	.service('Report', ['$http', '$q', function($http, $q) {
        return {
        	MLReport: function(MLReportJson) {
                var deferred = $q.defer();
 
                $http({
                    method: 'POST',
                    url: hostAddress+'Syra/api/reporting/getkmeans',
                    data: MLReportJson,
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    }
                })
                .then(function (response) {
                    if (response.status == 200) {
                        deferred.resolve(response.data);
                    }
                    else {
                    	deferred.reject("Error" + response.data);
                    }
                });
                
                return deferred.promise;
            },

            MysqlReport: function(MysqlReportJson) {
                var deferred = $q.defer();

                $http({
                    method: 'POST',
                    url: hostAddress+'Syra/api/reporting/getdynamicreports',
                    data: MysqlReportJson,
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    }
                })
                .then(function (response) {
                    if (response.status == 200) {
                        deferred.resolve(response.data);
                    }
                    else {
                    	deferred.reject("Error" + response.data);
                    }
                });

                return deferred.promise;
            },
            
            MysqlReport2: function(MysqlReportJson) {
                var deferred = $q.defer();

                $http({
                    method: 'POST',
                    url: hostAddress+'Syra/api/reporting/getdynamictabledata',
                    data: MysqlReportJson,
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    }
                })
                .then(function (response) {
                    if (response.status == 200) {
                        deferred.resolve(response.data);
                    }
                    else {
                    	deferred.reject("Error" + response.data);
                    }
                });

                return deferred.promise;
            },
           BIResults: function(BIResultsJson) {
                var deferred = $q.defer();

                $http({
                    method: 'POST',
                    url: hostAddress+'Syra/api/reporting/getBIResults',
                    data: BIResultsJson,
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    }
                })
                .then(function (response) {
                    if (response.status == 200) {
                        deferred.resolve(response.data);
                    }
                    else {
                    	deferred.reject("Error" + response.data);
                    }
                });

                return deferred.promise;
            },
        }
        
	}])	
     
	.service('Workflow', ['$http', '$q', function($http, $q) {
        return {
        	WorkflowCheck: function(WorkflowJson) {
                var deferred = $q.defer();
 
                $http({
                    method: 'POST',
                    url: hostAddress+'Syra/api/workflow/startworkflow',
                    data: WorkflowJson,
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    }
                })
                .then(function (response) {
                    if (response.status == 200) {
                        deferred.resolve(response.data);
                    }
                    else {
                    	deferred.reject("Error" + response.data);
                    }
                });
                
                return deferred.promise;
            },
        }
        
	}])	
	
	
    
	.service('Bucket', ['$http', '$q', function($http, $q) {
        return {
        	CreateBucket: function(CreateBucketJson) {
                var deferred = $q.defer();
 
                $http({
                    method: 'POST',
                    url: hostAddress+'Syra/api/s3operation/createbucket',
                    data: CreateBucketJson,
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    }
                })
                .then(function (response) {
                    if (response.status == 200) {
                        deferred.resolve(response.data);
                    }
                    else {
                    	deferred.reject("Error" + response.data);
                    }
                });
                
                return deferred.promise;
            },

            deleteBucket: function(deleteBucketJson) {
                var deferred = $q.defer();

                $http({
                    method: 'DELETE',
                    url: hostAddress+'Syra/api/s3operation/deletebucket',
                    data: deleteBucketJson,
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    }
                })
                .then(function (response) {
                    if (response.status == 200) {
                        deferred.resolve(response.data);
                    }
                    else {
                    	deferred.reject("Error" + response.data);
                    }
                });

                return deferred.promise;
            },

            getBucketContian: function(getBucketContianJson) {
                var deferred = $q.defer();
             
                $http({
                    method: 'POST',
                   // url: 'http://35.164.17.42:8080/Syra/api/s3operation/bucketcontains',
                    url: hostAddress+'Syra/api/s3operation/bucketcontains',
                    data: getBucketContianJson,
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "text/plain, application/json"
                    }
                })
                .then(function (response) {
                	if (response.status == 200) {
                        deferred.resolve(response.data);
                    }
                    else {
                    	deferred.reject("Error" + response.data);
                    }
                });

                return deferred.promise;
            },
            getBucketProperties: function(getBucketPropertiesJson) {
                var deferred = $q.defer();
             
                $http({
                    method: 'POST',
                    url: hostAddress+'Syra/api/s3operation/bucketdetails',
                    data: getBucketPropertiesJson,
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "text/plain, application/json"
                    }
                })
                .then(function (response) {
                	if (response.status == 200) {
                        deferred.resolve(response.data);
                    }
                    else {
                    	deferred.reject("Error" + response.data);
                    }
                });

                return deferred.promise;
            },
            uploadfileBucket: function(uploadfileBucketJson) {
                var deferred = $q.defer();
                alert(angular.toJson(uploadfileBucketJson,true));
                $http({
                    method: 'POST',
                    url: 'http://35.164.17.42:8080/Syra/api/s3operation/fileupload',
                    data: uploadfileBucketJson,
                    headers: {
                        "Content-Type": "application/json",
                       // "Accept": "text/plain, application/json"
                    }
                })
                .then(function (response) {
                	if (response.status == 200) {
                        deferred.resolve(response.data);
                    }
                    else {
                    	deferred.reject("Error" + response.data);
                    }
                });

                return deferred.promise;
            }
        }
    }])
    .service('RDBMS', ['$http', '$q', function($http, $q) {
        return {
        	AllDatabase: function(AllDatabaseJson) {
                var deferred = $q.defer();
                
                $http({
                    method: 'POST', 
                    url: hostAddress+'Syra/api/sourcetodestination/showdatabases',
                    data: AllDatabaseJson,
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    }
                })
                .then(function (response) {
                    if (response.status == 200) {
                        deferred.resolve(response.data);
                    }
                    else {
                    	deferred.reject("Error" + response.data);
                    }
                });
                
                return deferred.promise;
            },
            AllTables: function( AllTablesJson) {
                var deferred = $q.defer();
                $http({
                    method: 'POST', 
                    url: hostAddress+'Syra/api/sourcetodestination/showtables',
                    data: AllTablesJson,
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    }
                })
                .then(function (response) {
                    if (response.status == 200) {
                        deferred.resolve(response.data);
                    }
                    else {
                    	deferred.reject("Error" + response.data);
                    }
                });
                
                return deferred.promise;
            },
            AllColumns: function(AllColumnsJson) {
                var deferred = $q.defer();
 
                $http({
                    method: 'POST', 
                    url: hostAddress+'Syra/api/sourcetodestination/showcolumn',
                    data: AllColumnsJson,
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    }
                })
                .then(function (response) {
                    if (response.status == 200) {
                        deferred.resolve(response.data);
                    }
                    else {
                    	deferred.reject("Error" + response.data);
                    }
                });
                
                return deferred.promise;
            },
            Mysqltransformations: function(MysqltransformationJson) {
                var deferred = $q.defer();
 
                $http({
                    method: 'POST', 
                    url: hostAddress+'Syra/api/dbmstransformation/mysqltransformation',
                    data: MysqltransformationJson,
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    }
                })
                .then(function (response) {
                    if (response.status == 200) {
                        deferred.resolve(response.data);
                    }
                    else {
                    	deferred.reject("Error" + response.data);
                    }
                });
                
                return deferred.promise;
            },
           
        }
    }])
	.service('BucketContain', ['$http', '$q', function($http, $q) {
        return {
        	CreateBucketFolder: function(CreateBucketFolderJson) {
                var deferred = $q.defer();

                $http({
                    method: 'POST',
                    url: hostAddress+'Syra/api/s3operation/createfolder',
                    data: CreateBucketFolderJson,
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "text/plain, application/json"
                    }
                })
                .then(function (response) {
                    if (response.status == 200) {
                        deferred.resolve(response.data);
                    }
                    else {
                        deferred.reject('Error'+response.data);
                    }
                });

                return deferred.promise;
            },

            DeleteBucketFolder: function(DeleteBucketFolderJson) {
                var deferred = $q.defer();

                $http({
                    method: 'DELETE',
                    url: hostAddress+'Syra/api/s3operation/deletefolder',
                    data: DeleteBucketFolderJson,
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "text/plain, application/json"
                    }
                })
                .then(function (response) {
                    if (response.status == 200) {
                        deferred.resolve(response.data);
                    }
                    else {
                    	deferred.reject('Error'+response.data);
                    }
                });

                return deferred.promise;
            },
            
            BucketObjectPreview: function(BucketObjectPreviewJson) {
                var deferred = $q.defer();

                $http({
                    method: 'POST',
                    url: hostAddress+'Syra/api/s3operation/filepreview',
                    data: BucketObjectPreviewJson,
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "text/plain, application/json"
                    }
                })
                .then(function (response) {
                    if (response.status == 200) {
                        deferred.resolve(response.data);
                    }
                    else {
						deferred.reject("Error saving folders: " + response.data);
                    }
                });

                return deferred.promise;
            },
            
            BucketObjectDetails: function(BucketObjectDetailsJson) {
                var deferred = $q.defer();

                $http({
                    method: 'POST',
                    url: hostAddress+'Syra/api/s3operation/getobjectdetails',
                    data: BucketObjectDetailsJson,
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "text/plain, application/json"
                    }
                })
                .then(function (response) {
                    if (response.status == 200) {
                        deferred.resolve(response.data);
                    }
                    else {
						deferred.reject("Error saving folders: " + response.data);
                    }
                });

                return deferred.promise;
            },
            
            
        }
    }])
    
    
    .service('Kafka', ['$http', '$q', function($http, $q) {
        return {
        	createtopic: function(KafkaJson) {
                var deferred = $q.defer();
                $http({
                   method: 'POST',
                   url: hostAddress2+'Syra/api/streaming/kafka/createtopic',
                   data: KafkaJson,
                   headers: {
                          "Content-Type": "application/json",
                          "Accept": "application/json"
                   }
                })
                .then(function (response) {
                    if (response.status == 200) {
                        deferred.resolve(response.data);
                    }
                    else {
                    	deferred.reject("Error" + response.data);
                    }
                });
                
                return deferred.promise;
            },  
            Twittersteaming: function(twittersteamingJson) {
                var deferred = $q.defer();
                $http({
                   method: 'POST',
                   url: hostAddress2+'Syra/api/streaming/kafka/twitterstream',
                   data: twittersteamingJson,
                   headers: {
                          "Content-Type": "application/json",
                          "Accept": "application/json"
                   }
                })
                .then(function (response) {
                    if (response.status == 200) {
                        deferred.resolve(response.data);
                    }
                    else {
                    	deferred.reject("Error" + response.data);
                    }
                });
                
                return deferred.promise;
            },
            StopTwittersteaming: function() {
                var deferred = $q.defer();
                $http({
                   method: 'POST',
                   url: hostAddress2+'Syra/api/streaming/kafka/stoptwitterstreaming',
                 //  data: null,
                   headers: {
                          "Content-Type": "application/json",
                          "Accept": "application/json"
                   }
                })
                .then(function (response) {
                    if (response.status == 200) {
                        deferred.resolve(response.data);
                    }
                    else {
                    	deferred.reject("Error" + response.data);
                    }
                });
                
                return deferred.promise;
            },
            Kafkadashboard: function(KafkadashboardJson) {
                var deferred = $q.defer();
                $http({
                   method: 'POST',
                   url: hostAddress2+'Syra/api/streaming/kafka/kafkadashboard',
                   data: KafkadashboardJson,
                   headers: {
                          "Content-Type": "application/json",
                          "Accept": "application/json"
                   }
                })
                .then(function (response) {
                    if (response.status == 200) {
                        deferred.resolve(response.data);
                    }
                    else {
                    	deferred.reject("Error" + response.data);
                    }
                });
                
                return deferred.promise;
            },
            realtimeweatherproducer: function(realtimeweatherproducerJson) {
                var deferred = $q.defer();
                $http({
                   method: 'POST',
                   url: hostAddress2+'Syra/api/streaming/kafka/realtimeweatherproducer',
                   data: realtimeweatherproducerJson,
                   headers: {
                          "Content-Type": "application/json",
                          "Accept": "application/json"
                   }
                })
                .then(function (response) {
                    if (response.status == 200) {
                        deferred.resolve(response.data);
                    }
                    else {
                    	deferred.reject("Error" + response.data);
                    }
                });
                
                return deferred.promise;
            },
            realtimeweatherconsumer: function(realtimeweatherconsumerJson) {
                var deferred = $q.defer();
                $http({
                   method: 'POST',
                   url: hostAddress2+'Syra/api/streaming/kafka/realtimeweatherconsumer',
                   data: realtimeweatherconsumerJson,
                   headers: {
                          "Content-Type": "application/json",
                          "Accept": "application/json"
                   }
                })
                .then(function (response) {
                    if (response.status == 200) {
                        deferred.resolve(response.data);
                    }
                    else {
                    	deferred.reject("Error" + response.data);
                    }
                });
                
                return deferred.promise;
            }
            
        }
   
    }])	

    .service('ML', ['$http','$q', function($http, $q) {
        return {
        	Kmean: function(KmeanJson) {
                var deferred = $q.defer();

                 $http({
                    method: 'POST',
                    url: hostAddress2+'kmeans/',
                    data: KmeanJson,
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "text/plain, application/json"
                    }
                 }) 
                .then(function (response) {
                    if (response.status == 200) {
                        deferred.resolve(response.data);
                    }
                    else {
                    	deferred.reject("Error" + response.data);
                    }
                });
                
                
                return deferred.promise;
            },
            
            Validate: function(KmeanJson) {
                var deferred = $q.defer();

                 $http({
                    method: 'POST',
                    url: hostAddress+'floodmodelvalidate/',
                    data: KmeanJson,
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "text/plain, application/json"
                    }
                 }) 
                .then(function (response) {
                    if (response.status == 200) {
                        deferred.resolve(response.data);
                    }
                    else {
                    	deferred.reject("Error" + response.data);
                    }
                });
                
                
                return deferred.promise;
            },
            
            Train: function(TrainJson) {
                var deferred = $q.defer();

                 $http({
                    method: 'POST',
                    url:  hostAddress2+'Train/',
                    data: TrainJson,
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "text/plain, application/json"
                    }
                 }) 
                .then(function (response) {
                    if (response.status == 200) {
                        deferred.resolve(response.data);
                    }
                    else {
                    	deferred.reject("Error" + response.data);
                    }
                });
                
                
                return deferred.promise;
            },
            
            Realtime_predictJson: function(Realtime_predictJson) {
                var deferred = $q.defer();

                 $http({
                    method: 'POST',
                    url:  hostAddress2+'realtime_predict/',
                    data: Realtime_predictJson,
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "text/plain, application/json"
                    }
                 }) 
                .then(function (response) {
                    if (response.status == 200) {
                        deferred.resolve(response.data);
                    }
                    else {
                    	deferred.reject("Error" + response.data);
                    }
                });
                
                
                return deferred.promise;
            },
            
            LR: function(LRJson) {
                var deferred = $q.defer();

                 $http({
                    method: 'POST',
                    url:  hostAddress2+'lr/',
                    data: LRJson,
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "text/plain, application/json"
                    }
                 }) 
                .then(function (response) {
                    if (response.status == 200) {
                        deferred.resolve(response.data);
                    }
                    else {
                    	deferred.reject("Error" + response.data);
                    }
                });
                
                
                return deferred.promise;
            },
            
           
        };
    }])
    
   
    .service('Imageprocessing', ['$http','$q', function($http, $q) {
        return {
        	imageprocessing: function(ImageprocessingJson) {
                var deferred = $q.defer();

                 $http({
                    method: 'POST',
                    url:  hostAddress2+'predict/',
                    data: ImageprocessingJson,
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "text/plain, application/json"
                    }
                 }) 
                .then(function (response) {
                    if (response.status == 200) {
                        deferred.resolve(response.data);
                    }
                    else {
                    	deferred.reject("Error" + response.data);
                    }
                });
                
                
                return deferred.promise;
            },
           
           
        };
    }])
    
    
    .service('ListAWSCredential', ['$http', '$q', function($http, $q) {
        return {
        	saveAWSCredential: function(saveS3CredentialJson) {
                var deferred = $q.defer();
 
                $http({
                    method: 'POST',
                    url: '/Home/AWSCredential',
                    data: saveS3CredentialJson,
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "text/plain, application/json"
                    }
                }) 
                .then(function (response) {
                    if (response.status == 200) {
                        deferred.resolve(response.data);
                    }
                    else {
                    	deferred.reject("Error" + response.data);
                    }
                });
                
                return deferred.promise;
            },
            searchAWSCredentials: function(userId) {
                var deferred = $q.defer();
 
                $http({
                    method: 'POST',
                    url: '/Home/AWSCredential/searchAWSCredentials',
                    params: {"userId": userId},
                    headers: {
                        "Content-Type": "text/plain",
                        "Accept": "text/plain, application/json"
                    }
                }) 
                .then(function (response) {
                    if (response.status == 200) {
                        deferred.resolve(response.data);
                    }
                    else {
                    	deferred.reject("Error" + response.data);
                    }
                });
                
                return deferred.promise;
            },
            
            deleteS3Credentials: function(deleteawsacount) {
                var deferred = $q.defer();

                $http({
                    method: 'DELETE',
                    url: '/Home/AWSCredential',
                    data: deleteawsacount,
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                .then(function (response) {
                    if (response.status == 200) {
                        deferred.resolve();
                    }
                    else {
                    	deferred.reject('Error deleting Account');
                    }
                });

                return deferred.promise;
            },

        }
        
	}])  
            
    .service('ListServerCredential', ['$http', '$q', function($http, $q) {
        return {         
        	runjob: function(runjobJson,runjobapi) {
                var deferred = $q.defer();
               // console.log(runjobJson);
                $http({
                    method: 'POST',
                    url: hostAddress2+runjobapi,
                    data: runjobJson,
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "text/plain, application/json"
                    }
                }) 
                .then(function (response) {
                    if (response.status == 200) {
                        deferred.resolve(response.data);
                    }
                    else {
                    	deferred.reject("Error" + response.data);
                    }
                });
                
                return deferred.promise;
            },
            
            saveServerCredential: function(saveServerCredentialJson) {
                    var deferred = $q.defer();
                    console.log(saveServerCredentialJson);
                    $http({
                        method: 'POST',
                        url: '/Home/ServerCredentials/saveServerCredential',
                        data: saveServerCredentialJson,
                        headers: {
                            "Content-Type": "application/json",
                            "Accept": "text/plain, application/json"
                        }
                    }) 
                    .then(function (response) {
                        if (response.status == 200) {
                            deferred.resolve(response.data);
                        }
                        else {
                        	deferred.reject("Error" + response.data);
                        }
                    });
                    
                    return deferred.promise;
                },
                searchServerCredentials: function(userId) {
                    var deferred = $q.defer();
     
                    $http({
                        method: 'POST',
                        url: '/Home/ServerCredentials',
                        params: {"userId": userId},
                        headers: {
                            "Content-Type": "text/plain",
                            "Accept": "text/plain, application/json"
                        }
                    }) 
                    .then(function (response) {
                        if (response.status == 200) {
                            deferred.resolve(response.data);
                        }
                        else {
                        	deferred.reject("Error" + response.data);
                        }
                    });
                    
                    return deferred.promise;
                },
                searchServerCredential: function(userId,ServerId) {
                    var deferred = $q.defer();
     
                    $http({
                        method: 'POST',
                        url: '/Home/ServerCredentials/searchServerCredential',
                        params: {"userId": userId,"ServerId":ServerId},
                        headers: {
                            "Content-Type": "text/plain",
                            "Accept": "text/plain, application/json"
                        }
                    }) 
                    .then(function (response) {
                        if (response.status == 200) {
                            deferred.resolve(response.data);
                        }
                        else {
                        	deferred.reject("Error" + response.data);
                        }
                    });
                    
                    return deferred.promise;
                },
                searchServerTypes: function() {
                    var deferred = $q.defer();
                    
                    $http.get('/Home/ServerType')
                    .then(function (response) {
                        if (response.status == 200) {
                            deferred.resolve(response.data);
                        }
                        else {
                           deferred.reject('Error retrieving user info');
                        }
                    });
                    return deferred.promise;
                },
    }

}])      


 .service('TwiiterKafka', ['$http', '$q', function($http, $q) {
        return {
        	searchTwitterKafkaTopics: function(userId) {
                var deferred = $q.defer();
                $http({
                   method: 'GET',
                   url: '/Home/Twitter',
                   params: {"userId": userId},
                   headers: {
                          "Content-Type": "application/json",
                          "Accept": "application/json"
                   }
                })
                .then(function (response) {
                    if (response.status == 200) {
                        deferred.resolve(response.data);
                    }
                    else {
                    	deferred.reject("Error" + response.data);
                    }
                });
                
                return deferred.promise;
            },
            saveTopics : function(saveTopicsJson) {
                var deferred = $q.defer();
                $http({
                   method: 'POST',
                   url: '/Home/Twitter',
                   data: saveTopicsJson,
                   headers: {
                          "Content-Type": "application/json",
                          "Accept": "application/json"
                   }
                })
                .then(function (response) {
                    if (response.status == 200) {
                        deferred.resolve(response.data);
                    }
                    else {
                    	deferred.reject("Error" + response.data);
                    }
                });
                
                return deferred.promise;
            }
            
        } 
       
   
}])	
	
.service('ListJob', ['$http', '$q', function($http, $q) {
    return {          
    	
    	saveJob: function(savejobJson) {
    		var deferred = $q.defer();
                   
                    $http({
                        method: 'POST',
                        url: '/Home/Job',
                        data: savejobJson,
                        headers: {
                            "Content-Type": "application/json",
                            "Accept": "text/plain, application/json"
                        }
                    }) 
                    .then(function (response) {
                        if (response.status == 200) {
                            deferred.resolve(response.data);
                        }
                        else {
                        	deferred.reject("Error" + response.data);
                        }
                    });
                    
                    return deferred.promise;
                },
                searchJobs: function(userId) {
                    var deferred = $q.defer();
     
                    $http({
                        method: 'PUT',
                        url: '/Home/Job',
                        params: {"userId": userId},
                        headers: {
                            "Content-Type": "text/plain",
                            "Accept": "text/plain, application/json"
                        }
                    }) 
                    .then(function (response) {
                        if (response.status == 200) {
                            deferred.resolve(response.data);
                        }
                        else {
                        	deferred.reject("Error" + response.data);
                        }
                    });
                    
                    return deferred.promise;
                },
                searchJobByID: function(userId,jobId) {
                    var deferred = $q.defer();
     
                    $http({
                        method: 'GET',
                        url: '/Home/Job/getJobByID',
                        params: {"userId": userId,"jobId": jobId},
                        headers: {
                            "Content-Type": "text/plain",
                            "Accept": "text/plain, application/json"
                        }
                    }) 
                    .then(function (response) {
                        if (response.status == 200) {
                            deferred.resolve(response.data);
                        }
                        else {
                        	deferred.reject("Error" + response.data);
                        }
                    });
                    
                    return deferred.promise;
                },
                searchJobDependents: function(userId) {
                    var deferred = $q.defer();
     
                    $http({
                        method: 'PUT',
                        url: '/Home/Job',
                        params: {"userId": userId},
                        headers: {
                            "Content-Type": "text/plain",
                            "Accept": "text/plain, application/json"
                        }
                    }) 
                    .then(function (response) {
                        if (response.status == 200) {
                            deferred.resolve(response.data);
                        }
                        else {
                        	deferred.reject("Error" + response.data);
                        }
                    });
                    
                    return deferred.promise;
                },
                 
               
                searchJobType: function(userId) {
                    var deferred = $q.defer();
     
                    $http({
                        method: 'GET',
                        url: '/Home/Job',
                        params: {"userId": userId},
                        headers: {
                            "Content-Type": "text/plain",
                            "Accept": "text/plain, application/json"
                        }
                    }) 
                    .then(function (response) {
                        if (response.status == 200) {
                            deferred.resolve(response.data);
                        }
                        else {
                        	deferred.reject("Error" + response.data);
                        }
                    });
                    
                    return deferred.promise;
                },
                 
        }
  
	}]) 
	
	.service('ListWorkFlow', ['$http', '$q', function($http, $q) {
	    return {          
	    	
	    	searchWorkFlows: function(userId) {
                 var deferred = $q.defer();
                
                 $http({
                     method: 'GET',
                     url: '/Home/WorkFlow',
                     params: {"userId": userId},
                     headers: {
                         "Content-Type": "application/json",
                         "Accept": "text/plain, application/json"
                     }
                 }) 
                 .then(function (response) {
                     if (response.status == 200) {
                         deferred.resolve(response.data);
                     }
                     else {
                     	deferred.reject("Error" + response.data);
                     }
                 });
                 
                 return deferred.promise;
             },
             
             saveWorkFlow: function(saveWorkFlowJson) {
                 var deferred = $q.defer();
                
                 $http({
                     method: 'POST',
                     url: '/Home/WorkFlow',
                     data: saveWorkFlowJson,
                     headers: {
                         "Content-Type": "application/json",
                         "Accept": "text/plain, application/json"
                     }
                 }) 
                 .then(function (response) {
                     if (response.status == 200) {
                         deferred.resolve(response.data);
                     }
                     else {
                     	deferred.reject("Error" + response.data);
                     }
                 });
                 
                 return deferred.promise;
             },
	    }
		}])  
    
.service('Schedule', ['$http','$q', function($http, $q) {
        return {
        	searchSchedules: function(userId) {
                var deferred = $q.defer();
               
                $http({
                    method: 'GET',
                    url: '/Home/schedule',
                    params: {"userId": userId},
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "text/plain, application/json"
                    }
                }) 
                .then(function (response) {
                    if (response.status == 200) {
                        deferred.resolve(response.data);
                    }
                    else {
                    	deferred.reject("Error" + response.data);
                    }
                });
                
                return deferred.promise;
            },
            
            saveSchedules: function(ScheduleJson) {
                var deferred = $q.defer();

                 $http({
                    method: 'POST',
                    url: '/Home/schedule',
                    data: ScheduleJson,
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "text/plain, application/json"
                    }
                }) 
                .then(function (response) {
                    if (response.status == 200) {
                        deferred.resolve(response.data);
                    }
                    else {
                    	deferred.reject("Error" + response.data);
                    }
                });
                
                
                return deferred.promise;
            },
           
           
        };
    }])

    
.service('UserService', ['$http','$q', function($http, $q) {
        return {
        	
            
            getUserInfo: function() {
                var deferred = $q.defer();

                $http.get('/Home/user')
                    .then(function (response) {
                        if (response.status == 200) {
                            deferred.resolve(response.data);
                        }
                        else {
                           deferred.reject('Error retrieving user info');
                        }
                });

                return deferred.promise;
            },
            getUserLog: function(UserId) {
                var deferred = $q.defer();

                $http({
                    method: 'GET',
                    url: '/Syra/user/userlog',
                    params: {"UserId": UserId}
                }).then(function (response) {
                        if (response.status == 200) {
                            deferred.resolve(response.data);
                        }
                        else {
                           deferred.reject('Error retrieving user info2');
                        }
                });

                return deferred.promise;
            },
            logout: function () {
                $http({
                    method: 'POST',
                    url: '/Home/logout'
                })
                .then(function (response) {
                    if (response.status == 200) {
                    window.location.reload();
                    }
                    else {
                        console.log("Logout failed!");
                    }
                });
            },
                
        };
    }]);