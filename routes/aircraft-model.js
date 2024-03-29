const express = require('express');
const router = express.Router();

const authenticate = require('../middlewares/authentication')
const authorize = require('../middlewares/authorization')
const { AccountTypesEnum } = require('../utils/constants');

const {
    viewAircraftModelList
} = require('../controllers/aircraft-controller');
const {
    createAircraftModel,updateAircraftModel
} = require('../controllers/aircraft-model-controller');

//TODO: Add authentication and authorization
router.get('/', viewAircraftModelList);

router.post('/', createAircraftModel);

router.put('/:id', updateAircraftModel);



module.exports = router;