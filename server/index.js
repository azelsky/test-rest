const http = require('http');
const express = require('express');
const io = require('socket.io');
const { DB } = require('./db');

const PORT = 3000;

const app = express();

const server = http.createServer(app);

const socketServer = io(server, {
    cors: {
        origin: 'http://localhost:4200'
    }
});

socketServer.use((socket, next) => {
    const {name, table, isWaiter} = socket.handshake.auth || {};
    if (!table && !isWaiter) {
        const err = new Error('table is required');
        err.data = {content: 'Please scan valid QR code'}
        return next(err);
    }

    next();
})

socketServer.on('connection', (socket) => {
    console.log('someone connected');

    socket.on('message', (message) => {
        console.log('message');
        socket.emit(message)
    });

    socket.on('disconnect', () => {
        console.log('disconnected');
    })
})

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
})
