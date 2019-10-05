import { Module } from '@nestjs/common'
import { TypegooseModule } from 'nestjs-typegoose'
import User from './entities/User'
import Movie from './entities/Movie'

@Module({
	imports: [TypegooseModule.forFeature([User, Movie, Comment])],
})
export class DbModule {}
