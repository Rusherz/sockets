import {
    connect
} from 'react-redux'
import React, {
    Component
} from 'react'
import {
    Route,
    Redirect
} from 'react-router-dom'
import {
    userAuth
} from '../../Store/User/Action'
import {
    createNotification
} from '../../Store/Notification/Action'

export class PrivateRoute extends Component {
    render() {
        if (this.props.userLoading) {
            return null
        }

        let result = userAuth(this.props.user, this.props.userRoles, this.props.session, this.props.requiresLogin, this.props.roles, this.props.groups)

        if (result) {

            return <Route {
                ...this.props
            }
            />
        } else {
            if (
                this.props.requiresLogin &&
                (
                    Object.keys(this.props.user)
                        .length === 0 ||
                    Object.keys(this.props.session)
                        .length === 0 ||
                    new Date(this.props.session.expires_at) < new Date()
                )
            ) {

                return <Redirect to={{
                    pathname: "/login",
                    redirectTo: this.props.path
                }} />
            } else {
                this.props.createNotification({
                    message: 'Authorization required.',
                    severity: 'error'
                })

                return <Redirect to="/" />
            }
        }
    }
}

const mapStateToProps = state => ({
    ...state.user
})

export default connect(mapStateToProps, {
    createNotification
})(PrivateRoute)