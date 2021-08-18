import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage';
import SignupFormPage from './components/SignupFormPage';
import * as sessionActions from './store/session';
import Navigation from './components/Navigation';
import UsersPage from './components/UsersPage'
import PlaylistsPage from './components/PlaylistsPage';
import SongsPage from './components/SongsPage';
import { getUsers } from "./store/users"
import { getSongs } from './store/songs';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const usersSlice = useSelector(state => state.users);
  const users = Object.values(usersSlice); 
  
  useEffect(()=>{
    dispatch(sessionActions.restoreUser())
      .then(()=> setIsLoaded(true));
    dispatch(getUsers());
    dispatch(getSongs());
  }, [dispatch])

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path='/'>
            Home
          </Route>
          <Route path='/login'>
            <LoginFormPage />
          </Route>
          <Route path='/signup'>
            <SignupFormPage />
          </Route>
          <Route path='/users'>
            <UsersPage users={users}/>
          </Route>
          <Route path='/songs'>
            <SongsPage />
          </Route>
          <Route path='/playlists'>
            <PlaylistsPage />
          </Route>
          <Route>
            Page Not Found! 😥
          </Route>
        </Switch>
      )}
      <footer>Footer</footer>
    </>
  );
}

export default App;
