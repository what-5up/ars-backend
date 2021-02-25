const express = require('express');
const router = express.Router();

const {
    getAllTitles,updateTitle
} = require('../controllers/title-controller');

/**
 * @todo assign controller method
 * @todo include middleware
 */
router.get('/', getAllTitles);

/**
 * @todo assign controller method
 * @todo include middleware
 */
router.put('/:titleId', updateTitle);

module.exports = router;