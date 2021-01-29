const model = require("../models/scheduled-flight-model");

/**
 * View all scheduled flights
 * 
 * @param {object} req http request object
 * @param {object} res http response object
 * @return {object} promise of a record object
 * @throws Error
 */
const viewScheduledFlights = async (req, res) => {
    const records = await model.getScheduledFlights(req.query.origin, req.query.destination, req.query.airplaneID, req.query.airplaneModel)
        .then(result => {
            return result.map((row, index) => {
                return { id: index, object: row };
            })
        })
        .catch(err => { return res.status(400).send({ error: err.message }); });
    return res.status(200).send(records);
}

module.exports = {
    viewScheduledFlights
};