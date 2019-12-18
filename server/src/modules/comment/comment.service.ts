import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common'
import CommentInput from './dto/Comment.input'
import Comment from '../../db/entities/Comment'
import { InjectModel } from 'nestjs-typegoose'
import { ModelType } from 'typegoose'
import User from '../../db/entities/User'
import Movie from '../../db/entities/Movie'

@Injectable()
export class CommentService {
	constructor(
		@InjectModel(Comment) private readonly commentModels: ModelType<Comment>, //
		@InjectModel(User) private readonly userModels: ModelType<User>,
		@InjectModel(Movie) private readonly movieModels: ModelType<Movie>,
	) { }

	async find(movieId: string) {
		return this.commentModels.find({ movie: movieId }).sort({ date: -1 }).populate('user')
	}

	async findOne(id: string) {
		return this.commentModels.findById(id)
	}

	async create(commentInput: CommentInput, userId: string) {
		const comment = CommentInput.toEntity(commentInput)
		comment.date = new Date()
		comment.user = await this.userModels.findById(userId)

		if (!comment.user) {
			throw new UnauthorizedException()
		}

		comment.movie = await this.movieModels.findById(commentInput.movieId)

		if (!comment.movie) {
			throw new NotFoundException('Movie not found')
		}

		const newComment = new this.commentModels(comment)

		return newComment.save()
	}

	async update(id: string, commentInput: CommentInput) {
		return this.commentModels.findOneAndUpdate({ _id: id }, { content: commentInput.content }, { new: true })
	}

	async delete(id: string) {
		return this.commentModels.findByIdAndRemove(id)
	}
}
