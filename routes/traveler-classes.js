const express = require('express');
const router = express.Router();

const authenticate = require('../middlewares/authentication')
const authorize = require('../middlewares/authorization')
const { AccountTypesEnum } = require('../utils/constants');

const {
    getAllTravelerClass
} = require('../controllers/traveler-class-controller');

/**
 * @todo assign controller method
 * @todo include middleware
 */
router.get('/', getAllTravelerClass);

module.exports = router;