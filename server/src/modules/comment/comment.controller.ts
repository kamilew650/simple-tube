import { Controller, Put, Delete, Post, Body } from '@nestjs/common'

@Controller('comment')
export class CommentController {
	@Post('')
	async create() {
		return null
	}

	@Put('')
	async update() {
		return null
	}

	@Delete('')
	async delete() {
		return null
	}
}
