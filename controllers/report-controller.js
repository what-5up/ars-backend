const model = require("../models/report-model");

const viewPassengersByFlightNo = async (req, res, next) => {
    const records = await model.getPassengersByFlightNo(req.query.route)
        .then(result => {
            return {above18: result[0], below18: result[1]}
        })
        .catch(err => next(err));
    return res.status(200).send(records);
}

/**
 * View all the bookings categorized by the passenger type
 *
 * @param {object} req http request object
 * @param {object} res http response object
 * @return {object} promise of a record object
 * @throws Error
 */
const viewBookingsByPassengerType = async (req, res, next) => {
    const records = await model.getBookingsByPassengerType(req.query.startDate, req.query.endDate)
        .then(result => {
            return result.map((row, index) => {
                return { id: index, object: row };
            })
        })
        .catch(err => next(err));
    return res.status(200).send(records);
}

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
    return res.status(200).send(records);
}

const viewPastFlightDetails = async (req, res, next) => {
    model
        .getPastFlightsDetails()
        .then((result) => res.status(200).send(result))
        .catch((err) => res.status(400).send(err));
}

module.exports = {
    viewPassengersByFlightNo,
    viewBookingsByPassengerType,
    viewRevenueByAircraftModel,
    viewPastFlightDetails
};
