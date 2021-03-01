const Joi = require('joi');
const { errorMessage } = require('../../utils/message-template');

module.exports.paramAllIntegerValidator = (req, res, next) => {
    joiObject = {}
    Object.keys(req.params).forEach((key) => 
        joiObject[key] = Joi.number().integer().positive().required().label(key));
    
    const schema = Joi.object(joiObject);

    console.log(req.params);
    const { error, value } = schema.validate(req.params);

    if (error) {
        return errorMessage(res, error.message, 422)
    }

    next();
}
