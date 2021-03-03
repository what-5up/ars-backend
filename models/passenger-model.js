const { pool } = require(`../database/connection`);
const encryptor = require('../utils/crypto');

async function addPassengers(passengers, userID, connection = pool) {
    let sql = "INSERT INTO passenger(user_id,title,first_name,last_name,birthday,gender,country,passport_no,passport_expiry) VALUES ";
    let valuesStatement = "(?,?,?,?,?,?,?,?,?),";
    let variableValues = [];
    for (const passenger of passengers) {
        sql += valuesStatement;
        variableValues.push(userID);
        variableValues.push(passenger.title);
        variableValues.push(encryptor.encrypt(passenger.first_name));
        variableValues.push(encryptor.encrypt(passenger.last_name));
        variableValues.push(passenger.birthday);
        variableValues.push(passenger.gender);
        variableValues.push(encryptor.encrypt(passenger.country));
        variableValues.push(encryptor.encrypt(passenger.passport_no));
        variableValues.push(passenger.passport_expiry);
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
                resolve(results.map((row => {
                    return {
                        id: row.id,
                        user_id: row.user_id,
                        title: row.title,
                        first_name: encryptor.decrypt(row.first_name),
                        last_name: encryptor.decrypt(row.last_name),
                        birthday: row.birthday,
                        gender: row.gender,
                        country: encryptor.decrypt(row.country),
                        passport_no: encryptor.decrypt(row.passport_no),
                        passport_expiry: row.passport_expiry
                    }
                })));

            }
        );
    })
}

/**
 * Fetches last added by a user from the database
 * 
 * @param {string} user_id default undefined
 * @returns {object} Promise of a query output
 * @throws Error
 */
async function getLastPassengerIDs(user_id, newPassengerCount, connection = pool) {
    return new Promise((resolve, reject) => {
        //fetching data from the database
        const result = connection.query('SELECT * FROM passenger WHERE user_id = ? ORDER BY id DESC LIMIT ?;',
            [
                user_id,
                newPassengerCount
            ],
            function (error, results) {
                if (error) {
                    reject(new Error(error.message));
                }
                results = results.map((row => {
                    return {
                        id: row.id,
                        user_id: row.user_id,
                        title: row.title,
                        first_name: encryptor.decrypt(row.first_name),
                        last_name: encryptor.decrypt(row.last_name),
                        birthday: row.birthday,
                        gender: row.gender,
                        country: encryptor.decrypt(row.country),
                        passport_no: encryptor.decrypt(row.passport_no),
                        passport_expiry: row.passport_expiry
                    }
                }))
                if (connection == pool) {
                    resolve(results);
                }
                else {
                    resolve({ results: results, connection: connection });
                }

            }
        );
    })
}

/*
 * get all the passengers that the given user have created
 * 
 * @param {number} userId 
 * 
 * @returns {Promise<object>} [{}]
 */
async function getPassengersOfUser(userId) {
    return new Promise((resolve, reject) => {
        const result = pool.query("SELECT id, title , first_name, last_name, birthday, gender, country, passport_no, passport_expiry FROM passenger WHERE user_id = ?",
            [userId],
            function (error, results) {
                if (error) {
                    console.log(result.sql);
                    reject(new Error(error.message));
                }
                resolve(results.map((row => {
                    return {
                        id: row.id,
                        title: row.title,
                        first_name: encryptor.decrypt(row.first_name),
                        last_name: encryptor.decrypt(row.last_name),
                        birthday: row.birthday,
                        gender: row.gender,
                        country: encryptor.decrypt(row.country),
                        passport_no: encryptor.decrypt(row.passport_no),
                        passport_expiry: row.passport_expiry
                    }
                })));
            }
        )
    })
}


module.exports = {
    addPassengers,
    getPassengersOfUser,
    getLastPassengerIDs,
    getPassengers
};
