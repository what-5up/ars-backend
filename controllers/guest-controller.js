const jwt = require('jsonwebtoken');
const Joi = require('joi');
const { successMessage, errorMessage } = require("../utils/message-template");

const guestModel = require("../models/guest-model");
const { successMessage, errorMessage } = require("../utils/message-template");

function validateGuestDetails(title, first_name, last_name, gender, email) {
    const schema = Joi.object({
        title: Joi.number().required().label('Title'),
        first_name: Joi.string().trim().max(150).required().label('First Name'),
        last_name: Joi.string().trim().max(150).required().label('Last Name'),
        gender: Joi.string().max(1).required().label('Gender'),
        email: Joi.string().email().trim().lowercase().max(100).required().label('Email')
    });
    return schema.validate({ title: title, first_name: first_name, last_name: last_name, gender: gender, email: email})
}

const createGuest = async (req, res, next) => {
    const title = req.body.title;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const gender = req.body.gender;
    const email = req.body.email;
    const { error, value } = validateGuestDetails(title, firstName, lastName, gender, email);

    if (error) return errorMessage(res, error.details[0].message, 422);
    try {
        const queryResult = await guestModel.createGuest(value.title, value.first_name, value.last_name, value.gender, value.email);
        const token = jwt.sign({
                userID: queryResult.insertId.toString(),
                accType: 'guest'
            },
            'somesupersecret',                 //put in ENV
            {expiresIn: '1h'}
        );
        return successMessage(res, {token: token,userID: queryResult.insertId.toString(), expiresIn: 3600}, "Guest created successfullly", 201)
    }
    catch (err) {
        next(err);
    }
};

module.exports = {
    createGuest
};
