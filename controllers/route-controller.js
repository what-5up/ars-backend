const Joi = require('joi');

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
            return res.status(404).json({ message: "Specified Routes not found" });
        }
        res.status(200).json({ routes: routes, message: "Routes found" });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }

};

const viewRoute = async (req, res) => {
    const routeId = req.params.id;
    const { error } = validateRouteId(routeId);
    if (error) {
        console.log(error);
        return res.status(400).json({ message: "Invalid Route ID provided. "+error.details[0].message })
    }
    try {
        const route = await routeModel.getRoute(routeId);
        if (route.length === 0) {
            return res.status(404).json({ message: "Route not found" })
        }
        res.status(200).json({ route: route[0], message: "Route found" });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
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