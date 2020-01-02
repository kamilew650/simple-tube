import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import UserInput from './dto/User.input'
import { InjectModel } from 'nestjs-typegoose'
import * as crypto from 'crypto'
import * as argon2 from 'argon2'
import LoginInput from './dto/Login.input'
import { ModelType } from 'typegoose'
import User from '../../db/entities/User'
import { UserRole } from '../../shared/RoleEnum'

@Injectable()
export class UserService {
	constructor(
		@InjectModel(User) private readonly userModels: ModelType<User>, //
		private readonly jwtService: JwtService,
	) { }

	async registration(userInput: UserInput) {
		const userEntity = UserInput.toEntity(userInput)
		userEntity.activeToken = crypto.randomBytes(48).toString('hex')
		userEntity.password = await argon2.hash(userInput.password)
		userEntity.isActive = true
		userEntity.role = UserRole.User

		const newUser = new this.userModels(userEntity)

		await newUser.save()

		return true
	}

	async login(loginInput: LoginInput) {
		const user = await this.userModels.findOne({ email: loginInput.email })

		if (user && (await argon2.verify(user.password, loginInput.password)) && user.isActive) {
			const payload = { email: user.email, _id: user._id }
			return {
				access_token: this.jwtService.sign(payload),
				email: user.email,
				_id: user._id,
				role: user.role,
			}
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

	async findOneByLogin(login: string): Promise<User | undefined> {
		const user = await this.userModels.findOne(u => u.login === login)
		user.password = null
		return user
	}

	async findOne(id: string): Promise<User | undefined> {
		const user = await this.userModels.findById(id)
		if (user) {
			user.password = null
		}
		return user
	}

	async find() {
		const users = await this.userModels.find()

		return users.map(user => {
			user.password = null
			return user
		})
	}

	// async update(id: string, commentInput: UserInput) {
	// 	return this.userModels.findOneAndUpdate({ _id: id }, { content: commentInput.content }, { new: true })
	// }

	async delete(id: string) {
		return this.userModels.findByIdAndRemove(id)
	}
}
