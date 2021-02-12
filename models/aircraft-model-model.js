const { pool } = require(`../database/connection`);

/**
 * Fetches seat map deatail of a aircraft model from the database
 * 
 * @returns {object} Promise of a query output
 * @throws Error
 */
const getSeatMapDetails = async (scheduled_flight_id) => {
    return new Promise((resolve, reject) => {
        const result = pool.getConnection((error, connection) => {
            if (error) {
                reject(new Error(error.message));
            }
            connection.query('SELECT `seating_capacity`, `max_rows`, `max_columns` FROM `aircraft_model` WHERE `id` IN (SELECT am.`id` FROM `aircraft` as a LEFT JOIN `aircraft_model` as am ON a.`model_id` = am.`id` WHERE a.`id` IN (SELECT `assigned_aircraft_id` FROM `scheduled_flight` WHERE `id` = ?));',
                [scheduled_flight_id],
                (error, results, fields) => {
                    connection.release();
                    if (error) {
                        reject(new Error(error.message));
                    }
                    resolve(results);
                }
            );
        });
    });
}

const Aircraft = {
    getSeatMapDetails,
}

module.exports = Aircraft;