const { 
  app,
  BrowserWindow,
  ipcMain, 
  Notification 
} = require('electron');
const path = require('path');
const isDev = !app.isPackaged;

const storage = require('electron-json-storage');

// let mainWindow = null;

function createWindow() {
  win = new BrowserWindow({
    width: 1200,
    height: 800,
    backgroundColor: "white",
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false,
      // preload: path.join(__dirname, 'preload.js')
    }
    
  })

  win.loadFile('./public/index.html')
  isDev && win.webContents.openDevTools();
}

if (isDev) {
  require('electron-reload')(__dirname, {
    electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
  })
}

const getUserStorage = () => {
  storage.get('user-storage', function(err, data) {
    if (err) return null;

    win.send('HANDLE_FETCH_USER_LOCAL_STORAGE', {
      success: true, 
      message: 'Fetch User Local Storage',
      data,
    })
  })
}

app.whenReady().then(createWindow).then(getUserStorage());

ipcMain.on('FETCH_USER_LOCAL_STORAGE', () => {
  storage.get('user-storage', (err, user) => {
    if (err) return null;
    win.send('HANDLE_FETCH_USER_LOCAL_STORAGE', {
      user
    })
  })
})

ipcMain.on('SAVE_USER_LOCAL_STORAGE', (_,user) => {
  setUserStorage(user)
})

const setUserStorage = (user) => {
  storage.set('user-storage', {
    user,
  })
}

ipcMain.on('notify', (_, message) => {
  new Notification({title: 'chatApp', body: message}).show();
})

ipcMain.on('app-quit', () => {
  app.quit();
})


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
})