import { Injectable, UnauthorizedException, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { InjectModel } from 'nestjs-typegoose'
import Movie from '../../db/entities/Movie'
import { ModelType } from 'typegoose'
import MovieInput from './dto/Movie.input'
import { CloudStorageService } from '../../services/cloud-storage.service'
import User from '../../db/entities/User'
import * as uuid from 'uuid'
import { throwError } from 'rxjs'
import { UserRole } from '../../shared/RoleEnum'
import Like from '../../db/entities/Like'
import LikeInput from './dto/Like.input'

@Injectable()
export class MovieService {
	constructor(
		@InjectModel(Movie) private readonly movieModels: ModelType<Movie>, //
		@InjectModel(User) private readonly userModels: ModelType<User>,
		@InjectModel(Like) private readonly likeModels: ModelType<Like>,
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
		const movies = await this.movieModels.find().sort({ uploadDate: -1 }).populate('user')

		return movies.map(m => {
			const user = m.user as User
			if (user) {
				user.password = null
				m.user = user
			}
			return m
		})
	}

	async findNewForUser(userId: string) {
		const movies = await this.movieModels.find({ user: userId }).sort({ uploadDate: -1 }).populate('user')

		return movies.map(m => {
			const user = m.user as User
			if (user) {
				user.password = null
				m.user = user
			}
			return m
		})
	}

	async findByWord(word: string) {
		const movies = await this.movieModels.find({ title: { $regex: '.*' + word + '.*' } }).sort({ uploadDate: -1 }).populate('user')

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
		const fileToken = uuid.v4()

		const response = await this.cloudStorageService.upload(fileToken, file.buffer)

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

	async createLike(likeInput: LikeInput, userId: string) {

		const likeToUpdate = await this.likeModels.findOne({ user: userId, movie: likeInput.movieId })

		const like = new Like()

		const newLike = new this.likeModels(like)
		newLike.like = likeInput.like
		newLike.user = await this.userModels.findById(userId)
		newLike.movie = await this.movieModels.findById(likeInput.movieId)

		if (!newLike.user) {
			throw new UnauthorizedException()
		}

		if (!newLike.movie) {
			throw new NotFoundException()
		}

		await newLike.save()

		const likes = await this.movieModels.count({ movie: likeInput.movieId, like: true })
		const dislikes = await this.movieModels.count({ movie: likeInput.movieId, like: false })

		const movie = await this.movieModels.findByIdAndUpdate({ _id: likeInput.movieId }, { $set: { likes: likes, dislikes: dislikes } })

		return movie
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
