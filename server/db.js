const waiter = {
    id: 74,
}

const sushiHouse = {
    id: 67,
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
    tables: {
        tableId: table1.id,
        waiterId: waiter.id
    }
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
    }
}

module.exports = {
    DB
}
