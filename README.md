<!doctype html>

<!--created on 01/07/2026 - latest upd: " -->

<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="style.css">
        <title>UN1V3RS4L</title>
    </head>
    <body>
        <div class="output">
            <p id="outputP">Output:> <span id="output"></span></p>
            <button onclick="output()">OUTPUT</button>S
        </div>
        <a href="index.html"><h1 class="logo">UN1V3RS4L</h1></a>
        <div id="topbarId" class="topbar">
            <p>VERSION: <span id="version"></span></p>
            <p>LATEST UPDATE: <span id="latestDate"></span></p>
            <p>USER: <span id="user"></span></p>
            <div id="clock"></div>
            <a href="login.html"><button id="logOutBtn">Log-Out</button></a>
        </div>
        <div id="selectionId" class="selection">
            <div class="selectionButtons">
                <a href="logs.html"><button id="selectionBtn1">CHANGELOGS</button></a>
                <button>INDEX</button>
                <button>INDEX</button>
                <button>INDEX</button>
                <button>INDEX</button>
                <button>INDEX</button>
                <button>INDEX</button>
                <button>INDEX</button>
                <button>INDEX</button>
                <button>INDEX</button>
            </div>
        </div>
        <div id="appInfo" class="appInfo">
            <h1 id="appInfoHeadline">CHANGELOG MAKER</h1>
            <input id="versionInput" placeholder="VERSION">
            <input id="noteInput" type="text" placeholder="PLACE A NOTE">
            <input id="date" placeholder="DATE" type="datetime-local">
            <button onclick="createLog()" id="confirm">CONFIRM</button>
        </div>     
        <script src="local-storage.js"></script>
        <script src="script.js">
        </script>
    </body>
</html>