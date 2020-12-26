const express = require('express'),
    http = require('http');
const bodyParser = require('body-parser');

const hostname = 'localhost';
const port = 5000;

const app = express();
app.use(bodyParser.json());
app.use((req, res, next) => {
    console.log(req.headers);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>Hello world!</h1></body></html>');
});

const server = http.createServer(app);

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});