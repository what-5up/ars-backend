const express = require('express');
const router = express.Router();

const {
    viewAllAccountTypes, 
    addAccountType,
    updateAccountType,
    deleteAccountType
} = require('../controllers/account-type-controller');

/**
 * @todo assign controller method
 * @todo include middleware
 */
router.get('/', viewAllAccountTypes);

router.post('/', addAccountType)

router.put('/:id', updateAccountType);

router.delete('/:id', deleteAccountType )

module.exports = router;