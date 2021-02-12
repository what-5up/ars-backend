const express = require('express');
const router = express.Router();

const {
    addPassengers
} = require('../controllers/passenger-controller');

/**
 * @todo assign controller method
 * @todo include middleware
 */
router.post('/',addPassengers);

module.exports = router;