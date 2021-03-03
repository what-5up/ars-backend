const model = require("../models/designation-model");
const { successMessage, errorMessage } = require("../utils/message-template");

/**
 * view all the designations of the system
 * 
 * @param {object} req - http request
 * @param {object} res - http response
 * @return {Response} [{ id, account_type_name, discount, criteria }]
 */
const viewAllDesignations = async (req, res, next) => {
  model.getAllDesignations(req.accType)
    .then(result => {
      successMessage(res, result);
    })
    .catch(err => next(err));
}

/**
 * Add an designation
 * 
 * @param {object} req http request object
 * @param {object} res http response object
 * @return {Response} { id }
 */
const addDesignation = async (req, res, next) => {
  model.addDesignation(req.accType,req.body)
    .then((result) => {
      return successMessage(res, { id: result.insertId }, "designation added successfully");
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
const updateDesignation = async (req, res, next) => {
  model.updateDesignation(req.accType,req.params.id, req.body)
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
const deleteDesignation = async (req, res, next) => {
  model
    .deleteAccountType(req.accType,req.params.id)
    .then((result) => {
      if (result == true) return successMessage(res, null, "designation deleted successfully")
      else return errorMessage(res, "Unable to delete the accont type", 500);
    })
    .catch((error) => next(error));
}

module.exports = {
  viewAllDesignations,
  addDesignation,
  updateDesignation,
  deleteDesignation
};
