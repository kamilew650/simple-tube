import { Injectable } from '@nestjs/common'
import { InjectModel } from 'nestjs-typegoose'
import Movie from '../../db/entities/Movie'
import { ModelType } from 'typegoose'
import MovieInput from './dto/Movie.input'

@Injectable()
export class MovieService {
	constructor(@InjectModel(Movie) private readonly movieModels: ModelType<Movie>) {}

	async find() {
		return this.movieModels.find()
	}

	async findOne(id: string) {
		return this.movieModels.findById(id)
	}

	async create(movieInput: MovieInput) {
		const movie = MovieInput.toEntity(movieInput)

		const newMovie = new this.movieModels(movie)

		return newMovie.save()
	}

	async update(id: string, movieInput: MovieInput) {
		return this.movieModels.findOneAndUpdate({ _id: id }, { content: movieInput.content }, { new: true })
	}

	async delete(id: string) {
		return this.movieModels.findByIdAndRemove({ _id: id })
	}
}
