const initialState = {
    user: {},
    session: {},
    userLoading: true
}

export default function (state = initialState, action) {
    switch (action.type) {
        case 'LOAD_USER':
            // return the newly updated user and session
            return {
                ...state,
                ...action.payload,
                userLoading: false
            }
        case 'CREATE_USER':
        case 'FETCH_USER':
        case 'LOADING_USER':
        case 'LOGOUT_USER':
        case 'UPDATE_USER':
            // return the newly updated user and session
            return {
                ...state,
                ...action.payload
            }
        default:
            // return the current state
            return state
    }
}