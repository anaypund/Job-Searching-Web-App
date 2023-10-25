const mongoose = require('mongoose');

const eduSchema = new mongoose.Schema({
    id: mongoose.ObjectId,
    email:{
        type: String,
        required: true,
    },
    level:{
        type: String,
        required: true,
    },
    city:{
        type: String,
        required: true,
    },
    state:{
        type: String,
        required: true,
    },
    country:{
        type: String,
        required: true,
    },
    school:{
        type: String,
        required: true,
    },
    grading:{
        type: String,
        required: true,
    },
    university:{
        type: String,
        required: true,
    },
    course:{
        type: String,
        required: true,
    },
    field:{
        type: String,
        required: true,
    },
    marks:{
        type: String,
        required: true,
    },
    language:{
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

module.exports = mongoose.model('Education',eduSchema);