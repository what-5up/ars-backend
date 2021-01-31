const express = require('express');
const router = express.Router();

const {
    viewPassengersByFlightNo,
    viewBookingsByPassengerType,
    viewRevenueByAircraftModel
} = require('../controllers/report-controller');

router.get('/1', viewPassengersByFlightNo);

router.get('/2', viewBookingsByPassengerType);

router.get('/4', viewRevenueByAircraftModel);

module.exports = router;