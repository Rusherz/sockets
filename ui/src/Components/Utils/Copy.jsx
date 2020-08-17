import React, { Component } from 'react'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import FileCopyIcon from '@material-ui/icons/FileCopy'

export class Copy extends Component {
    render() {
        if (!this.props || !this.props.data) {
            return null
        }

        return (
            <Tooltip title={
                <span style={{
                    fontSize: '16px'
                }}>
                    {this.props.title}
                </span>}
            >
                <IconButton size="small"
                    aria-label={this.props.arialLbale || this.props.title}
                    color="primary"
                    onClick={() => {
                        let ipt = document.createElement("INPUT")
                        ipt.type = "text"
                        ipt.value = this.props.data
                        document.getElementsByTagName('body')[0].appendChild(ipt)
                        ipt.select()
                        document.execCommand('copy')
                        document.getElementsByTagName('body')[0].removeChild(ipt)
                    }}>
                    <FileCopyIcon fontSize="small" />
                </IconButton>
            </Tooltip>
        )
    }
}

export default Copy
