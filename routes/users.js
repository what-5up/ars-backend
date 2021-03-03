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
    viewBookingDetails,
    deleteBooking,
    updateBooking,
    signupUser,
    deleteUser,
    updateUser,
    getPassengers,
    getUser
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
router.get('/:userid', getUser);

/**
* @todo assign controller method
 * @todo include middleware
 */
router.put('/:userid', authenticate, authorize([AccountTypesEnum.REGISTERED_USER]), authorizeCreater('userid'),  updateUser);

/**
 * @todo assign controller method
 * @todo include middleware
 */
router.delete('/:userid', authenticate, authorize([AccountTypesEnum.REGISTERED_USER]), authorizeCreater('userid'), deleteUser);

/**
 * @todo assign controller method
 * @todo include middleware
 */
router.get('/:userid/bookings', authenticate, authorize(AccountTypesEnum.USERS), authorizeCreater('userid'), viewBookings);

/**
 * @todo assign controller method
 * @todo include middleware
 */
router.post('/:userid/bookings', authenticate, authorize(AccountTypesEnum.USERS), authorizeCreater('userid'), addBooking);

/**
* @todo assign controller method
 * @todo include middleware
 */
router.get('/:userid/bookings/:bookingid', authenticate, authorize(AccountTypesEnum.USERS), authorizeCreater('userid'),  viewBookingDetails);

/**
* @todo assign controller method
 * @todo include middleware
 */
router.put('/:userid/bookings/:bookingid', authenticate, authorize(AccountTypesEnum.USERS), authorizeCreater('userid'),  updateBooking);

/**
 * @todo assign controller method
 * @todo include middleware
 */
router.delete('/:userid/bookings/:bookingid', authenticate, authorize(AccountTypesEnum.USERS), authorizeCreater('userid'),  deleteBooking);

router.get('/:userid/passengers', authenticate, authorize([AccountTypesEnum.REGISTERED_USER]), authorizeCreater('userid'), getPassengers);

module.exports = router;