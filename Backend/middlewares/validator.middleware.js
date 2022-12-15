// validation for name email and password 
const validator=(req,res,next)=>{
let {email,password,name}=req.body;
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
{

next()

}else{
res.send({"message":"please fill correct information"})

}

}
const validatorLogin=(req,res,next)=>{
    let {email,password,name}=req.body;
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
    {
    if(password.length>8&&password.includes("@")){
    next()
    
    }
    }else{
    res.send({"message":"please fill correct information"})
    
    }
    
    }
    module.exports={validator,validatorLogin}