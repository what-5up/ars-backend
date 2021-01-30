const express = require('express');
const router = express.Router();

const {
    viewBookingsByPassengerType
} = require('../controllers/report-controller');

/**
 * @todo include middleware
 */
router.get('/2', viewBookingsByPassengerType);

module.exports = router;