import { ipcRenderer } from 'electron';
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import ChatRoom from "./components/ChatRoom";
import { getChannelMessages } from './store/channelMessages';
import { getChannel } from './store/channels';
import { getDirectMessages } from './store/directMessages';
import { getGroup } from './store/groups';
import { getNotification } from './store/notifications';
import { getUserGroup } from './store/userGroups';
import { getUsers } from './store/users';
import {
  main,
  darkmode,
  blue,
} from './components/index.js'

function App() {
  ipcRenderer.on('HANDLE_FETCH_USER_THEME', (_,theme) => {
    if (theme.theme.theme.theme === 'main') main();
    if (theme.theme.theme.theme === 'blue') blue();
    if (theme.theme.theme.theme === 'darkmode') darkmode();
  });
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect( async () => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    dispatch(getChannelMessages());
    dispatch(getChannel());
    dispatch(getDirectMessages());
    dispatch(getGroup());
    dispatch(getNotification());
    dispatch(getUserGroup());
    dispatch(getUsers());
  }, [dispatch]);


  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path= '/chatRoom/:id' >
            <ChatRoom />
          </Route> */}
          <Route path='/' >
            <LoginFormPage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
