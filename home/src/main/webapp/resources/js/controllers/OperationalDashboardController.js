angular.module('WebApp').controller('OperationalDashboardController' , ['$state', '$stateParams','$rootScope', '$scope', 'settings','$filter','Schedule','RDBMS','ListBucket','ListJob','ListServerCredential','Report','Kafka','socket', function($state , $stateParams, $rootScope, $scope,settings,$filter,Schedule,RDBMS ,ListBucket,ListJob,ListServerCredential,Report,Kafka,socket) {

		$scope.$on('$viewContentLoaded', function() {   
        // initialize core components
        App.initAjax();
        
        $('.bs-select').selectpicker({
            iconBase: 'fa',
            tickIcon: 'fa-check'
        });
         
        $scope.userId= $rootScope.user_data.userId; 
        $scope.Job_data;
         
        $scope.getjobs = function()
    	{ 
         	ListJob.searchJobDependents($scope.userId).then(function (data) {
         	                
         	               $scope.Job_data=data.jobs;
         	                 
          	      		   $('select[name="jobel"]').html('<option data-icon="icon-info" value="Select">Select Job EL</option>');
         	      		   
       	      		       $('select[name="jobml1"]').html('<option data-icon="icon-info" value="Select">Select Job ML</option>');
      	      		       
       	      		       $('select[name="jobml2"]').html('<option data-icon="icon-info" value="Select">Select Job ML</option>');
      	      		       
   	      		           $('select[name="jobml3"]').html('<option data-icon="icon-info" value="Select">Select Job ML</option>');
	      		       
 	      		           $('select[name="jobmltrain"]').html('<option data-icon="icon-info" value="Select">Select Job ML Train</option>');
 	      		           
 	      		           $('select[name="jobel2"]').html('<option data-icon="icon-info" value="Select">Select Job EL Streaming</option>');

         	      		   var filtered=$filter('filter')($scope.Job_data, { jobType: 1 ,targetType : 2},true);
         	      		   var filtered1=$filter('filter')($scope.Job_data, { jobType: 3 },true);
         	      		   var filtered2=$filter('filter')($scope.Job_data, { jobType: 5 },true);  
         	      		   var filtered3=$filter('filter')($scope.Job_data, { jobType: 6 },true);  
         	      		   var filtered4=$filter('filter')($scope.Job_data, { jobType: 1 },true);
         	      		   var filtered5=$filter('filter')($scope.Job_data, { jobType: 1 ,sourceType : 4},true);
         	      		   //console.log(filtered);
	         	      	   $.each( filtered, function (index, valueobj) {
	         	              	 $('select[name="jobel"]').append('<option data-icon="icon-info" value="'+valueobj.id+'">'+valueobj.jobName+'</option>').selectpicker('refresh');
	         	           });
	         	              
	         	      	   $.each( filtered1, function (index, valueobj) {
	         	      		   	 $('select[name="jobml1"]').append('<option data-icon="icon-info" value="'+valueobj.id+'">'+valueobj.jobName+'</option>').selectpicker('refresh');
	         	      		   	 $('select[name="jobml2"]').append('<option data-icon="icon-info" value="'+valueobj.id+'">'+valueobj.jobName+'</option>').selectpicker('refresh');	         	      		 	
	         	      	   });
	         	      	   
	         	      	 $.each( filtered2, function (index, valueobj) {
         	      		   	 $('select[name="jobml3"]').append('<option data-icon="icon-info" value="'+valueobj.id+'">'+valueobj.jobName+'</option>').selectpicker('refresh');
         	      		 	
	         	      	 	});
	         	      	 $.each( filtered3, function (index, valueobj) {
        	      		   	 $('select[name="jobmltrain"]').append('<option data-icon="icon-info" value="'+valueobj.id+'">'+valueobj.jobName+'</option>').selectpicker('refresh');
        	      		 	
	         	      	 	});
	         	      	 $.each( filtered5, function (index, valueobj) {
       	      		   	 	 $('select[name="jobel2"]').append('<option data-icon="icon-info" value="'+valueobj.id+'">'+valueobj.jobName+'</option>').selectpicker('refresh');
       	      		 	
	         	      	 	});
	         	      	
	         	      	  $('#static').modal('show');
         	  			   /* $scope.JobFilter_data=filtered;
         	  			    console.log($scope.JobFilter_data);
         	  			    $.each( filtered, function (index, valueobj) {
    	     	              	 $('select[name="jobml"]').append('<option data-icon="icon-info" value="'+valueobj.id+'">'+valueobj.jobName+'</option>').selectpicker('refresh');
    	     	            });*/
    	     	              
        	            },function (errorMessage) {
        	            	 $state.go('dashboard', {},{reload: true});
         	            }); 
        	  
    	}
        $scope.getjobs();
        
        $scope.getserverCredentials = function()
    	{  
    		ListServerCredential.searchServerCredentials($scope.userId).then(function (data) {
                 $rootScope.buildjson_ServerCredentials_data=data.serverCredential;
                  
              },function (errorMessage) { 
            	 $state.go('dashboard', {},{reload: true});
            });
     	}
    	$scope.getserverCredentials();
        
    	
        $(document).on('change', 'select[name="jobel"]', function(){
  	  	    
        	if(   $(this).val() !="Select" ) 
    		{  
        		 var jobelId= $('select[name="jobel"]').val();
        		 var filtered=$filter('filter')($scope.Job_data, { id:parseInt(jobelId)},true);
          		 var filtered2=$filter('filter')($scope.buildjson_ServerCredentials_data, { id: parseInt(filtered[0].targetId)},true);
         		 $scope.ELReportJson='{ "classname": "'+filtered2[0].className+'","dburl": "'+filtered2[0].hosturl+'", "dbport": "'+filtered2[0].port+'", "dbusername": "'+filtered2[0].username+'","dbpassword": "'+filtered2[0].password+'", "dbname": "'+filtered2[0].databaseName+'","tablename": "'+filtered[0].destinationrdbmstableName+'" }';
          	     $scope.ELReportJson=JSON.parse( $scope.ELReportJson); 	 	
          	     RDBMS.AllColumns($scope.ELReportJson).then(function (data) {
          	    	if(data.status)
        			{
         				$('select[name="jobelfeild"]').html('');
	        			$.each( data.columnname, function (index, valueobj) {
	        			 	$('select[name="jobelfeild"]').append('<option  value="'+valueobj+'">'+valueobj+'</option>').selectpicker('refresh');
	        			});
          			}
           	      },function (errorMessage) {
          	      });
     		}

        });
       
        $(document).on('change', 'select[name="jobml1"]', function(){
  	  	    
        	if(   $(this).val() !="Select" ) 
    		{  
        		 var jobelId= $('select[name="jobml1"]').val();
        		 var filtered=$filter('filter')($scope.Job_data, { id:parseInt(jobelId)},true);
          		 var filtered2=$filter('filter')($scope.buildjson_ServerCredentials_data, { id: parseInt(filtered[0].targetId)},true);
         		 $scope.ML1ReportJson='{ "classname": "'+filtered2[0].className+'","dburl": "'+filtered2[0].hosturl+'", "dbport": "'+filtered2[0].port+'", "dbusername": "'+filtered2[0].username+'","dbpassword": "'+filtered2[0].password+'", "dbname": "'+filtered2[0].databaseName+'","tablename": "'+filtered[0].destinationrdbmstableName+'" }';
          	     $scope.ML1ReportJson=JSON.parse( $scope.ML1ReportJson); 	 	
          	     RDBMS.AllColumns($scope.ML1ReportJson).then(function (data) {
          	    	if(data.status)
        			{
         				$('select[name="jobml1feild"]').html('');
	        			$.each( data.columnname, function (index, valueobj) {
	        			 	$('select[name="jobml1feild"]').append('<option  value="'+valueobj+'">'+valueobj+'</option>').selectpicker('refresh');
	        			});
          			}
           	      },function (errorMessage) {
          	      });
     		}

        });	
        
        
        $scope.complete= function()
        {
        	  /*var jobelId= $('select[name="jobel"]').val();
        	  var jobml1Id= $('select[name="jobml1"]').val();
        	  var jobml2Id= $('select[name="jobml2"]').val();
        	  var jobml3Id= $('select[name="jobml3"]').val();
        	  
        	  
      	  
   
      	/*  var filtered=$filter('filter')($scope.Job_data, { id:parseInt(jobml2Id)},true);
      	  var filtered2=$filter('filter')($scope.buildjson_ServerCredentials_data, { id: parseInt(filtered[0].targetId)},true);
      	  $scope.MLReportJson='{ "classname": "'+filtered2[0].className+'","dburl": "'+filtered2[0].hosturl+'", "dbport": "'+filtered2[0].port+'", "dbusername": "'+filtered2[0].username+'","dbpassword": "'+filtered2[0].password+'", "dbname": "'+filtered2[0].databaseName+'","tablename": "'+filtered[0].destinationrdbmstableName+'" }';
      	  $scope.MLReportJson=JSON.parse( $scope.MLReportJson); 
  	    
      	    Report.MLReport($scope.MLReportJson).then(function (data) {
 	    	 if(data.final_status)
 	    	{
 	    		$scope.charts(data);
  	    	}
 			},function (errorMessage) {
 	    	});
      	  */
      	    //console.log($scope.MLReportJson);
        	  //var jobelId= $('select[name="jobel"]').val();
      	    
        	var jobelfeild =  $('select[name="jobelfeild"]').val();
        	var jobml1feild =  $('select[name="jobml1feild"]').val();
        	var jobml2Id= $('select[name="jobml2"]').val();
        	var jobmltrainId= $('select[name="jobmltrain"]').val();
        	
        	if( jobelfeild == '' || jobelfeild == 'Select' || jobml1feild == '' || jobml1feild == 'Select' ||  jobml2Id  == '' || jobml2Id  == 'Select' || jobmltrainId == '' || jobmltrainId == 'Select')
        	{
        			$('#error').html('Error! ,Select all jobs for complete form.');
        			
    				  return;
        	} 
        	$scope.ELReportJson['fields'] =jobelfeild
        	Report.BIResults($scope.ELReportJson).then(function (data) {
        		 if(data.final_status)
     	    	{
        			 $('#jobelthead').html('');
     	    	
		    		 var thead='<tr><th><label class="mt-checkbox mt-checkbox-outline mt-checkbox-single">  <span></span> </label></th>'; 
		    		  		$.each( data.colnames, function (index, valueobj) {
		    		  				thead= thead + '<th>'+valueobj+'</th>';
		    		  		}); 
		    		  
		    		  	  $('#jobelthead').html(thead+'</tr>');
		    		  	  var body='';
		    		  
		    		  var selectedlength=data.colnames.length;
		    		  $('#jobeltbody').html('');
		    		  
		    		  $.each( data.allcol, function (index, valueobj) {
			    		  body = body + '<tr class="odd gradeX"> <td><label class="mt-checkbox mt-checkbox-outline mt-checkbox-single"> <span></span>  </label> </td> ';
			    		  for( var i=0; i< selectedlength ;i++)
		       		      {
		    				 body = body + ' <td> <a href="javascript:;">'+valueobj[i]+' </td> ';
	 	       		      }
		    			 body = body + '</tr>';
		    		  }); 
		    		  $('#jobeltbody').append(body);
	 	    		  initTable();
     	    	}
     			},function (errorMessage) {
     	    	});
        	
        	
        	$scope.ML1ReportJson['fields'] =jobml1feild
        	Report.BIResults($scope.ML1ReportJson).then(function (data) {
        		 if(data.final_status)
        	    	{
        	    		 $('#jobml1thead').html('');
        	    		 var thead='<tr><th><label class="mt-checkbox mt-checkbox-outline mt-checkbox-single">  <span></span> </label></th>'; 
         	    		  $.each( data.colnames, function (index, valueobj) {
         	    			  thead= thead + '<th>'+valueobj+'</th>';
         	            }); 
        	    		  $('#jobml1thead').html(thead+'</tr>');
        	    		  var selectedlength=data.colnames.length;
     	    		  $('#jobml1tbody').html('');
     	    		  var body='';
     	    		  $.each( data.allcol, function (index, valueobj) {
     		    		  body = body + '<tr class="odd gradeX"> <td><label class="mt-checkbox mt-checkbox-outline mt-checkbox-single"> <span></span>  </label> </td> ';
     		    		  for( var i=0; i< selectedlength ;i++)
     	       		      {
     	    				 body = body + ' <td> <a href="javascript:;">'+valueobj[i]+' </td> ';
      	       		      }
     	    			 body = body + '</tr>';
     	    		  }); 
     	    		  $('#jobml1tbody').append(body);
     	    		  initTable2();
         	    	}
     			},function (errorMessage) {
     	    	});
        	
        	
        	 
        	  var filtered=$filter('filter')($scope.Job_data, { id:parseInt(jobml2Id)},true);
        	  var filtered2=$filter('filter')($scope.buildjson_ServerCredentials_data, { id: parseInt(filtered[0].targetId)},true);
        	  $scope.MLReportJson='{ "classname": "'+filtered2[0].className+'","dburl": "'+filtered2[0].hosturl+'", "dbport": "'+filtered2[0].port+'", "dbusername": "'+filtered2[0].username+'","dbpassword": "'+filtered2[0].password+'", "dbname": "'+filtered2[0].databaseName+'","tablename": "'+filtered[0].destinationrdbmstableName+'" }';
        	  $scope.MLReportJson=JSON.parse( $scope.MLReportJson); 
    	    
        	    Report.MLReport($scope.MLReportJson).then(function (data) {
	   	    	 if(data.final_status)
	   	    	{
	   	    		$scope.charts(data);
	    	    	}
	   			},function (errorMessage) {
	   	    	});
        	
       	     var jobmltrainId= $('select[name="jobmltrain"]').val();
        	 var filtered=$filter('filter')($scope.Job_data, { id:parseInt(jobmltrainId)},true);
       	  	 var filtered2=$filter('filter')($scope.buildjson_ServerCredentials_data, { id: parseInt(filtered[0].targetId)},true);
       	  	 
       	  	 $scope.realtimeweatherconsumerJSON=' {"accesskey":"'+filtered2[0].accessKey+'","secretKey":"'+filtered2[0].secretKey+'","bucketName":"'+filtered[0].destinationbucketName+'","key":"'+filtered[0].destinationfileKey+'","topicName":"cloudhitiweather"}  ';
       	  	 $scope.realtimeweatherconsumerJSON=JSON.parse( $scope.realtimeweatherconsumerJSON);
       	  
       	  	 $scope.KafkadashboardJSON= '{ "topicName": "vikash1" }';
       	  	 $scope.KafkadashboardJSON=JSON.parse( $scope.KafkadashboardJSON); 
       	  	 
       	  	 $scope.realtimeweatherproducerJSON= '{ "topicName": "cloudhitiweather" }';
    	  	 $scope.realtimeweatherproducerJSON=JSON.parse( $scope.realtimeweatherproducerJSON); 
    	  	 
       	  
       	 	 Kafka.Kafkadashboard($scope.KafkadashboardJSON).then(function (data) {
 	   			},function (errorMessage) {
	   	    	});
       	  	 
        	/*  
    	  	 Kafka.realtimeweatherproducer($scope.realtimeweatherproducerJSON).then(function (data) {
	   			},function (errorMessage) {
	   	    	});
    	  
    	  	 Kafka.realtimeweatherconsumer($scope.realtimeweatherconsumerJSON).then(function (data) {
	   			},function (errorMessage) {
	   	    	});*/
 	
    	  	 $('#static').modal('hide');
        	
        	
        }
        
        $scope.realtimeweather= function(data)
        { 
        	 
        		var stormDataObject= [];
        		var stormData=data.stormData.split(',');
        		stormDataObject.push(null);
        		stormDataObject.push(stormData[0]);
        		stormDataObject.push(stormData[1]);
        		stormDataObject.push(stormData[2]);
        		stormDataObject.push(stormData[3]);
        		stormDataObject.push(stormData[4]);
        		stormDataObject.push(data.LRPrediction);
    		    var mytable = $('#sample3').DataTable();
    			mytable.row.add(stormDataObject);
    			mytable.draw(); 
    		   
        }
         
        $scope.charts= function(data)
        {
        	var dataAll =  data.allcol;
        	var selectedlength=data.colnames.length;
     		 
            var length=   dataAll.length;
            var Alldata=[]
            var Cluster=0;
            var localpush=[];
            
            
    		 
            $(dataAll).each(function(index, val){
              	localCluster= parseInt(val[selectedlength-1]);
                if(Cluster ==  localCluster)
                {
                	 
                  localpush.push([parseFloat(val[0]),parseFloat(val[1])])
                }
                else
               {
                  
                 Alldata.push({
                     name: 'Cluster '+ Cluster,
                     data: localpush,
                 });
                  localpush=[];
                 Cluster=parseInt(val[selectedlength-1]);
                 localpush.push([parseFloat(val[0]),parseFloat(val[1])])
                }
                	
                if(index == length-1)
                {
                   Alldata.push({
                       name: 'Cluster '+ Cluster,
                       data: localpush,
                   });
                    scatterCharts(Alldata)
                }  
            }); 
            
        }
        
        var seriesObject;
       
        $scope.realtimeNLP= function(response)
        {
          	 var  time = (new Date()).getTime(),i =1;
             var x = parseInt(response.Positive[0]) , // current time
             y = response.Positive[1];
             seriesObject.series[0].addPoint([ x, y], true, true);
             
             var x = parseInt(response.Negative[0]) , // current time
             y =  response.Negative[1];
             seriesObject.series[1].addPoint([ x, y], true, true);
         }
       
        // Bring life to the dials
        $scope.totaltweets = function(response)
        {
        	var point,
            newVal,
            inc;

		        if (chartSpeed) {
		            point = chartSpeed.series[0].points[0];
		            inc = response.totalTweets;
		            newVal =  inc;
		
		            /*if (newVal < 0 || newVal > 200) {
		                newVal = point.y - inc;
		            }*/
		
		            point.update(newVal);
		        }
        
         }
        $scope.rawtweets = function(response)
        {
        	var mytable = $('#sample6').DataTable();
        	
        	$.each( response.rawTweets, function (index, valueobj) {
        		
        		if( valueobj[0] != "" && valueobj[4] != "" && valueobj[10] != "" && valueobj[11] != "" )
        		{
        			var rawdata= [];
            		rawdata.push(null)
            		rawdata.push( valueobj[0] )
            		rawdata.push( valueobj[4] )
            		rawdata.push( valueobj[8] )
            		rawdata.push( valueobj[10] )
            		rawdata.push( valueobj[11] )
            		//console.log(rawdata);
            		mytable.row.add(rawdata);
          			mytable.draw();
        		}
        		
        		
            }); 
        	
        	//var stormDataObject= data.rawTweets.split(',');
    		//stormDataObject.push(data.LRPrediction);
    		
    		
  			
         }
        
        var gaugeOptions = {

        	    chart: {
        	        type: 'solidgauge'
        	    },

        	    title: null,

        	    pane: {
        	        center: ['50%', '85%'],
        	        size: '140%',
        	        startAngle: -90,
        	        endAngle: 90,
        	        background: {
        	            backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || '#EEE',
        	            innerRadius: '60%',
        	            outerRadius: '100%',
        	            shape: 'arc'
        	        }
        	    },

        	    tooltip: {
        	        enabled: true
        	    },

        	    // the value axis
        	    yAxis: {
        	        stops: [
        	            [0.1, '#55BF3B'], // green
        	            [0.5, '#DDDF0D'], // yellow
        	            [0.9, '#DF5353'] // red
        	        ],
        	        lineWidth: 0,
        	        minorTickInterval: null,
        	        tickAmount: 2,
        	        title: {
        	            y: -70
        	        },
        	        labels: {
        	            y: 16
        	        }
        	    },

        	    plotOptions: {
        	        solidgauge: {
        	            dataLabels: {
        	                y: 5,
        	                borderWidth: 0,
        	                useHTML: true
        	            }
        	        }
        	    }
        	};

        
        var chartSpeed = Highcharts.chart('totaltwits', Highcharts.merge(gaugeOptions, {
            yAxis: {
                min: 0,
               // max: 200,
                title: {
                    text: 'Total Tweets'
                }
            },
            credits: {
                enabled: false
            },
            series: [{
                name: 'Total Tweets',
                data: [1],
                dataLabels: {
                    format: '<div style="text-align:center"><span style="font-size:25px;color:' +
                        ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">{y}</span><br/>' +
                        '<span style="font-size:12px;color:silver">Total Tweets</span></div>'
                },
             }]

        }));
        
        Highcharts.setOptions({
            global: {
                useUTC: false
            }
        });
        
        seriesObject= new Highcharts.chart('NegPostwits', {
            chart: {
                type: 'spline',
                animation: Highcharts.svg, // don't animate in old IE
                marginRight: 10,
                 /*events: {
                    load: function () {
                    	$scope.realtimeNLP({"Negative":[1500451649,1],"Positive":[1500451649,1] });
                    }
                } */
            },
            title: {
                text: 'Live Positive , Negative Tweets '
            },
            xAxis: {
                type: 'datetime',
                tickPixelInterval: 150
            },
            yAxis: {
                title: {
                    text: 'Value'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip: {
                formatter: function () {
                    return '<b>' + this.series.name + '</b><br/>' +
                        Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                        Highcharts.numberFormat(this.y, 2);
                }
            },
            legend: {
                enabled: true
            },
            exporting: {
                enabled: true
            },
            credits: {
                enabled: false
            },
            dataLabels: {
                enabled: true
            },
            series: [{
                name: 'Positive',
                color: 'green',
                data: (function () {
                    // generate an array of random data
                	 
                var data = [],
               time = (new Date()).getTime(),
               i;

               for (i = -5; i <= 0; i += 1) {
                   data.push([
                       time + i * 1000,
                       Math.round(Math.random() * 10)
                   ]);
               }

                    return data;
                }())
            },
            {
                name: 'Negative',
                color: 'red',
                dashStyle: 'longdash',
                data: (function () {
                    // generate an array of random data
               	 var data = [],
                      time = (new Date()).getTime(),
                     i;

 	                for (i = -5; i <= 0; i += 1) {
 	                    data.push([
 	                        time + i * 1000,
 	                        Math.round(Math.random() * 10)
 	                    ]);
 	                }
                    
                    return data;
                }())
            }]
        });
        
        
        //$scope.realtimeNLP({"Negative":[1500451649,1],"Positive":[1500451649,1] });

        
        
        var initTable = function () {

            var table = $('#sample');

            table.dataTable({

                // Internationalisation. For more info refer to http://datatables.net/manual/i18n
                "language": {
                    "aria": {
                        "sortAscending": ": activate to sort column ascending",
                        "sortDescending": ": activate to sort column descending"
                    },
                    "emptyTable": "No data available in table",
                    "info": "Showing _START_ to _END_ of _TOTAL_ records",
                    "infoEmpty": "No records found",
                    "infoFiltered": "(filtered1 from _MAX_ total records)",
                    "lengthMenu": "Show _MENU_",
                    "search": "Search:",
                    "zeroRecords": "No matching records found",
                    "paginate": {
                        "previous":"Prev",
                        "next": "Next",
                        "last": "Last",
                        "first": "First"
                    }
                },

                // Uncomment below line("dom" parameter) to fix the dropdown overflow issue in the datatable cells. The default datatable layout
                // setup uses scrollable div(table-scrollable) with overflow:auto to enable vertical scroll(see: assets/global/plugins/datatables/plugins/bootstrap/dataTables.bootstrap.js). 
                // So when dropdowns used the scrollable div should be removed. 
                //"dom": "<'row'<'col-md-6 col-sm-12'l><'col-md-6 col-sm-12'f>r>t<'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12'p>>",

                "bStateSave": true, // save datatable state(pagination, sort, etc) in cookie.
                "pagingType": "bootstrap_extended",

                "lengthMenu": [
                    [5, 15, 20, -1],
                    [5, 15, 20, "All"] // change per page values here
                ],
                // set the initial value
                "pageLength": 5,
                "columnDefs": [{  // set default column settings
                    'orderable': false,
                    'targets': [0]
                }, {
                    "searchable": false,
                    "targets": [0]
                }],
                "order": [
                    [1, "asc"]
                ] // set first column as a default sort by asc
            });

            var tableWrapper = jQuery('#sample');
 
         }
        
        
        var initTable2 = function () {

            var table = $('#sample2');

            table.dataTable({

                // Internationalisation. For more info refer to http://datatables.net/manual/i18n
                "language": {
                    "aria": {
                        "sortAscending": ": activate to sort column ascending",
                        "sortDescending": ": activate to sort column descending"
                    },
                    "emptyTable": "No data available in table",
                    "info": "Showing _START_ to _END_ of _TOTAL_ records",
                    "infoEmpty": "No records found",
                    "infoFiltered": "(filtered1 from _MAX_ total records)",
                    "lengthMenu": "Show _MENU_",
                    "search": "Search:",
                    "zeroRecords": "No matching records found",
                    "paginate": {
                        "previous":"Prev",
                        "next": "Next",
                        "last": "Last",
                        "first": "First"
                    }
                },

                // Uncomment below line("dom" parameter) to fix the dropdown overflow issue in the datatable cells. The default datatable layout
                // setup uses scrollable div(table-scrollable) with overflow:auto to enable vertical scroll(see: assets/global/plugins/datatables/plugins/bootstrap/dataTables.bootstrap.js). 
                // So when dropdowns used the scrollable div should be removed. 
                //"dom": "<'row'<'col-md-6 col-sm-12'l><'col-md-6 col-sm-12'f>r>t<'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12'p>>",

                "bStateSave": true, // save datatable state(pagination, sort, etc) in cookie.
                "pagingType": "bootstrap_extended",

                "lengthMenu": [
                    [5, 15, 20, -1],
                    [5, 15, 20, "All"] // change per page values here
                ],
                // set the initial value
                "pageLength": 5,
                "columnDefs": [{  // set default column settings
                    'orderable': false,
                    'targets': [0]
                }, {
                    "searchable": false,
                    "targets": [0]
                }],
                "order": [
                    [1, "asc"]
                ] // set first column as a default sort by asc
            });

            var tableWrapper = jQuery('#sample2');
 
            
        }
         
        var initTable3 = function () {

            var table = $('.sample3');

            table.dataTable({

                // Internationalisation. For more info refer to http://datatables.net/manual/i18n
                "language": {
                    "aria": {
                        "sortAscending": ": activate to sort column ascending",
                        "sortDescending": ": activate to sort column descending"
                    },
                    "emptyTable": "No data available in table",
                    "info": "Showing _START_ to _END_ of _TOTAL_ records",
                    "infoEmpty": "No records found",
                    "infoFiltered": "(filtered1 from _MAX_ total records)",
                    "lengthMenu": "Show _MENU_",
                    "search": "Search:",
                    "zeroRecords": "No matching records found",
                    "paginate": {
                        "previous":"Prev",
                        "next": "Next",
                        "last": "Last",
                        "first": "First"
                    }
                },

                // Uncomment below line("dom" parameter) to fix the dropdown overflow issue in the datatable cells. The default datatable layout
                // setup uses scrollable div(table-scrollable) with overflow:auto to enable vertical scroll(see: assets/global/plugins/datatables/plugins/bootstrap/dataTables.bootstrap.js). 
                // So when dropdowns used the scrollable div should be removed. 
                //"dom": "<'row'<'col-md-6 col-sm-12'l><'col-md-6 col-sm-12'f>r>t<'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12'p>>",

                "bStateSave": true, // save datatable state(pagination, sort, etc) in cookie.
                "pagingType": "bootstrap_extended",

                "lengthMenu": [
                    [5, 15, 20, -1],
                    [5, 15, 20, "All"] // change per page values here
                ],
                // set the initial value
                "pageLength": 5,
                "columnDefs": [{  // set default column settings
                    'orderable': false,
                    'targets': [0]
                }, {
                    "searchable": false,
                    "targets": [0]
                }],
                "order": [
                    [1, "asc"]
                ] // set first column as a default sort by asc
            });

            var tableWrapper = jQuery('.sample3');
 
           
        }
        
        var initTable4 = function () {

            var table = $('.sample6');

            table.dataTable({

                // Internationalisation. For more info refer to http://datatables.net/manual/i18n
                "language": {
                    "aria": {
                        "sortAscending": ": activate to sort column ascending",
                        "sortDescending": ": activate to sort column descending"
                    },
                    "emptyTable": "No data available in table",
                    "info": "Showing _START_ to _END_ of _TOTAL_ records",
                    "infoEmpty": "No records found",
                    "infoFiltered": "(filtered1 from _MAX_ total records)",
                    "lengthMenu": "Show _MENU_",
                    "search": "Search:",
                    "zeroRecords": "No matching records found",
                    "paginate": {
                        "previous":"Prev",
                        "next": "Next",
                        "last": "Last",
                        "first": "First"
                    }
                },

                // Uncomment below line("dom" parameter) to fix the dropdown overflow issue in the datatable cells. The default datatable layout
                // setup uses scrollable div(table-scrollable) with overflow:auto to enable vertical scroll(see: assets/global/plugins/datatables/plugins/bootstrap/dataTables.bootstrap.js). 
                // So when dropdowns used the scrollable div should be removed. 
                //"dom": "<'row'<'col-md-6 col-sm-12'l><'col-md-6 col-sm-12'f>r>t<'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12'p>>",

                "bStateSave": true, // save datatable state(pagination, sort, etc) in cookie.
                "pagingType": "bootstrap_extended",

                "lengthMenu": [
                    [2, 15, 20, -1],
                    [2, 15, 20, "All"] // change per page values here
                ],
                // set the initial value
                "pageLength": 2,
                "columnDefs": [{  // set default column settings
                    'orderable': false,
                    'targets': [0]
                }, {
                    "searchable": false,
                    "targets": [0]
                }],
                "order": [
                    [1, "desc"]
                ] // set first column as a default sort by asc
            });

            var tableWrapper = jQuery('.sample6');
 
           
        }
        initTable3();
        initTable4();
       socket.emit('send', {"status": {"sas": true}}); 
        
        socket.on('gettwitter', function(message) {
        	$scope.realtimeNLP(message);
        	$scope.totaltweets(message);
        	//$scope.rawtweets(message);
        	 //$scope.realtimeweather(message);
        	 console.log(message);
         	 //socket.emit('send', {"status": {"sas": true}}); 
        });
        
        socket.on('getweather', function(message) {
        	$scope.realtimeweather(message);
       	  //  console.log(message);
        	 //socket.emit('send', {"status": {"sas": true}}); 
        }); 
        //setTimeout(function(){ alert("Hello"); }, 3000);
         
        $rootScope.settings.layout.pageContentWhite = true;
        $rootScope.settings.layout.pageBodySolid = false;
        $rootScope.settings.layout.pageSidebarClosed = false;
    });
}]);


angular.module('WebApp').factory('socket', function ($rootScope) {
	//var socket = new io.Socket();
	//socket.connect('http://localhost:5000');
	var socket = io.connect('http://54.191.71.125:3000');
	 
 	  return {
	    on: function (eventName, callback) {
	      socket.on(eventName, function () {  
	        var args = arguments;
	        $rootScope.$apply(function () {
	          callback.apply(socket, args);
	        });
	      });
	    },
	    emit: function (eventName, data, callback) {
	      socket.emit(eventName, data, function () {
	        var args = arguments;
	        $rootScope.$apply(function () {
	          if (callback) {
	            callback.apply(socket, args);
	          }
	        });
	      })
	    }
	  };
	}); 