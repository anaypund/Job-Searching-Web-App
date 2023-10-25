const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
    id: mongoose.ObjectId,
    email:{
        type: String,
        required: true,
    },
    testName:{
        type: String,
        required: true,
    },
    score:{
        type: Number,
        required: true,
    },
    date:{
        type: String,
        required: true,
    },
})

module.exports = mongoose.model('Test',testSchema)