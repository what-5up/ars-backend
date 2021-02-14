const express = require('express');
const router = express.Router();

const {
    getAllTravelerClass
} = require('../controllers/traveler-class-controller');

/**
 * @todo assign controller method
 * @todo include middleware
 */
router.get('/', getAllTravelerClass);

module.exports = router;