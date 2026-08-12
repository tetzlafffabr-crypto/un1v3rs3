




// DEV PHONE
//

let devMode = null;
let phoneActive = false;
let phoneShell = document.getElementById("devPhoneShell");
let phoneFrame = document.getElementById("devPhoneFrame");
let phone = document.getElementById("devPhone");

let yardEditorTarget = null;
let editor = null;
let updatedFile = null;
let taskIndex = null;
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
function homeButton(){
    phone.innerHTML = `<div id="devPhone">
                        <div id="devPhoneTopbar">
                            <p><span id="clock">CLOCK</span></p>
                        </div>
                        <div id="trainyardEditor" class="phoneApp">
                            <img src="C:/Users/extra/Desktop/Programming/Images/drive-download-20260712T180211Z-2-001/15.gif">
                            <button onclick="yardEditor()">Trainyard Editor</button>
                        </div>
                        <div id="trainyardEditor" class="phoneApp">
                            <img src="C:/Users/extra/Desktop/Programming/Images/drive-download-20260712T180211Z-2-001/24.gif">
                            <button onclick="loadNotes()">NotesValpha</button>
                        </div>
                        <button onclick="homeButton()" style="
                            color: white;
    background: black;
    border-radius: 50%;
    width: 5vw;
    position: absolute;
    bottom: -38px;
    right: 42%;
    height: 10vh;
                        ">HOME</button>
                    </div>`;
} // needs attention


//
//APPS
//

function yardEditor(){
    phone.innerHTML = `
    <div id="devPhoneTopbar">
         <p><span id="clock">CLOCK</span></p>
    </div>
    <p>Choose a file to edit</p>
    <select id="targetId">
        <option>custom_level</option>
    </select>
    <button onclick="loadEditor()">LOAD EDITOR</button>
    <button onclick="homeButton()" style="
        color: white;
        background: black;
        border-radius: 50%;
        width: 5vw;
        position: absolute;
        bottom: -38px;
        right: 42%;
        height: 10vh;
    ">HOME</button>
    `;
}
function loadEditor(){
    yardEditorTarget = document.getElementById("targetId").value;
    runEditor(yardEditorTarget);
}
function runEditor(target){
    for(let i = 0; i < groundZeroData[1].data[0].data.length; i++){
        if(target === groundZeroData[1].data[0].data[i].path){
            editor = groundZeroData[1].data[0].data[i];
            taskIndex = i;
        }
    }

    phone.innerHTML = `
    <div id="devPhoneTopbar">
         <p><span id="clock">CLOCK</span></p>
    </div>
    
    <button onclick="uploadNewFile()" style="
        bottom: 115px;
        width: 100%;
        position: absolute;
    ">UPDATE FILE VIA TEXT AREA</button>
    <textarea id="wholeTarget" style="
        position: absolute;
        bottom: 0px;
        width: 98.25%;
        height: 25%;
    "></textarea>
    <button onclick="homeButton()" style="
                            color: white;
    background: black;
    border-radius: 50%;
    width: 5vw;
    position: absolute;
    bottom: -38px;
    right: 42%;
    height: 10vh;
                        ">HOME</button>
    `;

    document.getElementById("wholeTarget").value = JSON.stringify(editor);
}
function uploadNewFile(){
    editor = JSON.parse(
        document.getElementById("wholeTarget").value
    );

    groundZeroData[1].data[0].data[taskIndex] = editor;

    localStorage.setItem(
        "groundZeroDataFile",
        JSON.stringify(groundZeroData)
    );
}



function loadNotes(){
    phone.innerHTML = `
    <div id="devPhoneTopbar">
         <p><span id="clock">CLOCK</span></p>
    </div>

    <div id="notesTopbar">
    <p style="
        margin: 0;
        height: 100%;
        position: absolute;
        font-size: 25px;
    ">NOTES: <span id="noteCounterOut">0</span></p>
    <button id="addNoteBtn">+</button>
    </div>

    <div class="notes"></div>

    <button onclick="homeButton()" style="
        color: white;
        background: black;
        border-radius: 50%;
        width: 5vw;
        position: absolute;
        bottom: -38px;
        right: 42%;
        height: 10vh;
    ">HOME</button>
    `;

    let addNote = document.getElementById("addNoteBtn");
    let noteInterface = phone;
    addNote.addEventListener("click", function(){
        noteInterface = document.createElement("div");
        noteInterface.innerHTML = `
            <div style="
                position: relative;
                background-color: darkgrey;
                height: auto;
                width: 100%;
                border-bottom: 1px solid grey;
                gap:10px;
            ">
                <input id="noteTitleIn" placeholder="Title" type="Text" style="background:none; outline:none; border:none;">
                <input id="noteDescIn" placeholder="Description" type="text"  style="background:none; outline:none; border:none;">
            </div>
        `;
        phone.appendChild(noteInterface);
        let inputTitle = document.getElementById("noteTitleIn");
        let inputDesc = document.getElementById("noteDescIn");
        inputTitle.focus();
        inputTitle.addEventListener("keydown", function(event){
            if(event.key === "Enter"){
                if(inputTitle.value === ""){alert("Don't leave this empty"); return;}
                inputDesc.focus();
                inputDesc.addEventListener("keydown", function(event){
                    if(event.key === "Enter"){
                        if(inputDesc.value === ""){alert("Don't leave this empty"); return;}
                        groundZeroData[2].data[0].data.push(
                            {
                                title: inputTitle,
                                desc: inputDesc,
                                date: new Date(),
                                noteValue: null 
                            },
                        );
                        uploadData();
                    }
                })
            }
        });
    });

}

// DEV PHONE END
//
//______________
