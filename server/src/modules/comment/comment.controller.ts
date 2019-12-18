import { Controller, Put, Delete, Post, Body, Get, Param, HttpCode, UseGuards, Req, Query } from '@nestjs/common'
import CommentInput from './dto/Comment.input'
import { CommentService } from './comment.service'
import { AuthGuard } from '@nestjs/passport'

@Controller('comment')
export class CommentController {
	constructor(private readonly commentService: CommentService) { }

	@Get('')
	async find(@Query('movieId') movieId: string) {
		return this.commentService.find(movieId)
	}

	@Get('/:id')
	async findOne(@Param('id') id: string) {
		return this.commentService.findOne(id)
	}

	@UseGuards(AuthGuard('jwt'))
	@Post('')
	async create(@Body('commentInput') commentInput: CommentInput, @Req() request) {
		return this.commentService.create(commentInput, request.user ? request.user._id : '')
	}

	@UseGuards(AuthGuard('jwt'))
	@Put('/')
	async update(@Body('commentInput') commentInput: CommentInput) {
		return this.commentService.update(commentInput._id, commentInput)
	}

	@UseGuards(AuthGuard('jwt'))
	@Delete('/:id')
	@HttpCode(204)
	async delete(@Param('id') id: string) {
		return this.commentService.delete(id)
	}
}
