const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user-controller')

const {

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
router.delete('/:userID', UserController.deleteUser);

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

/**
 * @todo assign controller method
 * @todo include middleware
 */
router.get('/:id/bookings', );

/**
 * @todo assign controller method
 * @todo include middleware
 */
router.post('/:id/bookings', );

/**
* @todo assign controller method
 * @todo include middleware
 */
router.put('/:id/bookings', );

/**
 * @todo assign controller method
 * @todo include middleware
 */
router.delete('/:id/bookings', );

/**
 * @todo assign controller method
 * @todo include middleware
 */
router.get('/:id/bookings/:id', );

/**
 * @todo assign controller method
 * @todo include middleware
 */
router.post('/:id/bookings/:id', );

/**
* @todo assign controller method
 * @todo include middleware
 */
router.put('/:id/bookings/:id', );

/**
 * @todo assign controller method
 * @todo include middleware
 */
router.delete('/:id/bookings/:id', );

module.exports = router;