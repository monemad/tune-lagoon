import { csrfFetch } from "./csrf";
const rfdc = require('rfdc')();

// action types 
const LOAD_PLAYLISTS = 'playlists/LOAD_PLAYLISTS';
const ADD_PLAYLIST = 'playlists/ADD_PLAYLIST';
const REMOVE_PLAYLIST = 'playlists/REMOVE_PLAYLIST';
const UPDATE_PLAYLIST = 'playlists/UPDATE_PLAYLIST'

// action creators must return an action object
const loadPlaylists = playlists => ({
    type: LOAD_PLAYLISTS,
    playlists
})

const addPlaylist = playlist => ({
    type: ADD_PLAYLIST,
    playlist
})

const removePlaylist = id => ({
    type: REMOVE_PLAYLIST,
    id
})

const updatePlaylist = playlist => ({
    type: UPDATE_PLAYLIST,
    playlist
})

// thunk action creator
export const getPlaylists = () => async (dispatch) => {
    // make a fetch request to playlists api 
    const response = await fetch('/api/playlists');

    if (response.ok) {
        const playlists = await response.json();
        dispatch(loadPlaylists(playlists));
    }
}

export const createPlaylist = formData => async (dispatch) => {
    const response = await csrfFetch('/api/playlists', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    });

    if (response.ok) {
        const playlist = await response.json();
        dispatch(addPlaylist(playlist))
    }
}

export const destroyPlaylist = id => async (dispatch) => {
    const response = await csrfFetch(`/api/playlists/${id}`, {
        method: 'delete'
    });

    if (response.ok) {
        // const users = await response.json();
        dispatch(removePlaylist(id));
    }
}

export const addSongToPlaylist = data => async(dispatch) => {
    const response = await csrfFetch('/api/playlists/add-song', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if (response.ok) {
        const playlists = await response.json();
        dispatch(loadPlaylists(playlists))
    }
}

export const removeSongFromPlaylist = data => async(dispatch) => {
    const response = await csrfFetch(`/api/playlists/${data.playlistId}/${data.songId}`, {
        method: 'delete'
    });

    if (response.ok) {
        const playlist = await response.json();
        dispatch(updatePlaylist(playlist))
    }
} 

const initialState = {};

// the playlists reducer
const playlistsReducer = (state = initialState, action) => {
    let stateCopy = rfdc(state);
    switch(action.type) {
        case LOAD_PLAYLISTS:
            const newState = {};
            action.playlists.forEach(playlist => {
                newState[playlist.id] = playlist;
            })
            return newState;
        case ADD_PLAYLIST:
            return { ...stateCopy, [action.playlist.id]: action.playlist }
        case REMOVE_PLAYLIST:
            delete stateCopy[action.id];
            return stateCopy;
        case UPDATE_PLAYLIST:
            delete stateCopy[action.playlist.id];
            stateCopy[action.playlist.id] = action.playlist;
            return stateCopy;
        default: 
            return state;
    }
}

export default playlistsReducer
