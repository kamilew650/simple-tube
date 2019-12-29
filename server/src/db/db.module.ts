import { Module } from '@nestjs/common'
import { TypegooseModule } from 'nestjs-typegoose'
import User from './entities/User'
import Movie from './entities/Movie'
import Comment from './entities/Comment'
import Like from './entities/Like'

@Module({
	imports: [TypegooseModule.forFeature([User, Movie, Comment, Like])],
	exports: [TypegooseModule.forFeature([User, Movie, Comment, Like])],
})
export class DbModule { }
