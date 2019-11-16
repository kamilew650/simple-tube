import { Module } from '@nestjs/common'
import { MovieService } from './movie.service'
import { MovieController } from './movie.controller'
import { DbModule } from '../../db/db.module'
import { ServiceModule } from '../../services/service.module'

@Module({
	imports: [DbModule, ServiceModule],
	providers: [MovieService],
	controllers: [MovieController],
})
export class MovieModule {}
