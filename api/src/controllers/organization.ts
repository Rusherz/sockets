import { createClient } from "./node_modules/redis"
import { ServerResponse } from "http"
import { PlanModel } from "../../Utils/Plan"
import { FastifyRequest, FastifyReply, FastifyInstance } from "./node_modules/fastify"
import { OrganizationInterface, OrganizationModel as Organization } from "../../Utils/Organization"

const redisClient = createClient()

redisClient.on("error", function (error: any) {
	console.error(error)
})

async function ChangePlans(
	request: FastifyRequest,
	response: FastifyReply<ServerResponse>
) {
	let organizationId: string = request.params.id
	let planId: string = request.params.planId

	let [organization, plan] = await Promise.all([
		Organization.findOneAndUpdate(
			{
				_id: organizationId,
			},
			{
				plan: planId,
			}
		).exec(),
		PlanModel.findOne({
			_id: planId,
		}).exec(),
	])

	console.log(plan)

	try {
		redisClient.set(organization._id.toString(), JSON.stringify(plan.config))

		// Send what we find
		response.send({
			status: true,
		})
	} catch (error) {
		console.error(error)
		response.send({
			status: false,
			error,
		})
	}

	response.send(organization)
}

async function CreateOrganization(
	request: FastifyRequest,
	response: FastifyReply<ServerResponse>
) {
	let body: OrganizationInterface = request.body

	if (!body) {
		return
	}

	let organization = new Organization(body)

	organization = await organization.save()

	response.send(organization)
}

async function GetOrganization(
	request: FastifyRequest,
	response: FastifyReply<ServerResponse>
) {
	let organizationId: string = request.params.id

	if (!organizationId) {
		return
	}

	let organization = await Organization.findOne({
		_id: organizationId,
	}).exec()

	response.send(organization)
}

async function GetOrganizations(
	request: FastifyRequest,
	response: FastifyReply<ServerResponse>
) {
	// Will be used eventually
	let query: any = {}

	let organizations = await Organization.find(query).exec()

	response.send(organizations)
}

async function UpdateOrganization(
	request: FastifyRequest,
	response: FastifyReply<ServerResponse>
) {
	let organizationId: string = request.params.id
	let body: OrganizationInterface = request.body

	if (!organizationId || !body) {
		return
	}

	await Organization.updateOne(
		{
			_id: organizationId,
		},
		body
	).exec()

	response.send({
		status: true,
	})
}

module.exports = (
	server: FastifyInstance,
	options: any,
	next: CallableFunction
) => {
	server.get("/", GetOrganizations)
	server.post("/", CreateOrganization)

	server.get("/:id", GetOrganization)
	server.post("/:id", UpdateOrganization)
	server.get("/:id/changePlans/:planId", ChangePlans)

	next()
}
