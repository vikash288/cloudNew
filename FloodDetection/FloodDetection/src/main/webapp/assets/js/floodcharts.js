var pastFloodwaterMatrics;
var floodPrediction;

$( document ).ready(function() {
	 var socket = io.connect('http://54.244.4.15:3000');
	
	socket.emit('send', {"status": {"sas": true}}); 
    
	socket.on('gettwitter', function(message) {
		//alert(JSON.stringify(message));
		$("#floodpredictable").empty();
		$("#floodpredictable").append(message.floodtable);
		floodpredictGraph(message)
		floodWaterPredict(message)
	});
	
	
	$.getJSON('http://localhost:8080/FloodDetection/PastFloodRecords', function (data) {
		$("#pastfloodrows").empty();
		$("#pastfloodrows").append(data.pastRecord.datarecord);
		pastFloodwaterMatrics(data)
		pastFloodDischarge(data)
		pastWaterlevelDischarge(data)
		sediment(data)
		pastWaterlevel(data)
	});
	
	
	//Filter Charts
	
	$( "#pastfloodselect" ).change(function() {
		  var year = $( "#pastfloodselect" ).val();
		    $.ajax({
		    	method: "POST",
		        url: './PastFloodReportFilter',
		        data: { fyear: year },
		        success: function(data) {
		        	$("#pastfloodrows").empty();
		    		$("#pastfloodrows").append(data.pastRecord.datarecord);
		    		pastFloodwaterMatrics(data)
		    		pastFloodDischarge(data)
		        },
		        cache: false
		    });
		});
	
	
	// past Sediment
	$( "#pastsediment" ).change(function() {
		  var year = $( "#pastsediment" ).val();
		    $.ajax({
		    	method: "POST",
		        url: './PastFloodReportFilter',
		        data: { fyear: year },
		        success: function(data) {
		        	sediment(data)
		        },
		        cache: false
		    });
		});
	
	
	// past Sediment
	$( "#pastwaterlevelselect" ).change(function() {
		  var year = $( "#pastwaterlevelselect" ).val();
		    $.ajax({
		    	method: "POST",
		        url: './PastFloodReportFilter',
		        data: { fyear: year },
		        success: function(data) {
		        	pastWaterlevelDischarge(data)
		        	pastWaterlevel(data)
		        },
		        cache: false
		    });
		});
	
	
	
	
});


function pastFloodDischarge(data){
	
	Highcharts.chart('pastflooddischarge', {

	    title: {
	        text: 'Water Discharge Level'
	    },

	    subtitle: {
	        text: 'Source: Cloudhiti.com'
	    },
	    xAxis: {
	        categories: data.pastRecord.floodate
	    },

	    yAxis: {
	        title: {
	            text: 'Water Level Flood Prediction'
	        }
	    },
	    legend: {
	        layout: 'vertical',
	        align: 'right',
	        verticalAlign: 'middle'
	    },
	    series: [
	     {
	        name: 'Discharge level',
	        data: data.pastRecord.dischargelevel
	    }]

	})
	
}


function pastFloodwaterMatrics(data){
		
	Highcharts.chart('pastfloodwater', {

	    title: {
	        text: 'Water Level Metrics'
	    },

	    subtitle: {
	        text: 'Source: Cloudhiti.com'
	    },
	    xAxis: {
	        categories: data.pastRecord.floodate
	    },

	    yAxis: {
	        title: {
	            text: 'Water Level Flood Prediction'
	        }
	    },
	    legend: {
	        layout: 'vertical',
	        align: 'right',
	        verticalAlign: 'middle'
	    },
	    series: [
	    {
	        name: 'Water level',
	        data: data.pastRecord.waterlevel
	    }/*, {
	        name: 'Discharge level',
	        data: data.pastRecord.dischargelevel
	    }*/, {
	        name: 'Run In Hector',
	        data: data.pastRecord.runinhector
	    }]

	})
}


