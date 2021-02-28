const express = require('express');
const router = express.Router();

const {
    viewAllAccountTypes, 
    addAccountType,
    updateAccountType,
    deleteAccountType
} = require('../controllers/account-type-controller');

const authenticate = require('../middlewares/authentication')
const authorize = require('../middlewares/authorization')
const { AccountTypesEnum } = require('../utils/constants');

/**
 * @todo assign controller method
 * @todo include middleware
 */
router.get('/', authenticate, authorize([AccountTypesEnum.ADMIN]),  viewAllAccountTypes);

router.post('/', authenticate, authorize([AccountTypesEnum.ADMIN]), addAccountType)

router.put('/:id', authenticate, authorize([AccountTypesEnum.ADMIN]), updateAccountType);

router.delete('/:id', authenticate, authorize([AccountTypesEnum.ADMIN]), deleteAccountType )

module.exports = router;