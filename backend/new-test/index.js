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

	// Handle messages
	socket.on('get-message', ({ message, room }) => {
		console.log({ message, room });
		if (room) {
			// Send the message to the specific room
			io.to(room).emit('return-message', message);
		} else {
			// Broadcast to all except the sender
			io.emit('return-message', message);
		}
	});

	// Handle joining a room
	socket.on('join-room', (room, cb) => {
		console.log(`${socket.id} joined room: ${room}`);
		socket.join(room);
		cb('joined room: ' + room);
	});
});

server.listen(3000, () => {
	console.log('listening on *:3000');
});
