import { Injectable, UnauthorizedException } from '@nestjs/common'
import { InjectModel } from 'nestjs-typegoose'
import Movie from '../../db/entities/Movie'
import { ModelType } from 'typegoose'
import MovieInput from './dto/Movie.input'
import { CloudStorageService } from '../../services/cloud-storage.service'
import User from '../../db/entities/User'
import * as uuid from 'uuid'

@Injectable()
export class MovieService {
	constructor(
		@InjectModel(Movie) private readonly movieModels: ModelType<Movie>, //
		@InjectModel(User) private readonly userModels: ModelType<User>,
		private readonly cloudStorageService: CloudStorageService,
	) { }

	async find() {
		return this.movieModels.find()
	}

	async findOne(id: string) {
		return this.movieModels.findById(id)
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

		return newMovie.save()
	}

	async update(id: string, movieInput: MovieInput) {
		return this.movieModels.findOneAndUpdate({ _id: id }, { description: movieInput.description }, { new: true })
	}

	async delete(id: string) {
		return this.movieModels.findByIdAndRemove(id)
	}
}
