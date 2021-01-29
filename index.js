const express = require('express');
const app = express();
const http = require('http');
const bodyParser = require('body-parser');

const hostname = 'localhost';
const port = 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require('./startup/routes')(app);

const server = http.createServer(app);

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});