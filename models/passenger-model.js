const { pool } = require(`../database/connection`);

async function addPassengers(passengers, userID, connection = pool) {
    let sql = "INSERT INTO passenger(user_id,title,first_name,last_name,birthday,gender,country,passport_no,passport_expiry) VALUES ";
    let valuesStatement = "(?,?,?,?,?,?,?,?,?),";
    let variableValues = [];
    for (const passenger of passengers) {
        sql += valuesStatement;
        variableValues.push(userID);
        for (const [key, value] of Object.entries(passenger)) {
            variableValues.push(value)
        }
    }
    sql = sql.slice(0, -1);
    // console.log(sql);
    // console.log(variableValues);
    return new Promise((resolve, reject) => {
        const result = connection.query(sql,
            variableValues,
            function (error, results) {
                if (error) {
                    // console.log(result.sql);
                    reject(new Error(error.message));
                }
                // console.log(result.sql);
                if (connection == pool) {
                    resolve(results);
                }
                else {
                    resolve({ results: results, connection: connection });
                }
            }
        )
    });
}

/**
 * Fetches passengers from the database
 * 
 * @param {string} user_id default undefined
 * @returns {object} Promise of a query output
 * @throws Error
 */
async function getPassengers(user_id = undefined) {
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
            (variableNames.length == 1) ? whereClause += variableNames[0] :
                whereClause += variableNames.join(' AND ');
        }

        //fetching data from the database
        const result = pool.query('SELECT * FROM passenger' + whereClause,
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
    addPassengers,
    getPassengers
};
