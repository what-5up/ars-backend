const Joi = require('joi');
const { successMessage, errorMessage } = require("../utils/message-template");

const routeModel = require('../models/route-model');
const Price = require('../models/price-model');

function validateRouteId(routeId) {
    const schema = Joi.object({
        routeId: Joi.number().integer().positive().required().label("Route ID"),
    });
    return schema.validate({ routeId: routeId })
}

const viewRoutes = async (req, res) => {
    const originCode = (req.query.origin !== undefined && req.query.origin.trim() === '') ? undefined : req.query.origin;
    const destinationCode = (req.query.destination !== undefined && req.query.destination.trim() === '') ? undefined : req.query.destination;
    try {
        const routes = await routeModel.getRoutes(originCode, destinationCode);
        if (routes.length === 0) {
            errorMessage(res, "Specified Routes not found", 404);
        }
        successMessage(res, routes,'Routes found',200);
    }
    catch (err) {
        console.log(err);
        errorMessage(res, "Internal Server Error", 500);
    }

};

const viewRoute = async (req, res) => {
    const routeId = req.params.id;
    const { error } = validateRouteId(routeId);
    if (error) {
        console.log(error);
        errorMessage(res, "Invalid Route ID provided. "+error.details[0].message , 400);
    }
    try {
        const route = await routeModel.getRoute(routeId);
        if (route.length === 0) {
            errorMessage(res, "Route not found", 404);
        }
        successMessage(res, route[0],'Route found',200);
    }
    catch (err) {
        console.log(err);
        errorMessage(res, "Internal Server Error", 500);
    }

};

const updateRoutePrice = async (req, res, next) => {
    Price.updatePriceForRoute(req.params.id, req.body.travellerClass, req.body.price)
        .then(() => res.status(200).send({success: true, message: `Successfully updated price for ${req.params.id} ${req.body.travellerClass} class`}))
        .catch((err) => next(err));
}

module.exports = {
    viewRoute,
    viewRoutes,
    updateRoutePrice
};