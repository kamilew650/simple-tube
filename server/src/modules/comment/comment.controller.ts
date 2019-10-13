import { Controller, Put, Delete, Post, Body, Get } from '@nestjs/common'
import CommentInput from './dto/Comment.input'

@Controller('comment')
export class CommentController {
	@Get('')
	async find(@Body() commentInput: CommentInput) {
		return null
	}

	@Get('/:id')
	async findOne() {
		return null
	}

	@Post('')
	async create(@Body() commentInput: CommentInput) {
		return null
	}

	@Put('')
	async update(@Body() commentInput: CommentInput) {
		return null
	}

	@Delete('')
	async delete(@Body() id: string) {
		return null
	}
}
