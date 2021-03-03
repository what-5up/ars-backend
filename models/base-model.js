const { pool } = require(`../database/connection`);
const logger = require('../utils/logger');

/**
 * @description get connection from pool
 * @returns {Promise<object>} Promise of a query output
 */
async function getConnection(accType) {
    return new Promise((resolve, reject) => {
        pool(accType).getConnection(function (err, connection) {
            if (err) reject(err); // not connected!

            // return the connection
            resolve(connection);//TODO: clarify
        });
    })
}

/**
 * @description release connection to pool
 * @param {object} connection 
 * 
 */
function releaseConnection(connection) {
    connection.release();
    return;
}

/**
 * @description start a database transaction
 * @param {object} connection 
 * @returns {Promise<object>} Promise of a query output
 */
async function startTransaction(connection) {
    return new Promise((resolve, reject) => {
        const result = connection.query("START TRANSACTION;",
            function (error, results) {
                if (error) {
                    reject(new Error(error.message));
                }
                resolve({ results: results, connection: connection });

            }
        );
    })
}

/**
 * @description end a database transaction
 * @param {object} connection 
 * @returns {Promise<object>} Promise of a query output
 */
async function endTransaction(connection) {
    return new Promise((resolve, reject) => {
        const result = connection.query("COMMIT;",
            function (error, results) {
                if (error) {
                    reject(new Error(error.message));
                }
                resolve({ results: results, connection: connection });

            }
        );
    })
}

/**
 * @description rollback a database transaction
 * @param {object} connection 
 * @returns {Promise<object>} Promise of a query output
 */
async function rollbackTransaction(connection) {
    return new Promise((resolve, reject) => {
        const result = connection.query("ROLLBACK;",
            function (error, results) {
                if (error) {
                    reject(new Error(error.message));
                }
                resolve({ results: results, connection: connection });

            }
        );
    })
}

async function writeLock(table, connection = pool) {
    return new Promise((resolve, reject) => {
        const result = connection.query("LOCK TABLES ?? WRITE", [table],
            function (error, results) {
                if (error) {
                    console.log(result.sql);
                    reject(new Error(error.message));
                }
                if (connection == pool) {
                    resolve(results);
                }
                else {
                    resolve({ results: results, connection: connection });
                }
            }
        )
    })
}

async function unlockTables(connection = pool) {
    return new Promise((resolve, reject) => {
        const result = connection.query("UNLOCK TABLES",
            function (error, results) {
                if (error) {
                    console.log(result.sql);
                    reject(new Error(error.message));
                }
                if (connection == pool) {
                    resolve(results);
                }
                else {
                    resolve({ results: results, connection: connection });
                }
            }
        )
    })
}

module.exports = {
    getConnection,
    releaseConnection,
    startTransaction,
    endTransaction,
    rollbackTransaction,
    writeLock,
    unlockTables
}


