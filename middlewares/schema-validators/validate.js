const Joi = require("joi");

/**
 * Validates the schema and generates output
 * 
 * @param {Request} req - http request
 * @param {Joi.ObjectSchema} schema - Joi schema 
 * @param {Function} next - next middleware
 */
const validate = (req, schema, next) => {
    const { error, value } = schema.validate(req.body);

    if (error) {
        return errorMessage(res, error.message, 422)
    }

    next();
}

module.exports = validate;