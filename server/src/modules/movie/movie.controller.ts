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
	async create(@Body('movieInput') movieInput: MovieInput) {
		return this.movieService.create(movieInput)
	}

	@Put('/:id')
	async update(@Param('id') id: string, @Body('movieInput') movieInput: MovieInput) {
		return this.movieService.update(id, movieInput)
	}

	@Delete('/:id')
	async delete(@Param('id') id: string) {
		return this.movieService.delete(id)
	}
}
