import { Notification } from './Interface'

export const initialState = {
    notification: {
        message: '',
        open: false,
        copyData: null,
        anchor: {
            vertical: 'top',
            horizontal: 'right'
        },
        autoHide: 6000,
        severity: null,
    }
}



export default function (state = initialState, action) {
    switch (action.type) {
        case 'CREATE_NOTIFICATION':
            return {
                ...state,
                notification: action.payload
            }
        case 'DELETE_NOTIFICATION':
            return {
                ...state,
                notification: initialState
            }
        default:
            return state
    }
}