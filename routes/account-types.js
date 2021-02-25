const express = require('express');
const router = express.Router();

const {
    getAllAccountTypes
} = require('../controllers/account-type-controller');

/**
 * @todo assign controller method
 * @todo include middleware
 */
router.get('/', getAllAccountTypes);

module.exports = router;