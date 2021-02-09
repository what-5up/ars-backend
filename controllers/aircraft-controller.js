const model = require("../models/aircraft-model");

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
    return res.status(200).send(records);
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
        return res.status(400).send({ error: "No aircraft id given" });
    }
    const id = req.params.id;
    const records = await model.getDetailsForAircraft(id)
        .then(result => {
            return result.reduce((aircraftDetails,row) => {
                aircraftDetails.id = row.id;
                aircraftDetails.model_name=row.model_name;
                aircraftDetails.scheduled_flights = aircraftDetails.scheduled_flights || [];
                aircraftDetails.scheduled_flights.push({
                    route:row.route,
                    departure: row.departure
                });
                return aircraftDetails;
            }, {})
        })
        .catch(err => next(err));
    return res.status(200).send(records);
}

module.exports = {
    viewAllAircrafts,
    viewDetailsForAircraft
};