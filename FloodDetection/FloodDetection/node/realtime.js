var express = require('express'), bodyParser = require('body-parser');
;
var app = express();
var server = require('http').Server(app);
var io = require('socket.io');
app.use(bodyParser.json());
var server = app.listen(3000, function() {
	var host = server.address().address
	var port = server.address().port
	console.log("Example app listening at http://%s:%s", host, port)
});

var socket;

io.listen(server).on('connection', function(socket) {

	socket = socket;

	console.log('Message Received: ');

	socket.on('send', function(event) {

		console.log('Received message from client!', event);

	});

	app.post('/api', function(req, res) {

		console.log(req.body);

		//console.log('done');

		socket.broadcast.emit('gettwitter', req.body);

		res.end('done');

	});

	socket.on('disconnect', function() {
	}); // wait for reconnect

	socket.on('reconnect', function() {
	}); // connection restored  

	socket.on('reconnecting', function(nextRetry) {
	}); //trying to reconnect

	socket.on('reconnect_failed', function() {
		console.log("Reconnect failed");
	});

});
