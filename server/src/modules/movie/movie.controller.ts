import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common'
import { MovieService } from './movie.service'
import CommentInput from '../comment/dto/Comment.input'
import MovieInput from './dto/Movie.input'

@Controller('movie')
export class MovieController {
	constructor(private readonly movieService: MovieService) {}

	@Get('')
	async find() {
		return this.movieService.find()
	}

	@Get('/:id')
	async findOne(@Param('id') id: string) {
		return this.movieService.findOne(id)
	}

	@Post('')
	async create(@Body() commentInput: MovieInput) {
		return this.movieService.create(commentInput)
	}

	@Put('/:id')
	async update(@Param('id') id: string, @Body() commentInput: MovieInput) {
		return this.movieService.update(id, commentInput)
	}

	@Delete('/:id')
	async delete(@Param() id: string) {
		return this.movieService.delete(id)
	}
}
