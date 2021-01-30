const Joi = require('joi');
const bcrypt = require('bcryptjs');
const logger = require('../utils/logger');

const User = require('../models/User');
const bookingModel = require("../models/booking-model");

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
        res.status(500).json({error:err,message:"Internal Server Error"});
    }
};

/**
 * View all bookings
 * 
 * @param {object} req http request object
 * @param {object} res http response object
 * @return {object} promise of a record object
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

exports.signupUser = signupUser;
exports.viewBookings = viewBookings;

