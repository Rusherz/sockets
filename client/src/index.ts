import { uuid } from "uuidv4"
import * as WebSocket from "isomorphic-ws"
import { Action } from "./Interfaces/Action"

export default class Socket {
	private heartbeat: any

	private id: string = uuid()

	private events: string[] = []
	private channels: string[] = []

	private pingTimerSeconds: number

	private socket: WebSocket = null

	private onEvent: Map<string, Action[]> = new Map<string, Action[]>()

	constructor(pingTimerSeconds: number = 30) {
		this.socket = new WebSocket(
			// `wss://socket.socketpro.ca/1234?id=${this.id}`
			`ws://localhost:8080/1234?id=${this.id}`
		)

		this.socket.onopen = () => this.OnOpen
		this.pingTimerSeconds = pingTimerSeconds
		this.socket.onerror = (error: any) => this.OnError(error)
		this.socket.onmessage = (event: any) => this.OnEvent(event)
	}

	public set Channel(channel: string) {
		let index = this.channels.indexOf(channel)

		if (index == -1) {
			this.channels.push(channel)
		} else {
			this.channels.splice(index, 1)
		}

		this.socket.emit(
			"channel",
			JSON.stringify({
				channel,
				new: true,
			})
		)
	}

	public get Channels(): string[] {
		return this.channels
	}

	Heartbeat() {
		clearTimeout(this.heartbeat)

		this.heartbeat = setTimeout(() => {
			this.socket.terminate()
		}, (this.pingTimerSeconds + 1) * 1000)
	}

	public Listen(channel: string, action: Action) {
		if (!this.onEvent.has(channel)) {
			this.onEvent.set(channel, [action])

			console.log(123)

			this.Send({
				type: "channel",
				data: {
					channel,
					new: true,
				},
			})

			return
		}

		let actions = this.onEvent.get(channel)

		let index = actions.indexOf(action)

		if (index == -1) {
			actions.push(action)
		} else {
			actions.splice(index, 1)
		}

		this.onEvent.set(channel, actions)

		this.Send({
			type: "channel",
			data: {
				channel,
				new: index == -1,
			},
		})
	}

	OnError(error: any) {
		console.error(error)
	}

	OnEvent(event: any) {
		let json = JSON.parse(event.data)

		if (json.clientId != this.id) {
			return
		}

		if (json.type == "ping") {
			this.Send({
				type: "pong",
			})

			this.Heartbeat()

			return
		}

		if (this.onEvent) {
			for (let [channel, actions] of this.onEvent) {
				for (let action of actions) {
					action(json)
				}
			}
		}
	}

	OnOpen() {
		console.log("Connection opened")
	}

	public get ReadyState(): number {
		return this.socket.readyState
	}

	public Send(event: Object) {
		try {
			if (this.socket.readyState != 1) {
				return
			}

			this.socket.send(
				JSON.stringify({
					id: this.id,
					...event,
				})
			)
		} catch (error) {
			console.error("Error stringify'ing event", error, event)
		}
	}

	Socket(): WebSocket {
		return this.socket
	}
}
