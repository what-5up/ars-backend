const { pool }  = require(`../database/connection`);

/**
 * Fetches all the bookings categorized by the passenger type from the database
 *
 * @returns {object} Promise of a query output
 * @throws Error
 */
async function getBookingsByPassengerType(startDate = undefined, endDate = undefined) {
    let whereClause = '';
    let variableValues = [];
    if (startDate !== undefined && endDate !== undefined) {
        whereClause = "WHERE departure_date BETWEEN ? AND ?";
        variableValues = [startDate , endDate];
    } else if (startDate === undefined && endDate !== undefined) {
        whereClause = "WHERE departure_date <= ?";
        variableValues = [endDate];
    } else if (startDate !== undefined && endDate === undefined) {
        whereClause = "WHERE departure_date >= ?";
        variableValues = [startDate];
    }
    return new Promise((resolve, reject) => {
        pool.query("SELECT account_type, COUNT(*) AS number_of_bookings FROM bookings_by_passenger_type " + whereClause + " GROUP BY account_type",
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

async function getNoOfPassengersToDest(destination,startDate = undefined, endDate = undefined){
    let whereClause = '';
    let variableValues = [destination,'booked'];
    let sql = 'SELECT dest_code,dest_name,COUNT(*) AS no_of_passengers FROM passenger_destination WHERE dest_code = ? AND state= ?';
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
    sql+=whereClause;
    console.log(sql,variableValues);
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
    })

}

module.exports = {
    getBookingsByPassengerType,getNoOfPassengersToDest
};
