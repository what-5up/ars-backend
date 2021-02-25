const { successMessage, errorMessage } = require('../utils/message-template');


//authorization

function isAuthorized(accTypes=[]){    //all possible accTypes=['guest','normal user','frequent user','gold user','c','m','s','a']
    return function(req, res, next) {
        if (!accTypes.includes(req.accType)){
            return errorMessage(res,"Not authorized.",401);
        }
        else {
            next();
        }

    }
}

module.exports = isAuthorized;