import { IsEmail, Length, IsDate, IsString, IsNotEmpty, IsNumber } from 'class-validator'
import User from '../../../db/entities/User'
import Comment from '../../../db/entities/Comment'
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
	content: string

	@IsNumber()
	@IsNotEmpty()
	likes: number

	@IsNumber()
	@IsNotEmpty()
	dislikes: number

	@IsString()
	@IsNotEmpty()
	videoToken: string

	@IsString()
	@IsNotEmpty()
	pictureUrl: string

	@IsDate()
	@IsNotEmpty()
	updateDate: Date

	static toEntity(movieInput: MovieInput): Movie {
		const movie = new Movie()

		return movie
	}
}
