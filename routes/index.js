const routes = require('express').Router();

routes.use('/aircrafts', require('./aircrafts'));
routes.use('/employees', require('./employees'));
routes.use('/reports', require('./reports'));
routes.use('/routes', require('./routes'));
routes.use('/scheduled-flights', require('./scheduled-flights'));
routes.use('/session', require('./session'));
routes.use('/tickets', require('./tickets'));
routes.use('/users', require('./users'));
routes.use('/passengers', require('./passengers'));
routes.use('/guests', require('./guests'));
routes.use('/titles', require('./titles'));
routes.use('/traveler-classes', require('./traveler-classes'));
routes.use('/aircraft-models', require('./aircraft-model'));
routes.use('/account-types', require('./account-types'));

module.exports = routes;