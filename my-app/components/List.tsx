import * as React from "react"
import ListItem from "./ListItem"
import { User } from "../interfaces"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { getUsers } from "../store/user/action"

type Props = {
	users: User[]
}

const List = ({ users }: Props) => (
	<ul>
		{users &&
			users.map((item) => (
				<li key={item.id}>
					<ListItem data={item} />
				</li>
			))}
	</ul>
)

const mapStateToProps = (state: any) => ({
	users: state.user.users,
})

const mapDispatchToProps = (dispatch: any) => {
	return {
		getUsers: bindActionCreators(getUsers, dispatch),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(List)
