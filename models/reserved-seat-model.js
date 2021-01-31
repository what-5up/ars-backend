const { pool } = require(`../database/connection`);
const logger = require('../utils/logger');

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

module.exports = {
    addReservedSeats
}
