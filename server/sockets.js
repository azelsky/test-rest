function listen(io) {
    // io.use((socket, next) => {
    //     const {name, table, isWaiter} = socket.handshake.auth || {};
    //
    //     if (isWaiter) {
    //         return next();
    //     }
    //
    //     if (!table) {
    //         const err = new Error('table is required');
    //         err.data = {content: 'Please scan valid QR code'}
    //         return next(err);
    //     }
    //
    //     return next();
    // })

    io.on('connection', (socket) => {
        const { isWaiter, id } = socket.handshake.auth || {};
        if (isWaiter) {
            console.log('isWaiter', id)
            socket.join(id)
        }

        console.log('someone connected');


        socket.on('message', ({message, to}) => {
            console.log('message');
            socket.to(to).emit('message', message)
        });

        socket.on('disconnect', () => {
            console.log('disconnected');
        });
    })
}

module.exports = {
    listen
}
