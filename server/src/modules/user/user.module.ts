import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { TypegooseModule } from 'nestjs-typegoose'
import User from '../../db/entities/User'
import { DbModule } from '../../db/db.module'
import { JwtModule } from '@nestjs/jwt'

@Module({
	imports: [
		DbModule,
		JwtModule.register({
			secret: 'secretBardzo',
			signOptions: { expiresIn: '60s' },
		}),
	],
	providers: [UserService],
	controllers: [UserController],
})
export class UserModule {}
