const jwt = require('jsonwebtoken');
const appError = require('../utils/appError');
const httpStatusText = require('../utils/httpStatusText');

const verifyToken = (req, res, next) => {

    const authHeader = req.headers.authorization;

    //check authheader found or not
    if (!authHeader) {
        const error = appError.create(
            "Authorization header is required",
            401,
            httpStatusText.FAIL
        );
        return next(error);
    }

    const token = authHeader.split(" ")[1];


    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        //store the payload in the req.user
        req.user = decoded;

        next();

    }catch(err){
        const error = appError.create(
            "Invalid or expired token",
            401,
            httpStatusText.FAIL
        );

        return next(error);
    }

}

module.exports = verifyToken;