const express = require('express');
const router = express.Router();

const authenticate = require('../middlewares/authentication')
const authorize = require('../middlewares/authorization')
const { AccountTypesEnum } = require('../utils/constants');

const accountTypeValidator = require('../middlewares/schema-validators/account-type-validator');
const accountTypeController = require('../controllers/account-type-controller');

router.get('/',
    authenticate,
    authorize([AccountTypesEnum.SALES_REPRESENTATIVE]),
    accountTypeController.viewAllAccountTypes
);

router.post('/',
    authenticate,
    authorize([AccountTypesEnum.SALES_REPRESENTATIVE]),
    accountTypeValidator.addAccountType,
    accountTypeController.addAccountType
);

router.put('/:id',
    authenticate,
    authorize([AccountTypesEnum.SALES_REPRESENTATIVE]),
    accountTypeValidator.updateAccountType,
    accountTypeController.updateAccountType
);

router.delete('/:id',
    authenticate,
    authorize([AccountTypesEnum.SALES_REPRESENTATIVE]),
    accountTypeController.deleteAccountType
);

module.exports = router;