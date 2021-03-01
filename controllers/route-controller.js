const Joi = require('joi');
const { successMessage, errorMessage } = require("../utils/message-template");

const routeModel = require('../models/route-model');
const priceModel = require('../models/price-model');

function validateRouteId(routeId) {
    const schema = Joi.object({
        routeId: Joi.number().integer().positive().required().label("Route ID"),
    });
    return schema.validate({ routeId: routeId })
}

const viewRoutes = async (req, res, next) => {
    const originCode = (req.query.origin !== undefined && req.query.origin.trim() === '') ? undefined : req.query.origin;
    const destinationCode = (req.query.destination !== undefined && req.query.destination.trim() === '') ? undefined : req.query.destination;
    try {
        const routes = await routeModel.getRoutes(originCode, destinationCode);
        if (routes.length === 0) {
            return errorMessage(res, "Specified Routes not found", 404)
        }
        return successMessage(res, routes, "Routes found")
    }
    catch (err) {
        next(err);
    }

};

const viewRoute = async (req, res, next) => {
    const routeId = req.params.id;
    const { error } = validateRouteId(routeId);
    if (error) {
        return errorMessage(res, "Invalid Route ID provided. " + error.details[0].message);
    }
    try {
        const route = await routeModel.getRoute(routeId);
        if (route.length === 0) {
            return errorMessage(res, "Route not found", 404);
        }
        return successMessage(res, route[0], "Route found");
    }
    catch (err) {
        next(err);
    }
};

const viewAllRoutePrices = async (req, res, next) => {
    priceModel.fetchAllRoutePrices()
        .then(records => successMessage(res, records))
        .catch(err => next(err));
}

/**
 * View the route prices for a given route
 * 
 * @param {Request} req - http request
 * @param {Response} res - http response
 * @param {Function} next - middleware
 * @return {Response} {class, price} if success
 */
const viewRoutePrice = async (req, res, next) => {
    priceModel.fetchRoutePrice(req.params.id)
        .then(records => successMessage(res, records))
        .catch((err) => next(err));
}

/**
 * Add an route price
 * 
 * @param {object} req http request object
 * @param {object} res http response object
 * @return {Response} { id }
 */
const addRoutePrice = async (req, res, next) => {
    const {travelerClass, amount} = req.body;
    const routeId = req.params.id
    priceModel.addRoutePrice({travelerClass, amount, routeId})
        .then(() => {
            return successMessage(res, true, "Route price added successfully");
        })
        .catch((error) => next(error));
}

/**
 * Update a route price
 * 
 * @param {object} req http request object
 * @param {object} res http response object
 * @return {Response} promise of a record object
 * @throws Error
 */
const updateRoutePrice = async (req, res, next) => {
    priceModel.updateRoutePrice(req.params.id, req.params.classid, req.body.amount)
        .then(() => {
            return successMessage(res, null, "Updated successfully");
        })
        .catch((error) => {
            next(error)
        });
}

/**
 * Delete a route price
 * 
 * @param {object} req http request object
 * @param {object} res http response object
 * @return {Response} { bool }
 * @throws Error
 */
const deleteRoutePrice = async (req, res, next) => {
    priceModel
        .deleteRoutePrice(req.params.id, req.params.classid)
        .then((result) => {
            if (result) return successMessage(res, null, "Route price deleted successfully")
        })
        .catch((error) => next(error));
}

module.exports = {
    viewRoute,
    viewRoutes,
    viewAllRoutePrices,
    viewRoutePrice,
    addRoutePrice,
    updateRoutePrice,
    deleteRoutePrice
};