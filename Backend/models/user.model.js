const mongoose=require("mongoose")
const userSchema=mongoose.Schema({
    email:String, 
    fullName:String,
    password:String,
    verified:false
})

const Usermodel=mongoose.model("signup",userSchema);
module.exports={Usermodel}
