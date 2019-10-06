import { Controller, Post, Body } from '@nestjs/common'
import { UserService } from './user.service'
import UserInput from './dto/User.input'

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Post('registration')
	async registration(@Body('userInput') userInput: UserInput) {
		return await this.userService.registration(userInput)
	}

	@Post('login')
	async login(@Body('loginInput') loginInput: any) {
		return await this.userService.login()
	}

	@Post('activeAccount')
	async activeAccount(@Body('token') token: string) {
		return await this.userService.activateAccount()
	}
}
