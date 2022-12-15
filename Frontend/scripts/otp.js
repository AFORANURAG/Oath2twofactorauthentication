let email = JSON.parse(localStorage.getItem("email"));
function clickEvent(first, last) {
  if (first.value.length) {
//    if(last==null){
//     return
//    } 
    document.getElementById(last)?.focus();
  
}
}
document.getElementById("button").addEventListener("click",async()=>{
let digit1=document.getElementById("ist").value
let digit2=document.getElementById("sec").value
let digit3=document.getElementById("third").value
let digit4=document.getElementById("fourth").value
let otp=digit1+digit2+digit3+digit4;
let obj={
    otp,email
}
try {
    let res=await fetch("http://localhost:8000/user/otp",{
        method:"POST",
        body:JSON.stringify(obj),
        headers:{
        "Content-Type":"application/json"
        }
        })    
    let data=await res.json();
    console.log(data)    
    alert("otp is verified ,thank for registering")
    window.location.href="landingpage.html"
} catch (error) {
    console.log(error)
    alert("wrong OTP ,Please fill correct OTP")

}
})