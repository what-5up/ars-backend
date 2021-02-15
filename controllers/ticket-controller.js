const model = require('../models/price-model');
const { successMessage, errorMessage } = require("../utils/message-template");

/**
 * View all the ticket prices
 * 
 * @param {Request} req - http request
 * @param {Response} res - http response
 * @param {Function} next - middleware
 * @return {Response} {id, object} if success
 */
const viewAllTicketPrices = async (req, res, next) => {
    model.fetchAllTicketPrices()
        .then(records => successMessage(res, records))
        .catch(err => next(err));
}

/**
 * View the ticket prices for a given route
 * 
 * @param {Request} req - http request
 * @param {Response} res - http response
 * @param {Function} next - middleware
 * @return {Response} {class, price} if success
 */
const viewTicketPrice = async (req, res, next) => {
    model.fetchTicketPrices(req.params.id)
        .then(records => successMessage(res, records))
        .catch((err) => next(err));
}

const updateDiscount = async (req, res, next) => {
    model.updateDiscount(req.params.id, req.body.discount)
        .then(() => successMessage(res,true,'Successfully updated discount'))
        .catch((err) => next(err));
}

module.exports = {
    viewAllTicketPrices,
    viewTicketPrice,
    updateDiscount
}