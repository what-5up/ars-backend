const Joi = require('joi');
const validate = require("./validate")

module.exports.getPricing = (req, res, next) => {
    const schema = Joi.object({
        reserved_seats: Joi.array().items({ seat_id: Joi.number().required().integer().positive()}),
    });

    validate(schema, req, res, next);
}





