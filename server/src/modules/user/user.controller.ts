import { Controller, Post, Body } from '@nestjs/common'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Post('registration')
	async registration(@Body('registrationInput') registrationInput: any) {}

	@Post('login')
	async login(@Body('registrationInput') registrationInput: any) {}

	@Post('activeAccount')
	async activeAccount(@Body('registrationInput') registrationInput: any) {}
}
