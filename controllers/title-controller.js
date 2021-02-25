const Joi = require('joi');
const { successMessage, errorMessage } = require("../utils/message-template");

const titleModel = require("../models/title-model");


const getAllTitles = async (req, res) => {
    try {
        const titles = await titleModel.getAllTitles();
        successMessage(res, titles);
    }
    catch (err) {
        errorMessage(res, "Internal server error", 500);
    }
};

function validateUpdateTitle(titleName) {
    const schema = Joi.object({
        titleName: Joi.string().trim().min(2).default(null).label('Title')
    });
    return schema.validate({titleName: titleName})
}


const updateTitle = async (req, res) => {
    const titleId = req.params.titleId;
    const titleName = req.body.titleName;
    const { error, value } = validateUpdateTitle(titleName);
    if (error) {
        return errorMessage(res, error.details[0].message, 422)
    }
    try {
        console.log(value.titleName);
        const queryResult = await titleModel.updateTitleById(value.titleName,titleId)
        return successMessage(res, null, 'Title updated successfully');
    }
    catch (err) {
        errorMessage(res, "Internal server error", 500);
    }
};

module.exports = {
    getAllTitles,
    updateTitle
};
