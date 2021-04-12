import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Groups from "./components/Groups";
import ChatRoom from "./components/ChatRoom";
import { getChannelMessages } from './store/channelMessages';
import { getChannel } from './store/channels';
import { getDirectMessages } from './store/directMessages';
import { getGroup } from './store/groups';
import { getNotification } from './store/notifications';
import { getUserGroup } from './store/userGroups';
import { getUsers } from './store/users';

function App() {
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
      {(
        <Switch>
          <Route path= '/chatRoom/:id' >
            <Navigation isLoaded={isLoaded} />
            <ChatRoom />
          </Route>
          <Route path='/' >
            <LoginFormPage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
