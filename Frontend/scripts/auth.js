

document.querySelector("form").addEventListener("submit" ,(event)=>{
event.preventDefault()
authenticator()
})

//
const authenticator=()=>{

let email=document.getElementById("email").value;
let password=document.getElementById("password").value;
let p_array=password.split("")
console.log(p_array);
let specific_character=p_array.includes("@")||p_array.includes("$")||p_array.includes("#");
let flag1=false;
let flag2=false;
let string1="abcdefghijklmnopqrstuvwxyz";
let string2="ABCDEFGHIJKLMNOPQRSTUVWXYZ"
for(let i=0;i<string1.length;i++){
if(p_array.includes(string1[i])){
flag1=true
break
}
}

for(let i=0;i<string1.length;i++){
    if(p_array.includes(string2[i])){
    flag2=true
    break
    }
    }

if(flag1&&flag2&&specific_character){
    let fullName=document.getElementById("name").value;
    let obj={
        email,password,fullName
    }
    fetch("http://localhost:8000/user/signup",{
    method:"POST",
    body:JSON.stringify(obj),
    headers:{
    "Content-Type":"application/json"    
    }
    }).then((res)=>{
       let data= res.json()
       console.log(data)
       alert("An otp has been sent to your registered gmail id")
       localStorage.setItem("email",JSON.stringify(email))  
       window.location.href="otp.html"
    }).catch((err)=>{
        console.log(err)
    })
 

}else{
    document.getElementById("pwarn").style.display="block"
}

}
