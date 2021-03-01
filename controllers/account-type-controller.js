const model = require("../models/account-type-model");
const { successMessage, errorMessage } = require("../utils/message-template");

/**
 * view all the account types of the system
 * 
 * @param {object} req - http request
 * @param {object} res - http response
 * @return {Response} [{ id, account_type_name, discount, criteria }]
 */
const viewAllAccountTypes = async (req, res, next) => {
    try {
        const accountTypes = await model.getAllAccountTypes();
        successMessage(res, accountTypes);
    }
    catch (err) {
        next(err);
    }
};

/**
 * Add an account type
 * 
 * @param {object} req http request object
 * @param {object} res http response object
 * @return {Response} { id }
 */
const addAccountType = async (req, res, next) => {
    model.addAccountType(req.body)
      .then((result) => {
        return successMessage(res, { id: result.insertId }, "Account type added successfully");
      })
      .catch((error) => next(error));
  }
  
  /**
   * Update a employee
   * 
   * @param {object} req http request object
   * @param {object} res http response object
   * @return {Response} promise of a record object
   * @throws Error
   */
  const updateAccountType = async (req, res, next) => {
    model.updateAccountType(req.params.id, req.body)
      .then(() => {
        return successMessage(res, true, "Updated successfully");
      })
      .catch((error) => {
        next(error)
      });
  }
  

/**
 * Delete an account-type
 * 
 * @param {object} req http request object
 * @param {object} res http response object
 * @return {Response} { bool }
 * @throws Error
 */
const deleteAccountType = async (req, res, next) => {
    model
      .deleteAccountType(req.params.id)
      .then((result) => {
        if (result == true) return successMessage(res, null, "Account type deleted successfully")
        else return errorMessage(res, "Unable to delete the accont type", 500);
      })
      .catch((error) => next(error));
  }

module.exports = {
    viewAllAccountTypes,
    addAccountType,
    updateAccountType,
    deleteAccountType
};
