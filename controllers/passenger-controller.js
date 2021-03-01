const baseModel = require("../models/base-model");

const passengerModel = require("../models/passenger-model");
const { successMessage, errorMessage } = require("../utils/message-template");

const addPassengers = async (req, res, next) => {
    // const userID = 9;
    // const passengers = [
    //     {title:1,firstName:"Dom",lastName:"Bess",birthday:"1997-02-12",gender:"m",country:"England",passportNo:"99340612",passportExpiry:"2022-02-26"},
    //     {title:3,firstName:"Jack",lastName:"Leach",birthday:"1990-02-12",gender:"m",country:"England",passportNo:"92340612",passportExpiry:"2022-02-27"}

    let idArray = [];
    const userID = req.userID;
    const passengers = req.body.passengers;
    if (passengers.length===0){

        return errorMessage(res, "Body cannot be empty", 422)
    }
    try{
        const lock = await baseModel.writeLock('passenger');
        const queryResult = await passengerModel.addPassengers(passengers,userID);
        const unlock = await baseModel.unlockTables();
        for (let i=0; i < passengers.length; i++){
            idArray.push(queryResult.insertId+i);
        }
        return successMessage(res, null, 'Passengers added successfully', 201);
    }
    catch (err) {
        next(err);    
    }
};

/**
 * View all passengers of a user or view all passengers if user_id is undefined
 * 
 * @param {object} req http request object
 * @param {object} res http response object
 * @return {object} promise of a record object
 * @todo move function to an appropriate file
 */
const getPassengers = async (req, res) => {
    const records = await passengerModel.getPassengers(req.body.user_id)
        .then(result => {
            return result.map((row, index) => {
                return { id: index, object: row };
            })
        })
        .catch(err => { return errorMessage(res, err.message); });
    return successMessage(res, records); 
}


module.exports = {
    addPassengers,
    getPassengers
};

