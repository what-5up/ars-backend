const jwt = require('jsonwebtoken');
const { errorMessage } = require('../utils/message-template');

//authentication

const authenticate = (req,res,next)=>{
    const authHeader = req.get('Authorization');      //token set to auth header by client
    if (!authHeader){
        return errorMessage(res,"Not authenticated.",401);
    }
    const token = authHeader.split(' ')[1]; //'Bearer token'-->['Bearer','token']-->'token'
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, 'somesupersecret');  //ENV
    }
    catch (err) {
        errorMessage(res,"Internal Server Error",500);
    }
    if (!decodedToken){
        return errorMessage(res,"Not authenticated.",401);
    }
    req.userID = decodedToken.userID;
    req.accType = decodedToken.accType;
    next();
};

module.exports = authenticate;