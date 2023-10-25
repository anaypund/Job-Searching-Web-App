const mongoose = require('mongoose');

const workSchema = new mongoose.Schema({
    id: mongoose.ObjectId,
    email:{
        type: String,
        required: true,
    },
    jobRole:{
        type: String,
        required: true,
    },
    company:{
        type: String,
        required: true,
    },
    jobDescription:{
        type: String,
        required: true,
    },
    startDate:{
        type: String,
        required: true,
    },
    endDate:{
        type: String,
        required: true,
    },
})

module.exports = mongoose.model('WorkExperiences',workSchema)