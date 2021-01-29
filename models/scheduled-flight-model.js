const { pool }  = require(`../database/connection`);

/**
 * Fetches all the bookings categorized by the passenger type from the database
 * 
 * @returns {object} Promise of a query output
 * @throws Error
 */
async function getScheduledFlights() {
    return new Promise((resolve, reject) => {
        const result = pool.query('SELECT * FROM scheduled_flight_fullinfo',
            [],
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
    getScheduledFlights
}
