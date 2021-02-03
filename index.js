const express = require('express');
const app = express();
const http = require('http');
const bodyParser = require('body-parser');
const logger = require('./utils/logger');
const middleware = require('./middlwares/middlewares');

const hostname = 'localhost';
const port = 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers','Content-Type, Authorization');
    next();
});

app.use(middleware.requestLogger);
require('./startup/routes')(app);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);



const server = http.createServer(app);

server.listen(port, hostname, () => {
    logger.info(`Server running at http://${hostname}:${port}/`);
});