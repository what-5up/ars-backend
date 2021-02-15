const passengerModel = require("../models/passenger-model");
const { successMessage, errorMessage } = require("../utils/message-template");

const addPassengers = async (req, res, next) => {
    // const userID = 9;
    // const passengers = [
    //     {title:10,firstName:"Dom",lastName:"Bess",birthday:"1997-02-12",gender:"m",country:"England",passportNo:"99340612",passportExpiry:"2022-02-26"},
    //     {title:1,firstName:"Jack",lastName:"Leach",birthday:"1990-02-12",gender:"m",country:"England",passportNo:"92340612",passportExpiry:"2022-02-27"}
    //     ];
    const userID = req.userID;
    const passengers = req.body.passengers;
    if (passengers.length===0){
        return errorMessage(res, "Body cannot be empty", 422)
    }
    try{
        const queryResult = await passengerModel.addPassengers(passengers,userID);
        console.log(queryResult.insertId);
        console.log("There is nothing");
        return successMessage(res, null, 'Passengers added successfully', 201);
    }
    catch (err) {
        next(err);
    }
};


module.exports = {
    addPassengers
};

