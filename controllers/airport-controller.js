const jwt = require('jsonwebtoken');
const Joi = require('joi');
const { successMessage, errorMessage } = require("../utils/message-template");

const airportModel = require("../models/airport-model");

const getAllAirports = async (req, res, next) => {
    try {
        const resilt = await airportModel.getAllAirports();
        return successMessage(res, {data:resilt}, "", 200)
    }
    catch (err) {
        next(err);
    }
};

const addAirport = async (req, res, next) => {
    try {
        const result = await airportModel.createAirport(req.body);
        return successMessage(res, {data:result}, "", 200)
    }
    catch (err) {
        next(err);
    }
};

const updateAirport = async (req, res, next) => {
    try {
        const result = await airportModel.updateAirport(req.params.id,req.body);
        return successMessage(res, {data:result}, "Successfully updated", 200)
    }
    catch (err) {
        next(err);
    }
};

const deleteAirport = async (req, res, next) => {
    try {
        const result = await airportModel.deleteAirport(req.params.id);
        return successMessage(res, {data:result}, "Successfully deleted", 200)
    }
    catch (err) {
        next(err);
    }
};

module.exports = {
    addAirport,
    getAllAirports,
    updateAirport,
    deleteAirport
};
