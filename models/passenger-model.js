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


module.exports = {
    addPassengers
};
