class AppError extends Error {
    constructor(){
        super();
    }

    create(message, statusCode, statusText){
        this.message = message;
        this.statusCode = statusCode;
        this.statusText = statusText;

        return this; //return all the values inside this class
    }
}

module.exports = new AppError(); //to get instance from this class    