const { errorMessage } = require('../utils/message-template');


const authorizeCreater = (id) => {
    return (req, res, next) => {
        if (req.userID !== req.params[id])
            return errorMessage(res, 'You can only access resources that you have created', 401);

        next();
    }
}

module.exports = authorizeCreater;