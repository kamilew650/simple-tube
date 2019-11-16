import { IsString, IsNotEmpty, IsNumber, IsDateString } from 'class-validator'
import Movie from '../../../db/entities/Movie'

export default class MovieInput {
	@IsString()
	@IsNotEmpty()
	title: string

	@IsString()
	@IsNotEmpty()
	description: string

	@IsString()
	@IsNotEmpty()
	videoToken: string

	@IsString()
	@IsNotEmpty()
	pictureUrl: string

	@IsDateString()
	@IsNotEmpty()
	uploadDate: Date

	static toEntity(movieInput: MovieInput): Movie {
		const movie = new Movie()
		movie.uploadDate = movieInput.uploadDate
		movie.title = movieInput.title
		movie.videoToken = movieInput.videoToken
		movie.pictureUrl = movieInput.pictureUrl
		movie.description = movieInput.description
		movie.title = movieInput.title

		return movie
	}
}
