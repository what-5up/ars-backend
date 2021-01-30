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

module.exports = {
    viewBookingsByPassengerType
};