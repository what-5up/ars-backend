const Joi = require('joi');

const routeModel = require('../models/route-model');
const Price = require('../models/price-model');
const { successMessage, errorMessage } = require("../utils/message-template");

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
        console.log(error);
        return errorMessage(res, "Invalid Route ID provided. "+error.details[0].message);
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

const updateRoutePrice = async (req, res, next) => {
    Price.updatePriceForRoute(req.params.id, req.body.travellerClass, req.body.price)
        .then(() => successMessage(res, null, `Successfully updated price for ${req.params.id} ${req.body.travellerClass} class`))
        .catch((err) => next(err));
}

module.exports = {
    viewRoute,
    viewRoutes,
    updateRoutePrice
};