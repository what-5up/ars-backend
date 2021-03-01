const express = require('express');
const router = express.Router();

const authenticate = require('../middlewares/authentication')
const authorize = require('../middlewares/authorization')
const { AccountTypesEnum } = require('../utils/constants');

const {
    viewRoutes,
    viewRoute,
    updateRoutePrice
} = require('../controllers/route-controller');

const {
    updateDiscount, 
    viewAllTicketPrices, 
    viewTicketPrice
} = require('../controllers/ticket-controller');

/**
 * @todo include middleware
 */
router.get('/', viewRoutes);

/**
 * @todo assign controller method
 * @todo include middleware
 */
router.post('/');

/**
 * @todo include middleware
 */
router.get('/:id', viewRoute);

/**
 * @todo assign controller method
 * @todo include middleware
 */
router.put('/:id');

/**
 * @todo assign controller method
 * @todo include middleware
 */
router.delete('/:id');

/**
 * @todo include middleware
 */
router.get('/:id/price',viewAllTicketPrices);

/**
 * @todo assign controller method
 * @todo include middleware
 */
router.post('/:id/price');

/**
 * @todo assign controller method
 * @todo include middleware
 */
router.put('/:id/price', updateRoutePrice);

/**
 * @todo assign controller method
 * @todo include middleware
 */
router.delete('/:id/price');

router.get('/:routeid/price/:priceid',viewTicketPrice);

module.exports = router;