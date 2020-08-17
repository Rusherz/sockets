import api from "../../plugins/api"

export interface AuthUser {
	username: string
	password: string
}
import { User } from "../../interfaces"

const sampleUserData: User[] = [
	{ id: 101, name: "Alice" },
	{ id: 102, name: "Bob" },
	{ id: 103, name: "Caroline" },
	{ id: 104, name: "Dave" },
]

export enum userActionTypes {
	GET_USERS,
	AUTH_LOGIN,
}

export const getUsers = () => (dispatch: any) => {
	return dispatch({
		type: userActionTypes.GET_USERS,
		payload: sampleUserData,
	})
}

export const getNewUsers = () => (dispatch: any) => {
	return dispatch({
		type: userActionTypes.GET_USERS,
		payload: [
			{ id: 101, name: "Alice" },
			{ id: 102, name: "Bob" },
			{ id: 103, name: "Caroline" },
			{ id: 104, name: "Dave" },
			{ id: 101, name: "Alice" },
			{ id: 102, name: "Bob" },
			{ id: 103, name: "Caroline" },
			{ id: 104, name: "Dave" },
			{ id: 101, name: "Alice" },
			{ id: 102, name: "Bob" },
			{ id: 103, name: "Caroline" },
			{ id: 104, name: "Dave" },
			{ id: 101, name: "Alice" },
			{ id: 102, name: "Bob" },
			{ id: 103, name: "Caroline" },
			{ id: 104, name: "Dave" },
			{ id: 101, name: "Alice" },
			{ id: 102, name: "Bob" },
			{ id: 103, name: "Caroline" },
			{ id: 104, name: "Dave" },
			{ id: 101, name: "Alice" },
			{ id: 102, name: "Bob" },
			{ id: 103, name: "Caroline" },
			{ id: 104, name: "Dave" },
		],
	})
}

export const loginUser = (authUser: AuthUser) => (dispatch: any) => {
	console.log(authUser)
	api.post("/v1/login", authUser).then((response: any) => {
		dispatch({
			type: userActionTypes.AUTH_LOGIN,
			payload: response,
		})
	})
}
