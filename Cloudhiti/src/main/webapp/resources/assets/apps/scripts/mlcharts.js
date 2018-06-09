function drawChart(sets) {
         
        var data = new google.visualization.DataTable();

          data.addColumn('number'); // x axis
         
           for(var i = 1; i <= sets.length; i++)
          {
                data.addColumn('number', 'Cluster ' + i);   // y axises
          } 
           
         sets.forEach(function(set, i) {
            data.addRows(set);
         }); 
 
        var series = {};
        // means
          //series[2] = { color:'grey' };
          //series[3] = { color:'black', pointSize:12 };
 
        var options = {
          title: 'K-means graph',
           series: series
        };

        var chart = new google.visualization.ScatterChart(document.getElementById('chart_div'));
        chart.draw(data, options);
}


function scatterCharts(data) {
	
	Highcharts.chart('chart_div', {
		 chart: {
		        type: 'scatter',
		        zoomType: 'xy'
		    },
		    title: {
		        text: 'Scatter Charts'
		    },
	    /* subtitle: {
	        text: 'Area Charts'
	    }, */
		    xAxis: {
		        title: {
		            enabled: true,
		            text: 'X axis'
		        },
		        startOnTick: true,
		        endOnTick: true,
		        showLastLabel: true
		    },
		    yAxis: {
		        title: {
		            text: 'Y axis'
		        }
		    },
		    legend: {
		        layout: 'vertical',
		        align: 'left',
		        verticalAlign: 'top',
		        x: 100,
		        y: 70,
		        floating: true,
		        backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF',
		        borderWidth: 1
		    },
		    credits: {
		        enabled: false
		    },
		    plotOptions: {
		        scatter: {
		            marker: {
		                radius: 5,
		                states: {
		                    hover: {
		                        enabled: true,
		                        lineColor: 'rgb(100,100,100)'
		                    }
		                }
		            },
		            states: {
		                hover: {
		                    marker: {
		                        enabled: false
		                    }
		                }
		            },
		            tooltip: {
		                headerFormat: '<b>{series.name}</b><br>',
		                pointFormat: '{point.x}, {point.y}'
		            }
		        }
		    },
	     
	    series:  data
	});
	
 
}
