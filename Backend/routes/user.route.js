const mongoose=require("mongoose")
const nodemailer=require("nodemailer")
const bcrypt=require("bcrypt")
const {Usermodel}=require("../models/user.model")
const {UserOTPVerification}=require("../models/otp.model")
const {validator,validatorLogin}=require("../middlewares/validator.middleware")
const express=require("express")
const userRouter=express.Router()
const cors=require("cors");
userRouter.use(cors({
  origin:"*"
}))
userRouter.use(express.json())


const otpgenerator=()=>{
  let otp=Math.floor(Math.random()*9000+1000)
  return otp
    }
//smtp.ethereal.email
// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing
// create reusable transporter object using the default SMTP transport




async function sendEmail(otp,email){
try {

const transport=nodemailer.createTransport({
service:"gmail",
auth:{
type:"OAuth2",
user:"",
accessToken:"",
clientId:clientid,
clientSecret:client_secret
}
})
const mailOptions={
from:"anuragupadhyay172912313@gmail.com",
to:email,
subject:"this is a test email",
html:`<h1>here is your otp ${otp}</h1>`,
body:"this is your otp for signing up"+`${otp}`
}


const result=await transport.sendMail(mailOptions)
return result;

} catch (error) {
return error
}
}


userRouter.get("/",(req,res)=>{
  res.send("hello")
})
// userRouter.use(validator)
userRouter.post("/signup",async (req,res)=>{
let {email,fullName,password}=req.body;
console.log(req.body)
let otp=otpgenerator()
    // let result=  await  Usermodel.findOne({email})
let hash=bcrypt.hashSync(password,5);
let otphash=bcrypt.hashSync(`${otp}`,2)
try {
    let query=new Usermodel({email,fullName,password:hash})    
    await query.save()
    let query2=new UserOTPVerification({otp:otphash,email})
    await query2.save()
   sendEmail(otp,email).then((result)=>{
        console.log("email is sent ",result)
        
        }).catch((error)=>{
            console.log(error)
        })


  res.json({"message":"done"})
} catch (error) {
    console.log(error)
    res.send("error")
}

// after pushing all the things to db , send the user to otp filling page 
// and once the user have signed in    

})

// now validation and checking will sttart

// otp generator

// const otpSender=async(otp,email)=>{
// // we will send and store the otp
// let otp=otpgenerator()
// ;
// }
//
userRouter.post("/otp",async(req,res)=>{
  
    let {email,otp}=req.body;
    let doc=await UserOTPVerification.find({email})
    console.log(doc)
    
    bcrypt.compare(otp,doc[0].otp,(err,result)=>{
    if(err) throw err
    console.log(result)
    if(result){
        res.send({"message":"otp verified"})
    }else{
        res.send({"message":"wrong otp"})
    }
    })

    })
 // backend is now completed   

module.exports={userRouter}

