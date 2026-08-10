




// DEV PHONE
//

let phoneActive = false;
let phoneShell = document.getElementById("devPhoneShell");
let phoneFrame = document.getElementById("devPhoneFrame");
let phone = document.getElementById("devPhone");
console.log(phoneActive , phoneShell , phoneFrame , phone);
//
// ONCLICK
//
document.getElementById("devPhoneFrame").addEventListener("click" , function(){
    console.log("clicked")
    phoneShell.classList.add("phoneUpRun");
})
console.log("added event")