const express = require('express');
const router = express.Router();

const {
    updateDiscount
} = require('../controllers/ticket-type-controller');

/**
 * @todo assign controller method
 * @todo include middleware
 */
router.get('/', );

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
router.put('/:id', updateDiscount);

/**
 * @todo assign controller method
 * @todo include middleware
 */
router.delete('/:id', );

module.exports = router;