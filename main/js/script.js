




// DEV PHONE
//

let devMode = null;
let phoneActive = false;
let phoneShell = document.getElementById("devPhoneShell");
let phoneFrame = document.getElementById("devPhoneFrame");
let phone = document.getElementById("devPhone");
console.log(phoneActive , phoneShell , phoneFrame , phone);
//
// ONCLICK
//
listen();
function listen(){
phoneFrame.addEventListener("click" , function(){
    if(!phoneActive){
        phoneOn();
    }else{
        phoneOff();
    }
});
phone.addEventListener("click", function(event){
    event.stopPropagation();
})
console.log("added event")
}
function phoneOn(){
    phoneActive = true;
    phoneShell.classList.remove("phoneDown");
    phoneShell.classList.remove("phoneDownRun");
    phoneShell.classList.add("phoneUpRun");
    phoneShell.classList.add("phoneUp");
}
function phoneOff(){
    phoneActive = false;
    phoneShell.classList.remove("phoneUp");
    phoneShell.classList.remove("phoneUpRun");
    phoneShell.classList.add("phoneDownRun");
    phoneShell.classList.add("phoneDown");
}
// DEV PHONE END
//
//______________
