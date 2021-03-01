const Joi = require('joi');
const validate = require("./validate")

module.exports.viewRoutes = (req, res, next) => {
    const schema = Joi.object({
        origin: Joi.string().required().trim().max(4).label('Origin'),
        destination: Joi.string().required().trim().max(4).label('Destination'),
    });

    validate(schema, req, res, next, true);
}

module.exports.addRoutePrice = (req, res, next) => {
    const schema = Joi.object({
        travelerClass: Joi.number().required().integer().positive().label('Traveler Class'),
        amount: Joi.number().required().precision(2).positive().label("Amount")
    });

    validate(schema, req, res, next);
}

module.exports.updateRoutePrice = (req, res, next) => {
    const schema = Joi.object({
        travelerClass: Joi.number().default(null).integer().positive().label('Traveler Class'),
        amount: Joi.number().default(null).precision(2).positive().label("Amount")
    });

    validate(schema, req, res, next);
}
