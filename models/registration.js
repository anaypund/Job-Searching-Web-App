const mongoose = require('mongoose');
const bcrypt=require('bcryptjs');
const jwt = require('jsonwebtoken');


const registrationSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique:true,
    },
    Mobile_Number: {
        type: Number,
        required: true,
    },
    gender:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    confirmpassword:{
        type: String,
        required: true,
    },
    tokens:[{
        token:{
            type: String,
            required: true,
        }
    }]
})

// registrationSchema.methods.generateAuthToken = async function(){
//     try {
//         const token = jwt.sign({_id:this._id}, process.env.SECRET_KEY);
//         this.tokens = this.tokens.concat({token:token});
//         await this.save();
//         return token;    
//     } catch (error) {
//         // res.send(`Internal server error: ${error.message}`);
//         console.log(error);
//     }
// }

// registrationSchema.pre("save",async function (next){
//     if(this.isModified("password"))
//     {
//         this.password= await bcrypt.hash(this.password,10);
//         this.confirmpassword=await bcrypt.hash(this.confirmpassword,10)
//     }

// })

module.exports = mongoose.model('registration', registrationSchema)