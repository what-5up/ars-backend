const express = require('express');
const router = express.Router();

const {
    getAllTitles
} = require('../controllers/title-controller');

/**
 * @todo assign controller method
 * @todo include middleware
 */
router.get('/', getAllTitles);

module.exports = router;