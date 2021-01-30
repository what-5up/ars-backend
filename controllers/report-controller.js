const Joi = require('joi');

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
};

function validatePassengerCountByDest(destination,startDate,endDate) {
    const schema = Joi.object({
        destination: Joi.string().required().label('Destination'),
        startDate: Joi.date().iso().default(null).label('Start Date'),
        endDate: Joi.date().iso().default(null).label('End Date'),
    });
    return schema.validate({destination:destination,startDate:startDate,endDate:endDate})
}



const viewPassengerCountByDest = async (req,res) => {
    let destination = req.query.destination;
    let startDate = req.query.startDate;
    let endDate = req.query.endDate;
    const {error,value} = validatePassengerCountByDest(destination,startDate,endDate);
    if (error){
        return res.status(422).json({message: error.details[0].message})
    }
    if ((value.startDate && value.endDate) && (value.startDate>value.endDate)) {
        return res.status(422).json({message: "Start Date cannot be greater than End Date"})
    }
    startDate = (value.startDate===null)?undefined: value.startDate.toISOString().substring(0, 10);
    endDate = (value.endDate===null)?undefined: value.endDate.toISOString().substring(0, 10);
    try {
        const results = await model.getNoOfPassengersToDest(destination,startDate,endDate);
        if (results.length===0){
            return res.status(404).json({message: "Destination Passenger Count not found"});
        }
        res.status(200).json({result: results[0], message: "Destination Passenger Counts found"});
    }
    catch (err) {
        console.log(err);
        res.status(500).json({message:"Internal Server Error"});
    }
};

module.exports = {
    viewBookingsByPassengerType,viewPassengerCountByDest
};