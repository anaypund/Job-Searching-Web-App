const jwt = require("jsonwebtoken");
const Register= require('../models/registration');

const auth = async (req, res, next) => {
    try {
        
        const token = req.cookies.SiCON_auth;
        const verifyUser = jwt.verify(token, process.env.SECRET_KEY)

        const user = await Register.findOne({_id : verifyUser._id})
        req.token = token;
        req.user=user
        next();
    } catch (error) {
        res.status(401).send("<h1>Session Expired!</h1><br> please log in again to continue")
    }
}

module.exports = auth;
