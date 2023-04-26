const http = require('http');
const io = require('socket.io');
const sockets = require('./sockets');
const app = require('./api');

const PORT = 3000;

const server = http.createServer(app);

const socketServer = io(server, {
    cors: {
        origin: 'http://localhost:4200'
    }
});

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
})

sockets.listen(socketServer);
