var mysql = require('mysql');
const config = require('config');

module.exports.pool = mysql.createPool({
    connectionLimit: 1,
    user: config.get("user"),
    host: config.get("host"),
    password: config.get("password"),
    port: config.get("port"),
    database: config.get("database")
});