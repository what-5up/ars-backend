const { pool } = require(`../database/connection`);

/**
 * Fetches seat map of a aircraft model from the database
 *
 * @param {int} scheduled_flight_id default undefined
 * @param {object} connection default pool
 * @returns {Promise<object>} query output
 * @throws Error -database connection error
 */
async function getSeatMap(scheduled_flight_id, connection = pool) {
    return new Promise((resolve, reject) => {

        //fetching data from the database
        const result = connection.query('CALL generate_seat_map(?);',
            [scheduled_flight_id],
            function (error, results) {
                if (error) {
                    reject(new Error(error.message));
                }
                if(connection == pool){
                    resolve(results);
                }
                else{
                    resolve({ results: results, connection: connection });
                }
            }
        );
    })
}

module.exports = {
    getSeatMap
};
