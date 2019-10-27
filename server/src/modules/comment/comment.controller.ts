import { Controller, Put, Delete, Post, Body, Get, Param, HttpCode } from '@nestjs/common'
import CommentInput from './dto/Comment.input'
import { CommentService } from './comment.service'

@Controller('comment')
export class CommentController {
	constructor(private readonly commentService: CommentService) {}

	@Get('')
	async find() {
		return this.commentService.find()
	}

	@Get('/:id')
	async findOne(@Param('id') id: string) {
		return this.commentService.findOne(id)
	}

	@Post('')
	async create(@Body('commentInput') commentInput: CommentInput) {
		return this.commentService.create(commentInput)
	}

	@Put('/:id')
	async update(@Param('id') id: string, @Body('commentInput') commentInput: CommentInput) {
		return this.commentService.update(id, commentInput)
	}

	@Delete('/:id')
	@HttpCode(204)
	async delete(@Param('id') id: string) {
		return this.commentService.delete(id)
	}
}
