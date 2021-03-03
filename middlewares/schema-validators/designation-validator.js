const Joi = require('joi');
const validate = require("./validate")

module.exports.addDesignation = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().required().trim().max(150).label('Name'),
        privilege: Joi.string().required().trim().lowercase().length(1).valid('a','c','s','m').label('Privilege')
    });

    validate(schema, req, res, next);
}

module.exports.updateDesignation = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().default(null).trim().max(150).required().label('Name'),
        privilege: Joi.string().defualt(null).trim().lowercase().length(1).valid('a','c','s','m').label('Privilege')
    });

    validate(schema, req, res, next);
}
