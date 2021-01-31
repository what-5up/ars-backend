const express = require('express');
const router = express.Router();

const {
    viewPassengersByFlightNo,
    viewBookingsByPassengerType,
    viewRevenueByAircraftModel,
    viewPassengerCountByDest
} = require('../controllers/report-controller');

router.get('/1', viewPassengersByFlightNo);

router.get('/2', viewBookingsByPassengerType);

router.get('/3', viewPassengerCountByDest);

router.get('/4', viewRevenueByAircraftModel);

module.exports = router;