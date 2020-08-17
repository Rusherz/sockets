import { ServerResponse } from "http"
import { FastifyRequest, FastifyReply, FastifyInstance } from "./node_modules/fastify"

async function sendEvent(
	request: FastifyRequest,
	response: FastifyReply<ServerResponse>
) {
	// Send what we find
	response.send({})
}

module.exports = (
	server: FastifyInstance,
	options: any,
	next: CallableFunction
) => {
	// Get a user by ID
	server.post("/", sendEvent)

	next()
}
