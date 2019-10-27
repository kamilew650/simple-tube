import { Module } from '@nestjs/common'
import { MovieService } from './movie.service'
import { MovieController } from './movie.controller'
import { DbModule } from '../../db/db.module'

@Module({
	imports: [DbModule],
	providers: [MovieService],
	controllers: [MovieController],
})
export class MovieModule {}
