import { Module } from '@nestjs/common'
import { CommentService } from './comment.service'
import { CommentController } from './comment.controller'
import { DbModule } from '../../db/db.module'

@Module({
	imports: [DbModule],
	providers: [CommentService],
	controllers: [CommentController],
})
export class CommentModule {}
