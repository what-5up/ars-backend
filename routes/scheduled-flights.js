const express = require('express');
const router = express.Router();

const authenticate = require('../middlewares/authentication')
const authorize = require('../middlewares/authorization')
const scheduledFlightsValidator = require('../middlewares/schema-validators/scheduled-flights-validator');
const { AccountTypesEnum } = require('../utils/constants');

const {
    viewScheduledFlights,
    viewScheduledFlight,
    viewDetailedScheduledFlights,
    deleteScheduledFlight,
    addScheduledFlight,
    updateScheduledFlight,
    viewSeatMap,
    getPricing
} = require('../controllers/scheduled-flight-controller');

/**
 * @todo assign controller method
 * @todo include middleware
 */
router.get('/', viewScheduledFlights);

router.get('/detailed', authenticate, authorize([AccountTypesEnum.CREW_SCHEDULE_COORDINATOR]), viewDetailedScheduledFlights);

/**
 * @todo assign controller method
 * @todo include middleware
 */
router.post('/', authenticate, authorize([AccountTypesEnum.CREW_SCHEDULE_COORDINATOR]), addScheduledFlight);

/**
 * @todo assign controller method
 * @todo include middleware
 */
router.get('/:id', authenticate, authorize([AccountTypesEnum.CREW_SCHEDULE_COORDINATOR] + AccountTypesEnum.USERS), viewScheduledFlight);

/**
* @todo assign controller method
 * @todo include middleware
 */
router.put('/:id', authenticate, authorize([AccountTypesEnum.CREW_SCHEDULE_COORDINATOR]), updateScheduledFlight);

/**
 * @todo assign controller method
 * @todo include middleware
 */
router.delete('/:id', authenticate, authorize([AccountTypesEnum.CREW_SCHEDULE_COORDINATOR]), deleteScheduledFlight);

/**
 * @todo assign controller method
 * @todo include middleware
 */
router.get('/:id/seat-map', authenticate, authorize([AccountTypesEnum.CREW_SCHEDULE_COORDINATOR] + AccountTypesEnum.USERS), viewSeatMap);

/**
 * @todo assign controller method
 * @todo include middleware
 */
router.post(
    '/:id/pricing',
    authenticate,
    authorize(AccountTypesEnum.USERS),
    scheduledFlightsValidator.getPricing,
    getPricing);

module.exports = router;