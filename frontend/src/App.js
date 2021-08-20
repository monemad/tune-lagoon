import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import AudioPlayer from 'react-h5-audio-player'
import LoginFormPage from './components/LoginFormPage';
import SignupFormPage from './components/SignupFormPage';
import * as sessionActions from './store/session';
import Navigation from './components/Navigation';
import UsersPage from './components/UsersPage'
import PlaylistsPage from './components/PlaylistsPage';
import SongsPage from './components/SongsPage';
import { getUsers } from "./store/users"
import { getSongs } from './store/songs';
import { getPlaylists } from './store/playlists';
import { uploadSong } from './store/songs';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [nowPlaying, setNowPlaying] = useState('https://tune-lagoon.s3.us-west-1.amazonaws.com/1629421141096.mp3')
  // const usersSlice = useSelector(state => state.users);
  // const users = Object.values(usersSlice); 
  
  useEffect(()=>{
    dispatch(sessionActions.restoreUser())
      .then(()=> setIsLoaded(true));
    dispatch(getUsers());
    dispatch(getSongs());
    dispatch(getPlaylists());
  }, [dispatch])

  const [file,  setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("FILE ------------->", file);
    const songUrl = await dispatch(uploadSong(file));
    console.log('SONG URL', songUrl);
    setNowPlaying(songUrl);
  }

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
            <UsersPage users/>
          </Route>
          <Route path='/songs'>
            <SongsPage />
          </Route>
          <Route path='/playlists'>
            <PlaylistsPage />
          </Route>
          <Route path='/upload'>
            <h1>Upload file</h1>
            <form onSubmit={handleSubmit}>
              <label htmlFor='song'></label>
              <input id='song' type='file' onChange={e => setFile(e.target.files[0])}></input>
              <button>Submit</button>
            </form>
          </Route>
          <Route>
            Page Not Found! 😥
          </Route>
        </Switch>
      )}
      <footer><AudioPlayer layout='horizontal' src={nowPlaying} /></footer>
    </>
  );
}

export default App;
