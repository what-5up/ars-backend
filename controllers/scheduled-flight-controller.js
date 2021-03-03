const model = require("../models/scheduled-flight-model");
const seatMapModel = require("../models/seat-map-model");
const aircraftModelModel = require("../models/aircraft-model-model");
const priceModel = require('../models/price-model');
const userModel = require('../models/user-model');
const { successMessage, errorMessage } = require("../utils/message-template");
const { AccountTypesEnum } = require('../utils/constants')
/**
 * View all scheduled flights
 * 
 * @param {object} req http request object
 * @param {object} res http response object
 * 
 * @return {Response} [{ departure, origin_code, origin, destination_code, destination, aircraft_id, aircraft_model }] if success
 */
const viewScheduledFlights = async (req, res, next) => {
  try {
    const flights = await model.getScheduledFlights(undefined,
      req.query.origin,
      req.query.destination,
      req.query.aircraftID,
      req.query.aircraftModel,
      req.query.passengers,
      req.query.isDeleted)
    const prices = await priceModel.fetchRoutePricesOfScheduledFlights(flights.map(({ route_id }) => route_id));
    const result = flights.map(({ route_id, ...restFlights }) => {
      restFlights.prices = prices.filter((price) => price.route_id === route_id).map(({ route_id, ...restPrices }) => restPrices)
      return restFlights;
    })
    return successMessage(res, result);
  } catch (err) {
    next(err);
  }
}

const viewDetailedScheduledFlights = async (req, res, next) => {
  try {
    const flights = await model.getScheduledFlightsForCRC(req.query.isDeleted);
    return successMessage(res, flights);
  } catch (err) {
    next(err);
  }
}

/**
 * View the scheduled flight for the given id
 * 
 * @param {object} req http request object
 * @param {object} res http response object
 * 
 * @return {Response} { departure, origin_code, origin, destination_code, destination, aircraft_id, aircraft_model } if success
 */
const viewScheduledFlight = async (req, res, next) => {
  model.getScheduledFlights(req.params.id)
    .then(result => successMessage(res, result[0]))
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
const deleteScheduledFlight = async (req, res, next) => {
  model
    .deleteScheduledFlight(req.params.id)
    .then((result) => {
      if (result == true) return successMessage(res, null, "Scheduled flight deleted successfully")
      else return errorMessage(res, "Unable to delete the scheduled flight");
    })
    .catch((error) => next(error));
}

/**
 * Add a scheduled flight
 * 
 * @param {object} req http request object
 * @param {object} res http response object
 * @return {object} promise of a record object
 * @throws Error
 */
const addScheduledFlight = async (req, res, next) => {
  model.addScheduledFlight(req.body)
    .then((result) => {
      return successMessage(res, { id: result.insertId }, "Added successfully");
    })
    .catch((error) => next(error));
}

/**
 * Update a scheduled flight
 * 
 * @param {object} req http request object
 * @param {object} res http response object
 * @return {object} promise of a record object
 * @throws Error
 */
const updateScheduledFlight = async (req, res, next) => {
  model.updateScheduledFlight(req.params.id, req.body)
    .then((result) => {
      return successMessage(res, null, "Updated successfully");
    })
    .catch((error) => {
      next(error)
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
    seatingCapacity: seatMapDetails[0].seating_capacity,
    maxRows: seatMapDetails[0].max_rows,
    maxColumns: seatMapDetails[0].max_columns,
    seatMap: records[0]
  };
  return successMessage(res, result);
}

/**
 * get price and price after discount
 * 
 * @param {object} req http request object
 * @param {object} res http response object
 * @return {Response} {id, object} if success
 * @throws Error
 */
const getPricing = async (req, res, next) => {

  let seatPrices;
  let userDiscount;
  try {
    seatPrices = await seatMapModel.getSeatMap(req.params.id);

    userDiscount = await userModel.getUserDiscount(req.userID);

  } catch (err) {
    return errorMessage(res, err.message, 400);
  }

  const reservedSeats = req.body.reserved_seats;

  let totalPrice = 0;

  reservedSeats.forEach(addToTotalPrice);

  function addToTotalPrice(item, index) {
    let seatID = item.seat_id;
    var i;
    for (i = 0; i < seatPrices[0].length; i++) {
      if (seatPrices[0][i].id == seatID) {
        totalPrice += seatPrices[0][i].amount;
        break;
      }
    }
  }

  let priceAfterDiscount = totalPrice * (100 - userDiscount.discount) / 100;

  result = {
    total_price: totalPrice,
    price_after_discount: priceAfterDiscount
  };
  return successMessage(res, result);
}

module.exports = {
  viewScheduledFlights,
  viewDetailedScheduledFlights,
  viewScheduledFlight,
  deleteScheduledFlight,
  addScheduledFlight,
  updateScheduledFlight,
  viewSeatMap,
  getPricing
};