const Joi = require('joi');
const { successMessage, errorMessage } = require("../utils/message-template");

const routeModel = require('../models/route-model');
const priceModel = require('../models/price-model');

const viewRoutes = async (req, res, next) => {
    try {
        if (req.query.unallocatedPrice === 'true') {
            const routes = await routeModel.getRoutesOfUnallocatedPrice(req.accType);
            return successMessage(res, routes.map((object) => object['id']));
        }

        const routes = await routeModel.getRoutes(req.accType,req.query.origin, req.query.destination);
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
    try {
        const route = await routeModel.getRoute(req.accType,req.params.id);
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
    priceModel.fetchAllRoutePrices(req.accType)
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
    priceModel.fetchRoutePrice(req.accType,req.params.id)
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
    priceModel.addRoutePrice(req.accType,{travelerClass, amount, routeId})
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
    priceModel.updateRoutePrice(req.accType,req.params.id, req.params.classid, req.body.amount)
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
        .deleteRoutePrice(req.accType,req.params.id, req.params.classid)
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