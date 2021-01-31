var mysql = require('mysql');
const config = require('config');

const pool = mysql.createPool({
    connectionLimit: 1,
    user: "ars",
    host: "localhost",
    password: "arspassword",
    port: "3306",
    database: "b_airways"
});

module.exports.pool = pool;

module.exports.terminate = () => {
    pool.end(function (err) {
        console.log(err);
    });
} 