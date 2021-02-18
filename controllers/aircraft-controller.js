const model = require("../models/aircraft-model");
const { successMessage, errorMessage } = require("../utils/message-template");

/**
 * View all Aircrafts
 * 
 * @param {object} req http request object
 * @param {object} res http response object
 * @return {object} promise of a record object
 * @throws Error
 */
const viewAllAircrafts = async (req, res, next) => {
    const records = await model.getAllAircrafts()
        .then(result => {
            return result.map((row, index) => {
                return { id: index, object: row };
            })
        })
        .catch(err => next(err));
    return successMessage(res, records);
}

/**
 * View details for a given aircraft
 * 
 * @param {object} req http request object
 * @param {object} res http response object
 * @return {object} promise of a record object
 * @throws Error
 */
const viewDetailsForAircraft = async (req, res, next) => {
    if (!req.params.id) {
        return errorMessage(res, "No aircraft id is given")
    }
    const id = req.params.id;
    const records = await model.getDetailsForAircraft(id)
        .then(result => {
            return result.reduce((aircraftDetails, row) => {
                aircraftDetails.id = row.id;
                aircraftDetails.model_name = row.model_name;
                aircraftDetails.scheduled_flights = aircraftDetails.scheduled_flights || [];
                aircraftDetails.scheduled_flights.push({
                    route: row.route,
                    departure: row.departure
                });
                return aircraftDetails;
            }, {})
        })
        .catch(err => next(err));
    return successMessage(res, records);
}

/**
 * Get all Aircraft Model List
 * 
 * @param {object} req http request object
 * @param {object} res http response object
 * @return {object} promise of a record object
 * @throws Error
 */
const viewAircraftModelList = async (req, res, next) => {
    try {
        const aircraftModelList = await model.getAircraftModelList();
        successMessage(res, aircraftModelList.map((row)=>row.model_name));
    }
    catch (err) {
        errorMessage(res, "Internal server error", 500)
    }
}

module.exports = {
    viewAllAircrafts,
    viewDetailsForAircraft,
    viewAircraftModelList
};