const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const sessionModel = require("../models/session-model");

const login = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    let loadedUser;
    try {
        const result = await sessionModel.findUserByEmail(email);
        if (result.length === 0) {
            return res.status(401).json({message: 'A user with this email could not be found.'})
        }
        loadedUser = result[0];
        const isEqual = await bcrypt.compare(password,result[0].password);
        if (!isEqual){
            return res.status(401).json({message: 'Wrong password.'})
        }
        const token = jwt.sign({
                email: loadedUser.email,
                userId: loadedUser.id.toString(),
                accType: loadedUser.acc_type
            },
            'somesupersecret',                 //put in ENV
            {expiresIn: '1h'}
        );
        res.status(200).json({token: token,userId: loadedUser.id.toString()});
    }
    catch (err) {
        res.status(500).json({message:"Internal Server Error"});
    }
};

module.exports = {
    login
};
