const model = require("../models/aircraft-model-model");
const Joi = require('joi');
const { successMessage, errorMessage } = require("../utils/message-template");

function validateCreateAircraftModel(modelName,seatingCapacity,maxRows,maxColumns) {
    const schema = Joi.object({
        modelName: Joi.string().trim().required().label('Model Name'),
        seatingCapacity: Joi.number().required().label('Seating Capacity'),
        maxRows: Joi.number().required().label('Max Rows'),
        maxColumns: Joi.number().required().label('Max Columns')
    });
    return schema.validate({modelName: modelName, seatingCapacity: seatingCapacity, maxRows: maxRows, maxColumns: maxColumns})
}


const createAircraftModel = async (req, res) => {
    const modelName = req.body.modelName;
    const seatingCapacity = req.body.seatingCapacity;
    const maxRows = req.body.maxRows;
    const maxColumns = req.body.maxColumns;
    const { error, value } = validateCreateAircraftModel(modelName,seatingCapacity,maxRows,maxColumns);
    if (error) {
        return errorMessage(res, error.details[0].message, 422)
    }
    try {
        const queryResult = await model.createAircraftModel(value.modelName,value.seatingCapacity,value.maxRows,value.maxColumns);
        return successMessage(res, queryResult.insertId, 'Aircraft Model Created Successfully');
    }
    catch (err) {
        next(err);
    }
};

function validateUpdateAircraftModel(modelName,seatingCapacity,maxRows,maxColumns) {
    const schema = Joi.object({
        modelName: Joi.string().trim().default(null).label('Model Name'),
        seatingCapacity: Joi.number().default(null).label('Seating Capacity'),
        maxRows: Joi.number().default(null).label('Max Rows'),
        maxColumns: Joi.number().default(null).label('Max Columns')
    });
    return schema.validate({modelName: modelName, seatingCapacity: seatingCapacity, maxRows: maxRows, maxColumns: maxColumns})
}


const updateAircraftModel = async (req, res) => {
    const id = req.params.id;
    const aircraftModel = await model.getAircraftModelById(id);
    if (aircraftModel.length === 0) {
        return errorMessage(res, "Aircraft Model not found", 422)
    }
    const modelName = req.body.modelName;
    const seatingCapacity = req.body.seatingCapacity;
    const maxRows = req.body.maxRows;
    const maxColumns = req.body.maxColumns;
    const { error, value } = validateUpdateAircraftModel(modelName,seatingCapacity,maxRows,maxColumns);
    if (error) {
        return errorMessage(res, error.details[0].message, 422)
    }
    try {
        const queryResult = await model.updateAircraftModelById({ 'model_name': value.modelName, 'seating_capacity': value.seatingCapacity, 'max_rows': value.maxRows, 'max_columns': value.maxColumns}, id);
        return successMessage(res, null, 'Aircraft Model Updated Successfully');
    }
    catch (err) {
        next(err);
    }
};


module.exports = {
    createAircraftModel,updateAircraftModel
};