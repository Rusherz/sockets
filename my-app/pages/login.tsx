import { connect } from "react-redux"
import { GetStaticProps } from "next"
import { wrapper } from "../store/store"
import Grid from "@material-ui/core/Grid"
import { bindActionCreators } from "redux"
import { loginUser } from "../store/user/action"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"

type Props = {
	loginUser: any
}

const WithStaticProps = ({ loginUser }: Props) => (
	<Grid
		item
		lg={8}
		xs={12}
		md={10}
		container
		spacing={2}
		justify="center"
		style={{
			margin: "1rem",
		}}
	>
		<Grid item xs={12}>
			<TextField fullWidth placeholder="Username" defaultValue="" />
		</Grid>
		<Grid item xs={12}>
			<TextField
				fullWidth
				type="password"
				defaultValue=""
				placeholder="Password"
			/>
		</Grid>
		<Grid item xs={12}>
			<Button
				color="primary"
				variant="outlined"
				onClick={() => {
					loginUser({
						username: "asd",
						password: "asd",
					})
				}}
			>
				Login
			</Button>
		</Grid>
	</Grid>
)

export const getStaticProps: GetStaticProps = wrapper.getStaticProps(
	async ({ store }) => {}
)

const mapDispatchToProps = (dispatch: any) => {
	return {
		loginUser: bindActionCreators(loginUser, dispatch),
	}
}

export default connect(null, mapDispatchToProps)(WithStaticProps)
