import api from "../../Plugins/Api"
import { createNotification } from "../Notification/Action"

export const createUser = (user) => (dispatch) => {
	api.post("/v1/users", user)
		.then((response) => {
			let data = response

			if (!data.status) {
				dispatch({
					type: "ERROR",
					payload: data.errors,
				})

				return
			}

			dispatch({
				type: "CREATE_USER",
				payload: response,
			})
		})
		.catch((message) => {
			dispatch(
				createNotification({
					message,
					severity: "error",
				})
			)
		})
}

export const fetchUser = (authObject) => (dispatch) => {
	api.post("/v1/oauth/login", authObject)
		.then((data) => {
			localStorage.setItem("user", JSON.stringify(data.user))
			localStorage.setItem("session", JSON.stringify(data.session))

			dispatch({
				type: "FETCH_USER",
				payload: data,
			})
		})
		.catch((message) => {
			dispatch(
				createNotification({
					message,
					severity: "error",
				})
			)
		})
}

export const loadUser = () => (dispatch) => {
	let user = JSON.parse(localStorage.getItem("user") || '') || {}
	let session = JSON.parse(localStorage.getItem("session") || '') || {}

	if (
		(session.expires_at && new Date(session.expires_at) < new Date()) ||
		!user.id
	) {
		localStorage.clear()
		user = {}
		session = {}
	}

	if (user.id) {
		Promise.all([
			api.get(`/v1/users/${user.id}`),
			api.get(`/v1/users/${user.id}/roles`),
		])
			.then(([user, userRoles]) => {
				dispatch({
					type: "LOAD_USER",
					payload: {
						user,
						session,
						userRoles,
					},
				})
			})
			.catch((message) => {
				dispatch(
					createNotification({
						message,
						severity: "error",
					})
				)
			})
	}
}

export const loginUser = (user) => (dispatch) => {
	api.post("/v1/login", user)
		.then((response) => {
			localStorage.setItem("user", JSON.stringify(response))

			dispatch({
				type: "LOGIN_USER",
				payload: {
					user: response,
				},
			})
		})
		.catch((message) => {
			dispatch(
				createNotification({
					message,
					severity: "error",
				})
			)
		})
}

export const logoutUser = () => (dispatch) => {
	localStorage.clear()

	dispatch({
		type: "LOGOUT_USER",
		payload: {
			user: {},
			session: {},
		},
	})
}

export const updateUser = (user) => (dispatch) => {
	api.put(`/v1/users/${user.id}`, user)
		.then((response) => {
			localStorage.setItem("user", JSON.stringify(response))

			dispatch({
				type: "UPDATE_USER",
				payload: {
					user: response,
				},
			})
		})
		.catch((message) => {
			dispatch(
				createNotification({
					message,
					severity: "error",
				})
			)
		})
}

export const userAuth = (
	user,
	userRoles,
	session,
	requiresLogin = false,
	roles = [],
) => {
	try {
		if (userRoles && userRoles.indexOf("Admin")) {
			return true
		}

		if (
			requiresLogin &&
			(!user.id ||
				Object.keys(session).length === 0 ||
				new Date(session.expires_at) < new Date())
		) {
			return false
		}

		if (
			roles &&
			(!userRoles ||
				userRoles.length === 0 ||
				!roles.filter((role) => {
					return userRoles.indexOf(role) !== -1
				}))
		) {
			return false
		}

		return true
	} catch (e) {
		console.error(e)
		return false
	}
}
