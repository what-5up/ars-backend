
const baseModel = require("../models/base-model");
const passengerModel = require("../models/passenger-model");

const addPassengers = async (req, res) => {
    // const userID = 9;
    // const passengers = [
    //     {title:1,firstName:"Dom",lastName:"Bess",birthday:"1997-02-12",gender:"m",country:"England",passportNo:"99340612",passportExpiry:"2022-02-26"},
    //     {title:3,firstName:"Jack",lastName:"Leach",birthday:"1990-02-12",gender:"m",country:"England",passportNo:"92340612",passportExpiry:"2022-02-27"}
    //     ];
    let idArray = [];
    const userID = req.userID;
    const passengers = req.body.passengers;
    if (passengers.length===0){
        return res.status(422).json({ message: "Must be at least 1 passenger present"})
    }
    try{
        const lock = await baseModel.writeLock('passenger');
        const queryResult = await passengerModel.addPassengers(passengers,userID);
        const unlock = await baseModel.unlockTables();
        for (let i=0; i < passengers.length; i++){
            idArray.push(queryResult.insertId+i);
        }
        res.status(201).json({idArray:idArray, message: 'Passengers added successfully'});
    }
    catch (err) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};


module.exports = {
    addPassengers
};

