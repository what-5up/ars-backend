const express = require('express');
const router = express.Router();

const {
    viewBookingsByPassengerType,
    viewRevenueByAircraftModel
} = require('../controllers/report-controller');

/**
 * @todo include middleware
 */
router.get('/2', viewBookingsByPassengerType);

router.get('/4', viewRevenueByAircraftModel);

module.exports = router;