const Joi = require('joi');
const validate = require("./validate")

module.exports.addBooking = (req, res, next) => {
    const schema = Joi.object({
        scenario: Joi.string().required().trim(),
        transactionKey: Joi.number().required().integer().positive(),
        scheduled_flight_id: Joi.number().required().integer().positive(),
        reservedSeats: Joi.array().items({ seat_id: Joi.number().required().integer().positive(), passenger: Joi.required() }),
    });

    validate(schema, req, res, next);
}

module.exports.updateBooking = (req, res, next) => {
    const schema = Joi.object({
        scenario: Joi.string().required().trim(),
        transactionKey: Joi.number().integer().positive(),
    });

    validate(schema, req, res, next);
}




