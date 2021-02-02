const model = require('../models/price-model');

/**
 * View all the ticket prices
 * 
 * @param {Request} req - http request
 * @param {Response} res - http response
 * @param {Function} next - middleware
 * @return {Response} {id, object} if success
 */
const viewAllTicketPrices = async (req, res, next) => {
    const records = await model.fetchAllTicketPrices()
        .then(result => {
            return result.map((row, index) => {
                return { id: index, object: row };
            })
        })
        .catch(err => next(err));
    return res.status(200).send(records);
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
    const records = await model.fetchTicketPrices(req.params.id)
        .then(result => {
            return result.map((row) => {
                return { class: row.traveler_class, price: row.price };
            })
        })
        .catch((err) => next(err));
    return res.status(200).send(records);
}

const updateDiscount = async (req, res, next) => {
    model.updateDiscount(req.params.id, req.body.discount)
        .then(() => res.status(200).send({ success: true, message: `Successfully updated discount` }))
        .catch((err) => next(err));
}

module.exports = {
    viewAllTicketPrices,
    viewTicketPrice,
    updateDiscount
}