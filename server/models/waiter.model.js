const db = require('../db');

async function getWaiterIdByTableId(tableId) {
    const res = await db.query(
        `
            SELECT waiters.id AS id
            FROM waiters
            JOIN waiter_table_assignment ON waiters.id = waiter_table_assignment.waiter_id
            WHERE table_id = $1
        `,
        [tableId]
    );
    return res.rows[0].id;
};

module.exports = {
    getWaiterIdByTableId
}
