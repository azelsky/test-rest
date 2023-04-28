const db = require('../db');

async function createGuest(name, tableId) {
    try {
        const res = await db.query(
            `
            INSERT INTO 
                guests(name, table_id)
            VALUES
                ($1, $2)
            RETURNING *
        `,
            [name, tableId]
        );

        return res.rows[0];
    } catch (e) {
        return Promise.reject(e)
    }
};

async function approveGuest(guestId) {
    try {
        const res = await db.query(
            `
            UPDATE 
                guests 
            SET 
                approved = $1 
            WHERE 
                id = $2
        `,
            [true, guestId]
        );

        return res;
    } catch (e) {
        return Promise.reject(e)
    }
}

module.exports = {
    createGuest,
    approveGuest
}
