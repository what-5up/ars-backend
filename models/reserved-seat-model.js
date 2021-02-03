const { pool } = require(`../database/connection`);
const logger = require('../utils/logger');

/**
 * @description add reserved seats to database
 * @param {JSON} reservedSeats 
 * @param {int} bookingID 
 * @param {int} scheduledFlightID 
 * @param {object} connection 
 * @returns {Promise<object>} Promise of a query output
 */
async function addReservedSeats(reservedSeats, bookingID, scheduledFlightID, connection=pool) {
    return new Promise((resolve, reject) => {
        //build query
        let query = "INSERT INTO reserved_seat (seat_id, booking_id, scheduled_flight_id, passenger_id) VALUES ";
        let subQuery = [];
        let values = [];
        reservedSeats.forEach(seat => {
            subQuery.push("(?,?,?,?)");
            values.push(seat.seat_id);
            values.push(bookingID);
            values.push(scheduledFlightID);
            values.push(seat.passenger_id);
        });
        query+=subQuery.join(" , ");

        //insert data to the database
        const result = connection.query(query, values,
            function (error, results) {
                if (error) {
                    reject(new Error(error.message));
                }
                resolve({results: results, connection: connection}); //TODO: clarify

            }
        );
    })
}

/**
 * @description delete reserved seats relevant to a booking
 * @param {int} user_id 
 * @param {int} booking_id 
 * @param {object} connection 
 * @returns {Promise<object>} Promise of a query output
 */
async function deleteReservedSeats(booking_id, connection = pool) {
    return new Promise((resolve, reject) => {
        const result = connection.query('DELETE FROM reserved_seat WHERE booking_id = ?;',
            [booking_id],
            function (error, results) {
                if (error) {
                    reject(new Error(error.message));
                }
                if(connection == pool){
                    resolve(results);
                }
                else{
                    resolve({ results: results, connection: connection });
                }
            }
        );
    })
}

module.exports = {
    addReservedSeats,
    deleteReservedSeats
}
