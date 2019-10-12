import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'
import UserInput from './dto/User.input'
import { InjectModel } from 'nestjs-typegoose'
import * as crypto from 'crypto'
import * as argon2 from 'argon2'
import LoginInput from './dto/Login.input'
import { ModelType } from 'typegoose'
import User from '../../db/entities/User'

@Injectable()
export class UserService {
	constructor(@InjectModel(User) private readonly userModels: ModelType<User>) {}

	async registration(userInput: UserInput) {
		const userEntity = UserInput.toEntity(userInput)
		userEntity.activeToken = crypto.randomBytes(48).toString('hex')
		userEntity.password = await argon2.hash(userInput.password)
		userEntity.isActive = false

		const newUser = new this.userModels(userEntity)

		await newUser.save()

		return true
	}

	async login(loginInput: LoginInput) {
		const user = await this.userModels.findOne({ email: loginInput.email })

		if ((await argon2.verify(user.password, loginInput.password)) && user.isActive) {
			return 'token'
		} else {
			throw new UnauthorizedException()
		}
	}

	async activateAccount(token: string) {
		const user = await this.userModels.findOne({ activeToken: token })

		if (!user) {
			throw new NotFoundException()
		}

		user.isActive = true
		await user.save()

		return true
	}
}
