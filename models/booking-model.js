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
            variableNames.push('is_deleted = ?');
            variableValues.push(0);
            (variableNames.length == 1) ? whereClause += variableNames[0] :
                whereClause += variableNames.join(' AND ');
        }

        //fetching data from the database
        const result = pool.query('SELECT * FROM booking' + whereClause,
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
                resolve({ results: results, connection: connection });

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
        const result = connection.query("INSERT INTO booking (user_id, scheduled_flight_id, date_of_booking, final_amount) VALUES (?, ?, CURRENT_TIMESTAMP, ?);",
            [
                bookingDetails.user_id,
                bookingDetails.scheduled_flight_id,
                bookingDetails.final_amount
            ],
            function (error, results) {
                if (error) {
                    reject(new Error(error.message));
                }
                resolve({ results: results, connection: connection }); //TODO: clarify

            }
        );
    })
}

/**
 * delete a booking from database
 * 
 * @param {string} user_id default undefined
 * @returns {object} Promise of a query output
 * @throws Error
 */
async function deleteBooking(user_id, booking_id, connection = pool) {
    return new Promise((resolve, reject) => {
        //fetching data from the database
        const result = connection.query('UPDATE booking SET is_deleted = ? WHERE id = ? and user_id = ?;',
            [true, booking_id, user_id],
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
    getBookings,
    addBooking,
    getLastBooking,
    deleteBooking
}