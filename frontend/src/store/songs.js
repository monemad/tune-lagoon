import { csrfFetch } from "./csrf";

// action types 
const LOAD_SONGS = 'songs/LOAD_SONGS';
const ADD_SONG = 'songs/ADD_SONG';
const REMOVE_SONG = 'songs/REMOVE_SONG';

// action creators must return an action object
const loadSongs = songs => ({
    type: LOAD_SONGS,
    songs
})

const addSong = song => ({
    type: ADD_SONG,
    song
})

const removeSong = id => ({
    type: REMOVE_SONG,
    id
})

// thunk action creator
export const getSongs  = () => async (dispatch) => {
    // make a fetch request to songs api 
    const response = await fetch('/api/songs');
    console.log('in the thunkkkkkk');

    if (response.ok) {
        console.log('response is gucccciiii');
        const songs = await response.json();
        dispatch(loadSongs(songs));
    }
}

export const uploadSong = song => async () => {
    const formData = new FormData();
    formData.append('song', song);
    const response = await csrfFetch('/api/songs/upload', {
        method: 'post',
        headers: {
            'Content-Type': "multipart/form-data"
        },
        body: formData
    })

    if (response.ok) {
        const songUrl = await response.json();
        return songUrl;
    }
}

export const createSong = songData => async(dispatch) => {
    const response = await csrfFetch('/api/songs', {
        method: 'post', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(songData)
    });

    if (response.ok) {
        const newSong = await response.json();
        dispatch(addSong(newSong));
    }
}

const initialState = {};

// the songs reducer
const songsReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOAD_SONGS:
            const newState = {};
            action.songs.forEach(song => {
                newState[song.id] = song;
            })
            return newState;
        case ADD_SONG:
            return { ...state, [action.song.id]: action.song }
        case REMOVE_SONG:
            delete {...state}[action.id];
        default: 
            return state;
    }
}

export default songsReducer
