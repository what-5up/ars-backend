const bookingModel = require("../models/booking-model");
const reservedSeatModel = require("../models/reserved-seat-model");
const baseModel = require("../models/base-model");
const userModel = require("../models/user-model");
const passengerModel = require("../models/passenger-model");
const seatMapModel = require("../models/seat-map-model");

const Joi = require('joi');
const bcrypt = require('bcryptjs');
const logger = require('../utils/logger');
const _ = require('lodash');
const { successMessage, errorMessage } = require("../utils/message-template");
const { user } = require("../config/config");


function validateUserDetails(title, email, first_name, last_name, gender, password) {
    const schema = Joi.object({
        title: Joi.number().required().label('Title'),
        email: Joi.string().email().trim().lowercase().max(100).required().label('Email'),
        first_name: Joi.string().trim().max(150).required().label('First Name'),
        last_name: Joi.string().trim().max(150).required().label('Last Name'),
        gender: Joi.string().max(1).required().label('Gender'),
        password: Joi.string().trim().min(5).required().label('Password')
    });
    return schema.validate({ title: title, email: email, first_name: first_name, last_name: last_name, gender: gender, password: password })
}

function validateUpdateUser(title, email, first_name, last_name, gender, password) {
    const schema = Joi.object({
        title: Joi.number().default(null).label('Title'),
        email: Joi.string().email().trim().lowercase().max(100).default(null).label('Email'),
        first_name: Joi.string().trim().max(150).default(null).label('First Name'),
        last_name: Joi.string().trim().max(150).default(null).label('Last Name'),
        gender: Joi.string().max(1).default(null).label('Gender'),
        password: Joi.string().trim().default(null).min(5).label('Password')
    });
    return schema.validate({ title: title, email: email, first_name: first_name, last_name: last_name, gender: gender, password: password })
}

const signupUser = async (req, res, next) => {
    const title = req.body.title;
    const email = req.body.email;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const gender = req.body.gender;
    const password = req.body.password;
    const { error, value } = validateUserDetails(title, email, firstName, lastName, gender, password);
    if (error) {
        return errorMessage(res, error.details[0].message, 422)
    }
    if (await userModel.isEmailRegistered(value.email)) {
        return errorMessage(res, "Email already registered", 422)
    }
    try {
        const hashedPw = await bcrypt.hash(value.password, 12);
        const queryResult = await userModel.createUser(value.title, value.first_name, value.last_name, value.email, value.gender, hashedPw);
        return successMessage(res, { userID: queryResult.insertId.toString() }, 'User created successfully', 201);
    }
    catch (err) {
        next(err);
    }
};

const getUser = async (req, res, next) => {
    userModel.fetchUser(req.params.userid)
        .then(result => successMessage(res, result[0]))
        .catch(err => next(err));
}



const updateUser = async (req, res, next) => {
    const userId = req.params.userid;
    const user = await userModel.findUndeletedById(userId);
    if (user.length === 0) {
        return errorMessage(res, "User not found", 422)
    }
    const title = req.body.title;
    const email = req.body.email;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const gender = req.body.gender;
    const password = req.body.password;
    const { error, value } = validateUpdateUser(title, email, firstName, lastName, gender, password);
    if (error) {
        return errorMessage(res, error.details[0].message, 422)
    }
    if (value.email !== user[0].email && await userModel.isEmailRegistered(value.email)) {
        return errorMessage(res, "Email already registered", 422)
    }
    try {
        const hashedPw = (value.password === null) ? null : await bcrypt.hash(value.password, 12);
        const queryResult = await userModel.updateById({ 'title': value.title, 'email': value.email, 'first_name': value.first_name, 'last_name': value.last_name, 'gender': value.gender, 'password': hashedPw }, userId);
        return successMessage(res, null, 'User updated successfully');
    }
    catch (err) {
        next(err);
    }


};

/**
 * View all bookings
 * 
 * @param {object} req http request object
 * @param {object} res http response object
 * @return {object} promise of a record object
 * @todo move function to an appropriate file
 */
