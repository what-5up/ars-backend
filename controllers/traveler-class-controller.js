const travelerClassModel = require("../models/traveler-class-model");
const { successMessage, errorMessage } = require("../utils/message-template");

const getAllTravelerClass = async (req, res) => {
    try {
        const travelerClasses = await travelerClassModel.getAllTravelerClass();
        successMessage(res,travelerClasses);
    }
    catch (err) {
        errorMessage(res,"Internal server error",500)
    }
};

module.exports = {
    getAllTravelerClass
};
