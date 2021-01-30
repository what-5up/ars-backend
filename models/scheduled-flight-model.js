const { pool } = require(`../database/connection`);

/**
 * Fetches all the bookings categorized by the passenger type from the database
 * 
 * @param {string} origin default undefined
 * @param {string} destination default undefined
 * @param {string} aircraftID default undefined
 * @param {string} aircraftModel default undefined
 * @returns {object} Promise of a query output
 * @throws Error
 */
async function getScheduledFlights(origin = undefined, destination = undefined, aircraftID = undefined, aircraftModel = undefined, isDeleted = undefined) {
    return new Promise((resolve, reject) => {
        //building the where clause
        let whereClause = '';
        let variableNames = [];
        let variableValues = [];
        if (origin !== undefined || destination !== undefined || aircraftID !== undefined || aircraftModel !== undefined || isDeleted !== undefined) {
            whereClause = ' WHERE '
            if (origin !== undefined) {
                variableNames.push('origin_code = ?');
                variableValues.push(origin);
            }
            if (destination !== undefined) {
                variableNames.push('destination_code = ?');
                variableValues.push(destination);
            }
            if (aircraftID !== undefined) {
                variableNames.push('aircraft_id = ?');
                variableValues.push(aircraftID);
            }
            if (aircraftModel !== undefined) {
                variableNames.push('aircraft_model = ?');
                variableValues.push(aircraftModel);
            }
            if (isDeleted !== undefined) {
                variableNames.push('is_deleted = ?');
                variableValues.push(isDeleted);
            }
            (variableNames.length == 1) ? whereClause += variableNames[0] :
                whereClause += variableNames.join(' AND ');
        }

        //fetching data from the database
        const result = pool.query('SELECT departure, origin_code, origin, destination_code, destination, aircraft_id, aircraft_model FROM scheduled_flights_list' + whereClause,
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
    getScheduledFlights
}
