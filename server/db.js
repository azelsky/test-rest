const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    password: 'bivipa',
    lost: 'localhost',
    port: 5432,
    database: 'test_res'
});

module.exports = pool;
