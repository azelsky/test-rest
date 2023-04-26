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
    tables: [
        {
            tableId: table1.id,
            waiterId: waiter.id
        }
    ]
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

function getWaiterByTableIdAndRestaurantId(tableId, restaurantId) {
    for (let adminPanelId in DB.adminPanels) {
        const adminPanel = DB.adminPanels[adminPanelId];
        if (adminPanel.accountId === restaurantId) {
            const table = adminPanel.tables.find((table) => table.tableId === tableId);
            return table.waiterId;
        }
    }
}

function getDB() {
    return DB
}

module.exports = {
    getWaiterByTableIdAndRestaurantId,
    getDB,

}
