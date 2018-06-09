<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport"
	content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
<!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
<title>Flood Detection</title>

<!-- Bootstrap -->
<link rel="icon" type="image/png" href="assets/img/favicon.png"
	sizes="32x32">
<link
	href="assets/bower_components/bootstrap/dist/css/bootstrap.min.css"
	rel="stylesheet">

<!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->

<script src="assets/bower_components/html5shiv/dist/html5shiv.min.js"></script>
<script src="assets/bower_components/respond/dest/respond.min.js"></script>

<!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
<script src="assets/bower_components/jquery/dist/jquery.min.js"></script>
<script src="assets/bower_components/jquery-ui/jquery-ui.min.js"></script>
<script src="assets/bower_components/angular/angular.min.js"></script>
<script src="assets/bower_components/d3/d3.min.js"></script>
<script src="assets/bower_components/highcharts/highcharts.js"></script>
<!-- HighStock and HighMaps Commented  -->
<!-- <script src="assets/bower_components/highcharts/highmaps.js"></script>
    <script src="assets/bower_components/highcharts/highstock.js"></script> -->
<script src="assets/bower_components/highcharts/highcharts-more.js"></script>
<script src="assets/bower_components/highcharts/highcharts-3d.js"></script>

<!-- Include all compiled plugins (below), or include individual files as needed -->
<script src="assets/bower_components/bootstrap/dist/js/bootstrap.min.js"></script>
<script src="http://54.244.4.15:3000/socket.io/socket.io.js"></script>
<script
	src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/1.7.2/socket.io.js"></script>

<script src="assets/js/floodcharts.js"></script>



<script type="text/javascript">

$( document ).ready(function() {
	$("#pastfloodselect").val('');
	$("#pastsediment").val('');
	$("#pastwaterlevelselect").val('');
	var year = 2017;
	for (var i = 0; i <= 25; i++) {
		var yearval = parseInt(2017)-parseInt(i)
		$("#pastfloodselect").append('<option value='+yearval+'>'+yearval+'</option>');
		$("#pastsediment").append('<option value='+yearval+'>'+yearval+'</option>');
		$("#pastwaterlevelselect").append('<option value='+yearval+'>'+yearval+'</option>');
		
	} 
	
	
	

	
	


});

</script>

</head>
<body>
	<nav class="navbar navbar-light " style="border-radius:0px;margin-bottom: 5px;">
		<div class="container-fluid">
			<!-- Brand and toggle get grouped for better mobile display -->
			<!-- <center > <h2 >Flood Warning System</h2> </center> -->

			<div class="navbar-header">
				<button type="button" class="navbar-toggle collapsed"
					data-toggle="collapse" data-target="#bs-example-navbar-collapse-1"
					aria-expanded="false">
					<span class="sr-only">Toggle navigation</span> <span
						class="icon-bar"></span> <span class="icon-bar"></span> <span
						class="icon-bar"></span>
				</button>
				 <a class="navbar-brand" href="#"> <img src="assets/img/unnamed.png" ></a>
				
			</div>
			<div class="collapse navbar-collapse" id="myNavbar">
		       <h2 style="margin-left:40%;">Flood Warning System</h2> 
		    </div>
					 
			<!-- /.navbar-collapse -->
		</div>
		<!-- /.container-fluid -->
	</nav>

