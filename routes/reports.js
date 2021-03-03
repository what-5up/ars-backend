const express = require('express');
const router = express.Router();

const authenticate = require('../middlewares/authentication')
const authorize = require('../middlewares/authorization')
const { AccountTypesEnum } = require('../utils/constants');

const {
    viewPassengersByFlightNo,
    viewBookingsByPassengerType,
    viewRevenueByAircraftModel,
    viewPassengerCountByDest,
    viewPastFlightDetails
} = require('../controllers/report-controller');

router.get('/1', viewPassengersByFlightNo);

router.get('/2', authenticate, authorize([AccountTypesEnum.MANAGEMENT]), viewBookingsByPassengerType);

router.get('/3', authenticate, authorize([AccountTypesEnum.MANAGEMENT]), viewPassengerCountByDest);

router.get('/4', authenticate, authorize([AccountTypesEnum.MANAGEMENT]), viewRevenueByAircraftModel);

router.get('/5', authenticate, authorize([AccountTypesEnum.MANAGEMENT]), viewPastFlightDetails);

module.exports = router;