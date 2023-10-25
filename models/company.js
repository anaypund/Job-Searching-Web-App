const mongoose = require('mongoose')

const companySchema = new mongoose.Schema({
    comapnyName:{
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
        type: Array,
        required: true}
    ],
    jobDesc:{
        type: String,
        required: true
    },
})

module.exports = mongoose.model('company', companySchema)