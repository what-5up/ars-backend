const Joi = require('joi');

const model = require("../models/report-model");
const { successMessage, errorMessage } = require("../utils/message-template");


/**
 * View all the passengers for the next immediate flight. Categorized by the boundary age of 18.
 *
 * @param {object} req http request object
 * @param {object} res http response object
 * @return {Response} {above18, below18} if success
 * @throws Error - database connection error
 */
const viewPassengersByFlightNo = async (req, res, next) => {
    model.getPassengersByFlightNo(req.query.route)
        .then(result => successMessage(res, {above18: result[0], below18: result[1]}))
        .catch(err => next(err));
}

/**
 * View all the bookings categorized by the passenger type
 *
 * @param {object} req http request object
 * @param {object} res http response object
 * @return {Response} {id, object} if success
 * @throws Error - database connection error
 */
const viewBookingsByPassengerType = async (req, res, next) => {
    if ((req.query.startDate && req.query.endDate) && (req.query.startDate>req.query.endDate)) {
        return errorMessage(res, "The start date must be before the end date", 422);
    }
    model.getBookingsByPassengerType(req.query.startDate, req.query.endDate)
        .then(result => successMessage(res, result))
        .catch(err => next(err));
};

const viewRevenueByAircraftModel = async (req, res, next) => {
    const records = await model.getRevenueByAircraftModel(req.query.model, req.query.month)
        .then(result => {
            return result.reduce((revenueDetails, row) => {
                revenueDetails[row.model_name] = revenueDetails[row.model_name] || [];
                revenueDetails[row.model_name].push({
                    revenue: row.revenue,
                    month: row.month
                });
                return revenueDetails;
            }, {});
        })
        .catch(err => next(err));
    return successMessage(res, records);
}

const viewPastFlightDetails = async (req, res, next) => {
    model
        .getPastFlightsDetails()
        .then((result) => successMessage(res,result))
        .catch(err => next(err));
}

function validatePassengerCountByDest(destination,startDate,endDate) {
    const schema = Joi.object({
        destination: Joi.string().required().label('Destination'),
        startDate: Joi.date().iso().default(null).label('Start Date'),
        endDate: Joi.date().iso().default(null).label('End Date'),
    });
    return schema.validate({destination:destination,startDate:startDate,endDate:endDate});
}

const viewPassengerCountByDest = async (req,res, next) => {
    let destination = req.query.destination;
    let startDate = req.query.startDate;
    let endDate = req.query.endDate;
    const {error,value} = validatePassengerCountByDest(destination,startDate,endDate);
    if (error){
        return errorMessage(res, error.details[0].message, 422)
    }
    if ((value.startDate && value.endDate) && (value.startDate>value.endDate)) {
        return errorMessage(res, "The start date must be before the end date", 422)
    }
    startDate = (value.startDate===null)?undefined: value.startDate.toISOString().substring(0, 10);
    endDate = (value.endDate===null)?undefined: value.endDate.toISOString().substring(0, 10);
    try {
        const results = await model.getNoOfPassengersToDest(destination,startDate,endDate);
        if (results.length===0 || results[0].no_of_passengers===0){
            return errorMessage(res, "Destination Passenger Count not found", 404)
        }
        return successMessage(res, results[0], "Destination Passenger Counts found");
    }
    catch (err) {
        next(err);
    }
};

module.exports = {
    viewPassengersByFlightNo,
    viewBookingsByPassengerType,
    viewRevenueByAircraftModel,
    viewPastFlightDetails,
    viewPassengerCountByDest
};

