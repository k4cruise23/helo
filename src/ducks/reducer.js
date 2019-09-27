const initialState = {
    loggedIn: false,
    user: null,
    posts: [],
    currentPost: {}
}

const UPDATE_USER = 'UPDATE_USER'
const SEARCH_USER = 'SEARCH_USER'
const SELECT_POST = 'SELECT_POST'
const UPDATE_POST = 'UPDATE_POST'
const RELOAD_USER = 'RELOAD_USER'

export const updateUser = (userObj) => {
    return {
        type: UPDATE_USER,
        payload: userObj
    }
}

export const searchUser = (input) => {
    return {
        type: SEARCH_USER,
        payload: input
    }
}

export const selectPost = (post) => {
    return {
        type: SELECT_POST,
        payload: post
    }
}

export const updatePost = (post) => {
    return {
        type: UPDATE_POST,
        payload: post
    }
}

export const reloadUser = (user) => {
    return {
        type: RELOAD_USER,
        payload: user
    }
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case UPDATE_USER:
            return {...state, user: action.payload, posts: action.payload}
        case RELOAD_USER:
            return {...state, user: action.payload}
        case UPDATE_POST:
            return {...state, post: action.payload}
        case SELECT_POST:
            return {...state, post: action.payload}
        case SEARCH_USER:
            return state
        default: return state
    }
}

export default reducer