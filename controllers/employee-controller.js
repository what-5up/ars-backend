const Joi = require("joi");
const bcrypt = require('bcryptjs');

const model = require("../models/employee-model");
const { successMessage, errorMessage } = require("../utils/message-template");


/**
 * view all the employees of the system
 * 
 * @param {object} req - http request
 * @param {object} res - http response
 * @return {Response} [{ id, account_type_name, discount, criteria }]
 */
const viewAllEmployees = async (req, res, next) => {
    model.getAllEmployees()
        .then(result => {
            successMessage(res, result);
        })
        .catch(err => next(err));
}

/**
 * Add an employee
 * 
 * @param {object} req http request object
 * @param {object} res http response object
 * @return {object} { id }
 */
const addEmployee = async (req, res, next) => {
    try {
        if (await model.isEmailRegistered(req.body.email)) {
            return errorMessage(res, "Email already registered", 422)
        }

        const hashedPw = await bcrypt.hash(req.body.password, 12);
        req.body.password = hashedPw;

        model.addEmployee(req.body)
            .then((result) => {
                return successMessage(res, { id: result.insertId }, "Employee added successfully");
            })

    } catch (err) {
        return next(err);
    }
}

/**
 * Update an employee
 * 
 * @param {object} req http request object
 * @param {object} res http response object
 * @return {object} promise of a record object
 * @throws Error
 */
const updateEmployee = async (req, res, next) => {
    if (req.body.password) {
        bcrypt.hash(req.body.password, 12)
            .then(result => {
                req.body.password = result;
            })
    }

    model.updateEmployee(req.params.id, req.body)
        .then(() => {
            return successMessage(res, true, "Updated successfully");
        })
        .catch((error) => {
            next(error)
        });
}


/**
 * Delete an employee
 * 
 * @param {object} req http request object
 * @param {object} res http response object
 * @return {Response} { bool }
 * @throws Error
 */
const deleteEmployee = async (req, res, next) => {
    model
        .deleteAccontType(req.params.id)
        .then((result) => {
            if (result == true) return successMessage(res, null, "Employee deleted successfully")
            else return errorMessage(res, "Unable to delete the employee", 500);
        })
        .catch((error) => next(error));
}


module.exports = {
    viewAllEmployees,
    addEmployee,
    updateEmployee,
    deleteEmployee
};
