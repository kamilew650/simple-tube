import { Controller, Get, Param, Post, Body, Put, Delete, UseGuards, Request, UseInterceptors, UploadedFile } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { MovieService } from './movie.service'
import MovieInput from './dto/Movie.input'
import { FileInterceptor } from '@nestjs/platform-express'

@Controller('movie')
export class MovieController {
	constructor(private readonly movieService: MovieService) { }

	@Get('')
	async find() {
		return this.movieService.find()
	}

	@Get('/new')
	async findNew() {
		return this.movieService.findNew()
	}

	@Get('/:id')
	async findOne(@Param('id') id: string) {
		return this.movieService.findOne(id)
	}

	@UseGuards(AuthGuard('jwt'))
	@UseInterceptors(FileInterceptor('file'))
	@Post('')
	async create(@Body('movieInput') movieInputString: string, @UploadedFile() file, @Request() req) {
		const movieInput = JSON.parse(movieInputString) as MovieInput
		return this.movieService.create(movieInput, file, req.user ? req.user._id : '')
	}

	@UseGuards(AuthGuard('jwt'))
	@Put('')
	async update(@Body('movieInput') movieInput: MovieInput) {
		return this.movieService.update(movieInput._id, movieInput)
	}

	@UseGuards(AuthGuard('jwt'))
	@Delete('/:id')
	async delete(@Param('id') id: string, @Request() req) {
		return this.movieService.delete(id, req.user ? req.user._id : '')
	}
}
