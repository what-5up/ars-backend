const { query } = require('express');
const { pool } = require(`../database/connection`);
const logger = require('../utils/logger');

/**
 * Fetches all the bookings from the database
 * 
 * @param {string} user_id default undefined
 * @returns {object} Promise of a query output
 * @throws Error
 */
async function getBookings(user_id = undefined) {
    return new Promise((resolve, reject) => {
        //fetching data from the database
        const result = pool.query('CALL get_user_bookings(?);',
            [user_id],
            function (error, results) {
                if (error) {
                    reject(new Error(error.message));
                }
                resolve(results);

            }
        );
    })
}

/**
 * Fetches all passenger and seat details of a booking
 * 
 * @param {string} booking_id default undefined
 * @returns {object} Promise of a query output
 * @throws Error
 */
async function getBookingDetails(booking_id = undefined) {
    return new Promise((resolve, reject) => {
        //fetching data from the database
        const result = pool.query('CALL get_passenger_and_seat_details(?);',
            [booking_id],
            function (error, results) {
                if (error) {
                    reject(new Error(error.message));
                }
                resolve(results);

            }
        );
    })
}

/**
 * Fetches last booking done by a user from the database
 * 
 * @param {string} user_id default undefined
 * @returns {object} Promise of a query output
 * @throws Error
 */
async function getLastBooking(user_id, connection = pool) {
    return new Promise((resolve, reject) => {
        //fetching data from the database
        const result = connection.query('SELECT * FROM booking WHERE user_id = ? ORDER BY date_of_booking DESC LIMIT 1;',
            [user_id],
            function (error, results) {
                if (error) {
                    reject(new Error(error.message));
                }
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

/**
 * @description Add a booking and reserved seats to the database
 * @param {object} bookingDetails 
 * @param {object} seats 
 */
async function addBooking(bookingDetails, connection = pool) {
    return new Promise((resolve, reject) => {

        //insert data to the database
        const result = connection.query("INSERT INTO booking (user_id, scheduled_flight_id, date_of_booking, final_amount, state) VALUES (?, ?, CURRENT_TIMESTAMP, ?, ?);",
            [
                bookingDetails.user_id,
                bookingDetails.scheduled_flight_id,
                bookingDetails.final_amount,
                bookingDetails.state
            ],
            function (error, results) {
                if (error) {
                    reject(new Error(error.message));
                }
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

/**
 * set booking state to completed in database
 * 
 * @param {string} user_id default undefined
 * @returns {object} Promise of a query output
 * @throws Error
 */
async function updateBooking(conditions, values, connection = pool) {
    return new Promise((resolve, reject) => {
        //building query
        let query = "UPDATE booking";

        //building SET clause
        query += " SET ";

        let valueNames = [];
        let queryValues = [];
        for (const [key, value] of Object.entries(values)) {
            valueNames.push(key + " = ?");
            queryValues.push(value);
        }
        query += valueNames.join(" , ");

        //building WHERE clause
        query += " WHERE "
        let conditionNames = [];
        for (const [key, value] of Object.entries(conditions)) {
            conditionNames.push(key + " = ?");
            queryValues.push(value);
        }
        query += conditionNames.join(" AND ");

        //finish building query
        query += ";";

        logger.info(query);
        logger.info(queryValues);
        const result = connection.query(query, //'UPDATE booking SET state = ? WHERE id = ? and user_id = ?;'
            queryValues,
            function (error, results) {
                if (error) {
                    reject(new Error(error.message));
                }
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

/**
 * set booking state to cancelled in database
 * 
 * @param {string} user_id default undefined
 * @returns {object} Promise of a query output
 * @throws Error
 */
async function deleteBooking(user_id, booking_id, connection = pool) {
    return new Promise((resolve, reject) => {
        const result = connection.query('UPDATE booking SET state = ? WHERE id = ? and user_id = ?;',
            ["cancelled", booking_id, user_id],
            function (error, results) {
                if (error) {
                    reject(new Error(error.message));
                }
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

module.exports = {
    getBookings,
    getBookingDetails,
    addBooking,
    getLastBooking,
    updateBooking,
    deleteBooking
}
