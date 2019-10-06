import { IsEmail, Length, IsDate } from 'class-validator'
import User from 'src/db/entities/User'

export default class UserInput {
	@IsEmail()
	email: string

	@Length(4, 16)
	password: string

	phone: string

	firstName: string

	lastName: string

	activeToken: string

	@IsDate()
	birthDate: Date

	toEntity(): User {
		const user = new User()

		user.birthDate = this.birthDate
		user.email = this.email
		user.firstName = this.email
		user.lastName = this.lastName
		user.password = this.password
		user.phone = this.phone

		return user
	}
}
