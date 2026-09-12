const appError = require('../utils/appError');
const httpStatusText = require('../utils/httpStatusText');


module.exports = (...roles) => { //spread operator changes the parameters to array

    return (req, res, next) => {
        if( !roles.includes( req.user.userRole ) ){
            const error = appError.create("not authorized", 403, httpStatusText.FAIL);
            return next(error);
        }

        next(); 

    }
}