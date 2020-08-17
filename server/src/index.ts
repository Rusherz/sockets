import * as Url from "url"
import * as Http from "http"
import { Socket } from "net"
import * as redis from "redis"
import * as WebSocket from "ws"
import Server from "./classes/Server"

const server = Http.createServer()
const PORT = process.env.PORT || 8080
const redisClient = redis.createClient()

redisClient.on("error", function (error: any) {
	console.error(error)
})

let socketServers = new Map<string, Server>()

async function IsValidKey(key: string) {
	return await new Promise((resolve, reject) => {
		redisClient.get(key, (error: Error, reply: any) => {
			if (error) {
				console.error(error)

				reject(error)
				return
			}

			try {
				resolve(JSON.parse(reply))
			} catch (error) {
				reject(error)
			}
		})
	})
}

setInterval(() => {
	for(let [key, socketServer] of socketServers){
		let config = IsValidKey(key)

		if (!config) {
			socketServer.wss.close()
		}

		if (JSON.stringify(config) != JSON.stringify(socketServer.config)) {
			socketServer.config = config
		}
	}
}, 5 * 60 * 1000)

server.on("upgrade", async function upgrade(request, socket: Socket, head) {
	let url = Url.parse(request.url, true)

	let userId = url.query.id
	let pathname = url.pathname
		? url.pathname.split("/").filter((x) => x != "")[0]
		: null

	if (!pathname) {
		socket.write("HTTP/1.1 404 Not found")
		socket.destroy()

		return
	}

	let config = await IsValidKey(pathname)

	if (!config) {
		socket.write("HTTP/1.1 401 Unauthorized")
		socket.destroy()

		return
	}

	request.userId = userId
	request.serverId = pathname

	let socketServer: Server

	if (!socketServers.has(pathname)) {
		socketServer = new Server(
			new WebSocket.Server({
				noServer: true,
			}),
			config
		)

		socketServers.set(pathname, socketServer)
	} else {
		socketServer = socketServers.get(pathname)
	}

	socketServer.wss.handleUpgrade(request, socket, head, function done(
		ws: WebSocket
	) {
		socketServer.wss.emit("connection", ws, request)
	})

	socketServers.set(pathname, socketServer)
})

server.listen(PORT, () => {
	console.log(`Server started on port ${PORT}...`)
})
