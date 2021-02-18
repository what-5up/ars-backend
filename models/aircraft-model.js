const { pool } = require(`../database/connection`);

/**
 * Fetches all the aircrafts from the database
 * 
 * @returns {object} Promise of a query output
 * @throws Error
 */
const getAllAircrafts = async () => {
    return new Promise((resolve, reject) => {
        const result = pool.getConnection((error, connection) => {
            if (error) {
                reject(new Error(error.message));
            }
            connection.query('SELECT a.id, am.model_name, am.seating_capacity FROM aircraft a INNER JOIN aircraft_model am ON a.model_id=am.id',
                [],
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

/**
 * Fetches details for aircraft specified by id from the database
 * 
 * @returns {object} Promise of a query output
 * @throws Error
 */
const getDetailsForAircraft = async (id) => {
    return new Promise((resolve, reject) => {
        const result = pool.query('SELECT a.id, am.model_name, am.seating_capacity, sf.route, sf.departure FROM aircraft a INNER JOIN aircraft_model am ON a.model_id = am.id INNER JOIN scheduled_flight sf ON a.id = sf.assigned_aircraft_id where a.id = ? ',
            [id],
            (error, results, fields) => {
                if (error) {
                    reject(new Error(error.message));
                }
                resolve(results);
            }
        );
    });
}

/**
 * Fetches available aircrafts for given period and seating capacity from the database
 * 
 * @returns {object} Promise of a query output
 * @throws Error
 */
const getAvailableAircrafts = async (startTime, endTime, seatingCapacity) => {
    return new Promise((resolve, reject) => {
        const result = pool.query('SELECT a.id, am.model_name, am.seat_capacity FROM aircraft a INNER JOIN aircraft_model am ON a.model_id = am.id INNER JOIN scheduled_flight sf ON a.id = sf.assigned_aircraft_id where am.seating_capacity>? sf.departure NOT BETWEEN IN ? AND ?',
            [seatingCapacity, startTime, endTime],
            (error, results, fields) => {
                if (error) {
                    reject(new Error(error.message));
                }
                resolve(results);
            }
        );
    });
}

/**
 * Fetches aircfrft model list from the database
 * 
 * @returns {object} Promise of a query output
 * @throws Error
 */
const getAircraftModelList = async (id) => {
    return new Promise((resolve, reject) => {
        const result = pool.query('SELECT model_name FROM aircraft_model',
            [],
            (error, results, fields) => {
                if (error) {
                    reject(new Error(error.message));
                }
                resolve(results);
            }
        );
    });
}

const Aircraft = {
    getAllAircrafts,
    getDetailsForAircraft,
    getAvailableAircrafts,
    getAircraftModelList
}

module.exports = Aircraft;