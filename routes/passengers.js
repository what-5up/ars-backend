const express = require('express');
const router = express.Router();

const {
    addPassengers,
    getPassengers
} = require('../controllers/passenger-controller');

/**
 * @todo assign controller method
 * @todo include middleware
 */
router.post('/',addPassengers);

/**
 * @todo assign controller method
 * @todo include middleware
 */
router.get('/',getPassengers);

module.exports = router;