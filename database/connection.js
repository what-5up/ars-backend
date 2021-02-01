var mysql = require('mysql');
const config = require('../config/config');

const pool = mysql.createPool({
    connectionLimit: 1,
    user: config.user,
    host: config.host,
    password: config.password,
    port: config.port,
    database: config.database
});

module.exports.pool = pool;

module.exports.terminate = () => {
    pool.end(function (err) {
        console.log(err);
    });
} 