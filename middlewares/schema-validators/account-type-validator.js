const Joi = require('joi');
const validate = require("./validate")

module.exports.addAccountType = (req, res, next) => {
    const schema = Joi.object({
        accountTypeName: Joi.string().required().trim().max(150).label('Account Type Name'),
        discount: Joi.number().required().precision(2).positive().max(100).label('Discount'),
        criteria: Joi.number().required().integer().positive().label('Criteria')
    });

    validate(schema, req, res, next);
}

module.exports.updateAccountType = (req, res, next) => {
    const schema = Joi.object({
        accountTypeName: Joi.string().default(null).trim().max(150).required().label('Account Type Name'),
        discount: Joi.number().default(null).precision(2).positive().max(100).label('Discount'),
        criteria: Joi.number().default(null).integer().positive().label('Criteria')
    });

    validate(schema, req, res, next);
}
