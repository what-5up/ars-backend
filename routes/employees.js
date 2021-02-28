const express = require('express');
const router = express.Router();

const authenticate = require('../middlewares/authentication')
const authorize = require('../middlewares/authorization')
const { AccountTypesEnum } = require('../utils/constants');

const employeeValidator = require('../middlewares/schema-validators/employee-validator');
const employeeController = require('../controllers/employee-controller');

router.get('/',
    authenticate,
    authorize([AccountTypesEnum.ADMIN]),
    employeeController.viewAllEmployees
);

router.post('/',
    authenticate,
    authorize([AccountTypesEnum.ADMIN]),
    employeeValidator.addEmployee,
    employeeController.addEmployee
);

router.put('/:id',
    authenticate,
    authorize([AccountTypesEnum.ADMIN]),
    employeeValidator.updateEmployee,
    employeeController.updateEmployee
);

router.delete('/:id',
    authenticate,
    authorize([AccountTypesEnum.ADMIN]),
    employeeController.deleteEmployee
);

module.exports = router;