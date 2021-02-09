const express = require('express');
const router = express.Router();

const {
    createGuest
} = require('../controllers/guest-controller');

/**
 * @todo assign controller method
 * @todo include middleware
 */
router.post('/' ,createGuest);

/**
 * @todo assign controller method
 * @todo include middleware
 */
router.get('/', );

module.exports = router;