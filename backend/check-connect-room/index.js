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
	console.log('a user connected');
});

io.on('connection', (socket) => {
	socket.on('chat message', (msg) => {
		console.log('message: ' + msg);
		io.emit('chat_transfer', msg);
	});
});

io.on('connection', (socket) => {
	socket.join('room-1');
	io.sockets.in('room-1').emit('check2', 'check2');
	let sizeofRoom1 = io.sockets.adapter.rooms.get('room-1').size;
	console.log(sizeofRoom1);
	io.sockets.in('room-1').emit('check1', sizeofRoom1);

	socket.join('room-2');
	io.sockets.in('room-2').emit('r2', 'hello room-2');
});

server.listen(3000, () => {
	console.log('listening on *:3000');
});
