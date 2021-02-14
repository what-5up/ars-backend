const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user-controller')

const {
    viewBookings,
    addBooking,
    deleteBooking,
    updateBooking,
    signupUser,
    deleteUser,
    updateUser
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
router.post('/', signupUser);

/**
* @todo assign controller method
 * @todo include middleware
 */
router.put('/', );

/**
 * @todo assign controller method
 * @todo include middleware
 */
router.delete('/:userID', deleteUser);

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
router.put('/:userid', updateUser);

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
router.post('/:userid/bookings', addBooking);

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
router.put('/:userid/bookings/:bookingid', updateBooking);

/**
 * @todo assign controller method
 * @todo include middleware
 */
router.delete('/:userid/bookings/:bookingid', deleteBooking);

module.exports = router;