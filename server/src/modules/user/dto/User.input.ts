import { IsEmail, Length, IsDateString } from 'class-validator'
import User from '../../../db/entities/User'

export default class UserInput {
	@IsEmail()
	email: string

	@Length(4, 16)
	password: string

	phone: string

	firstName: string

	lastName: string

	activeToken: string

	@IsDateString()
	birthDate: Date

	static toEntity(userInput: UserInput): User {
		const user = new User()

		user.birthDate = userInput.birthDate
		user.email = userInput.email
		user.firstName = userInput.firstName
		user.lastName = userInput.lastName
		user.phone = userInput.phone

		return user
	}
}
