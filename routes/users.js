const express = require('express');
const router = express.Router();

const {
    viewBookings
} = require('../controllers/user-controller');

/**
 * @todo assign controller method
 * @todo include middleware
 */
router.get('/', );

/**
 * @todo assign controller method
 * @todo include middleware
 */
router.post('/', );

/**
* @todo assign controller method
 * @todo include middleware
 */
router.put('/', );

/**
 * @todo assign controller method
 * @todo include middleware
 */
router.delete('/', );

/**
 * @todo assign controller method
 * @todo include middleware
 */
router.get('/:userid', );

/**
 * @todo assign controller method
 * @todo include middleware
 */
router.post('/:userid', );

/**
* @todo assign controller method
 * @todo include middleware
 */
router.put('/:userid', );

/**
 * @todo assign controller method
 * @todo include middleware
 */
router.delete('/:userid', );

/**
 * @todo assign controller method
 * @todo include middleware
 */
router.get('/:userid/bookings', viewBookings);

/**
 * @todo assign controller method
 * @todo include middleware
 */
router.post('/:userid/bookings', );

/**
* @todo assign controller method
 * @todo include middleware
 */
router.put('/:userid/bookings', );

/**
 * @todo assign controller method
 * @todo include middleware
 */
router.delete('/:userid/bookings', );

/**
 * @todo assign controller method
 * @todo include middleware
 */
router.get('/:userid/bookings/:bookingid', );

/**
 * @todo assign controller method
 * @todo include middleware
 */
router.post('/:userid/bookings/:bookingid', );

/**
* @todo assign controller method
 * @todo include middleware
 */
router.put('/:userid/bookings/:bookingid', );

/**
 * @todo assign controller method
 * @todo include middleware
 */
router.delete('/:userid/bookings/:bookingid', );

module.exports = router;