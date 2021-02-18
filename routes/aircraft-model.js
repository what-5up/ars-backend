const express = require('express');
const router = express.Router();

const {
    viewAircraftModelList
} = require('../controllers/aircraft-controller');

router.get('/', viewAircraftModelList);

module.exports = router;