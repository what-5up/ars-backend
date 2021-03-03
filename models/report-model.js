const { pool } = require(`../database/connection`);

/**
 * Fetch all the passengers of the next immediate flight. Thereafter, categorize them based on their age.
 * 
 * @param {string} route - route of the next immediate flight. If not provided, it will choose the flight of closest upcoming departure time
 * @return {Promise<object>} query output
 * @throws {Error} - database connection error
 */
async function getPassengersByFlightNo(route = undefined, accType) {

    //building the query
    let whereClause = '';
    let variableValues = [];
    if (route !== undefined) {
        whereClause = 'AND route = ?';
        variableValues = [route, route];
    }
    let sqlQuery = "SELECT * FROM `passengers_with_routes` WHERE" +
        " `departure` = (SELECT DISTINCT `departure` FROM `passengers_with_routes` WHERE `departure` > CURRENT_TIMESTAMP " +
        whereClause + " LIMIT 1) " + whereClause;

    //fetching the results of passengers older than 18
    const p1 = new Promise((resolve, reject) => {
        const result = pool(accType).query(sqlQuery + " AND passenger_age >= 18",
            variableValues,
            function (error, results) {
                console.log(result.sql);
                if (error) {
                    reject(new Error(error.message));
                }
                resolve(results);
            })
    });

    //fetching the results of passengers younger than 18
    const p2 = new Promise((resolve, reject) => {
        pool(accType).query(sqlQuery + " AND passenger_age < 18",
            variableValues,
            function (error, results) {
                if (error) {
                    reject(new Error(error.message));
                }
                resolve(results);
            })
    });

    return new Promise(resolve => {
        Promise.all([p1, p2]).then(values => resolve(values))
    });
}

/**
 * Fetch all the bookings categorized by the passenger type from the database.
 *
 * @param {string} startDate - start date of format yyyy-mm-dd
 * @param {string} endDate - end date of format yyyy-mm-dd
 * @returns {Promise<object>} query output
 * @throws {Error} database connection error
 */

async function getBookingsByPassengerType(accType, startDate = undefined, endDate = undefined) {
    //building the query
    let whereClause = '';
    let variableValues = [];
    if (startDate !== undefined && endDate !== undefined) {
        whereClause = "WHERE departure_date BETWEEN ? AND ?";
        variableValues = [startDate, endDate];
    } else if (startDate === undefined && endDate !== undefined) {
        whereClause = "WHERE departure_date <= ?";
        variableValues = [endDate];
    } else if (startDate !== undefined && endDate === undefined) {
        whereClause = "WHERE departure_date >= ?";
        variableValues = [startDate];
    }

    //fetching the results
    return new Promise((resolve, reject) => {
        pool(accType).query("SELECT account_type, COUNT(*) AS number_of_bookings FROM bookings_by_passenger_type " + whereClause + " GROUP BY account_type",
            variableValues,
            function (error, results) {
                if (error) {
                    reject(new Error(error.message));
                }
                resolve(results);
            }
        );
    });
}


/**
 * Fetches revenue for aircraft models by each month from the database
 * 
 * @returns {object} Promise of a query output
 * @throws Error
 */
async function getRevenueByAircraftModel(model = undefined, month = undefined) {
    let whereArray = [];
    let whereClause = (model || month) ? ' WHERE ' : '';
    let variableValues = [];
    if (model) {
        whereArray.push("model_name = ?");
        variableValues.push(model);
    }
    if (month) {
        whereArray.push("month = ?");
        variableValues.push(month);
    }
    whereClause += whereArray.join(" AND ");
    return new Promise((resolve, reject) => {
        pool.query('SELECT model_name,revenue,month from revenue_by_aircraft_model_and_month' + whereClause,

            variableValues,
            function (error, results) {
                if (error) {
                    reject(new Error(error.message));
                }
                resolve(results);
            }
        );
    });
}

async function getNoOfPassengersToDest(destination,startDate = undefined, endDate = undefined){
    let whereClause = '';
    let variableValues = ['booked'];
    let sql = 'SELECT dest_code,dest_name,COUNT(*) AS no_of_passengers FROM passenger_destination WHERE state= ?';
    if (startDate !== undefined && endDate !== undefined) {
        whereClause = ' AND departure_date BETWEEN ? AND ?';
        variableValues.push(startDate,endDate);
    }
    else if (startDate === undefined && endDate !== undefined) {
        whereClause = ' AND departure_date <= ?';
        variableValues.push(endDate);
    }
    else if (startDate !== undefined && endDate === undefined) {
        whereClause = ' AND departure_date >= ?';
        variableValues.push(startDate);
    }
    if (destination) {
        whereClause += ' AND dest_code = ?';
        variableValues.push(destination);
    }
    sql+=whereClause + ' GROUP BY dest_code';
    console.log(sql)
    return new Promise((resolve, reject) => {
        pool.query(sql,
                   variableValues,
            function (error, results) {
                if (error) {
                    reject(new Error(error.message));
                }
                resolve(results);
            }
        );
    });
}

/**
 * Fetches all the past flights, states and passenger counts
 *
 * @returns {object} Promise of a query output
 * @throws Error
 */
async function getPastFlightsDetails() {
    return new Promise((resolve, reject) => {
        pool.query(
            "SELECT * FROM scheduled_flight_details",
            function (error, results) {
                if (error) {
                    reject(new Error(error.message));
                }
                resolve(results);
            }
        );
    });
}
module.exports = {
    getPassengersByFlightNo,
    getBookingsByPassengerType,
    getRevenueByAircraftModel,
    getPastFlightsDetails,
    getNoOfPassengersToDest
}

