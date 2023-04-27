const waiter = {
    id: 74,
}

const sushiHouse = {
    id: 'sushi_house',
    name: 'Sushi House'
}

const table1 = {
    id: 45,
    tableNum: 2,
    accountId: sushiHouse.id
}

const sushiHouseAdminPanel = {
    id: 86,
    accountId: sushiHouse.id,
}

const guest = {
    id: 234,
    name: 'Stefan',
    tableId: 13
}

const DB = {
    waiters: {
        [waiter.id]: waiter
    },
    guests: {},
    tables: {
        [table1.id]: table1
    },
    accounts: {
        [sushiHouse.id]: sushiHouse
    },
    adminPanels: {
        [sushiHouseAdminPanel.id]: sushiHouseAdminPanel
    },
    tableWaiters: {
        1: {
            tableId: table1.id,
            waiterId: waiter.id
        }
    }
}

function getWaiterByTableId(tableId) {
    for(let tableWaiterId in DB.tableWaiters) {
        let tableWaiter = DB.tableWaiters[tableWaiterId];
        if (tableId === tableWaiter.tableId) return tableWaiter.waiterId
    }
}

function getDB() {
    return DB
}

function addGuestToTable(guest, tableId) {
    console.log(guest)
    DB.guests[guest.id] = {
        ...guest,
        tableId
    }
}

module.exports = {
    getWaiterByTableId,
    getDB,
    addGuestToTable
}
