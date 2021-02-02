const express = require('express');
const router = express.Router();

const {
    updateDiscount, viewAllTicketPrices, viewTicketPrice
} = require('../controllers/ticket-controller');

/**
 * @todo assign controller method
 * @todo include middleware
 */
router.get('/', viewAllTicketPrices);

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
router.get('/:id', viewTicketPrice );

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