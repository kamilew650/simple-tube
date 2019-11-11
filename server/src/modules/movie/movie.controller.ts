import { Controller, Get, Param, Post, Body, Put, Delete, UseGuards, Request } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { MovieService } from './movie.service'
import CommentInput from '../comment/dto/Comment.input'
import MovieInput from './dto/Movie.input'

@Controller('movie')
export class MovieController {
	constructor(private readonly movieService: MovieService) {}

	@Get('')
	async find(@Request() req) {
		return this.movieService.find()
	}

	@Get('/:id')
	async findOne(@Param('id') id: string) {
		return this.movieService.findOne(id)
	}

	@UseGuards(AuthGuard('jwt'))
	@Post('')
	async create(@Body('movieInput') movieInput: MovieInput) {
		return this.movieService.create(movieInput)
	}

	@UseGuards(AuthGuard('jwt'))
	@Put('/:id')
	async update(@Param('id') id: string, @Body('movieInput') movieInput: MovieInput) {
		return this.movieService.update(id, movieInput)
	}

	@UseGuards(AuthGuard('jwt'))
	@Delete('/:id')
	async delete(@Param('id') id: string) {
		return this.movieService.delete(id)
	}
}