const viewBookings = async (req, res) => {
    let records;
    try {
        records = await bookingModel.getBookings(req.params.userid);
    } catch (err) {
        return errorMessage(res, err.message);
    }

    return successMessage(res, records[0]); //res.status(200).send(records);
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
            "scheduled_flight_id"
        ]
    );

    bookingDetails.user_id = req.params.userid;

    let seatPrices;
    let userDiscount;
    try {
        seatPrices = await seatMapModel.getSeatMap(bookingDetails.scheduled_flight_id);

        userDiscount = await userModel.getUserDiscount(req.params.userid);

    } catch (err) {
        return errorMessage(res, err.message, 400);
    }

    let reservedSeats = req.body.reservedSeats; //an array of objects with passenger_id and seat_id should be included in this

    let totalPrice = 0;

    reservedSeats.forEach(addToTotalPrice);

    function addToTotalPrice(item, index) {
        let seatID = item.seat_id;
        var i;
        for (i = 0; i < seatPrices[0].length; i++) {
            if (seatPrices[0][i].id == seatID) {
                totalPrice += seatPrices[0][i].amount;
                break;
            }
        }
    }

    bookingDetails.final_amount = totalPrice * (100 - userDiscount.discount) / 100;

    if (req.body.scenario == "complete_payment") {
        if (req.body.transactionKey == "1234") {
            bookingDetails.state = "completed";
        } else {
            logger.info("invalid transaction key!");
            return errorMessage(res, "invalid transaction key");
        }
    }
    else if (req.body.scenario == "hold_payment") {
        bookingDetails.state = "booked";
    }
    else {
        return errorMessage(res, "invalid scenario! set req.body.scenarion appropriately", 400);
    }



    let passengers = []; //an array of objects with user_id,title,first_name,last_name,birthday,gender,country,passport_no,passport_expiry should be included in this
    let newPassengerCount = 0;

    reservedSeats.forEach(grabNewPassenger);

    function grabNewPassenger(item, index) {
        if (item.passenger.id == null) {
            passengers.push(item.passenger);
            newPassengerCount += 1;
        }
    }

    try {
        let DBconnection = await baseModel.getConnection()

        var results = await baseModel.writeLock('passenger', DBconnection);

        results = await baseModel.startTransaction(results.connection);

        results = await bookingModel.addBooking(bookingDetails, results.connection);

        if (passengers.length > 0) {
            results = await passengerModel.addPassengers(passengers, req.params.userid, results.connection);


            results = await passengerModel.getLastPassengerIDs(req.params.userid, newPassengerCount, results.connection);

            results.results.reverse();
            results.results.forEach(passenger => {
                let passengerUpdated = false;
                reservedSeats.forEach(reservedSeat => {
                    if (reservedSeat.passenger.id == null && passengerUpdated == false) {
                        reservedSeat.passenger.id = passenger.id;
                        passengerUpdated = true;
                    }
                });
            });
        }
        results = await bookingModel.getLastBooking(req.params.userid, results.connection);

        bookingID = results.results[0].id;
        scheduledFlightID = results.results[0].scheduled_flight_id;
        results = await reservedSeatModel.addReservedSeats(reservedSeats, bookingID, scheduledFlightID, results.connection);

        results = await baseModel.endTransaction(results.connection);

        results = await baseModel.unlockTables(results.connection);

        results = await baseModel.releaseConnection(results.connection);
    }

    catch (err) {
        logger.info(err);
        return errorMessage(res, err.message);
    }
    //return errorMessage(res, err.message, 500);

    return successMessage(res, null, 'succesfully added booking!');
}

/**
 * View passenger and seat details of a booking
 * 
 * @param {object} req http request object
 * @param {object} res http response object
 * @return {object} promise of a record object
 * 
 */
const viewBookingDetails = async (req, res) => {
    let records;
    try {
        records = await bookingModel.getBookingDetails(req.params.bookingid);
    } catch (err) {
        return errorMessage(res, err.message);
    }

    return successMessage(res, records[0]); //res.status(200).send(records);
}

/**
 * update booking
 * 
 * @param {object} req http request object
 * @param {object} res http response object
 * @return {object} promise of a record object
 * @todo move function to an appropriate file
 */
const updateBooking = async (req, res) => {

    if (req.body.scenario == "complete_payment") {
        if (req.body.transactionKey == "1234") {
            const conditions = {
                "id": req.params.bookingid,
                "user_id": req.params.userid
            }
            const values = {
                "state": "completed"
            }
            try {
                const records = await bookingModel.updateBooking(conditions, values);
            }
            catch (err) {
                //console.log(err);
                return errorMessage(res, err.message);
            }
        } else {
            logger.info("invalid transaction key!");
            return errorMessage(res, "invalid transaction key");
        }
    } else {
        logger.info("invalid scenario!");
        return errorMessage(res, "invalid scenario! set req.body.scenarion appropriately", 400);
    }

    return successMessage(res, {}, "booking state set to completed");
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

    try {
        var DBconnection = await baseModel.getConnection();

        var results = await baseModel.startTransaction(DBconnection);

        var results = await bookingModel.deleteBooking(req.params.userid, req.params.bookingid, results.connection);

        if (results.results.changedRows > 0) {
            var results = await reservedSeatModel.deleteReservedSeats(req.params.bookingid, results.connection);

            var results = await baseModel.endTransaction(results.connection);

            var results = await baseModel.releaseConnection(results.connection);

        }
        else {
            var results = await baseModel.rollbackTransaction(results.connection)

            var results = await baseModel.releaseConnection(results.connection);

        }
    }
    catch (err) {
        logger.info(err);
        return errorMessage(res, err.message);
    }


    return successMessage(res, {}, "booking cancelled");
}

/**
* Delete a user
*
* @param {object} req http request object
* @param {object} res http response object
* @return {object} promise of a record object
* @throws Error
*/
const deleteUser = async (req, res) => {
    userModel
        .deleteUser(req.params.userid)
        .then((result) => {
            let message = result == true ? "Deleted successfully" : "Couldnt delete";
            return res.status(200).send(message);
        })
        .catch((error) => {
            return res.status(400).send(error.message);
        });
};


const getPassengers = async (req, res, next) => {
    passengerModel.getPassengersOfUser(req.params.userid)
        .then(result => {
            successMessage(res, result);
        })
        .catch(err => next(err));
}

module.exports = {
    viewBookings,
    addBooking,
    viewBookingDetails,
    updateBooking,
    deleteBooking,
    deleteUser,
    signupUser,
    getUser,
    updateUser,
    getPassengers
};
