const Joi = require("joi");
const { errorMessage } = require('../../utils/message-template');

/**
 * Validates the schema and generates output
 *
 * @param {Joi.ObjectSchema} schema - Joi schema  
 * @param {Request} req - http request
 * @param {Response} res - http response
 * @param {Function} next - next middleware
 */
const validate = (schema, req, res, next) => {
    const { error, value } = schema.validate(req.body);

    if (error) {
        return errorMessage(res, error.message, 422)
    }

    next();
}

module.exports = validate;