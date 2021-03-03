const express = require('express');
const router = express.Router();

const {
    getAllRegions,
    addRegion,
    updateRegion,
    deleteRegion
} = require('../controllers/region-controller');


router.get('/', getAllRegions);

router.post('/', addRegion);

router.put('/:id', updateRegion);

router.delete('/:id', deleteRegion);


module.exports = router;