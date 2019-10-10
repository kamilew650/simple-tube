import { IsEmail, Length, IsDate } from 'class-validator'
import User from 'src/db/entities/User'

export default class LoginInput {
	@IsEmail()
	email: string

	@Length(4, 16)
	password: string
}
