




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

                    yardEditorTarget = null;
                    editor = null;
                    updatedFile = null;
                    taskIndex = null;
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
        <option>lesson_one<option>
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
    <button id="addLvlBtn" style="position:absolute; display:none;">Add Level</button>    
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
    if(target === "custom_level"){document.getElementById("addLvlBtn").style.display = "block";}

    

    document.getElementById("wholeTarget").value = JSON.stringify(editor);
    document.getElementById("addLvlBtn").addEventListener("click", function(){
        let levelCreator = document.createElement("div");
        levelCreator.innerHTML = `
            <div id="lvlCreatorUi">
                <h3>Level-Creator<h3>
                <div style="
                width: 150%;
                position: relative;
                align-items: center;
                top: 45px;
                display: flex;
                flex-direction: column;">
                    <input id="lvlQuest" type="text" placeholder="Question">
                    <input id="lvlAnswer" type="text" placeholder="Correct Answer">
                    <input id="lvlXp" type="number" placeholder="XP for correct answer"><br>
                    <button id="createLvl">CREATE</button>
                </div>
            </diV>

        `;

        phone.append(levelCreator);
        let newLvlQuest = document.getElementById("lvlQuest");
        let newLvlAnswer = document.getElementById("lvlAnswer");
        let newLvlXp = document.getElementById("lvlXp");
        newLvlQuest.focus();
        newLvlQuest.addEventListener("keydown", function(event){
            if(event.key === "Enter"){
                newLvlAnswer.focus();
            }
        });
        newLvlAnswer.addEventListener("keydown", function(event){
            if(event.key === "Enter"){
                newLvlXp.focus();
            }
        });
        document.getElementById("createLvl").addEventListener("click", function(){
            console.log( newLvlAnswer, newLvlQuest, newLvlXp)
            groundZeroData[1].data[0].data.push(
                {
                    question: newLvlQuest.value,
                    answer: newLvlAnswer.value,
                    xp: newLvlXp.value
                },
            );
            uploadData();
        })
    })
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

    <div class="notes" id="noteList" style="margin-top:-3px;"></div>

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

    let getNotes = groundZeroData[2].data[0].data;
    let addNote = document.getElementById("addNoteBtn");
    let noteInterface = phone;
    let noteCounter = document.getElementById("noteCounterOut");
    let notesOverview = document.getElementById("noteList");
    noteCounter.innerText = groundZeroData[2].data[0].data.length;
    addNote.addEventListener("click", function(){
        noteInterface = document.createElement("div");
        noteInterface.innerHTML = `
            <div style="
                position: absolute;
                background-color: darkgrey;
                height: auto;
                left: 50%;
                top: 50%;
                transform: translateX(-50%);
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
                                title: inputTitle.value,
                                desc: inputDesc.value,
                                date: new Date(),
                                noteValue: new Date() 
                            },
                        );
                        uploadData();
                        phone.removeChild(noteInterface);
                        loadNotes();
                    }
                })
            }
        });
    });

    for(let i = 0; i < getNotes.length; i++){
        
        let noteElement = document.createElement("div");

        noteElement.className = "noteElement";
        noteElement.innerHTML = `
            <h4>${getNotes[i].title}</h4>
            <p>${getNotes[i].desc}</p>
        `;
        notesOverview.appendChild(noteElement);
        noteElement.addEventListener("click" , function(){
            phone.innerHTML = `
                <div id="devPhoneTopbar">
                    <p><span id="clock">CLOCK</span></p>
                </div>
                <p id="noteHeader">${getNotes[i].title}</p>
                <textarea id="noteValue" style="width:100%; height:85%; border:none; outline:none; cursor:text;"></textarea>
                <button id="saveNote">SAVE</button>
                <button id="deleteNote">DELETE</button>
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

            let noteContent = document.getElementById("noteValue");
            noteContent.focus();
            noteContent.value = getNotes[i].noteValue;
            document.getElementById("saveNote").addEventListener("click", function(){
                getNotes[i].noteValue = noteContent.value;
                groundZeroData[2].data[0].data = getNotes;
                uploadData();
            });
            document.getElementById("deleteNote").addEventListener("click", function(){
                getNotes.splice([i],[i]);
                groundZeroData[2].data[0].data = getNotes;
                uploadData();
                loadNotes();
            })

        })

    }
    


}

// DEV PHONE END
//
//______________
