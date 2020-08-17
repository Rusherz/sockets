import "./App.scss"
import { connect } from "react-redux"
import React, { Component } from "react"
import Header from "./Components/Header"
import Paper from "@material-ui/core/Paper"
import Login from "./Components/Login/Login"
import { loadUser } from "./Store/User/Action"
import Profile from "./Components/Profile/Profile"
import Notification from "./Components/Utils/Notification"
import { createNotification } from "./Store/Notification/Action"
// import PrivateRoute from "./Components/PrivateRoute/PrivateRoute"
import { Route, Switch, BrowserRouter as Router } from "react-router-dom"
import { mockComponent } from "react-dom/test-utils"

export class App extends mockComponent {
	componentWillMount() {
		this.props.loadUser()
	}

	render() {
		return (
			<Router>
				<div className="App">
					<Header />
					<Paper
						elevation={0}
						style={{
							padding: "1rem",
						}}
					>
						<Notification />
						<Switch>
							<Route exact path="/" component={Login} />
							<Route exact path="/profile" component={Profile} />
						</Switch>
					</Paper>
				</div>
			</Router>
		)
	}
}

const mapStateToProps = (state) => ({
	...state.user,
	...state.notification,
})

export default connect(mapStateToProps, { createNotification, loadUser })(App)
