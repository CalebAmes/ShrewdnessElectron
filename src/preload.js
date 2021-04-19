const { remote } = require('electron');
const { ipcRenderer, contextBridge } = require('electron');


let currWindow = remote.BrowserWindow.getFocusedWindow();

window.closeCurrentWindow = function () {
	currWindow.close();
};

contextBridge.exposeInMainWorld('electron', {
	sendNotification(message) {
		ipcRenderer.send('notify', message);
	},
	saveUserTheme(obj) {
		ipcRenderer.send('SAVE_USER_THEME', obj);
	},
	saveUserLogin(user) {
		console.log('inside context bridge')
		ipcRenderer.send('SAVE_USER_LOCAL_STORAGE', user);
	},
  async fetchUserData() {
		ipcRenderer.send('FETCH_USER_LOCAL_STORAGE');
		const user = await ipcRenderer.on('HANDLE_FETCH_USER_LOCAL_STORAGE', (_, user) => {
    if(user) {
			console.log('inside ipc: ', user)
			return user
		}
		else return false;
  	})
		console.log('this is res: ', user)
		return user;
	}
});
