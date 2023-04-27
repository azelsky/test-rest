const express = require('express');
const cors = require('cors');
const DB = require('./DB');

const app = express();

app.use(cors({
    origin: 'http://localhost:4200'
}))

app.get('/api/:accountId/my-waiter/:tableId', (req, res) => {
    const tableId = Number(req.params.tableId);
    const accountId = req.params.accountId;

    const waiterId = DB.getWaiterByTableId(tableId);

    res.status(200).json({
        waiterId
    });
})

module.exports = app;
