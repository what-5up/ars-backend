const express = require('express');
const router = express.Router();

const authenticate = require('../middlewares/authentication')
const authorize = require('../middlewares/authorization')
const { AccountTypesEnum } = require('../utils/constants');

const designationValidator = require('../middlewares/schema-validators/designation-validator');
const designationController = require('../controllers/designation-controller');

router.get('/',
    authenticate,
    authorize([AccountTypesEnum.ADMIN]),
    designationController.viewAllDesignations
);

router.post('/',
    authenticate,
    authorize([AccountTypesEnum.ADMIN]),
    designationValidator.addDesignation,
    designationController.addDesignation
);

router.put('/:id',
    authenticate,
    authorize([AccountTypesEnum.ADMIN]),
    designationValidator.updateDesignation,
    designationController.updateDesignation
);

router.delete('/:id',
    authenticate,
    authorize([AccountTypesEnum.ADMIN]),
    designationController.deleteDesignation
);

module.exports = router;