import { Controller, Post, Body, Get, Param, UseGuards, Req, Put, Delete, HttpCode, Query } from '@nestjs/common'
import { UserService } from './user.service'
import UserInput from './dto/User.input'
import LoginInput from './dto/Login.input'
import { AuthGuard } from '@nestjs/passport'
import CommentInput from '../comment/dto/Comment.input'

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) { }

	@Post('registration')
	async registration(@Body('userInput') userInput: UserInput) {
		return await this.userService.registration(userInput)
	}

	@Post('login')
	async login(@Body('loginInput') loginInput: LoginInput) {
		return await this.userService.login(loginInput)
	}

	@Post('activeAccount')
	async activeAccount(@Body('token') token: string) {
		return await this.userService.activateAccount(token)
	}

	@Get('')
	async find() {
		return this.userService.find()
	}

	@Get(':id')
	async findOne(@Param('id') id: string) {
		return this.userService.findOne(id)
	}

	// @UseGuards(AuthGuard('jwt'))
	// @Put('/:id')
	// async update(@Param('id') id: string, @Body('commentInput') commentInput: CommentInput) {
	// 	return this.userService.update(id, commentInput)
	// }

	@UseGuards(AuthGuard('jwt'))
	@Delete('/:id')
	@HttpCode(204)
	async delete(@Param('id') id: string) {
		return this.userService.delete(id)
	}
}
