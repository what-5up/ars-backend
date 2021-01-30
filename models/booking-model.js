const { pool } = require(`../database/connection`);
const logger = require('../utils/logger');

/**
 * Fetches all the bookings from the database
 * 
 * @param {string} user_id default undefined
 * @returns {object} Promise of a query output
 * @throws Error
 */
async function getBookings(user_id = undefined) {
    return new Promise((resolve, reject) => {
        //building the where clause
        let whereClause = '';
        let variableNames = [];
        let variableValues = [];
        if (user_id !== undefined) {
            whereClause = ' WHERE '
            if (user_id !== undefined) {
                variableNames.push('user_id = ?');
                variableValues.push(user_id);
            }
            variableNames.push('is_deleted = ?');
            variableValues.push(0);
            (variableNames.length == 1) ? whereClause += variableNames[0] :
                whereClause += variableNames.join(' AND ');
        }

        //fetching data from the database
        const result = pool.query('SELECT * FROM booking' + whereClause,
            variableValues,
            function (error, results) {
                if (error) {
                    reject(new Error(error.message));
                }
                resolve(results);
                
            }
        );
    })
}

module.exports = {
    getBookings
}
