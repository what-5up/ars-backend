const express = require('express');
const router = express.Router();

const authenticate = require('../middlewares/authentication')
const authorize = require('../middlewares/authorization')
const { AccountTypesEnum } = require('../utils/constants');
const { paramAllIntegerValidator } = require('../middlewares/schema-validators/param-validator');

const routeController = require('../controllers/route-controller');
const routeValidator = require('../middlewares/schema-validators/route-validator');


router.get('/',
    paramAllIntegerValidator,
    routeValidator.viewRoutes,
    routeController.viewRoutes
);

/**
 * @todo assign controller method
 * @todo include middleware
 */
router.post('/');

router.get('/:id',
    paramAllIntegerValidator,
    routeController.viewRoute
);

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

router.get('/:id/prices',
    authenticate,
    authorize([AccountTypesEnum.SALES_REPRESENTATIVE]),
    paramAllIntegerValidator,
    routeController.viewRoutePrice
);

router.post('/:id/prices',
    authenticate,
    authorize([AccountTypesEnum.SALES_REPRESENTATIVE]),
    paramAllIntegerValidator,
    routeValidator.addRoutePrice,
    routeController.addRoutePrice
);

router.put('/:id/prices/:classid',
    authenticate,
    authorize([AccountTypesEnum.SALES_REPRESENTATIVE]),
    paramAllIntegerValidator,
    routeValidator.updateRoutePrice,
    routeController.updateRoutePrice
);

router.delete('/:id/prices/:classid',
    authenticate,
    authorize([AccountTypesEnum.SALES_REPRESENTATIVE]),
    paramAllIntegerValidator,
    routeController.deleteRoutePrice
);


module.exports = router;