import { csrfFetch } from "./csrf";

// action types 
const LOAD_SONGS = 'songs/LOAD_SONGS';
const ADD_SONG = 'songs/ADD_SONG';

// action creators must return an action object
const loadSongs = songs => ({
    type: LOAD_SONGS,
    songs
})

export const addSong = song => ({
    type: ADD_SONG,
    song
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

export const uploadSong = song => async (dispatch) => {
    console.log("SONG ------->", song)
    const formData = new FormData();
    formData.append('song', song);
    console.log("FORMDATA --------->", ...formData)
    const response = await csrfFetch('/api/songs', {
        method: 'post',
        headers: {
            'Content-Type': "multipart/form-data"
        },
        body: formData
    })

    if (response.ok) {
        const createdSong = await response.json();
        console.log("Created Song", createdSong);
        return createdSong;
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
        default: 
            return state;
    }
}

export default songsReducer
