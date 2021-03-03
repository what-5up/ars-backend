const express = require('express');
const router = express.Router();

const authenticate = require('../middlewares/authentication')
const authorize = require('../middlewares/authorization')
const { AccountTypesEnum } = require('../utils/constants');

const {
    addPassengers,
    getPassengers
} = require('../controllers/passenger-controller');

router.post('/', authenticate, authorize(AccountTypesEnum.BOTH_USERS), addPassengers);


/**
 * @todo assign controller method
 * @todo include middleware
 */
router.get('/',getPassengers);

module.exports = router;