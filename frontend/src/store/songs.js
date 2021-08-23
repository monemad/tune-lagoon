import { csrfFetch } from "./csrf";
const rfdc = require('rfdc')();

// action types 
const LOAD_SONGS = 'songs/LOAD_SONGS';
const ADD_SONG = 'songs/ADD_SONG';
const REMOVE_SONG = 'songs/REMOVE_SONG';
const UPDATE_SONG = 'songs/UPDATE_SONG';

// action creators must return an action object
const loadSongs = songs => ({
    type: LOAD_SONGS,
    songs
})

const addSong = song => ({
    type: ADD_SONG,
    song
})

const updateSong = song => ({
    type: UPDATE_SONG,
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

export const destroySong = id => async(dispatch) => {
    const response = await csrfFetch(`/api/songs/${id}`, {
        method: 'delete'
    });

    if (response.ok) {
        dispatch(removeSong(id))
    }
}

export const addCommentToSong = commentData => async(dispatch) => {
    const response = await csrfFetch('/api/comments', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(commentData)
    })

    if (response.ok) {
        const song = await response.json();
        dispatch(updateSong(song));
    }
}

export const destroyComment = id => async(dispatch) => {
    const response = await csrfFetch(`/api/comments/${id}`, {
        method: 'delete'
    })

    if (response.ok) {
        const song = await response.json();
        dispatch(updateSong(song));
    }
}

const initialState = {};

// the songs reducer
const songsReducer = (state = initialState, action) => {
    const stateCopy = rfdc(state);
    switch(action.type) {
        case LOAD_SONGS:
            const newState = {};
            action.songs.forEach(song => {
                newState[song.id] = song;
            })
            return newState;
        case ADD_SONG:
            stateCopy[action.song.id] = action.song;
            return stateCopy;
        case REMOVE_SONG:
            delete stateCopy[action.id];
            return stateCopy;
        case UPDATE_SONG:
            delete stateCopy[action.song.id];
            stateCopy[action.song.id] = action.song
            return stateCopy;
        default:
            return state;
    }
}

export default songsReducer
