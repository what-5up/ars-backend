const { pool } = require(`../database/connection`);

/**
 * Fetches seat map deatail of a aircraft model from the database
 * 
 * @returns {object} Promise of a query output
 * @throws Error
 */
const getSeatMapDetails = async (accType,scheduled_flight_id) => {
    return new Promise((resolve, reject) => {
        const result = pool(accType).getConnection((error, connection) => {
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

async function getAircraftModelById(id){
    return new Promise((resolve,reject)=>{
        const result = pool.query('SELECT * FROM aircraft_model WHERE id = ?',
            [id],
            function (error, results) {
                if (error) {
                    reject (new Error(error.message));
                }
                resolve(results);
            }
        )
    });
}

async function createAircraftModel(modelName,seatingCapacity,maxRows,maxColumns){
    const variableValues=[modelName,seatingCapacity,maxRows,maxColumns];
    return new Promise((resolve,reject)=>{
        const result = pool.query("INSERT INTO aircraft_model(model_name,seating_capacity,max_rows,max_columns) VALUES (?,?,?,?)",
            variableValues,
            function (error, results) {
                if (error) {
                    console.log(result.sql);
                    reject (new Error(error.message));
                }
                resolve(results);
            }
        )
    });
}

async function updateAircraftModelById(params,id){
    let variableValues = [];
    let sql = "UPDATE aircraft_model SET ";
    for (const [key, value] of Object.entries(params)) {
        if (value !== null) {
            sql += key + " = ?, ";
            variableValues.push(value);
        }
    }
    sql = sql.slice(0, -2);
    sql += " WHERE id = ?";
    variableValues.push(id);
    console.log(sql);
    console.log(variableValues);
    return new Promise((resolve, reject) => {
        const result = pool.query(sql,
            variableValues,
            function (error, results) {
                if (error) {
                    console.log(result.sql);
                    reject(new Error(error.message));
                }
                resolve(results);
            }
        )
    });
}



const Aircraft = {
    getSeatMapDetails,getAircraftModelById,createAircraftModel,updateAircraftModelById
}

module.exports = Aircraft;