const jwt = require('jsonwebtoken');
const Joi = require('joi');

const guestModel = require("../models/guest-model");

function validateGuestDetails(title, first_name, last_name, gender, email) {
    const schema = Joi.object({
        title: Joi.string().trim().required().label('Title'),
        first_name: Joi.string().trim().max(150).required().label('First Name'),
        last_name: Joi.string().trim().max(150).required().label('Last Name'),
        gender: Joi.string().max(1).required().label('Gender'),
        email: Joi.string().email().trim().lowercase().max(100).required().label('Email')
    });
    return schema.validate({ title: title, first_name: first_name, last_name: last_name, gender: gender, email: email})
}

const createGuest = async (req, res) => {
    const title = req.body.title;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const gender = req.body.gender;
    const email = req.body.email;
    const { error, value } = validateGuestDetails(title, firstName, lastName, gender, email);
    if (error) {
        console.log(error);
        return res.status(422).json({ message: error.details[0].message})
    }
    try {
        const queryResult = await guestModel.createGuest(value.title, value.first_name, value.last_name, value.gender, value.email);
        const token = jwt.sign({
                userID: queryResult.insertId.toString(),
                accType: 'guest'
            },
            'somesupersecret',                 //put in ENV
            {expiresIn: '1h'}
        );
        res.status(201).json({token: token,userID: queryResult.insertId.toString(), expiresIn: 3600});
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = {
    createGuest
};
