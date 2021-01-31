const { pool } = require(`../database/connection`);
const logger = require('../utils/logger');

async function getConnection() {
    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, connection) {
            if (err) reject(err); // not connected!

            // return the connection
            resolve(connection);//TODO: clarify
        });
    })
}

/**
 * 
 * @param {*} connection 
 * @todo implement
 */
function releaseConnection(connection) {
    connection.release();
    return;
}

/**
 * 
 * @param {*} connection 
 * @todo implement
 */
async function startTransaction(connection) {
    return new Promise((resolve, reject) => {
        const result = connection.query("START TRANSACTION;",
            function (error, results) {
                if (error) {
                    reject(new Error(error.message));
                }
                resolve({results: results, connection: connection});

            }
        );
    })
}

/**
 * 
 * @param {*} connection 
 * @todo implement
 */
async function endTransaction(connection) {
    return new Promise((resolve, reject) => {
        const result = connection.query("COMMIT;",
            function (error, results) {
                if (error) {
                    reject(new Error(error.message));
                }
                resolve({results: results, connection: connection});

            }
        );
    })
}

module.exports = {
    getConnection,
    releaseConnection,
    startTransaction,
    endTransaction
}


