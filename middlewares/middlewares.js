const logger = require('../utils/logger');

const { errorMessage } = require('../utils/message-template')

const requestLogger = (request, response, next) => {
    logger.info('Method:', request.method);
    logger.info('Path:  ', request.path);
    logger.info('Body:  ', request.body);
    logger.info('Query: ', request.query);
    logger.info('---');
    next();
}

const unknownEndpoint = (request, response) => {
    return errorMessage(response, "Unknown endpoint", 404);
}

const errorHandler = (error, request, response, next) => {
    logger.error(error.message);

    if (error.name === 'CastError') {
        return response.status(400).send({ error: error.message });
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message });
    }
    return errorMesage(response, "Something went wrong", 500);
}

module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler
}