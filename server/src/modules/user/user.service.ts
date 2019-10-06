import { Injectable } from '@nestjs/common'
import UserInput from './dto/User.input'
import { ModelType } from 'typegoose'
import { InjectModel } from 'nestjs-typegoose'
import User from 'src/db/entities/User'

@Injectable()
export class UserService {
	constructor(@InjectModel(User) private readonly userModel: ModelType<User>) {}

	async registration(userInput: UserInput) {}

	async login() {}

	async activateAccount() {}
}
