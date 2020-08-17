import { Schema, Document, model } from "mongoose"
import { UserInterface, UserModel } from "./User"
import { PlanInterface, PlanModel } from "./Plan"

export interface Api {
	key: string
	secret: string
}

export interface OrganizationInterface extends Document {
	name: string
	description?: string

	users: UserInterface[]

	api?: Api

	plan?: string
}

const OrganizationSchema: Schema = new Schema({
	name: { type: String, required: true },
	description: { type: String },

	users: { type: [typeof UserModel], required: true },

	api: {
		type: {
			key: {
				type: String,
				required: true,
			},
			secret: {
				type: String,
				required: true,
			},
		},
	},

	plan: { type: Schema.Types.ObjectId, ref: 'Plan' },
})

// Export the model and return your OrganizationInterface interface
export const OrganizationModel = model<OrganizationInterface>("Organization", OrganizationSchema)
