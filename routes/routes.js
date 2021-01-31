const express = require('express');
const router = express.Router();

const {
    viewRoutes,
    viewRoute,
    updateRoutePrice
} = require('../controllers/route-controller');

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
 * @todo assign controller method
 * @todo include middleware
 */
router.put('/');

/**
 * @todo assign controller method
 * @todo include middleware
 */
router.delete('/');


/**
 * @todo include middleware
 */
router.get('/:id', viewRoute);

/**
 * @todo assign controller method
 * @todo include middleware
 */
router.post('/:id');

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
router.get('/:id/price');

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

module.exports = router;