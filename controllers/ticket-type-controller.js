const Price = require('../models/price-model');
const updateDiscount = async (req, res, next) => {
    Price.updateDiscount(req.params.id,req.body.discount)
        .then(() => res.status(200).send({success: true, message: `Successfully updated discount`}))
        .catch((err) => next(err));
}

module.exports = {
    updateDiscount
}