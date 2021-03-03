const Joi = require('joi');
const { successMessage, errorMessage } = require("../utils/message-template");

const regionModel = require("../models/region-model");

const getAllRegions = async (req, res, next) => {
    try {
        const result = await regionModel.getAllRegions(req.accType);
        return successMessage(res, {data:result}, "", 200)
    }
    catch (err) {
        return errorMessage(res, err.message);
    }
};

const addRegion = async (req, res, next) => {
    try {
        const result = await regionModel.createRegion(req.accType,req.body);
        return successMessage(res, {}, "region added", 200)
    }
    catch (err) {
        return errorMessage(res, err.message);
    }
};

const updateRegion = async (req, res, next) => {
    try {
        const result = await regionModel.updateRegion(req.accType,req.params.id,req.body);
        return successMessage(res, {}, "region updated", 200)
    }
    catch (err) {
        return errorMessage(res, err.message);
    }
};

const deleteRegion = async (req, res, next) => {
    try {
        const result = await regionModel.deleteRegion(req.accType,req.params.id);
        return successMessage(res, {}, "region deleted", 200)
    }
    catch (err) {
        return errorMessage(res, err.message);
    }
};


module.exports = {
    getAllRegions,
    addRegion,
    updateRegion,
    deleteRegion
};
