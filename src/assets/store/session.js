import { csrfFetch } from './csrf.js';
// import { ipcRenderer } from 'electron';

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';

const setUser = (user) => ({
  type: SET_USER,
  payload: user
});

const removeUser = () => ({
  type: REMOVE_USER
});

export const login = (user) => async (dispatch) => {
  const { credential, password } = user
  // ipcRenderer.send('SAVE_USER_LOCAL_STORAGE', user);
  window.electron.saveUserLogin(user)
  const response = await csrfFetch('https://shrewdness.herokuapp.com/api/session/', {
    method: 'POST',
    body: JSON.stringify({
      credential,
      password,
    }),
  });
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};

const getFetchUser = async () => {
  const user = await window.electron.fetchUserData();
  console.log('this is user: ', user)
}

export const restoreUser = async () => {
  // ipcRenderer.send('FETCH_USER_LOCAL_STORAGE');
  // await ipcRenderer.on('HANDLE_FETCH_USER_LOCAL_STORAGE', async (_, user) => {
  //   if(user) dispatch(login(user.user.user));
  //   else logout();
  // })
  // console.log('restore user hit')
  const user = await getFetchUser();
  return console.log('user in session: ', user)
  // return dispatch(login(user))

};



export const logout = () => async (dispatch) => {
  const response = await csrfFetch('https://shrewdness.herokuapp.com/api/session/', {
    method: 'DELETE'
  });
  dispatch(removeUser());
  return response;
};

const initialState = { user: null };

function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case REMOVE_USER:
      newState = Object.assign({}, state, { user: null });
      return newState;
    default:
      return state;
  }
}

export default reducer;
