import Client from "./Client"
import { SpRequest } from "../Interfaces/Request"
import { SpWebSocket } from "../Interfaces/WebSocket"

export default class Server {
	public wss: any
	public config: any
	public clients: Client[]

	private burstLimit: number
	private ping: NodeJS.Timeout
	private burstLimitReset: NodeJS.Timeout

	constructor(wss: any, config: any, clients: Client[] = []) {
		this.wss = wss
		this.config = config
		this.clients = clients
		this.burstLimit = this.config.burstLimit

		this.ping = setInterval(() => {
			for (let client of this.clients) {
				if (client.connection.isAlive === false) {
					return client.connection.terminate()
				}

				client.connection.isAlive = false

				console.log(`Pinging client: ${client.Id}`)

				client.connection.send(JSON.stringify({ type: "ping", id: client.Id }))
			}
		}, this.config.pingTimer * 1000)

		this.burstLimitReset = setInterval(() => {
			this.burstLimit = this.config.burstLimit
		}, this.config.burstResetTime * 60 * 1000)

		this.wss.on(
			"connection",
			(connection: SpWebSocket, request: SpRequest) => {
				this.OnConnection(connection, request)
			}
		)
	}

	OnChannel(request: SpRequest, event: any) {
		for (let client of this.clients) {
			if (client.Id != request.userId) {
				continue
			}

			if (event.new) {
				client.channels.push(event.channel)
			} else {
				let index = client.channels.indexOf(event.data.channel)

				if (index) {
					client.channels.splice(index, 1)
				}
			}
		}
	}

	OnClose(request: SpRequest) {
		console.log(
			new Date() + " Peer " + request.headers.host + " disconnected."
		)

		// remove user from the list of connected clients
		let index = -1

		for (let i: number = 0; i < this.clients.length; i++) {
			if (this.clients[i].Id != request.userId) {
				continue
			} else {
				break
			}
		}

		if (index != -1) {
			this.clients.splice(index, 1)
		}
	}

	OnConnection(connection: SpWebSocket, request: SpRequest) {
		console.log(
			new Date() + " Connection from origin " + request.headers.host + "."
		)

		connection.isAlive = true

		let client = new Client(request.userId, connection)

		console.log(new Date() + " Connection accepted.")

		// user disconnected
		client.connection.on("close", () => {
			this.OnClose(request)
		})

		// when the client is sent some event
		client.connection.on("message", (event: any) => {
			this.OnMessage(request, event)
		})

		this.clients.push(client)
	}

	OnEvent(event: any, data: any) {
		let count = 0

		if (event.type == "pong") {
			for (let client of this.clients) {
				if (client.Id == event.id) {
					client.connection.isAlive = true

					return
				}
			}
		}

		// broadcast event to all connected clients
		for (let client of this.clients) {
			if (
				event.channels.some(
					(channel: string) => client.channels.indexOf(channel) != -1
				) &&
				client.Id != event.id
			) {
				if (count == this.config.maxClients && this.burstLimit <= 0) {
					break
				} else if (count > this.config.maxClients - 1) {
					this.burstLimit--
				}

				client.connection.send(
					JSON.stringify({
						data,
						type: "event",
						clientId: client.Id,
					})
				)

				count++
			}
		}
	}

	OnMessage(request: SpRequest, event: any) {
		let data
		;[event, data] = this.ParseAndLog(event)

		switch (event.type) {
			case "channel":
				this.OnChannel(request, event.data)
				break
			default:
				this.OnEvent(event, data)
		}
	}

	ParseAndLog(event: any): any {
		event = JSON.parse(event)

		// TODO: Maybe?
		// we want to keep history of all sent events
		let data = {
			time: new Date().getTime(),
			channels: event.channels,
			data: event.data,
		}

		return [event, data]
	}
}
