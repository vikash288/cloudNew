angular.module('WebApp').controller('OperationalController' , ['$state', '$stateParams','$rootScope', '$scope', 'settings','$filter','Schedule','RDBMS','ListBucket','ListJob','ListServerCredential','Report','Kafka','$http', function($state , $stateParams, $rootScope, $scope,settings,$filter,Schedule,RDBMS ,ListBucket,ListJob,ListServerCredential,Report,Kafka,$http) {

        $scope.$on('$viewContentLoaded', function() {   
        // initialize core components
        App.initAjax();
        
         
        $scope.userId= $rootScope.user_data.userId; 
        $scope.date = [
                       {model : "last - 7 days", value : "7"},
                       {model : "last - 14 days", value : "14"},
                       {model : "last - 21 days", value : "21"},
                       {model : "last - 28 days", value : "28"}
                   ]; 
          
        $scope.selected="7";
        $scope.selected2="7";
        $scope.selected3="7";
        $scope.selected4="14";
        $scope.selected5="7";
        $scope.selected6="7";
        $scope.Showdate = new Date();
     
        
                 
                /* chart: {
                        type: 'bubble',
                        plotBorderWidth: 1,
                        zoomType: 'xy'
                    },

                    legend: {
                        enabled: false
                    },

                    title: {
                        text: ''
                    },

                    xAxis: {
                        gridLineWidth: 1,
                        title: {
                            text: 'Total New Customers'
                        },
                        labels: {
                            format: '{value}'
                        },
                        plotLines: [{
                            color: 'red',
                            dashStyle: 'dot',
                            width: 2,
                            value: 65,
                            zIndex: 3
                        }]
                    },

                    yAxis: {
                        startOnTick: false,
                        endOnTick: false,
                        labels: {
                            format: '{value}'
                        },
                        maxPadding: 0.2,
                        plotLines: [{
                            color: 'black',
                            dashStyle: 'dot',
                            width: 2,
                            value: 50,
                            zIndex: 3
                        }]
                    },

                    tooltip: {
                        useHTML: true,
                        headerFormat: '<table>',
                        pointFormat: '<tr><th colspan="2"><h3>{point.name}</h3></th></tr>' +
                            '<tr><th>Fat intake:</th><td>{point.x}g</td></tr>' , 
                        footerFormat: '</table>',
                        followPointer: true
                    },

                    plotOptions: {
                        series: {
                            dataLabels: {
                                enabled: true,
                                format: '{point.name}'
                            }
                        }
                    },
                    series: [{
                        data: [
                                   { name: 'BE',x: 35,y: 35  },
                                   { name: 'BE', x: 7, y: 7  },
                                   { name: 'BE', x: 4, y: 4  }
                                ],
                    }]
*/

                    /*xAxis: {
                        gridLineWidth: 1,
                        title: {
                            text: 'Daily fat intake'
                        },
                        labels: {
                            format: '{value} gr'
                        },
                        plotLines: [{
                            color: 'black',
                            dashStyle: 'dot',
                            width: 2,
                            value: 65,
                            label: {
                                rotation: 0,
                                y: 15,
                                style: {
                                    fontStyle: 'italic'
                                },
                                text: 'Safe fat intake 65g/day'
                            },
                            zIndex: 3
                        }]
                    },

                    yAxis: {
                        startOnTick: false,
                        endOnTick: false,
                        title: {
                            text: 'Daily sugar intake'
                        },
                        labels: {
                            format: '{value} gr'
                        },
                        maxPadding: 0.2,
                        plotLines: [{
                            color: 'black',
                            dashStyle: 'dot',
                            width: 2,
                            value: 50,
                            label: {
                                align: 'right',
                                style: {
                                    fontStyle: 'italic'
                                },
                                text: 'Safe sugar intake 50g/day',
                                x: -10
                            },
                            zIndex: 3
                        }]
                    },

                    tooltip: {
                        useHTML: true,
                        headerFormat: '<table>',
                        pointFormat: '<tr><th colspan="2"><h3>{point.country}</h3></th></tr>' +
                            '<tr><th>Fat intake:</th><td>{point.x}g</td></tr>' +
                            '<tr><th>Sugar intake:</th><td>{point.y}g</td></tr>' +
                            '<tr><th>Obesity (adults):</th><td>{point.z}%</td></tr>',
                        footerFormat: '</table>',
                        followPointer: true
                    },

                    plotOptions: {
                        series: {
                            dataLabels: {
                                enabled: true,
                                format: '{point.name}'
                            }
                        }
                    },
                    series: [{
            
                          data:   [
                                    { x: 95,name: 'BE', country: 'Belgium' },
                                    { x: 86.5,  name: 'DE', country: 'Germany' },
                                    { x: 80.8, name: 'FI', country: 'Finland' },
                                    { x: 80.4, name: 'NL', country: 'Netherlands' },
                                    { x: 80.3, name: 'SE', country: 'Sweden' },
                                    { x: 78.4,  name: 'ES', country: 'Spain' },
                                    { x: 74.2,  name: 'FR', country: 'France' },

                                     
                                ]
                    }] 
*//*                
                xAxis: {
                    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                                 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                },
                            title: {
                    text: 'USD to EUR exchange rate from 2006 through 2008'
                },            subtitle: {
                    text: document.ontouchstart === undefined ?
                        'Click and drag in the plot area to zoom in' :
                        'Pinch the chart to zoom in'
                },
                yAxis: { title: { text: 'Temperature (Celsius)' } },
                tooltip: { valueSuffix: ' celsius' },
                legend: { align: 'center', verticalAlign: 'bottom', borderWidth: 0 },
                   plotOptions: {
                    area: {
                        fillColor: {
                            linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1},
                            stops: [
                                [0, Highcharts.getOptions().colors[0]],
                                [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                            ]
                        },
                        marker: {
                            radius: 2
                        },
                        lineWidth: 1,
                        states: {
                            hover: {
                                lineWidth: 1
                            }
                        },
                        threshold: null
                    }
                },
                series: [{
                  type:'area',
                    data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
                }]*/
    // };
        
        //The api calling and getting data for graph 
        $scope.getdataFirstgraph = function(date)
        {
            //The json request
            $scope.MysqlReportJson= '{"classname": "com.mysql.jdbc.Driver","dburl":"jdbc:mysql://cloudhiti.c0ttn3nzqakk.us-west-2.rds.amazonaws.com:","dbport":"3306","dbusername":"cloudhiti","dbpassword":"$DhitiSanskrit$","dbname":"firepie","tablename":"firepieorders","query":" Select customer_id, source, scheduled_dt from firepieorders  Where scheduled_dt   BETWEEN NOW()- INTERVAL '+parseInt(date)+' DAY  AND NOW()  group by 1 having count(id) = 1 order by customer_id desc"}'; 
            
            $scope.MysqlReportJson = JSON.parse(  $scope.MysqlReportJson );
            //console.log($scope.MysqlReportJson)
            //The api calling
            Report.MysqlReport2($scope.MysqlReportJson).then(function (data) {
                //console.log(data); 
            //The all data response in row format and store in variable
                var allrows= data.allcol;
            //The local array for store data
                let arrayreturn = [];
                var selectedlength=data.colnames.length;
                $("#sample1").dataTable().fnDestroy();
                $('#sample1body').html('');
                var body='';
                //The append data in table as table row
                $.each( data.allcol, function (index, valueobj) {
                    body = body + '<tr class="odd gradeX"> <td><label class="mt-checkbox mt-checkbox-outline mt-checkbox-single"> <span></span>  </label> </td> ';
                    for( var i=0; i< selectedlength ;i++)
                    {
                     body = body + ' <td> <a href="javascript:;">'+valueobj[i]+' </td> ';
                      }
                    body = body + '</tr>';
                }); 
                $('#sample1body').append(body);
                initTable();
              
            },function (errorMessage) { 
          });  
            
        };
        $scope.getdataFirstgraph($scope.selected);
      //The api calling and getting data for graph 
        $scope.getdataSecondgraph = function(date)
        {   
            
            //The json request
            $scope.MysqlReportJson= '{"classname": "com.mysql.jdbc.Driver","dburl":"jdbc:mysql://107.180.2.11:","dbport":"3306","dbusername":"cloudhitiadmin","dbpassword":"cloudhitiadmin2017","dbname":"cloudhitidemo","tablename":"order_csv","query":" Select source,count(id) from firepieorders  Where scheduled_dt   BETWEEN NOW()- INTERVAL '+parseInt(date)+' DAY  AND NOW()  group by 1  "}';
            $scope.MysqlReportJson = JSON.parse(  $scope.MysqlReportJson );
            //The api calling 
            Report.MysqlReport2($scope.MysqlReportJson).then(function (data) {
                //The all data response in row format and store in variable
                var allrows= data.allcol;
                //The local array for store data        
                let arrayreturn = [];
                //The making josn as per graph
                allrows.forEach(function(valuemain,index )
                    {
                         
                            arrayreturn.push({ 
                            name : valuemain[0]  ,  
                            data:  [ parseInt(valuemain[1])]
                            }); 
                          
                            if( index == allrows.length -1 ) { 
                                $scope.chartConfig = {
                                        title: {
                                            text: ''
                                        },
                                        xAxis: {
                                            categories: ['Source'],
                                            title: {
                                                text: null
                                            }
                                        },
                                        style: {
                                            fontSize: '5px'
                                        },
                                        yAxis: {
                                            min: 0,
                                            title: {
                                                text: 'Total Customers',
                                                align: 'high'
                                            },
                                            labels: {
                                                overflow: 'justify'
                                            }
                                        },

                                        tooltip: {
                                            valueSuffix: ' Customers'
                                        },
                                        plotOptions: {
                                            bar: {
                                                dataLabels: {
                                                    enabled: true
                                                }
                                            }
                                        },
                                        legend: {
                                            layout: 'vertical',
                                            align: 'right',
                                            verticalAlign: 'top',
                                            x: -40,
                                            y: 80,
                                            floating: true,
                                            borderWidth: 1,
                                            backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
                                            shadow: true
                                        },
                                        credits: {
                                            enabled: false
                                        },
                                        series: arrayreturn
                                }
                                 
                                }     
                        });
                },function (errorMessage) { 
                //$scope.attrvalue=0;//$state.go('dashboard', {},{reload: true});
                }); 
      
        };
        $scope.getdataSecondgraph($scope.selected);
        
        
      //The api calling and getting data for graph 
        $scope.getdata3graph = function(date)
        {
            //The json request
            $scope.MysqlReportJson= '{"classname": "com.mysql.jdbc.Driver","dburl":"jdbc:mysql://cloudhiti.c0ttn3nzqakk.us-west-2.rds.amazonaws.com:","dbport":"3306","dbusername":"cloudhiti","dbpassword":"$DhitiSanskrit$","dbname":"firepie","tablename":"firepieorders","query":"  select count(distinct customer_id) from firepieorders;"}'; 
            
            $scope.MysqlReportJson = JSON.parse(  $scope.MysqlReportJson );
            //console.log($scope.MysqlReportJson)
            //The api calling
            Report.MysqlReport2($scope.MysqlReportJson).then(function (data) {
                //console.log(data); 
            //The all data response in row format and store in variable
                var allrows= data.allcol;
            //The local array for store data
                let arrayreturn = [];
                var selectedlength=data.colnames.length;
                $('#thirdgraph').html('');
                var body='<tr>';
                //The append data in table as table row
                $.each( data.allcol, function (index, valueobj) {
                    for( var i=0; i< selectedlength ;i++)
                    {
                     body = body + ' <td> <a href="javascript:;">'+valueobj[i]+' Customer</td> ';
                      }
                    body = body + '</tr>';
                }); 
                $('#thirdgraph').append(body);
              
            },function (errorMessage) { 
          });  
            
        };
        $scope.getdata3graph($scope.selected);
        
      //The api calling and getting data for graph 
        $scope.getdata4graph = function(date)
        {
            //The json request
            $scope.MysqlReportJson= '{"classname": "com.mysql.jdbc.Driver","dburl":"jdbc:mysql://cloudhiti.c0ttn3nzqakk.us-west-2.rds.amazonaws.com:","dbport":"3306","dbusername":"cloudhiti","dbpassword":"$DhitiSanskrit$","dbname":"firepie","tablename":"firepieorders","query":"  select count(id) from firepieorders;"}'; 
            
            $scope.MysqlReportJson = JSON.parse(  $scope.MysqlReportJson );
            //console.log($scope.MysqlReportJson)
            //The api calling
            Report.MysqlReport2($scope.MysqlReportJson).then(function (data) {
                //console.log(data); 
            //The all data response in row format and store in variable
                var allrows= data.allcol;
            //The local array for store data
                let arrayreturn = [];
                var selectedlength=data.colnames.length;
                $('#fourthgraph').html('');
                var body='<tr>';
                //The append data in table as table row
                $.each( data.allcol, function (index, valueobj) {
                    for( var i=0; i< selectedlength ;i++)
                    {
                     body = body + ' <td> <a href="javascript:;">'+valueobj[i]+' Orders</td> ';
                      }
                    body = body + '</tr>';
                }); 
                $('#fourthgraph').append(body);
              
            },function (errorMessage) { 
          });  
            
        };
        $scope.getdata4graph($scope.selected);
        
      //The api calling and getting data for graph 
        $scope.getdata5graph = function(date)
        {
            //The json request
            $scope.MysqlReportJson= '{"classname": "com.mysql.jdbc.Driver","dburl":"jdbc:mysql://cloudhiti.c0ttn3nzqakk.us-west-2.rds.amazonaws.com:","dbport":"3306","dbusername":"cloudhiti","dbpassword":"$DhitiSanskrit$","dbname":"firepie","tablename":"firepieorders","query":"  Select sum(subtotal) from firepieorders where scheduled_dt   BETWEEN NOW()- INTERVAL '+parseInt(date)+' DAY  AND NOW()"}'; 
            
            $scope.MysqlReportJson = JSON.parse(  $scope.MysqlReportJson );
            //console.log($scope.MysqlReportJson)
            //The api calling
            Report.MysqlReport2($scope.MysqlReportJson).then(function (data) {
                //console.log(data); 
            //The all data response in row format and store in variable
                var allrows= data.allcol;
            //The local array for store data
                let arrayreturn = [];
                var selectedlength=data.colnames.length;
                $('#fivegraph').html('');
                var body='<tr>';
                //The append data in table as table row
                $.each( data.allcol, function (index, valueobj) {
                    for( var i=0; i< selectedlength ;i++)
                    {
                     body = body + ' <td> <a href="javascript:;">$ '+parseInt(valueobj[i])+'</td> ';
                      }
                    body = body + '</tr>';
                }); 
                $('#fivegraph').append(body);
              
            },function (errorMessage) { 
          });  
            
        };
        $scope.getdata5graph($scope.selected);
        
      //The api calling and getting data for graph 
        $scope.getdata6graph = function(date)
        {
            //The json request
            $scope.MysqlReportJson= '{"classname": "com.mysql.jdbc.Driver","dburl":"jdbc:mysql://cloudhiti.c0ttn3nzqakk.us-west-2.rds.amazonaws.com:","dbport":"3306","dbusername":"cloudhiti","dbpassword":"$DhitiSanskrit$","dbname":"firepie","tablename":"firepieorders","query":"   Select  count(id) as countId , id , scheduled_dt ,source , customer_id  from firepieorders  Where  scheduled_dt BETWEEN NOW()- INTERVAL '+parseInt(date)+' DAY  AND NOW()  group by customer_id  having count(id) > 2 order by  countId  desc "}'; 
            
            $scope.MysqlReportJson = JSON.parse(  $scope.MysqlReportJson );
            //console.log($scope.MysqlReportJson)
            //The api calling
            Report.MysqlReport2($scope.MysqlReportJson).then(function (data) {
                //console.log(data); 
            //The all data response in row format and store in variable
                var allrows= data.allcol;
            //The local array for store data
                let arrayreturn = [];
                var selectedlength=data.colnames.length;
                //$("#sample2").dataTable().fnDestroy();
                 
                $('#sample2body').html('');
                var body='';
                //The append data in table as table row
                $.each( data.allcol, function (index, valueobj) {
                    body = body + '<tr class="odd gradeX"> <td><label class="mt-checkbox mt-checkbox-outline mt-checkbox-single"> <span></span>  </label> </td> ';
                    for( var i=0; i< selectedlength ;i++)
                    {
                     body = body + ' <td> <a href="javascript:;">'+valueobj[i]+'</td> ';
                      }
                    body = body + '</tr>';
                }); 
                $('#sample2body').append(body);
                initTable2();
              
            },function (errorMessage) { 
          });  
            
        };
        $scope.getdata6graph($scope.selected4);
        
        //The api calling and getting data for graph 
        $scope.getdata7graph = function(date)
        {
            //The json request
            $scope.MysqlReportJson= '{"classname": "com.mysql.jdbc.Driver","dburl":"jdbc:mysql://cloudhiti.c0ttn3nzqakk.us-west-2.rds.amazonaws.com:","dbport":"3306","dbusername":"cloudhiti","dbpassword":"$DhitiSanskrit$","dbname":"firepie","tablename":"firepieorders","query":"  Select  count(id) as countId  from firepieorders  Where  scheduled_dt BETWEEN NOW()- INTERVAL '+parseInt(date)+'  DAY  AND NOW()  group by customer_id  having count(id)  = 1 "}'; 
            
            $scope.MysqlReportJson = JSON.parse(  $scope.MysqlReportJson );
            //console.log($scope.MysqlReportJson)
            //The api calling
            Report.MysqlReport2($scope.MysqlReportJson).then(function (data) {
                console.log(data); 
            //The all data response in row format and store in variable
                var allrows= data.allcol;
            //The local array for store data
                let arrayreturn = [];
                //var selectedlength=data.colnames.length;
                $('#7graph').html('');
                var total=0;
                var body='<tr>';
                //The append data in table as table row
                $.each( data.allcol, function (index, valueobj) {
                    total=total + parseInt(valueobj[0]);
                }); 
                 
                 body = body + ' <td> <a href="javascript:;">'+parseInt(total)+' </td></tr> ';
                $('#7graph').append(body);
              
            },function (errorMessage) { 
          });  
            
        };
        $scope.getdata7graph($scope.selected);
        
        //The api calling and getting data for graph 
        $scope.getdata8graph = function(date)
        {
            //The json request
            $scope.MysqlReportJson= '{"classname": "com.mysql.jdbc.Driver","dburl":"jdbc:mysql://cloudhiti.c0ttn3nzqakk.us-west-2.rds.amazonaws.com:","dbport":"3306","dbusername":"cloudhiti","dbpassword":"$DhitiSanskrit$","dbname":"firepie","tablename":"firepieorders","query":"  Select  count(id) as countId  from firepieorders  Where  scheduled_dt BETWEEN NOW()- INTERVAL '+parseInt(date)+'  DAY  AND NOW()  group by customer_id  having count(id)  = 2 "}'; 
            
            $scope.MysqlReportJson = JSON.parse(  $scope.MysqlReportJson );
            //console.log($scope.MysqlReportJson)
            //The api calling
            Report.MysqlReport2($scope.MysqlReportJson).then(function (data) {
                //console.log(data); 
            //The all data response in row format and store in variable
                var allrows= data.allcol;
            //The local array for store data
                let arrayreturn = [];
                //var selectedlength=data.colnames.length;
                $('#8graph').html('');
                var total=0;
                var body='<tr>';
                //The append data in table as table row
                $.each( data.allcol, function (index, valueobj) {
                    total=total + parseInt(valueobj[0]);
                }); 
                 
                body = body + ' <td> <a href="javascript:;">'+parseInt(total)+' </td></tr> ';
                $('#8graph').append(body);
              
              
            },function (errorMessage) { 
          });  
            
        };
        $scope.getdata8graph($scope.selected6);
        $scope.getdata2 = function( data)
        { }
         
        var initTable = function () {

            var table = $('#sample1');

            table.dataTable({

                // Internationalisation. For more info refer to http://datatables.net/manual/i18n
                //"scrollY": '10vh',
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
                "destroy": true,
                "bStateSave": true, // save datatable state(pagination, sort, etc) in cookie.
                "pagingType": "bootstrap_extended",

                "lengthMenu": [
                    [4],
                    [4] // change per page values here
                ],
                // set the initial value
                "pageLength": 4,
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

            var tableWrapper = jQuery('#sample1');
            
            
            
 
         }
        
        var initTable2 = function () {

            var table = $('#sample2');

            table.dataTable({

                // Internationalisation. For more info refer to http://datatables.net/manual/i18n
                //"scrollY": '10vh',
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
                "destroy": true,
                "bStateSave": true, // save datatable state(pagination, sort, etc) in cookie.
                "pagingType": "bootstrap_extended",

                "lengthMenu": [
                    [4],
                    [4] // change per page values here
                ],
                // set the initial value
                "pageLength": 4,
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

        $scope.fourthgraph = function( data)
         {
            Highcharts.chart('fourthgraph', {
         
            chart: {
                type: 'bar',
                height: (9 / 16 * 100) + '%' // 16:9 ratio
            },
            title: {
                text: ''
            },
            
            xAxis: {
                categories: ['Distance' ],
                title: {
                    text: null
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Total Order',
                    align: 'high'
                },
                labels: {
                    overflow: 'justify'
                }
            },
            tooltip: {
                valueSuffix: 'Total Order'
            },
            plotOptions: {
                bar: {
                    dataLabels: {
                        enabled: true
                    }
                }
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'top',
                x: -40,
                y: 80,
                floating: true,
                borderWidth: 1,
                backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
                shadow: true
            },
            credits: {
                enabled: false
            },
            series: data
         });
       
         }
         
        
       
        
        
        $rootScope.settings.layout.pageContentWhite = true;
        $rootScope.settings.layout.pageBodySolid = false;
        $rootScope.settings.layout.pageSidebarClosed = false;
    });
}]);
                     
                        