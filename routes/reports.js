const express = require('express');
const router = express.Router();

const {
    viewPassengerCountByDest,
    viewBookingsByPassengerType,
    viewRevenueByAircraftModel
} = require('../controllers/report-controller');

/**
 * @todo include middleware
 */
router.get('/2', viewBookingsByPassengerType);

router.get('/3', viewPassengerCountByDest);

router.get('/4', viewRevenueByAircraftModel);

module.exports = router;