const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
	console.log(socket.id + ' user connected');
	socket.on('get-message', (message) => {
		socket.broadcast.emit('return-message', message);
	});
});
server.listen(3000, () => {
	console.log('listening on *:3000');
});
