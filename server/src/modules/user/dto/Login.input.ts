import { IsEmail, Length, IsDate } from 'class-validator'

export default class LoginInput {
	@IsEmail()
	email: string

	@Length(4, 16)
	password: string
}
