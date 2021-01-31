const bookingModel = require("../models/booking-model");
const reservedSeatModel = require("../models/reserved-seat-model");
const baseModel = require("../models/base-model");
const Joi = require('joi');
const bcrypt = require('bcryptjs');
const logger = require('../utils/logger');
const _ = require('lodash');
const User = require('../models/User');

function validateSignupDetails(title,email,first_name,last_name,gender,password) {


    const schema = Joi.object({
        title: Joi.string().required().label('Title'),
        email: Joi.string().email().trim().lowercase().max(100).required().label('Email'),
        first_name: Joi.string().trim().max(150).required().label('First Name'),
        last_name: Joi.string().trim().max(150).required().label('Last Name'),
        gender: Joi.string().max(1).required().label('Gender'),
        password: Joi.string().trim().min(5).required().label('Password')
    });
    return schema.validate({title: title,email: email, first_name: first_name, last_name: last_name, gender: gender,password: password})
}

const signupUser = async (req,res,next) => {
    const title = req.body.title;
    const email = req.body.email;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const gender = req.body.gender;
    const password = req.body.password;
    const {error,value} = validateSignupDetails(title,email,firstName,lastName,gender,password);
    if (error){
        console.log(error);
        return res.status(422).json({error: error.details[0].message,message: "Validation failed", originalValues: value})
    }
    if (await User.isEmailRegistered(value.email)){
        return res.status(422).json({error: "Email already registered",message: "Validation failed", originalValues: value})
    }
    try{
        const hashedPw = await bcrypt.hash(value.password,12);
        const queryResult = await User.createUser(value.title,value.first_name,value.last_name,value.email,value.gender,hashedPw,2);
        res.status(201).json({message:'User created successfully',userId: queryResult.insertId});
    }
    catch (err) {
        console.log(err);
        res.status(500).json({message:"Internal Server Error"});
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

 /**
 * Delete a user
 *
 * @param {object} req http request object
 * @param {object} res http response object
 * @return {object} promise of a record object
 * @throws Error
 */
const deleteUser = async (req, res) => {
  model
    .deleteUser(req.params.userID)
    .then((result) => {
      let message = result == true ? "Deleted successfully" : "Couldnt delete";
      return res.status(200).send(message);
    })
    .catch((error) => {
      return res.status(400).send(error.message);
    });
};
module.exports = {
    viewBookings,
    addBooking,
    deleteBooking,
    deleteUser,
    signupUser
};
