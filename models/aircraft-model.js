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

const getDetailsForAircraft = async (id) => {
    return new Promise((resolve, reject) => {
        const result = pool.query('SELECT a.id, am.model_name, am.seating_capacity, sf.route, sf.departure FROM aircraft a INNER JOIN aircraft_model am ON a.model_id = am.id INNER JOIN scheduled_flight sf ON a.id = sf.assigned_airplane_id where a.id = ? ',
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

const getAvailableAircrafts = async (startTime, endTime, seatingCapacity) => {
    return new Promise((resolve, reject) => {
        const result = pool.query('SELECT a.id, am.model_name, am.seat_capacity FROM aircraft a INNER JOIN aircraft_model am ON a.model_id = am.id INNER JOIN scheduled_flight sf ON a.id = sf.assigned_airplane_id where am.seating_capacity>? sf.departure NOT BETWEEN IN ? AND ?',
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
 * TODO: update aircraft model
 * TODO: revenue
 * select 
 * seat_id,seat_number, aircraft_model_id,price.traveler_class,scheduled_flight_id,route,amount 
 * from seat_map inner join reserved_seat 
 * on seat_id=seat_map.id 
 * inner join scheduled_flight 
 * on scheduled_flight_id=scheduled_flight.id 
 * inner join price 
 * on price.traveler_class=seat_map.traveler_class and route=route_id 
 * order by aircraft_model_id;
 * 
 * ??????
 * select 
 *      aircraft_model_id,sum(amount) as revenue 
 * from 
 *      seat_map 
 *      inner join reserved_seat 
 *          on reserved_seat.seat_id=seat_map.id 
 *      inner join scheduled_flight 
 *          on reserved_seat.scheduled_flight_id=scheduled_flight.id 
 *      inner join price 
 *          on price.traveler_class=seat_map.traveler_class and scheduled_flight.route=price.route_id 
 * group by aircraft_model_id;
 * 
 */

const Aircraft = {
    getAllAircrafts,
    getDetailsForAircraft,
    getAvailableAircrafts
}

module.exports = Aircraft;