import { Module } from '@nestjs/common'
import { TypegooseModule } from 'nestjs-typegoose'
import { UserModule } from './modules/user/user.module'
import { CommentModule } from './modules/comment/comment.module'
import { MovieModule } from './modules/movie/movie.module'
import { SharedModule } from './shared/shared.module'

@Module({
	imports: [
		TypegooseModule.forRoot(`mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_URL}/${process.env.MONGO_DATABASE_NAME}`), //
		UserModule,
		CommentModule,
		MovieModule,
	],
})
export class AppModule {}
