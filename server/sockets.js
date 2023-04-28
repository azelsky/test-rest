const { createGuest, approveGuest } = require("./models/quest.model");
const { getWaiterIdByTableId } = require("./models/waiter.model");

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

    io.on('connection', async (socket) => {
        console.log('someone connected');
        let { id, name, tableId } = socket.handshake.auth || {};

        let isNewGuest = false;

        if (id) {
            socket.join(id);
        }
        else {
            isNewGuest = true;
            const guest = await createGuest(name, tableId);
            ({id} = guest)
            socket.join(id);
        }

        if (tableId) {
            if (isNewGuest) {
                const waiterId = await getWaiterIdByTableId(tableId);
                socket.to(waiterId).emit('requestToSitAtTheTable', {
                    tableId,
                    from: {
                        id,
                        name,
                    }
                });
            }
            else {
                socket.emit('allowToSitAtTheTable', id);
            }
        }

        socket.on('callWaiter', async ({message, tableId}) => {
            const waiterId = await getWaiterIdByTableId(tableId);
            socket.to(waiterId).emit('message', message)
        });

        socket.on('disconnect', () => {
            console.log('disconnected');
        });

        socket.on('allowToSitAtTheTable', async ({ guestId }) => {
            await approveGuest(guestId)
            socket.to(guestId).emit('allowToSitAtTheTable', id);
        })
    })
}

module.exports = {
    listen
}
