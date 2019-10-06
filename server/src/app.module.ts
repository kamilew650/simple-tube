import { Module } from '@nestjs/common'
import { TypegooseModule } from 'nestjs-typegoose'

@Module({
	imports: [TypegooseModule.forRoot(`mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_URL}/${process.env.MONGO_DATABASE_NAME}`)],
})
export class AppModule {}
