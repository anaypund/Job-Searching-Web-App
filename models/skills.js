const mongoose = require('mongoose');

const skillsSchema = new mongoose.Schema({
    id: mongoose.ObjectId,
    email:{
        type: String,
        required: true,
    },
    skillName:{
        type: String,
        required: true,
    },
    learnFrom:{
        type: String,
        required: true,
    },
    skillDesc:{
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

module.exports = mongoose.model('Skills',skillsSchema)