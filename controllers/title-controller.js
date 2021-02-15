const titleModel = require("../models/title-model");
const { successMessage, errorMessage } = require("../utils/message-template");

const getAllTitles = async (req, res) => {
    try {
        const titles = await titleModel.getAllTitles();
        successMessage(res, titles);
    }
    catch (err) {
        errorMessage(res, "Internal server error", 500);
    }
};

module.exports = {
    getAllTitles
};
