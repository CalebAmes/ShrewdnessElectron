import { ipcRenderer } from 'electron';

export const main = () => {
  const body = document.getElementById('body');
  body.className = '';
  body.classList.add('main');
  ipcRenderer.send('SAVE_USER_THEME', {
    theme: 'main'
  });
}

export const darkmode = () => {
  const body = document.getElementById('body');
  body.className = '';
  body.classList.add('darkmode');
  ipcRenderer.send('SAVE_USER_THEME', {
    theme: 'darkmode'
  });
}

export const blue = () => {
  const body = document.getElementById('body');
  body.className = '';
  body.classList.add('blue');
  ipcRenderer.send('SAVE_USER_THEME', {
    theme: 'blue'
  });
}