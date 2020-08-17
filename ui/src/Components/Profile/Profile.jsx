import { connect } from "react-redux"
import React, { Component } from "react"
import Grid from "@material-ui/core/Grid"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import { updateUser } from "../../Store/User/Action"

export class Profile extends Component {
	constructor() {
		super()

		this.state = {
			email: "",
			last_name: "",
			first_name: "",
		}
	}

	componentDidMount() {
		if (this.props.user) {
			this.setState({
				...this.props.user,
			})
		}
	}

	onChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value,
		})
	}

	render() {
		return (
			<Grid item xs={12} container spacing={1} justify="center">
				<Grid item sx={12} md={8}>
					<TextField
						fullWidth
						size="small"
						name="first_name"
						label="First name"
						onChange={this.onChange}
						defaultValue={this.props.user.first_name}
					/>
				</Grid>
				<Grid item sx={12} md={8}>
					<TextField
						fullWidth
						size="small"
						name="last_name"
						label="Last name"
						onChange={this.onChange}
						defaultValue={this.props.user.last_name}
					/>
				</Grid>
				<Grid item sx={12} md={8}>
					<TextField
						fullWidth
						size="small"
						name="email"
						label="Email"
						onChange={this.onChange}
						defaultValue={this.props.user.email}
					/>
				</Grid>
				<Grid item sx={12} md={8}>
					<Button
						variant="contained"
						style={{
							marginTop: "1rem",
						}}
						color="primary"
						onClick={() => {
							this.props.updateUser(this.state)
						}}
					>
						Save profile
					</Button>
				</Grid>
			</Grid>
		)
	}
}

const mapStateToProps = (state) => ({
	...state.user,
})

export default connect(mapStateToProps, { updateUser })(Profile)
