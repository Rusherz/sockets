import React from "react"
import Socket from "SocketPro"
import { bindActionCreators } from "redux"
import { connect, DispatchProp } from "react-redux"

export interface ChatProps {
	socket?: Socket
}

export class Chat extends React.Component<ChatProps, any> {
	constructor(props: ChatProps){
		super(props)

		this.state = {
			socket: new Socket()
		}

		this.state.socket.Listen("asd", (e: string) => console.log(e))
	}
	render() {
		console.log(Socket)
		return <div></div>
	}
}

const ChatDispatchToProps = (dispatch: DispatchProp) => {
	return {
		// action: bindActionCreators(action, dispatch),
	}
}

export default connect(null, ChatDispatchToProps)(Chat)
