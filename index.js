const express = require('express');
const app = express();
const http = require('http');
const bodyParser = require('body-parser');
const logger = require('./utils/logger')
const middleware = require('./middlwares/middlewares');

const hostname = 'localhost';
const port = 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(middleware.requestLogger);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

require('./startup/routes')(app);

const server = http.createServer(app);

server.listen(port, hostname, () => {
    logger.info(`Server running at http://${hostname}:${port}/`);
});