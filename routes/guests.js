const express = require('express');
const router = express.Router();

const {
    createGuest
} = require('../controllers/guest-controller');

router.post('/', createGuest);

module.exports = router;