const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    id: mongoose.ObjectId,
    name:{
        type:String,
        required:true
    },
    password:{
        type: String,
        required: true,
    },
    confirmpassword:{
        type: String,
        required: true,
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    whatsapp:{
        type:Number,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    marriage:{
        type:String,
        required:true
    },
})
module.exports =mongoose.model('User',userSchema)