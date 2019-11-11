import { Controller, Put, Delete, Post, Body, Get, Param, HttpCode, UseGuards } from '@nestjs/common'
import CommentInput from './dto/Comment.input'
import { CommentService } from './comment.service'
import { AuthGuard } from '@nestjs/passport'

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

	@UseGuards(AuthGuard('jwt'))
	@Post('')
	async create(@Body('commentInput') commentInput: CommentInput) {
		return this.commentService.create(commentInput)
	}

	@UseGuards(AuthGuard('jwt'))
	@Put('/:id')
	async update(@Param('id') id: string, @Body('commentInput') commentInput: CommentInput) {
		return this.commentService.update(id, commentInput)
	}

	@UseGuards(AuthGuard('jwt'))
	@Delete('/:id')
	@HttpCode(204)
	async delete(@Param('id') id: string) {
		return this.commentService.delete(id)
	}
}
