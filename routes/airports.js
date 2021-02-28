const express = require('express');
const router = express.Router();

const {
    getAllAirports,
    updateAirport,
    deleteAirport,
    addAirport
} = require('../controllers/airport-controller');


router.get('/', getAllAirports);

router.post('/', addAirport);

router.put('/:id', updateAirport);

router.delete('/:id', deleteAirport);


module.exports = router;