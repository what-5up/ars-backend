const express = require('express');
const router = express.Router();

const authenticate = require('../middlewares/authentication')
const authorize = require('../middlewares/authorization')
const { AccountTypesEnum } = require('../utils/constants');

const {
    getAllTitles,updateTitle
} = require('../controllers/title-controller');

/**
 * @todo assign controller method
 * @todo include middleware
 */
router.get('/', authenticate, authorize([AccountTypesEnum.ADMIN] + AccountTypesEnum.USERS),  getAllTitles);

/**
 * @todo assign controller method
 * @todo include middleware
 */
router.put('/:id', authenticate, authorize([AccountTypesEnum.ADMIN]), updateTitle);

module.exports = router;