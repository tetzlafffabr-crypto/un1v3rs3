console.log(`ID0=root getting_user_data>`);

let groundZeroData = JSON.parse(localStorage.getItem("groundZeroDataFile"));
console.log(`ID0=root> ?found_data_${JSON.stringify(groundZeroData)}`);


if(!groundZeroData){

    console.log(`ID1=root> creating_file`);
    //
    // CREATE FILE
    //
    groundZeroData = [
        {
            path: "userData",
            data: []

        },
        {
            path: "storage",
            data: [
                {
                    path: "trainyard",
                    data: [
                        {
                            path: "customLvl",
                            data:[
                                {
                                    question: "exampleQuest",
                                    answer: "exampleAnswer",
                                    xp: 1
                                },
                            ]
                        }
                    ]
                },
            ]
        },
    ]
    console.log(`ID1=root> uploading_file`);
    localStorage.setItem("groundZeroDataFile" , JSON.stringify(groundZeroData));
    console.log(`ID1=root> uploaded_file`);
    console.log(`ID1=root> first_launch_successfully`);
}

// FIRST LAUNCH DONE
//
//___________________


// USER LOGIN CHAPTER

document.getElementById("usernameInput").addEventListener("keydown" , function(event) {
    if(event.key === "Enter"){
        document.getElementById("passwordInput").focus();
    }
});
document.getElementById("passwordInput").addEventListener("keydown", function(event){
    if(event.key === "Enter"){
        submitUserData('login');
    }
});

function submitUserData(type){
    let inputA = document.getElementById("usernameInput").value;
    let inputB = document.getElementById("passwordInput").value;

    console.log(`ID2=root> checking_input`);
    if(inputA === "" || inputB === ""){
        console.log(`ID2=root> input_is_empty`);
        alert("Don't leave it empty!");
    }

    if(type === "login"){
        login();
    }else if(type === "register"){
        register();
    }

    return;

    
    //REDIRECT

    

    function register(){
        let findUser = JSON.parse(localStorage.getItem("groundZeroDataFile"));
        findUser = findUser[0].data;
        for(let i = 0; i < findUser.length; i++){
            if(inputA === findUser[i].username){
                alert("User already exist!");
                return;
            }
        }

        groundZeroData[0].data.push(
            {
                username: inputA,
                password: inputB,
                userId: groundZeroData[0].data.length,
                credits: 0,
                trueScore: 0,
                falseScore: 0,
                highscore: 0,
                joinDate: new Date(),
                otherData: []
            },
        );
        
        console.log(`ID4=root> account_created:${inputA}`);
        uploadData();
    }

    function login(){
        let findUser = JSON.parse(localStorage.getItem("groundZeroDataFile"));
        findUser = findUser[0].data;
        for(let i = 0; i < findUser.length; i++){
            if(inputA === findUser[i].username && inputB === findUser[i].password){
                console.log(`ID5=root> logged_in:${inputA}`);
                sessionStorage.setItem("activeUser" , inputA);
                getActiveUserProfile(inputA);
                window.location.href = "index.html";
                return;
            }
        }   
        alert("denied");
    }


}

// USER LOGIN CHAPTER DONE
//
//________________________


// OTHER
let activeUser = null;
function getActiveUserProfile(user){
    let dataFile = JSON.parse(localStorage.getItem("groundZeroDataFile"));
    dataFile = dataFile[0].data;
    console.log(`ID6-root> searching_user`);
    for(let i = 0; i < dataFile.length; i++){
        if(user === dataFile[i].username){
    console.log(`ID6-root> found_user`);
            activeUser = dataFile[i];
            sessionStorage.setItem("activeUser" , JSON.stringify(activeUser));
        }
    }
    
}

function uploadData(){
    localStorage.setItem("groundZeroDataFile" , JSON.stringify(groundZeroData));
    console.log(`ID3=root> uploaded_data_files`);
}
