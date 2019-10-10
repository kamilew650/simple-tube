import { Injectable } from '@nestjs/common'
import UserInput from './dto/User.input'
import { InjectModel } from 'nestjs-typegoose'
import User from 'src/db/entities/User'
import * as crypto from 'crypto'
import * as argon2 from 'argon2'
import LoginInput from './dto/Login.input'
import { ModelType } from 'typegoose'

@Injectable()
export class UserService {
	constructor(@InjectModel(User) private readonly userModels: ModelType<User>) {}

	async registration(userInput: UserInput) {
		const userEntity = userInput.toEntity()

		userEntity.activeToken = crypto.randomBytes(48).toString('hex')
		userEntity.password = await argon2.hash(userInput.password)
		userEntity.isActive = false

		const newUser = new this.userModels(userEntity)

		return newUser.save()
	}

	async login(loginInput: LoginInput) {
		const hashPassword = await argon2.hash(loginInput.password)

		const user = await this.userModels.find({ email: loginInput.email })
		if (user.password.localCompare(hashPassword) === 0) {
			// ok
		} else {
			//nope
		}
	}

	async activateAccount() {}
}
