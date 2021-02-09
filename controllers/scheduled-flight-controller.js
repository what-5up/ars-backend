const model = require("../models/scheduled-flight-model");
const seatMapModel = require("../models/seat-map-model");
const aircraftModelModel = require("../models/aircraft-model-model");
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
  const records = await model.getScheduledFlights(undefined, req.query.origin,
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

const viewScheduledFlight = async (req, res, next) => {
  model.getScheduledFlights(req.params.id)
    .then(result => {
      return successMessage(res,result[0]);
    })
    .catch(err => next(err));
}


/**
 * Delete a scheduled flight
 * 
 * @param {object} req http request object
 * @param {object} res http response object
 * @return {object} promise of a message 
 * @throws Error
 */
const deleteScheduledFlight = async (req, res) => {
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
const addScheduledFlight = async (req, res) => {
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
const updateScheduledFlight = async (req, res) => {
  model.updateScheduledFlight(req.params.id, req.body)
    .then((result) => {
      return res.status(200).send(result);
    })
    .catch((error) => {
      return res.status(400).send(error.message);
    });
}

/**
 * View seat map
 * 
 * @param {object} req http request object
 * @param {object} res http response object
 * @return {Response} {id, object} if success
 * @throws Error
 */
const viewSeatMap = async (req, res, next) => {
  const records = await seatMapModel.getSeatMap(req.params.id)
    .catch(err => next(err));

  const seatMapDetails = await aircraftModelModel.getSeatMapDetails(req.params.id)
    .catch(err => next(err));

    console.log(seatMapDetails[0].seating_capacity);
  result = { 
    seatingCapacity : seatMapDetails[0].seating_capacity,
    maxRows: seatMapDetails[0].max_rows,
    maxColumns: seatMapDetails[0].max_columns,
    seatMap: records[0]
  };
  return successMessage(res, result);
}

module.exports = {
  viewScheduledFlights, 
  viewScheduledFlight,
  deleteScheduledFlight, 
  addScheduledFlight, 
  updateScheduledFlight, 
  viewSeatMap
};