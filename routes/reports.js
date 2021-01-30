const express = require('express');
const router = express.Router();

const {
    viewBookingsByPassengerType,viewPassengerCountByDest
} = require('../controllers/report-controller');

/**
 * @todo include middleware
 */
router.get('/2', viewBookingsByPassengerType);

/**
 * @todo include middleware
 */
router.get('/3', viewPassengerCountByDest);

module.exports = router;