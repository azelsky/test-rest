const express = require('express');
const cors = require('cors');
const {getWaiterByTableId} = require("./models/waiter.model");


const app = express();

app.use(cors({
    origin: 'http://localhost:4200'
}));

app.get('/api/get-waiter/:tableId', async (req, res) => {
    const tableId = req.params.tableId;
    const waiterId = await getWaiterByTableId(tableId);

    res.status(200).json({
        waiterId
    });
})

module.exports = app;
