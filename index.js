require('dotenv').config()
const express = require('express'),
    http = require('http');
const bodyParser = require('body-parser');
const logger = require('./utils/logger')
const middleware = require('./middlwares/middlewares');

const hostname = 'localhost';
const port = 5000;

const app = express();
app.use(bodyParser.json());
app.use(middleware.requestLogger);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

require('./startup/routes')(app);

const server = http.createServer(app);

server.listen(port, hostname, () => {
    logger.info(`Server running at http://${hostname}:${port}/`);
});