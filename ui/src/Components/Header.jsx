import md5 from 'md5'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import Grow from '@material-ui/core/Grow'
import Paper from '@material-ui/core/Paper'
import Popper from '@material-ui/core/Popper'
import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import Avatar from '@material-ui/core/Avatar'
import Toolbar from '@material-ui/core/Toolbar'
import { Link, Redirect } from 'react-router-dom'
import MenuItem from '@material-ui/core/MenuItem'
import MenuList from '@material-ui/core/MenuList'
import { logoutUser } from '../Store/User/Action'
import Typography from '@material-ui/core/Typography'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'

export class Header extends Component {
    constructor() {
        super()

        this.state = {
            open: false
        }
    }

    ToggleMenu = () => {
        this.setState({
            open: !this.state.open
        })
    }

    render() {
        return (
            <AppBar position="sticky" className="App-Header">
                <Toolbar>
                    <Typography variant="h4">
                        Socket Pro
                    </Typography>
                    <div style={{
                        marginLeft: '1rem',
                        marginRight: 'auto'
                    }}>
                        <Link to="/responses" style={{
                            textDecoration: 'none'
                        }}>
                            <Button style={{
                                color: 'white'
                            }}>
                                Responses
                            </Button>
                        </Link>

                        <Link to="/submissions" style={{
                            textDecoration: 'none'
                        }}>
                            <Button style={{
                                color: 'white'
                            }}>
                                Submissions
                            </Button>
                        </Link>

                    </div>
                    {
                        Object.keys(this.props.user).length === 0 || Object.keys(this.props.session).length === 0 ?
                            (
                                <Button href={`https://orcid.org/oauth/authorize?client_id=APP-TQMAHH6AA8KWSC3L&response_type=code&scope=/authenticate&redirect_uri=${window.location.origin}/login`} style={{
                                    color: 'white'
                                }}>
                                    <img alt="ORCID logo"
                                        style={{
                                            marginRight: '0.25rem'
                                        }}
                                        width="24"
                                        height="24"
                                        id="orcid-id-logo"
                                        src="https://orcid.org/sites/default/files/images/orcid_24x24.png" />
                                    Signin
                                </Button>
                            ) :
                            (
                                <React.Fragment>
                                    <Button
                                        buttonRef={node => {
                                            this.anchorEl = node;
                                        }}
                                        aria-owns={this.state.open ? "menu-list-grow" : null}
                                        aria-haspopup="true"
                                        onClick={() => {
                                            this.setState({
                                                open: !this.state.open
                                            })
                                        }}
                                        style={{
                                            color: 'white'
                                        }}>
                                        <Avatar size="small"
                                            src={
                                                this.props.user.avatar ||
                                                `https://www.gravatar.com/avatar/${md5(
                                                    this.props.user.email ?
                                                        this.props.user.email.toLowerCase() :
                                                        ''
                                                )}?d=identicon`
                                            }
                                            style={{
                                                width: 30,
                                                height: 30,
                                                marginRight: '0.5rem'
                                            }}>
                                            {this.props.user.first_name[0]}{this.props.user.last_name[0]}
                                        </Avatar>
                                        {this.props.user.first_name} {this.props.user.last_name}
                                    </Button>
                                    <Popper open={this.state.open} anchorEl={this.anchorEl} transition disablePortal>
                                        {({ TransitionProps, placement }) => (
                                            <Grow
                                                {...TransitionProps}
                                                id="menu-list-grow"
                                                style={{
                                                    transformOrigin:
                                                        placement === "bottom" ? "center top" : "center bottom"
                                                }}
                                            >
                                                <Paper>
                                                    <ClickAwayListener onClickAway={this.ToggleMenu}>
                                                        <MenuList color="primary">
                                                            {/* <Link to="/profile"
                                                                onClick={this.ToggleMenu}
                                                                style={{
                                                                    textDecoration: 'none',
                                                                    color: 'inherit'
                                                                }}>
                                                                <MenuItem>
                                                                    Profile
                                                                </MenuItem>
                                                            </Link>
                                                            <Divider /> */}
                                                            <MenuItem onClick={() => {
                                                                this.props.logoutUser()

                                                                return <Redirect to="/" />
                                                            }}>Logout</MenuItem>
                                                        </MenuList>
                                                    </ClickAwayListener>
                                                </Paper>
                                            </Grow>
                                        )}
                                    </Popper>
                                </React.Fragment>
                            )
                    }
                </Toolbar>
            </AppBar >
        )
    }
}

const mapStateToProps = state => ({
    ...state.user
});

export default connect(mapStateToProps, { logoutUser })(Header);