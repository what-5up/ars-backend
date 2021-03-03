const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const { successMessage, errorMessage } = require("../utils/message-template");

const sessionModel = require("../models/session-model");

function validateLogin(email,password) {
    const schema = Joi.object({
        email: Joi.string().email().trim().lowercase().required().label('Email'),
        password: Joi.required().label('Password')
    });
    return schema.validate({ email: email, password: password })
}

const login = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const { error, value } = validateLogin(email,password);
    if (error) {
        return errorMessage(res, error.details[0].message, 422);
    }
    let loadedUser;
    try {
        const result = await sessionModel.findUserByEmail(req.accType,value.email);
        if (result.length === 0) {
            return errorMessage(res, 'Incorrect email or password', 401);
        }
        loadedUser = result[0];
        const isEqual = await bcrypt.compare(password,result[0].password);
        if (!isEqual){
            return errorMessage(res, 'Incorrect email or password', 401);
        }
        const token = jwt.sign({
                email: loadedUser.email,
                userID: loadedUser.id.toString(),
                accType: loadedUser.acc_type,
                expiresIn: 3600
            },
            'somesupersecret'                 //put in ENV
        );
        return successMessage(res, token, 'Logged in successfully')
    }
    catch (err) {
        next(err);
    }
};

module.exports = {
    login
};
