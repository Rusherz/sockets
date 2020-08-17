import {
    connect
} from 'react-redux'
import React, {
    Component
} from 'react'
import Copy from './Copy'
import Slide from '@material-ui/core/Slide'
import MuiAlert from '@material-ui/lab/Alert'
import CloseIcon from '@material-ui/icons/Close'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import {
    deleteNotification
} from '../../Store/Notification/Action'

export class Notification extends Component {
    constructor() {
        super()

        this.state = {
            copyDataRef: null
        }
    }

    OnClose = () => {
        this.props.deleteNotification()
    }

    OnChange = (node) => {
        this.setState({
            copyDataRef: node
        })
    }

    GetCopyData = () => {
        if (this.props.notification.copyData) {
            return (
                <Copy title={
                    <span style={{
                        fontSize: '16px'
                    }}>
                        Click to copy error data to clipboard.
                    </span>
                }
                    data={JSON.stringify(this.props.notification.copyData)} />
            )
        } else {
            return null
        }
    }

    render() {

        if (!this.props || !this.props.notification || !this.props.notification.open) {
            return null
        }

        return (<Snackbar open={this.props.notification.open}
            onClose={this.OnClose}
            ClickAwayListenerProps={{
                mouseEvent: false
            }}
            TransitionComponent={(props) => { return <Slide {...props} direction="left" /> }}
            message={this.props.notification.message}
            anchorOrigin={this.props.notification.anchor}
            autoHideDuration={this.props.notification.autoHide}
            action={
                <React.Fragment>
                    {
                        this.props.notification.copyData ?
                            this.GetCopyData() :
                            null
                    }
                    <IconButton size="small" aria-label="close" color="primary" onClick={this.OnClose}>
                        <CloseIcon fontSize="small" />
                    </IconButton>
                </React.Fragment>
            }>
            {
                this.props.notification.severity
                    ? <MuiAlert onClose={this.OnClose} severity={this.props.notification.severity}
                        action={
                            <React.Fragment>
                                {this.GetCopyData()}
                                <CloseIcon onClick={this.OnClose} color="inherit" size="small">
                                    UNDO
                            </CloseIcon>
                            </React.Fragment>
                        }>
                        {this.props.notification.message}
                    </MuiAlert>
                    : null
            }
        </Snackbar>)
    }
}
const mapStateToProps = state => ({
    ...state.notification
})

export default connect(mapStateToProps, {
    deleteNotification
})(Notification)