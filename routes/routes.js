const express = require('express');
const router = express.Router();

const authenticate = require('../middlewares/authentication')
const authorize = require('../middlewares/authorization')
const { AccountTypesEnum } = require('../utils/constants');

const routeController = require('../controllers/route-controller');

/**
 * @todo include middleware
 */
router.get('/', routeController.viewRoutes);

/**
 * @todo assign controller method
 * @todo include middleware
 */
router.post('/');

/**
 * @todo include middleware
 */
router.get('/:id', routeController.viewRoute);

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

router.get('/:id/prices', routeController.viewRoutePrice);

router.post('/:id/prices', routeController.addRoutePrice);

router.put('/:id/prices/:classid', routeController.updateRoutePrice);

router.delete('/:id/prices/:classid', routeController.deleteRoutePrice);


module.exports = router;