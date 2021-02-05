const model = require("../models/scheduled-flight-model");
const { successMessage } = require("../utils/message-template");

/**
 * View all scheduled flights
 * 
 * @param {object} req http request object
 * @param {object} res http response object
 * @return {Response} {id, object} if success
 * @throws Error
 */
const viewScheduledFlights = async (req, res, next) => {
    const records = await model.getScheduledFlights(req.query.origin, 
                                                    req.query.destination, 
                                                    req.query.aircraftID, 
                                                    req.query.aircraftModel, 
                                                    req.query.isDeleted)
        .then(result => {
            return result.map((row) => {
                return row;
            })
        })
        .catch(err => next(err));
    return successMessage(res, records);
}


/**
 * Delete a scheduled flight
 * 
 * @param {object} req http request object
 * @param {object} res http response object
 * @return {object} promise of a message 
 * @throws Error
 */
const deleteScheduledFlight = async (req,res) => {
    model
    .deleteScheduledFlight(req.params.id)
    .then((result) => {
      let message = result == true ? "Deleted successfully" : "Couldnt delete";
      return res.status(200).send(message);
    })
    .catch((error) => {
      return res.status(400).send(error.message);
    });
}

/**
 * Add a scheduled flight
 * 
 * @param {object} req http request object
 * @param {object} res http response object
 * @return {object} promise of a record object
 * @throws Error
 */
const addScheduledFlight = async (req,res) => {
    model.addScheduledFlight(req.body)
    .then((result) => {
        return res.status(200).send(result);
      })
      .catch((error) => {
        return res.status(400).send(error.message);
      });
}

/**
 * Update a scheduled flight
 * 
 * @param {object} req http request object
 * @param {object} res http response object
 * @return {object} promise of a record object
 * @throws Error
 */
const updateScheduledFlight = async (req,res) => {
    model.updateScheduledFlight( req.params.id,req.body)
    .then((result) => {
        return res.status(200).send(result);
      })
      .catch((error) => {
        return res.status(400).send(error.message);
      });
}

module.exports = {
    viewScheduledFlights, deleteScheduledFlight, addScheduledFlight, updateScheduledFlight
};