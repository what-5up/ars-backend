const bookingModel = require("../models/booking-model");
const reservedSeatModel = require("../models/reserved-seat-model");
const baseModel = require("../models/base-model");
const logger = require('../utils/logger');
const _ = require('lodash');

/**
 * View all bookings
 * 
 * @param {object} req http request object
 * @param {object} res http response object
 * @return {object} promise of a record object
 * @todo move function to an appropriate file
 */
const viewBookings = async (req, res) => {
    const records = await bookingModel.getBookings(req.params.userid)
        .then(result => {
            return result.map((row, index) => {
                return { id: index, object: row };
            })
        })
        .catch(err => { return res.status(400).send({ error: err.message }); });
    return res.status(200).send(records);
}

/**
 * Add booking
 * 
 * @param {object} req http request object
 * @param {object} res http response object
 * @return {object} promise of a record object
 * @todo move function to an appropriate file
 */
const addBooking = async (req, res) => {

    bookingDetails = _.pick(req.body,
        [
            "user_id",
            "scheduled_flight_id",
            "final_amount"
        ]
    );

    reservedSeats = req.body.reservedSeats; //an array of objects with passenger_id and seat_id should be included in this

    const records = await baseModel.getConnection()
        .then(DBconnection => {
            baseModel.startTransaction(DBconnection)
                .then(results => {
                    bookingModel.addBooking(bookingDetails, results.connection)
                        .then(results => {                          
                            bookingModel.getLastBooking(bookingDetails.user_id, results.connection)
                                .then(results => {
                                    bookingID = results.results[0].id;
                                    scheduledFlightID = results.results[0].scheduled_flight_id;
                                    reservedSeatModel.addReservedSeats(reservedSeats, bookingID, scheduledFlightID, results.connection)
                                        .then(results => {
                                            baseModel.endTransaction(results.connection)
                                                .then(results => {
                                                    baseModel.releaseConnection(results.connection);
                                                })
                                        })
                                })
                        })
                })
        })

    return res.status(200).send(records); //TODO: what should be returned?
}

/**
 * delete booking
 * 
 * @param {object} req http request object
 * @param {object} res http response object
 * @return {object} promise of a record object
 * @todo move function to an appropriate file
 */
const deleteBooking = async (req, res) => {
    const records = await bookingModel.deleteBooking(req.params.userid, req.params.bookingid)
        .catch(err => { return res.status(400).send({ error: err.message }); });

        //TODO: delete reserved_seat data
    return res.status(200).send(records); //TODO: what should be returned?
}
module.exports = {
    viewBookings,
    addBooking,
    deleteBooking
};