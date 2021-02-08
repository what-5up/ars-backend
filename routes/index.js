const routes = require('express').Router();

routes.use('/aircrafts', require('./aircrafts'));
routes.use('/employees', require('./employees'));
routes.use('/reports', require('./reports'));
routes.use('/routes', require('./routes'));
routes.use('/scheduled-flights', require('./scheduled-flights'));
routes.use('/session', require('./session'));
routes.use('/tickets', require('./tickets'));
routes.use('/users', require('./users'));
routes.use('/passenger',require('./passenger'));

routes.use('/', (req, res) => {
    res.status(200).send('home page');
});

module.exports = routes;