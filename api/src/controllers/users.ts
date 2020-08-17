import { UserModel as User, UserInterface } from "../Utils/User"
import { Router, Request, Response } from "express"

export default class UsersController {
	[x: string]: any

	public basePath = "/users"
	public router = Router()

	private posts: UserInterface[] = []

	constructor() {
		this.intializeRoutes()
	}

	public intializeRoutes() {
		let routes = [
			{
				path: "/",
				method: "post",
				function: "CreateUser",
			},
			{
				path: "/",
				method: "get",
				function: "GetUser",
			},
			{
				path: "/:id",
				method: "post",
				function: "UpdateUser",
			},
		]

		routes.map((route) => {
			let path = `${this.basePath}${route.path ?? ''}`

			switch (route.method) {
				case "get":
					this.router.get(
						path,
						this[route.function]
					)
					break
				case "post":
					this.router.get(
						path,
						this[route.function]
					)
					break
			}
		})
	}

	async GetUser(request: Request, response: Response) {
		let userId: string = request.params.id
	
		let user = await User.findOne({
			_id: userId,
		})
	
		response.send({
			user,
		})
	}
	
	async CreateUser(request: Request, response: Response) {
		let user: UserInterface = new User(request.body)
	
		user = await user.save()
	
		response.send(user)
	}
	
	async UpdateUser(request: Request, response: Response) {
		let body: UserInterface = request.body
	
		await User.updateOne({
			_id: request.params.id
		}, body).exec()
	
		response.send({
			status: true
		})
	}
}