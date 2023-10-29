const mongoose = require('mongoose')

const companySchema = new mongoose.Schema({
    companyName:{
        type: String,
        required: true
    },
    mail:{
        type: String,
        required: true
    },
    jobTitle:{
        type: String,
        required: true
    },
    skillsReq:[{
        type: String,
        required: true}
    ],
    jobDesc:{
        type: String,
        required: true
    },
    duration:{
        type: String,
        required: true
    },
    stipend:{
        type: String,
        required: true
    },
    location:{
        type: String,
        required: true
    },
})

module.exports = mongoose.model('company', companySchema)