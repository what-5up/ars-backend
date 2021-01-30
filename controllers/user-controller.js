const Joi = require('joi');
const bcrypt = require('bcryptjs');

const User = require('../models/User');

function validateSignupDetails(title,email,first_name,last_name,gender,password) {


    const schema = Joi.object({
        title: Joi.string().required().label('Title'),
        email: Joi.string().email().max(100).required().label('Email'),
        first_name: Joi.string().max(150).required().label('First Name'),
        last_name: Joi.string().max(150).required().label('Last Name'),
        gender: Joi.string().max(1).required().label('Gender'),
        password: Joi.string().min(5).required().label('Password')
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
    const {error} = validateSignupDetails(title,email,firstName,lastName,gender,password);
    if (error){
        console.log(error);
        return res.status(422).json({error: error.details[0].message,message: "Validation failed", originalValues: req.body})
    }
    if (await User.isEmailRegistered(email)){
        return res.status(422).json({error: "Email already registered",message: "Validation failed", originalValues: req.body})
    }
    try{
        const hashedPw = await bcrypt.hash(password,12);
        const queryResult = await User.createUser(title,firstName,lastName,email,gender,hashedPw,2);
        res.status(201).json({message:'User created successfully',userId: queryResult.insertId});
    }
    catch (err) {
        console.log(err);
        res.status(500).json({error:err,message:"Internal Server Error"});
    }
};

exports.signupUser = signupUser;
