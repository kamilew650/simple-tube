import { IsString, IsNotEmpty, IsNumber, IsDateString } from 'class-validator'
import Movie from '../../../db/entities/Movie'

export default class MovieInput {
	_id?: string

	@IsString()
	@IsNotEmpty()
	title: string

	@IsString()
	@IsNotEmpty()
	description: string

	static toEntity(movieInput: MovieInput): Movie {
		const movie = new Movie()
		movie.title = movieInput.title
		movie.description = movieInput.description
		movie.title = movieInput.title

		return movie
	}
}
