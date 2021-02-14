
const titleModel = require("../models/title-model");

const getAllTitles = async (req, res) => {
    try {
        const titles = await titleModel.getAllTitles();
        res.status(200).json({titles: titles});
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = {
    getAllTitles
};
