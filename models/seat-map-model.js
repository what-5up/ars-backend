const { pool } = require(`../database/connection`);

/**
 * Fetches seat map of a aircraft model from the database
 *
 * @param {int} scheduled_flight_id default undefined
 * @param {object} connection default pool
 * @returns {Promise<object>} query output
 * @throws Error -database connection error
 */
async function getSeatMap(accType,scheduled_flight_id, connection = null) {
    return new Promise((resolve, reject) => {
        let usingConnection = true;
        if(connection == null){
            connection = pool(accType)
            usingConnection = false;
        }
        //fetching data from the database
        const result = connection.query('CALL generate_seat_map(?);',
            [scheduled_flight_id],
            function (error, results) {
                if (error) {
                    reject(new Error(error.message));
                }
                if(!usingConnection){
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
