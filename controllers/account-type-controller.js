const accountTypeModel = require("../models/account-type-model");
const { successMessage, errorMessage } = require("../utils/message-template");

const getAllAccountTypes = async (req, res) => {
    try {
        const accountTypes = await accountTypeModel.getAllAccountTypes();
        successMessage(res, accountTypes);
    }
    catch (err) {
        errorMessage(res, "Internal server error", 500);
    }
};

module.exports = {
    getAllAccountTypes
};
