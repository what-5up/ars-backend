const { errorMessage } = require('../utils/message-template');


const authorizeCreater = (req, res, next) => {
    if (req.userID !== req.params.userid) 
        return errorMessage(res, 'You can only access resources that you have created', 401);
    
    next();
} 

module.exports = authorizeCreater;