<div class="container-fluid">
	<div class="row">
		<div class="col-md-12">
			<div class="panel panel-primary">
				<div style="background:#31b3b7;border-color: #31b3b7;color:#fff;font-weight:600;font-size: 18px;"><center> Flood Prediction </center> </div>
				<div class="panel-body">
					<div id="loading">
						<!-- <p>
							<img src="assets/img/loading.gif" height="100" width="200" />
						</p> -->
					</div>
					<div id="container">
						<table class="table  table-responsive" style="margin-bottom: 5px;">
							<thead>
								<tr>
									<th>Date</th>
									<th>Time</th>
									<th>Water Level</th>
									<th>Discharge</th>
									<th>Run In Hectors</th>
									<th>Coarse Loading Metric</th>
									<th>Medium Loading Metric</th>
									<th>Fine Loading Metric</th>
									<th>Prediction</th>
								</tr>
							</thead>
							<tbody id="floodpredictable">
							</tbody>
						</table>

						<div class="col-md-6">
							<div id="floodprediction"></div>
						</div>
						<div class="col-md-6">
							<div id="floodpredictionwater"></div>
						</div>
					</div>
				</div>
								<div class="panel-footer" style="padding: 5px;text-align: right;background-color: #fff;font-size: 10px;">© Copyright 2017 ClouDhiti</div>
				
			</div>
		</div>
	</div>

	<div class="row">
		<div class="col-md-12">
			<div class="panel panel-primary">
				<div class="panel-heading" style="background:#31b3b7;border-color: #31b3b7;color:#fff;font-weight:600;font-size: 18px;">
				<center> Past Flood Records  </center>  
 				      <form class="form-inline " style="float:right;margin-top: -30px;">
						  <div class="form-group">
 						    <select
									class="form-control" id="pastfloodselect">
 							</select>
						    
						  </div>
					  </form>
				
				</div>
				<div class="panel-body" style="padding: 5px;">
					<div id="loading">
						<!-- <p>
							<img src="assets/img/loading.gif" height="100" width="200" />
						</p> -->
					</div>
					<div id="container">
						<table class="table table-responsive" style="margin-bottom: 5px;">
							<thead>
								<tr>
									<th>Date</th>
									<th>Water Level</th>
									<th>Discharge</th>
									<th>Run In Hectors</th>
									<th>Coarse Loading Metric</th>
									<th>Medium Loading Metric</th>
									<th>Fine Loading Metric</th>
								</tr>
							</thead>
							<tbody id="pastfloodrows">
							</tbody>
						</table>

						<div class="col-md-6">
							<div id="pastflooddischarge"></div>
						</div>
						<div class="col-md-6">
							<div id="pastfloodwater"></div>
						</div>
					</div>
				</div>
					<div class="panel-footer" style="padding: 5px;text-align: right;background-color: #fff;font-size: 10px;">© Copyright 2017 ClouDhiti</div>
				
			</div>
		</div>
	</div>
	<div class="row">
		<div class="col-md-12">
			<div class="panel panel-primary">
				<div class="panel-heading" style="background:#31b3b7;border-color: #31b3b7;color:#fff;font-weight:600;font-size: 18px;" >  <center> Sediment Status </center>   
				    <form class="form-inline " style="float:right;margin-top: -30px;">
						  <div class="form-group">
						    <!-- <label for="email">Select Year</label>  -->
						    <select
									class="form-control" id="pastsediment">
 							</select>
						    
						  </div>
					  </form>
				</div>
				<div class="panel-body">
					<div id="loading">
						<!-- <p>
							<img src="assets/img/loading.gif" height="100" width="200" />
						</p> -->
					</div>
					<div id="sediment"></div>
				</div>
									<div class="panel-footer" style="padding: 5px;text-align: right;background-color: #fff;font-size: 10px;">© Copyright 2017 ClouDhiti</div>
				
			</div>
		</div>
	</div>
	<div class="row">
		<div class="col-md-12">
			<div class="panel panel-default">
				<div class="panel-heading"  style="background:#31b3b7;border-color: #31b3b7;color:#fff;font-weight:600;font-size: 18px;"  > <center> Water Level Status </center>  
					<form class="form-inline " style="float:right;margin-top: -30px;">
						  <div class="form-group">
						    <!-- <label for="email">Select Year</label>  -->
						    <select
									class="form-control" id="pastwaterlevelselect">
 							</select>
						    
						  </div>
					  </form>
				</div>
				<div class="panel-body">
					<div id="loading">
						<!-- <p>
							<img src="assets/img/loading.gif" height="100" width="200" />
						</p> -->
					</div>
					<div class="col-md-6">
						<div id="watergraphdischarge"></div>
					</div>
					<div class="col-md-6">
						<div id="watergraph"></div>
					</div>
				</div>
								<div class="panel-footer" style="padding: 5px;text-align: right;background-color: #fff;font-size: 10px;">© Copyright 2017 ClouDhiti</div>
				
			</div>
		</div>
	</div>
</div>
	
	<div id="footer">
		<div class="container-fluid" style="text-align: right;">
			<p class="footer-block">© Copyright 2017 ClouDhiti, Inc. All Rights Reserved.</p>
		</div>
	</div>


</body>
</html>