import api from "../../Plugins/Api"
import { connect } from "react-redux"
import React, { Component } from "react"
import Grid from "@material-ui/core/Grid"
import Button from "@material-ui/core/Button"
import { loginUser } from "../../Store/User/Action"
import { createNotification } from "../../Store/Notification/Action"
import TextField from "@material-ui/core/TextField"

export class Login extends Component {
	constructor() {
		super()

		this.state = {
			username: "",
			password: "",
		}
	}

	OnChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value,
		})
	}

	render() {
		return (
			<Grid
				item
				xs={12}
				container
				spacing={1}
				justify="center"
				alignItems="center"
			>
				<Grid item sx={12} md={8}>
					<TextField
						fullWidth
						size="small"
						name="username"
						label="Username"
						onChange={this.OnChange}
						defaultValue={this.state.username}
					/>
				</Grid>
				<Grid item sx={12} md={8}>
					<TextField
						fullWidth
						size="small"
						name="password"
						type="password"
						label="Password"
						onChange={this.OnChange}
						defaultValue={this.state.password}
					/>
				</Grid>
				<Grid
					item
					sx={12}
					md={8}
					style={{
						textAlign: "center",
					}}
				>
					<Button
						color="primary"
						variant="contained"
						style={{
							marginTop: "1rem",
						}}
						onClick={() => {
							this.props.loginUser(this.state)
						}}
					>
						Login
					</Button>
				</Grid>
			</Grid>
		)
	}
}

const mapStateToProps = (state) => ({
	...state.user,
})

export default connect(mapStateToProps, {
	loginUser,
	createNotification,
})(Login)
