const jwt = require('jsonwebtoken');

//authentication

const isAuth = (req,res,next)=>{
    const authHeader = req.get('Authorization');      //token set to auth header by client
    if (!authHeader){
        return res.status(401).json({message: 'Not authenticated.'})
    }
    const token = authHeader.split(' ')[1]; //'Bearer token'-->['Bearer','token']-->'token'
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, 'somesupersecret');  //ENV
    }
    catch (err) {
        res.status(500).json({message:"Internal Server Error"});
    }
    if (!decodedToken){
        return res.status(401).json({message: 'Not authenticated.'})
    }
    req.userId = decodedToken.userId;
    req.accType = decodedToken.accType;
    next();
};

//authorization

const requiresAdmin = (req,res,next) =>{
    if(req.accType !== 'a') {
        return res.status(401).json({message: 'Not authorized.'})
    }
    else {
        next();
    }
};


module.exports = {
    isAuth,
    requiresAdmin
};