const express = require('express');
const router = express.Router();

const {
    viewAllAircrafts
} = require('../controllers/aircraft-controller');

/**
 * @todo assign controller method
 * @todo include middleware
 */
router.get('/', viewAllAircrafts);

/**
 * @todo assign controller method
 * @todo include middleware
 */
router.post('/', );

/**
* @todo assign controller method
 * @todo include middleware
 */
router.put('/', );

/**
 * @todo assign controller method
 * @todo include middleware
 */
router.delete('/', );

/**
 * @todo assign controller method
 * @todo include middleware
 */
router.get('/:id', );

/**
 * @todo assign controller method
 * @todo include middleware
 */
router.post('/:id', );

/**
* @todo assign controller method
 * @todo include middleware
 */
router.put('/:id', );

/**
 * @todo assign controller method
 * @todo include middleware
 */
router.delete('/:id', );

module.exports = router;