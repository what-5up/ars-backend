var mysql = require('mysql');
const config = require('config');

module.exports.pool = mysql.createPool({
    connectionLimit: 1,
    user: config.get("db.user"),
    host: config.get("db.host"),
    password: config.get("db.password"),
    port: config.get("db.port"),
    database: config.get("db.database")
});