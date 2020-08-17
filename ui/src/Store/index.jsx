import thunk from "redux-thunk"
import { combineReducers } from "redux"
import UserReducer from "./User/Reducer"
import { applyMiddleware, compose, createStore } from "redux"
import NotificationReducer from "./Notification/Reducer"

const initialState = {}
const middleware = [thunk]

const composeMiddleware = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
	combineReducers({
		user: UserReducer,
		notification: NotificationReducer,
	}),
	initialState,
	composeMiddleware(applyMiddleware(...middleware))
)

export default store
