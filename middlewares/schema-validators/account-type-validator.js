const Joi = require('joi');
const validate = require("./validate")

module.exports.addAccountType = (req, res, next) => {
    const schema = Joi.object({
        accountTypeName: Joi.number().required().label('Account Type Name'),
        discount: Joi.number().required().precision(2).positive().max(100).label('Discount'),
        criteria: Joi.number().required().integer().positive().label('Criteria')
    });

    validate(req, schema, next);
}

module.exports.updateAccountType = (req, res, next) => {
    const schema = Joi.object({
        accountTypeName: Joi.number().default(null).label('Account Type Name'),
        discount: Joi.number().default(null).precision(2).positive().max(100).label('Discount'),
        criteria: Joi.number().default(null).integer().positive().label('Criteria')
    });

    validate(req, schema, next);
}
