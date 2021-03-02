const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user-controller')

const authenticate = require('../middlewares/authentication')
const authorize = require('../middlewares/authorization')
const authorizeCreater = require('../middlewares/creater-authorization');
const { AccountTypesEnum } = require('../utils/constants');

const {
    viewBookings,
    addBooking,
    deleteBooking,
    updateBooking,
    signupUser,
    deleteUser,
    updateUser,
    getPassengers
} = require('../controllers/user-controller');


/**
 * @todo assign controller method
 * @todo include middleware
 */
router.post('/', signupUser);

/**
 * @todo assign controller method
 * @todo include middleware
 */
router.get('/:userid', );

/**
* @todo assign controller method
 * @todo include middleware
 */
router.put('/:userid', authenticate, authorize([AccountTypesEnum.REGISTERED_USER]), authorizeCreater,  updateUser);

/**
 * @todo assign controller method
 * @todo include middleware
 */
router.delete('/:userid', authenticate, authorize([AccountTypesEnum.REGISTERED_USER]), authorizeCreater, deleteUser);

/**
 * @todo assign controller method
 * @todo include middleware
 */
router.get('/:userid/bookings', authenticate, authorize(USERS), authorizeCreater, viewBookings);

/**
 * @todo assign controller method
 * @todo include middleware
 */
router.post('/:userid/bookings', authenticate, authorize(USERS), authorizeCreater, addBooking);

/**
* @todo assign controller method
 * @todo include middleware
 */
router.put('/:userid/bookings/:bookingid', authenticate, authorize(USERS), authorizeCreater,  updateBooking);

/**
 * @todo assign controller method
 * @todo include middleware
 */
router.delete('/:userid/bookings/:bookingid', authenticate, authorize(USERS), authorizeCreater,  deleteBooking);

router.get('/:userid/passengers', authenticate, authorize([AccountTypesEnum.REGISTERED_USER]), authorizeCreater, getPassengers);

module.exports = router;