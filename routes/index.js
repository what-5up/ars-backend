const routes = require('express').Router();
const express = require('express');

routes.use('/aircraft', require('./aircraft'));
routes.use('/employees', require('./employees'));
routes.use('/reports', require('./reports'));
routes.use('/scheduled-flights', require('./scheduled-flights'));
routes.use('/session', require('./session'));
routes.use('/ticket-types', require('./ticket-types'));
routes.use('/users', require('./users'));



routes.use('/', (request, response) => {
    return response.status(200).send("Home");
});


module.exports = routes;