const Joi = require("joi");
const { errorMessage } = require('../../utils/message-template');

/**
 * Validates the schema and generates output
 *
 * @param {Joi.ObjectSchema} schema - Joi schema  
 * @param {Request} req - http request
 * @param {Response} res - http response
 * @param {Function} next - next middleware
 * @param {boolean} isQuery - true - check request queries, false - check request body
 */
const validate = (schema, req, res, next, isQuery = false) => {
    
    const input = isQuery ? req.query : req.body

    const { error, value } = schema.validate(input);

    if (error) {
        return errorMessage(res, error.message, 422)
    }

    if (isQuery) req.body = value;
    else req.query = value;

    next();
}

module.exports = validate;