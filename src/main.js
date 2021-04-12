const { 
  app,
  BrowserWindow,
  ipcMain, 
  Notification,
  Tray,
} = require('electron');
const path = require('path');
const isDev = !app.isPackaged;

const storage = require('electron-json-storage');

const dockIcon = path.join(__dirname, 'icons', 'gorillaFile.jpeg');
const trayIcon = path.join(__dirname, 'icons', 'gorillaFile.jpeg');

function createWindow() {
  win = new BrowserWindow({
    width: 550,
    height: 1900,
    backgroundColor: "black",
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false,
      // preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile('./public/index.html')
  // isDev && win.webContents.openDevTools();
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

let tray = null;
app.whenReady().then(() => {
  createWindow()
  getUserStorage()
  const notification = new Notification({ silent: true, title: 'hello user', body: 'welcome to Shrewdness'})
  notification.show()
  tray = new Tray(trayIcon)
  // tray.setContextMeny(menu)
});

ipcMain.on('notify', (_, msg) => 
  new Notification({sound: 'Purr', title: 'chat message', body: 'new message in chat'}).show()
)

ipcMain.on('FETCH_USER_LOCAL_STORAGE', () => {
  storage.get('user-storage', (err, user) => {
    if (err) return null;
    win.send('HANDLE_FETCH_USER_LOCAL_STORAGE', {
      user
    })
  })
  storage.get('user-theme', (err, theme) => {
    if (err) return null;
    win.send('HANDLE_FETCH_USER_THEME', {
      theme
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

ipcMain.on('SAVE_USER_THEME', (_, theme) => {
  setUserTheme(theme)
})

const setUserTheme = (theme) => {
  storage.set('user-theme', {
    theme,
  })
}


ipcMain.on('app-quit', () => {
  app.quit();
})

if (process.platform === 'darwin') {
  app.dock.setIcon(dockIcon)
}


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