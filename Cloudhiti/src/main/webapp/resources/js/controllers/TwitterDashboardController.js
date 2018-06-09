angular.module('WebApp').controller('TwitterDashboardController' , ['$state', '$stateParams','$rootScope', '$scope', 'settings','$filter','Schedule','RDBMS','ListBucket','ListJob','ListServerCredential','Report','Kafka','$http','socket', function($state , $stateParams, $rootScope, $scope,settings,$filter,Schedule,RDBMS ,ListBucket,ListJob,ListServerCredential,Report,Kafka,$http,socket) {

	
	  
	  $scope.$on('$viewContentLoaded', function() {   
        // initialize core components
        App.initAjax();
        
         
        $scope.userId= $rootScope.user_data.userId; 
        $scope.AverageSentiment=null;
        
        var gaugeOptions = {

        	    chart: {
        	        type: 'solidgauge'
        	    },

        	    title: null,

        	    pane: {
        	        center: ['50%', '85%'],
        	        size: '100%',
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
        
        
        
       /* var chartSpeed = Highcharts.chart('totaltwits', Highcharts.merge(gaugeOptions, {
            yAxis: {
                min: 0,
               // max: 200,
                title: {
                    text: 'Average Sentiment'
                }
            },
            credits: {
                enabled: false
            },
            series: [{
                name: 'Average Sentiment',
                data: [1],
                dataLabels: {
                    format: '<div style="text-align:center"><span style="font-size:25px;color:' +
                        ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">{y} % </span><br/>' +
                        '<span style="font-size:12px;color:silver">Average Sentiment</span></div>'
                },
             }]

        }));*/
        
        Highcharts.setOptions({
            global: {
                useUTC: false
            }
        });
        
        seriesObject= new Highcharts.chart('NegPostwits', {
            chart: {
                type: 'spline',
               // animation: Highcharts.svg, // don't animate in old IE
                marginRight: 5,
                height: (9 / 16 * 110) + '%'
                /*events: {
                    load: function () {
                    	$scope.realtimeNLP({"Negative":[1500451649,1],"Positive":[1500451649,1] });
                    }
                } */
            },
            credits:  false,
            style: {
                fontSize: '6px'
            },
            title: {
                text: ' '
            },
            xAxis: {
                type: 'datetime',
                tickPixelInterval: 150,
                labels: {
                    style: {
                    	fontSize: '6px'
                    }
                }
            },
            yAxis: {
                title: {
                    text: 'Value'
                },
                labels: {
                    style: {
                    	fontSize: '6px'
                    }
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

               for (i = -10; i <= 0; i += 1) {
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

 	                for (i = -10; i <= 0; i += 1) {
 	                    data.push([
 	                        time + i * 1000,
 	                        Math.round(Math.random() * 10)
 	                    ]);
 	                }
                    
                    return data;
                }())
            }]
        });
        
        var color = []; //"#7CE974", "#FF5A80", "#F8F8F8"   
        var rawtweets = [];
		///////////////////////////////////////////////////////////////////////////
		//////////////Initiate SVG and create hexagon centers ////////////////////
		///////////////////////////////////////////////////////////////////////////
		
		//Function to call when you mouseover a node
		function mover(d) {
		var el = d3.select(this)
		.transition()
		.duration(10)     
		.style("fill-opacity", 0.3)
		;
		}
		
		//Mouseout function
		function mout(d) { 
		var el = d3.select(this)
		.transition()
		.duration(1000)
		.style("fill-opacity", 1)
		;
		};
		
		//svg sizes and margins
		var margin = {
		top: 30,
		right: 20,
		bottom: 20,
		left: 50
		};
		
		var width = 700;
		var height = 240;
		
		//The number of columns and rows of the heatmap
		var MapColumns = 14,
		MapRows = 9;
		
		//The maximum radius the hexagons can have to still fit the screen
		var hexRadius = d3.min([width/((MapColumns + 0.5) * Math.sqrt(3)),
		height/((MapRows + 1/3) * 1.5)]);
		
		//Set the new height and width of the SVG based on the max possible
		width = MapColumns*hexRadius*Math.sqrt(3);
		heigth = MapRows*1.5*hexRadius+0.5*hexRadius;
		
		//Set the hexagon radius
		var hexbin = d3.hexbin()
		.radius(hexRadius);
		
		//Calculate the center positions of each hexagon  
		var points = [];
		for (var i = 0; i < MapRows; i++) {
		for (var j = 0; j < MapColumns; j++) {
		points.push([hexRadius * j * 1.75, hexRadius * i * 1.5]);
		}//for j
		}//for i
		
		//Create SVG element
		var svgheatploy = d3.select("#heatploy").append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
		
		
		var tip = d3.tip()
		.attr('class', 'd3-tip')
		.style("visibility","visible")
		.offset([-20, 0])
		.html(function(d,i) {
		return "Tweet :  <span style='color:red'>" + rawtweets[i];
		});
		
		tip(svgheatploy.append("g"));
		
		
		///////////////////////////////////////////////////////////////////////////
		//////////////////////Draw hexagons and color them ///////////////////////
		///////////////////////////////////////////////////////////////////////////
		
		//Start drawing the hexagons
		svgheatploy.append("g")
		.selectAll(".hexagon")
		.data(hexbin(points))
		.enter().append("path")
		.attr("class", "hexagon")
		.attr("d", function (d) {
		return "M" + d.x + "," + d.y + hexbin.hexagon();
		})
		/*.on("click", function (d,i){
		tip.//alert(color[i]);
		})*/
		.attr("stroke", function (d,i) {
		return "#fff";
		})
		.attr("stroke-width", "1px")
		.style("fill", function (d,i) {
		return color[i];
		})
		//.on("mouseover", mover)
		//.on("mouseout", mout)
		.on('mouseover', tip.show)
		.on('mouseout', tip.hide); 
		;
      /*  setInterval(function () {
            // Speed
          
            
            var  time = (new Date()).getTime(),i =1;
            var x = time + i * 1000 , // current time
            y =  (Math.random() ) + 2;
            seriesObject.series[0].addPoint([ x, y], true, true);
            
            var x = time + i * 1000 , // current time
            y =  (Math.random()) + 1;
            seriesObject.series[1].addPoint([ x, y], true, true);
            
             
            
        }, 2000);
        */
		var myLatlng = new google.maps.LatLng(-25.363,131.044);
		  var light_grey_style = [{"featureType":"landscape","stylers":[{"saturation":-100},{"lightness":65},{"visibility":"on"}]},{"featureType":"poi","stylers":[{"saturation":-100},{"lightness":51},{"visibility":"simplified"}]},{"featureType":"road.highway","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"road.arterial","stylers":[{"saturation":-100},{"lightness":30},{"visibility":"on"}]},{"featureType":"road.local","stylers":[{"saturation":-100},{"lightness":40},{"visibility":"on"}]},{"featureType":"transit","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"administrative.province","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":-25},{"saturation":-100}]},{"featureType":"water","elementType":"geometry","stylers":[{"hue":"#ffff00"},{"lightness":-25},{"saturation":-97}]}];
		  var myOptions = {
		    zoom: 2,
		    center: myLatlng,
		    mapTypeId: google.maps.MapTypeId.ROADMAP,
		    mapTypeControl: true,
		    mapTypeControlOptions: {
		      style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
		      position: google.maps.ControlPosition.LEFT_BOTTOM
		    },
		    styles: light_grey_style
		  };
		  var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
		  
		  //Setup heat map and link to Twitter array we will append data to
		  var heatmap;
		  var liveTweets = new google.maps.MVCArray();
		  heatmap = new google.maps.visualization.HeatmapLayer({
		    data: liveTweets,
		    radius: 25
		  });
		  heatmap.setMap(map);
		  
	    $scope.totaltweets = function(response)
        {
        	
        	var point,
            newVal,
            inc;

		        if (chartSpeed) {
		            point = chartSpeed.series[0].points[0];
		            if(response.averageng == 0 )
		        	{
		            	inc = response.post;
		            	$scope.AverageSentiment="positive"
		        	}
		            else
		            {
		            	inc = response.g;
		            	$scope.AverageSentiment="negative";
		            }
 		            	
		            point.update(inc);
		        }
        
         }
        $scope.realtimeNLP= function(response)
        {
          	 var  time = (new Date()).getTime(),i =1;
             var x =  response.timestamp_ms  , // current time
             y = response.post;
             seriesObject.series[0].addPoint([ x, y], true, true);
             
             var x = response.timestamp_ms , // current time
             y =  response.g;
             seriesObject.series[1].addPoint([ x, y], true, true);
         }
       
        var data1 = ['<tr><td></td><td></td></tr>' ];
 		var clusterize = new Clusterize({
	          rows: data1,
	          scrollId: 'scrollArea2',
	          contentId: 'contentArea2' 
	    });
		$scope.rawtweets = function(response)
        {
    		  //var data1 = ['<tr><td>'+response.id+'</td><td>'+response.user+'</td><td>'+response.text+'</td><td>'+response.created_at+'</td><td>'+response.score+'</td></tr>' ];
  		  	 	var data1 = ['<tr> <td>'+response.text+'</td> <td>'+response.score+'</td></tr>' ];
  		  	 	clusterize.append(data1);
         	 
        }		
		$scope.svgheatploy = function(response)
        {
			/*var tip = d3.tip()
			.attr('class', 'd3-tip')
			.style("visibility","visible")
			.offset([-20, 0])
			.html(function(d,i) {
			return "Tweet :  <span style='color:red'>" + rawtweets[i];
			});
			
			tip(svgheatploy.append("g"));*/
			
			rawtweets.push(response.text);
			if(response.positivelflag == 1)
			{
				color.push('#7CE974');
 			}
			else if(response.ngflag == 1) 
			{ 
				color.push('#FF5A80');
			}
			else
			{
				color.push('#F0E000');
			}
	        
	        svgheatploy.append("g")
		    .selectAll(".hexagon")
		    .data(hexbin(points))
		    .enter().append("path")
		    .attr("class", "hexagon")
		    .attr("d", function (d) {
		    return "M" + d.x + "," + d.y + hexbin.hexagon();
		  })
		    .attr("stroke", function (d,i) {
		    return "#fff";
		  })
		    .attr("stroke-width", "1px")
		    .style("fill", function (d,i) {
		    return color[i];
		  })
		 
		  .on('mouseover', tip.show)
		.on('mouseout', tip.hide); 
	        
		  if(color.length > 89)
		  { color=[];}
	        
        }
		
		
		 
		
		
		
		 $scope.getdata = function(data)
	        {
	        	$scope.MysqlReportJson= '{"classname": "com.mysql.jdbc.Driver","dburl":"jdbc:mysql://107.180.2.11:","dbport":"3306","dbusername":"cloudhitiadmin","dbpassword":"cloudhitiadmin2017","dbname":"cloudhitidemo","tablename":"rawtwitter","query":"  SELECT  count(*) as total ,  score FROM `rawtwitter`  where timestamp < NOW() group by SIGN(score) order by score asc "}'; 
	        	//console.log($scope.MysqlReportJson)
	        	$scope.MysqlReportJson = JSON.parse(  $scope.MysqlReportJson );
	        	Report.MysqlReport2($scope.MysqlReportJson).then(function (data) { 
	        		 var allrows= data.allcol;
	        		 let arrayreturn = [];
	        	     arrayreturn.push({ 
					   		"name" : "Negative"  ,  
							"data":  [parseInt (allrows[0][0] )]
						});
	        		 arrayreturn.push({ 
					   		"name" : "Neutral"  ,  
							"data":  [parseInt (allrows[1][0] )]
						});
	        		 arrayreturn.push({ 
					   		"name" : "Positive"  ,  
							"data":  [parseInt (allrows[2][0] )]
						});
	        		 $scope.historicaltweets(arrayreturn);
	         	},function (errorMessage) { 
	    		//$scope.attrvalue=0;//$state.go('dashboard', {},{reload: true});
	        	});  
	        	
	        }
			$scope.historicaltweets = function(response)
	        { Highcharts.chart('historicaltweets', {
			    chart: {
			        type: 'column',
			        height: (9 / 16 * 100) + '%' // 16:9 ratio
			    },
			    title: {
			        text: ''
			    },
			    subtitle: {
			        text: ''
			    },
			    xAxis: {
			        categories: ["Sentiment"],
			        crosshair: true,
			        labels: {
	                    style: {
	                    	fontSize: '6px'
	                    }
	                },
			    },
			    yAxis: {
			        min: 0,
			        title: {
			            text: 'Total Tweets'
			        },
			        labels: {
	                    style: {
	                    	fontSize: '6px'
	                    }
	                },
			    },
			    tooltip: {
			        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
			        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
			            '<td style="padding:0"><b>{point.y:.1f} %</b></td></tr>',
			        footerFormat: '</table>',
			        shared: true,
			        useHTML: true
			    },
			    plotOptions: {
			        column: {
			            pointPadding: 0.2,
			            borderWidth: 0
			        }
			    },
			    series:  response
			});
	        }
			$scope.getdata();
			
			
			
			//socket.emit('send', {"status": {"sas": true}}); 
        
        socket.on('gettwitter', function(message) {
        //alert();
        	$scope.realtimeNLP(message);
        	//$scope.totaltweets(message);
        	$scope.rawtweets(message);
        	//console.log(message);
        	$scope.svgheatploy(message);
        	 var tweetLocation = new google.maps.LatLng(message.outputPoint.lng,message.outputPoint.lat);
             liveTweets.push(tweetLocation);

             //Flash a dot onto the map quickly
             var image = "img/small-dot-icon.png";
             var marker = new google.maps.Marker({
               position: tweetLocation,
               map: map,
               icon: image
             });
             setTimeout(function(){
               marker.setMap(null);
             },600);
             
         	 //socket.emit('send', {"status": {"sas": true}}); 
        });
        
        
        
        $rootScope.settings.layout.pageContentWhite = true;
        $rootScope.settings.layout.pageBodySolid = false;
        $rootScope.settings.layout.pageSidebarClosed = false;
    });
}]);
 			         
angular.module('WebApp').factory('socket', function ($rootScope) {
	//var socket = new io.Socket();
	//socket.connect('http://localhost:5000');
	var socket = io.connect('http://localhost:3000');
	 
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