import { Typegoose, prop } from 'typegoose'
import { UserRole } from '../../shared/RoleEnum'

export default class User extends Typegoose {
	_id: string

	@prop({ required: true, unique: true })
	email: string

	@prop({ required: true })
	password: string

	@prop()
	phone: string

	@prop({ default: false })
	isActive: boolean

	@prop({ default: UserRole.User })
	role: UserRole

	@prop()
	firstName: string

	@prop()
	lastName: string

	@prop()
	activeToken: string

	@prop()
	birthDate: Date
}
