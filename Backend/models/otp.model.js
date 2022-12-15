const mongoose=require("mongoose")
const Schema=mongoose.Schema;

const userOTPVerificationSchema= new Schema({
email:String, 
otp:String
})
const UserOTPVerification=mongoose.model("userotpverification",userOTPVerificationSchema);

module.exports={UserOTPVerification}

