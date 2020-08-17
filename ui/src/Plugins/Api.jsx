import axios from "axios"
import Store from "../Store"

function getOptions(options) {
	// Get the current state of the client
	let state = Store.getState()

	// If we have a user anda session
	if (
		state.user &&
		Object.keys(state.user.user).length !== 0 &&
		Object.keys(state.user.session).length !== 0
	) {
		// Check if options already has headers,
		// if not then create a new object
		if (!options.headers) {
			options.headers = {}
		}

		// Set the user and token header for the server
		options.headers["x-user-id"] = state.user.user.id
		options.headers["x-token"] = state.user.session.access_token
	}

	// return the options
	return options
}

function handleResponse(resolve, reject, options, response) {
	// Check if something on the server went wrong,
	// if something did go wrong then reject the promise
	// and return the message
	if (response.data.status === false) {
		reject(response.data.message)
	}

	// If nothing went wrong,
	// check to see if the call wants the full response,
	// if so resolve the full response,
	if (options.full) {
		resolve(response)
	}
	// otherwise resolve only the data of the response
	else {
		resolve(response.data)
	}
}

export default {
	get(url, options = {}) {
		return new Promise((resolve, reject) => {
			options = getOptions(options)

			axios
				.get("http://localhost:1337" + url, options)
				.then((response) =>
					handleResponse(resolve, reject, options, response)
				)
				.catch((error) => {
					if (error.response && error.response.data) {
						reject(error.response.data.message)
					} else {
						reject({
							message: "Something went wrong. Please try again.",
						})
					}
				})
		})
	},
	post(url, body, options = {}) {
		return new Promise((resolve, reject) => {
			options = getOptions(options)

			axios
				.post("http://localhost:1337" + url, body, options)
				.then((response) =>
					handleResponse(resolve, reject, options, response)
				)
				.catch((error) => {
					if (error.response && error.response.data) {
						reject(error.response.data.message)
					} else {
						reject({
							message: "Something went wrong. Please try again.",
						})
					}
				})
		})
	},
	put(url, body, options = {}) {
		return new Promise((resolve, reject) => {
			options = getOptions(options)

			axios
				.put("http://localhost:1337" + url, body, options)
				.then((response) =>
					handleResponse(resolve, reject, options, response)
				)
				.catch((error) => {
					if (error.response && error.response.data) {
						reject(error.response.data.message)
					} else {
						reject({
							message: "Something went wrong. Please try again.",
						})
					}
				})
		})
	},
}
