import { userActionTypes } from "./action"

const userInitialState = {
	users: []
}

export default function reducer(state = userInitialState, action: any) {
	switch (action.type) {
		case userActionTypes.GET_USERS:
			return {
				...state,
				users: action.payload
			}
		default:
			return state
	}
}
