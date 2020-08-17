import { ServerResponse } from "http"
import { PlanModel as Plan, PlanInterface } from "../../Utils/Plan"
import { FastifyRequest, FastifyReply, FastifyInstance } from "./node_modules/fastify"

async function CreatePlan(
	request: FastifyRequest,
	response: FastifyReply<ServerResponse>
) {
	try {
		let body: PlanInterface = request.body

		if (!body) {
			return
		}

		let plan = new Plan(body)

		plan = await plan.save()

		response.send(plan)
	} catch (error) {
		console.error(error)

		response.send({
			status: false,
			error,
		})
	}
}

async function GetPlan(
	request: FastifyRequest,
	response: FastifyReply<ServerResponse>
) {
	let planId = request.params.id

	let plan = await Plan.findOne({
		_id: planId
	}).exec()

	response.send(plan)
}

async function GetPlans(
	request: FastifyRequest,
	response: FastifyReply<ServerResponse>
) {
	let query = {}
	let plans = await Plan.find(query).exec()

	response.send(plans)
}

async function UpdatePlan(
	request: FastifyRequest,
	response: FastifyReply<ServerResponse>
) {
	let planId: string = request.params.id
	let body: PlanInterface = request.body

	if (!planId || !body) {
		return
	}

	let plan = await Plan.updateOne(
		{
			_id: planId,
		},
		body
	).exec()

	response.send(plan)
}

module.exports = (
	server: FastifyInstance,
	options: any,
	next: CallableFunction
) => {
	server.get("/", GetPlans)
	server.post("/", CreatePlan)

	server.get("/id:", GetPlan)
	server.post("/:id", UpdatePlan)
	next()
}
