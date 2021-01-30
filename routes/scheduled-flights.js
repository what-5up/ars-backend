const express = require('express');
const router = express.Router();

const {
    viewScheduledFlights, deleteScheduledFlight, addScheduledFlight, updateScheduledFlight
} = require('../controllers/scheduled-flight-controller');

/**
 * @todo assign controller method
 * @todo include middleware
 */
router.get('/', viewScheduledFlights);

/**
 * @todo assign controller method
 * @todo include middleware
 */
router.post('/', addScheduledFlight);

/**
* @todo assign controller method
 * @todo include middleware
 */
router.put('/:id', updateScheduledFlight);

/**
 * @todo assign controller method
 * @todo include middleware
 */
router.delete('/:id', deleteScheduledFlight);

/**
 * @todo assign controller method
 * @todo include middleware
 */
router.get('/:id', );

/**
 * @todo assign controller method
 * @todo include middleware
 */
router.post('/:id', );

/**
* @todo assign controller method
 * @todo include middleware
 */
router.put('/:id', );

/**
 * @todo assign controller method
 * @todo include middleware
 */
router.delete('/:id', );

module.exports = router;