const mongoose = require('mongoose');

//define schema
const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
})


//model 
module.exports = mongoose.model('Course', courseSchema);