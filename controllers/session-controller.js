const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Joi = require('joi');

const sessionModel = require("../models/session-model");

function validateLogin(email,password) {
    const schema = Joi.object({
        email: Joi.string().email().trim().lowercase().required().label('Email'),
        password: Joi.required().label('Password')
    });
    return schema.validate({ email: email, password: password })
}

const login = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const { error, value } = validateLogin(email,password);
    if (error) {
        return res.status(422).json({ message: error.details[0].message})
    }
    let loadedUser;
    try {
        const result = await sessionModel.findUserByEmail(value.email);
        if (result.length === 0) {
            return res.status(401).json({message: 'Incorrect email or password.'})
        }
        loadedUser = result[0];
        const isEqual = await bcrypt.compare(password,result[0].password);
        if (!isEqual){
            return res.status(401).json({message: 'Incorrect email or password.'})
        }
        const token = jwt.sign({
                email: loadedUser.email,
                userID: loadedUser.id.toString(),
                accType: loadedUser.acc_type
            },
            'somesupersecret',                 //put in ENV
            {expiresIn: '1h'}
        );
        res.status(200).json({token: token,userID: loadedUser.id.toString(), expiresIn: 3600});
    }
    catch (err) {
        res.status(500).json({message:"Internal Server Error"});
    }
};

module.exports = {
    login
};
