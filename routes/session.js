const express = require('express');
const router = express.Router();

const {
    login
} = require('../controllers/session-controller');

/**
 * @todo assign controller method
 * @todo include middleware
 */
router.post('/', login );

module.exports = router;