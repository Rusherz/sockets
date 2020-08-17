import { Schema, Document, model } from "mongoose"

export interface ConfigInterface {
	maxClients: number
	burstLimit: number
	burstResetTime: number
}

export interface PlanInterface extends Document {
	name: string
	description?: string
	price: number

	config: ConfigInterface
}

const PlanSchema: Schema = new Schema({
	name: { type: String, required: true },
	description: { type: String },

	price: { type: Number, required: true },

	config: {
		maxClients: { type: Number, required: true },
		burstLimit: { type: Number, required: true },
		burstResetTime: { type: Number, required: true },
	},
})

// Export the model and return your PlanInterface interface
export const PlanModel = model<PlanInterface>("Plan", PlanSchema)
