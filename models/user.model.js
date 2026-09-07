const mongoose = require('mongoose');
const validator = require('validator');

//define schema
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "email is required"], //for custom error message
        unique: true, //it is helper not a validator, It tells MongoDB to create a unique index, so duplicate emails aren't allowed at the database level.
        validate: [ validator.isEmail, 'must be a valid email' ]
    },
    password: {
        type: String,
        required: true,
        minlength: 8

    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },



})

//model 
module.exports = mongoose.model('User', userSchema);