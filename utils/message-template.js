/**
 * Output message template for a success message
 * 
 * @param {Response} response - http response object
 * @param {object} object - json object of the results
 * @param {string} message - message to display
 * @param {Number} status - status code of the response. default = 200
 */
const successMessage = (response, object, message = "", status = 200) => {
    output = { error : 0, object : object, message: message };
    return response.status(status).send(output);
}

/**
 * Output message tempalte for a error message
 * 
 * @param {Response} response - http response object
 * @param {string} message - error message
 * @param {Number} status - status code of the response. default = 400
 */
const errorMessage = (response, message, status = 400) => {
    output = { error: 1, object : null, message: message }
    return response.status(status).send(output);
}

module.exports = {
    successMessage,
    errorMessage
}
