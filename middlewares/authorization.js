const { errorMessage } = require('../utils/message-template');
const { AccountTypesEnum } = require('../utils/constants');


//authorization

/**
 * Authorize given account types
 * 
 * @param {string[]} accTypes - all possible accTypes=['guest','normal user','frequent user','gold user','c','m','s','a']
 * 
 * @return {function} an authorization function to authorize the given account types
 */
function authorize(accTypes=[]){
    return function(req, res, next) {
        
        //authorize all users
        if (accTypes.includes(AccountTypesEnum.REGISTERED_USER))
            if(req.accType.includes(AccountTypesEnum.REGISTERED_USER))
                return next();

        //authorize employees and guests
        if (!accTypes.includes(req.accType))
            return errorMessage(res,"Not authorized.",401);

        next();
    }
}

module.exports = authorize;