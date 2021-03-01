const Joi = require('joi');
const validate = require("./validate")

module.exports.addEmployee = (req, res, next) => {
    const schema = Joi.object({
        title: Joi.number().required().label('Title'),
        firstName: Joi.string().trim().max(150).required().label('First Name'),
        lastName: Joi.string().trim().max(150).required().label('Last Name'),
        email: Joi.string().email().trim().lowercase().max(100).required().label('Email'),
        password: Joi.string().trim().min(5).required().label('Password'),
        designationId: Joi.number().required().label('Designation'),
    });

    validate(schema, req, res, next);
}

module.exports.updateEmployee = (req, res, next) => {
    const schema = Joi.object({
        title: Joi.number().default(null).label('Title'),
        firstName: Joi.string().trim().max(150).default(null).label('First Name'),
        lastName: Joi.string().trim().max(150).default(null).label('Last Name'),
        email: Joi.string().email().trim().lowercase().max(100).default(null).label('Email'),
        password: Joi.string().trim().min(5).default(null).label('Password'),
        designationId: Joi.number().default(null).label('Designation'),
    });

    validate(schema, req, res, next);
}
