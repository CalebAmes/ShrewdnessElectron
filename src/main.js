const { app, BrowserWindow, ipcMain, Notification, Tray } = require('electron');
const path = require('path');
const isDev = !app.isPackaged;

const storage = require('electron-json-storage');

const dockIcon = path.join(__dirname, 'assets', 'icons', 'shrewdnessDock.png');

function createSplashScreen() {
	const window = new BrowserWindow({
		width: 500,
		height: 300,
		backgroundColor: '#4DCCBD',
		frame: false,
		transparent: true,
		webPreferences: {
			nodeIntegration: true,
			enableRemoteModule: true,
			contextIsolation: false,
		},
	});
	window.loadFile('./public/splash.html');
}

function createWindow() {
	win = new BrowserWindow({
		minWidth: 530,
		width: 530,
		height: 1900,
		backgroundColor: '#beee62',
		show: true,
		webPreferences: {
			nodeIntegration: true,
			enableRemoteModule: true,
			contextIsolation: false,
		},
	});

	win.loadFile('./public/index.html');
	isDev && win.webContents.openDevTools();
}

if (isDev) {
	require('electron-reload')(__dirname, {
		electron: path.join(__dirname, '../', 'node_modules', '.bin', 'electron'),
	});
}

const getUserStorage = () => {
	storage.get('user-storage', function (err, data) {
		if (err) return null;

		win.send('HANDLE_FETCH_USER_LOCAL_STORAGE', {
			success: true,
			message: 'Fetch User Local Storage',
			data,
		});
	});
};

app.whenReady().then(() => {
	const notification = new Notification({ silent: true, title: 'hello user', body: 'welcome to Shrewdness' });
	notification.show();

	const mainApp = createWindow();
});

ipcMain.on('notify', (_, msg) =>
	new Notification({ sound: 'Purr', title: 'Shrewdness', body: 'new message in chat' }).show()
);

ipcMain.on('FETCH_USER_LOCAL_STORAGE', () => {
	storage.get('user-storage', (err, user) => {
		if (err) return null;
		win.send('HANDLE_FETCH_USER_LOCAL_STORAGE', {
			user,
		});
	});
	storage.get('user-theme', (err, theme) => {
		if (err) return null;
		win.send('HANDLE_FETCH_USER_THEME', {
			theme,
		});
	});
});

ipcMain.on('SAVE_USER_LOCAL_STORAGE', (_, user) => {
	setUserStorage(user);
});

const setUserStorage = (user) => {
	storage.set('user-storage', {
		user,
	});
};

ipcMain.on('SAVE_USER_THEME', (_, theme) => {
	setUserTheme(theme);
});

const setUserTheme = (theme) => {
	storage.set('user-theme', {
		theme,
	});
};

ipcMain.on('app-quit', () => {
	app.quit();
});

if (process.platform === 'darwin') {
	app.dock.setIcon(dockIcon);
}

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});
