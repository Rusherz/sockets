import { hashSync, compareSync } from "bcryptjs"
import { Schema, Document, model, HookSyncCallback, Aggregate } from "mongoose"

export enum RoleEnum {
	Admin = "admin",
	User = "user",
	Guest = "guest",
}

export interface UserInterface extends Document {
	[x: string]: any
	
	firstName: string
	lastName: string
	
	username: string
	email: string
	password: string
	
	roles: RoleEnum[]
}

const UserSchema: Schema = new Schema({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },

	username: { type: String, required: true, unique: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },

	roles: { type: [typeof RoleEnum] }
})

UserSchema.pre("save", function(this: UserInterface, next) {
	if (this.isNew) {
		this.password = hashSync(this.password)
	}

	next()
})

UserSchema.method('ValidPassword', function(this: UserInterface, guess: string) {
	return compareSync(guess, this.password)
})

// Export the model and return your UserInterface interface
export const UserModel =  model<UserInterface>("User", UserSchema)