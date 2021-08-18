import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage';
import SignupFormPage from './components/SignupFormPage';
import * as sessionActions from './store/session';
import Navigation from './components/Navigation';
import UsersList from './components/UsersList'
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
        <Route path='/login'>
          <LoginFormPage />
        </Route>
        <Route path='/signup'>
          <SignupFormPage />
        </Route>
        <Route path='/users'>
          <UsersList users={users}/>
        </Route>
      </Switch>
      )}
    </>
  );
}

export default App;
