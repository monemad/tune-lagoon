import { csrfFetch } from "./csrf";
const rfdc = require('rfdc')();

// action types 
const LOAD_USERS = 'users/LOAD_USERS';
const ADD_USER = 'users/ADD_USER';
const UPDATE_USER = 'users/UPDATE_USER';

// action creators must return an action object
const loadUsers = users => ({
    type: LOAD_USERS,
    users
})

export const addUser = user => ({
    type: ADD_USER,
    user
})

const updateUser = user => ({
    type: UPDATE_USER,
    user
})

// thunk action creator
export const getUsers  = () => async (dispatch) => {
    // make a fetch request to users api 
    console.log('in the getUsers thunk')
    const response = await fetch('/api/users');

    if (response.ok) {
        const users = await response.json();
        dispatch(loadUsers(users));
    }
    return response;
}

export const updateUserProfile = userData => async (dispatch) => {
    const { id, username, firstName, lastName } = userData;
    const response = await csrfFetch(`/api/users/${id}`, {
        method: 'put',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
            firstName,
            lastName
        })
    });

    if (response.ok){
        const updatedUser = await response.json();
        dispatch(updateUser(updatedUser));
    }

}

const initialState = {};

// the users reducer
const usersReducer = (state = initialState, action) => {
    let stateCopy = rfdc(state);
    switch(action.type) {
        case LOAD_USERS:
            const newState = {};
            action.users.forEach(user => {
                newState[user.id] = user;
            })
            return newState;
        case ADD_USER:
            stateCopy[action.user.id] = action.user
            return stateCopy;
            // return { ...state, [action.user.id]: action.user }
        case UPDATE_USER:
            return {...state, [action.user.id]: {...state[action.user.id], ...action.user}}
        default: 
            return state;
    }
}

export default usersReducer
