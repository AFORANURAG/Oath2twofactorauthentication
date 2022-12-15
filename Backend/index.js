// hello devlopers---------
const express=require("express")
const { connection } = require("./config/db")
const {userRouter}=require("./routes/user.route")
const app=express()

app.use(express.json())
app.use("/user",userRouter)


app.get("/",(req,res)=>{
    res.send("welcome to my backend applicaiton")
})

app.listen(8000,async()=>{
    try {

       await  connection
        console.log("connected to db successfully")      
    } catch (error) {
        console.log(error)
    }
  
console.log("listening on port 8000")
})





