
const travelerClassModel = require("../models/traveler-class-model");

const getAllTravelerClass = async (req, res) => {
    try {
        const travelerClasses = await travelerClassModel.getAllTravelerClass();
        res.status(200).json({travelerClasses: travelerClasses});
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = {
    getAllTravelerClass
};
