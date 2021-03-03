var mysql = require('mysql');
const config = require('../config/config');

const dbinit = async () => {
    var connection = mysql.createConnection({
        user: config.user,
        host: config.host,
        password: config.password,
        database: config.database
    });

    connection.connect(function (err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        }
    });

    connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
        if (error) throw error;
        console.log('The solution is: ', results[0].solution);
    });

    connection.end();
}

module.exports = dbinit