const model = require("../models/report-model");

/**
 * View all the bookings categorized by the passenger type
 * 
 * @param {object} req http request object
 * @param {object} res http response object
 * @return {object} promise of a record object
 * @throws Error
 */
const viewBookingsByPassengerType = async (req, res) => {
    const records = await model.getBookingsByPassengerType(req.query.startDate, req.query.endDate)
        .then(result => {
            return result.map((row, index) => {
                return { id: index, object: row };
            })
        })
        .catch(err => { return res.status(400).send({ error: err.message }); });
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

module.exports = {
    viewBookingsByPassengerType,
    viewRevenueByAircraftModel
};

// [
//     {
//       "id": 0,
//       "object": {
//         "model_name": "Boeing 737",
//         "revenue": 308000,
//         "month": "2021-02"
//       }
//     },
//     {
//       "id": 1,
//       "object": {
//         "model_name": "Boeing 757",
//         "revenue": 182000,
//         "month": "2021-02"
//       }
//     }
//   ]