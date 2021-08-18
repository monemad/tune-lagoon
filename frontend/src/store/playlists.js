// action types 
const LOAD_PLAYLISTS = 'playlists/LOAD_PLAYLISTS';
const ADD_PLAYLIST = 'playlists/ADD_PLAYLIST';

// action creators must return an action object
const loadPlaylists = playlists => ({
    type: LOAD_PLAYLISTS,
    playlists
})

export const addPlaylist = playlist => ({
    type: ADD_PLAYLIST,
    playlist
})

// thunk action creator
export const getPlaylists  = () => async (dispatch) => {
    // make a fetch request to playlists api 
    const response = await fetch('/api/playlists');
    console.log('in the thunkkkkkk');

    if (response.ok) {
        console.log('response is gucccciiii');
        const playlists = await response.json();
        dispatch(loadPlaylists(playlists));
    }
}

const initialState = {};

// the playlists reducer
const playlistsReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOAD_PLAYLISTS:
            const newState = {};
            action.playlists.forEach(playlist => {
                newState[playlist.id] = playlist;
            })
            return newState;
        case ADD_PLAYLIST:
            return { ...state, [action.playlist.id]: action.playlist }
        default: 
            return state;
    }
}

export default playlistsReducer
