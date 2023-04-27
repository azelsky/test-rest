const { addGuestToTable, getDB} = require("./db");

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
        const { id } = socket.handshake.auth || {};

        socket.join(id)

        console.log('someone connected');


        socket.on('message', ({message, to}) => {
            console.log('message');
            socket.to(to).emit('message', message)
        });

        socket.on('disconnect', () => {
            console.log('disconnected');
        });

        socket.on('requestToSitAtTheTable', ({waiterId, id, name, tableId}) => {
            socket.to(waiterId).emit('requestToSitAtTheTable', {
                tableId,
                from: {
                    id,
                    name,
                }
            })
        })

        socket.on('allowToSitAtTheTable', ({ guest, tableId }) => {
            addGuestToTable(guest, tableId)
            console.log(getDB())
            socket.to(guest.id).emit('allowToSitAtTheTable')
        })
    })
}

module.exports = {
    listen
}
