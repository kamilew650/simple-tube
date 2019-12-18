import { Injectable, UnauthorizedException, InternalServerErrorException } from '@nestjs/common'
import { InjectModel } from 'nestjs-typegoose'
import Movie from '../../db/entities/Movie'
import { ModelType } from 'typegoose'
import MovieInput from './dto/Movie.input'
import { CloudStorageService } from '../../services/cloud-storage.service'
import User from '../../db/entities/User'
import * as uuid from 'uuid'
import { throwError } from 'rxjs'
import { UserRole } from '../../shared/RoleEnum'

@Injectable()
export class MovieService {
	constructor(
		@InjectModel(Movie) private readonly movieModels: ModelType<Movie>, //
		@InjectModel(User) private readonly userModels: ModelType<User>,
		private readonly cloudStorageService: CloudStorageService,
	) { }

	async find() {
		const movies = await this.movieModels.find().populate('user')

		return movies.map(m => {
			const user = m.user as User
			if (user) {
				user.password = null
				m.user = user
			}
			return m
		})
	}

	async findNew() {
		const movies = await this.movieModels.find().sort({uploadDate: -1}).populate('user')

		return movies.map(m => {
			const user = m.user as User
			if (user) {
				user.password = null
				m.user = user
			}
			return m
		})
	}

	async findOne(id: string) {
		return this.movieModels.findById(id).populate('user')
	}

	async create(movieInput: MovieInput, file: any, userId: string) {
		console.log(uuid)
		const fileToken = uuid.v4()

		const response = await this.cloudStorageService.upload(fileToken, file.buffer)

		console.log(fileToken)

		const movie = MovieInput.toEntity(movieInput)

		const newMovie = new this.movieModels(movie)
		newMovie.likes = 0
		newMovie.dislikes = 0
		newMovie.user = await this.userModels.findById(userId)
		newMovie.uploadDate = new Date()

		if (!newMovie.user) {
			throw new UnauthorizedException()
		}

		newMovie.videoToken = fileToken

		await newMovie.save()

		const { user, ...movieModel } = newMovie

		newMovie.user = user._id as unknown as User

		return newMovie
	}

	async update(id: string, movieInput: MovieInput) {
		return this.movieModels.findOneAndUpdate({ _id: id }, { description: movieInput.description, title: movieInput.title }, { new: true })
	}

	async delete(id: string, userId: string) {
		try {
			const user = await this.userModels.findById(userId)

			if (!user) {
				throw new UnauthorizedException()
			}

			const movie = await this.movieModels.findById(id).populate('user')
			const userFromMovie = movie.user as User

			if (user.role !== 0 && userFromMovie._id.localeCompare(userId) !== 0) {
				throw new UnauthorizedException()
			}

			await this.cloudStorageService.delete(movie.videoToken)

			return this.movieModels.findByIdAndRemove(id)
		} catch (err) {
			console.error(err)
			throw new InternalServerErrorException()
		}
	}
}
