import Link from "next/link"
import { connect } from "react-redux"
import { GetStaticProps } from "next"
import List from "../../components/List"
import { User } from "../../interfaces"
import Grid from "@material-ui/core/Grid"
import { bindActionCreators } from "redux"
import { wrapper } from "../../store/store"
import Layout from "../../components/Layout"
import { getUsers, getNewUsers } from "../../store/user/action"

type Props = {
	users: User[]
	getNewUsers: any
}

const WithStaticProps = ({ users, getNewUsers }: Props) => (
	<Layout title="Users List | Next.js + TypeScript Example">
		<Grid item xs={12} md={4}>
			<h1>Users List</h1>
			<p>
				Example fetching data from inside <code>getStaticProps()</code>.
			</p>
			<p>You are currently on: /users</p>
			<button
				onClick={() => {
					getNewUsers()
				}}
			>
				click
			</button>
			<List users={users} />
			<p>
				<Link href="/">
					<a>Go home</a>
				</Link>
			</p>
		</Grid>
	</Layout>
)

export const getStaticProps: GetStaticProps = wrapper.getStaticProps(
	async ({ store }) => {
		store.dispatch(getUsers())
	}
)

const mapDispatchToProps = (dispatch: any) => {
	return {
		getUsers: bindActionCreators(getUsers, dispatch),
		getNewUsers: bindActionCreators(getNewUsers, dispatch),
	}
}

export default connect(null, mapDispatchToProps)(WithStaticProps)
