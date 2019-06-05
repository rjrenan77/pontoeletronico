const electron = require("electron");

const app = electron.app;

const BrowserWindow = electron.BrowserWindow;

let mainWindow;

app.on("ready", ()=>{
    mainWindow = new BrowserWindow({width: 800, heigth: 600, autoHideMenuBar: true});

    mainWindow.loadURL("file://" +__dirname + "/login.html");

    mainWindow.on("closed", ()=>{
        mainWindow = null;


    });

    // fechar programa depois de um tempo para que nao de memory leak
    setTimeout(()=>{
        mainWindow.close();
    }, 50000);
})