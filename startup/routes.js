const express = require('express');
const routes = require('../routes/db'); //TODO: clarify
const bodyParser = require('body-parser');

module.exports = function (app) {

    app.use(express.json());

    app.use(express.urlencoded({
        extended: true
    }));

    app.use(express.json());
    app.use(bodyParser.json());

    app.use('/', routes);
}