// action types 
const LOAD_USERS = 'users/LOAD_USERS';
const ADD_USER = 'users/ADD_USER';

// action creators must return an action object
const loadUsers = users => ({
    type: LOAD_USERS,
    users
})

export const addUser = user => ({
    type: ADD_USER,
    user
})

// thunk action creator
export const getUsers  = () => async (dispatch) => {
    // make a fetch request to users api 
    const response = await fetch('/api/users');

    if (response.ok) {
        const users = await response.json();
        dispatch(loadUsers(users));
    }
}

const initialState = {};

// the users reducer
const usersReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOAD_USERS:
            const newState = {};
            action.users.forEach(user => {
                newState[user.id] = user;
            })
            return newState;
        case ADD_USER:
            return { ...state, [action.user.id]: action.user }
        default: 
            return state;
    }
}

export default usersReducer
