require('dotenv').config()
import express, { NextFunction, Request, Response } from 'express';
import { createServer } from 'http';
import { json } from 'body-parser';

const hostname = 'localhost';
const port = 5000;

const app = express();
app.use(express.json());
app.use(json());
const requestLogger = (req: Request, _res: Response, next: NextFunction): void => {
    console.log('Method:', req.method);
    console.log('Path:  ', req.path);
    console.log('Body:  ', req.body);
    console.log('---');
    next();
}
app.use(requestLogger);

app.use((_req, res, _next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>Hello world!</h1></body></html>');
});

const errorHandler = (error: Error, _req: Request, _res: any, next: NextFunction) => {
    console.error(error.message);
    next(error);
}

app.use(errorHandler);

const unknownEndpoint = (_req: Request, res: Response) => {
    res.status(404).send({ error: 'unknown endpoint' });
}

app.use(unknownEndpoint);

const server = createServer(app);

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});