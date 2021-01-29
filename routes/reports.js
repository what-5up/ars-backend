const express = require('express');
const router = express.Router();

const {
    viewBookingsByPassengerType
} = require('../controllers/report-controller');

/**
 * @todo assign controller method
 * @todo include middleware
 */
router.get('/:id', viewBookingsByPassengerType);

module.exports = router;