function pastWaterlevelDischarge(data){
	
	//alert(JSON.stringify(data.pastWaterRecord.waterlevel));
	
	Highcharts.chart('watergraphdischarge', {

	    title: {
	        text: 'Year Wise Water Level matrics'
	    },

	    subtitle: {
	        text: 'Source: cloudhiti.com'
	    },
	    xAxis: {
	        categories: data.pastWaterRecord.watermonth
	    },

	    yAxis: {
	        title: {
	            text: ''
	        }
	    },
	    legend: {
	        layout: 'vertical',
	        align: 'right',
	        verticalAlign: 'middle'
	    },
	    series: [{
	        name: 'Discharge level',
	        data: data.pastWaterRecord.waterdischarge
	    }]

	});
	
}



function pastWaterlevel(data){
	
	//alert(JSON.stringify(data.pastWaterRecord.waterlevel));
	
	Highcharts.chart('watergraph', {

	    title: {
	        text: 'Year Wise Water Level matrics'
	    },

	    subtitle: {
	        text: 'Source: cloudhiti.com'
	    },
	    xAxis: {
	        categories: data.pastWaterRecord.watermonth
	    },

	    yAxis: {
	        title: {
	            text: ''
	        }
	    },
	    legend: {
	        layout: 'vertical',
	        align: 'right',
	        verticalAlign: 'middle'
	    },
	    series: [{
	        name: 'Water Level',
	        data: data.pastWaterRecord.waterlevel
	    },  {
	        name: 'Run in Hector',
	        data: data.pastWaterRecord.waterhector
	    }]

	});
	
}


function sediment(data){
	Highcharts.chart('sediment', {
	    chart: {
	        type: 'area'
	    },
	    title: {
	        text: 'Sediment Metric'
	    },
	    subtitle: {
	        text: 'Source: Cloudhiti.com'
	    },
	    xAxis: {
	        categories: data.sedimentRecord.sedimonth,
	        tickmarkPlacement: 'on',
	        title: {
	            enabled: false
	        }
	    },
	    yAxis: {
	        title: {
	            text: 'Billions'
	        },
	        labels: {
	            formatter: function () {
	                return this.value / 1000;
	            }
	        }
	    },
	    tooltip: {
	        split: true,
	        valueSuffix: ' millions'
	    },
	    plotOptions: {
	        area: {
	            stacking: 'normal',
	            lineColor: '#666666',
	            lineWidth: 1,
	            marker: {
	                lineWidth: 1,
	                lineColor: '#666666'
	            }
	        }
	    },
	    series: [{
	        name: 'Coarse',
	        data: data.sedimentRecord.csedi
	    }, {
	        name: 'Medium',
	        data: data.sedimentRecord.mSedi
	    }, {
	        name: 'Fine',
	        data: data.sedimentRecord.fSedi
	    }]
	})
}


function floodpredictGraph(data){
	
	//alert(JSON.stringify(data.floodData));
	
	Highcharts.chart('floodprediction', {

	    title: {
	        text: 'Flood Prediction'
	    },

	    subtitle: {
	        text: 'Source: Cloudhiti.com'
	    },
	    xAxis: {
	        categories: data.floodtime
	    },

	    yAxis: {
	        title: {
	            text: 'Flood Prediction'
	        }
	    },
	    legend: {
	        layout: 'vertical',
	        align: 'right',
	        verticalAlign: 'middle'
	    },

	    colors: [
	             '#fa6464'
	         ],

	    series: [
	    {
	        name: 'Flood Prediction',
	        data: data.floodData
	    }]

	})
	
}

function floodWaterPredict(data){
	//Water Dashboard
	
	Highcharts.chart('floodpredictionwater', {

	    title: {
	        text: 'Water Level Metrics'
	    },

	    subtitle: {
	        text: 'Source: Cloudhiti.com'
	    },
	    xAxis: {
	        categories: data.floodtime
	    },

	    yAxis: {
	        title: {
	            text: 'Water Level Flood Prediction'
	        }
	    },
	    legend: {
	        layout: 'vertical',
	        align: 'right',
	        verticalAlign: 'middle'
	    },
	    series: [
	    {
	        name: 'Water level',
	        data: data.waterlevel
	    }, {
	        name: 'Discharge level',
	        data: data.waterdischarge
	    }, {
	        name: 'Run In Hector',
	        data: data.runinhector
	    }]

	});
}