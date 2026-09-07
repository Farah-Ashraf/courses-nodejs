//handle the exceptions that will result from the function inside the wrappre 

module.exports = ( asyncFn ) => {
    return (req, res, next) => {
        asyncFn(req, res, next).catch( (err) => {
            next(err)
        } );
    }
}