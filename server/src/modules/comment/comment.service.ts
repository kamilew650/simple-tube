import { Injectable } from '@nestjs/common'
import CommentInput from './dto/Comment.input'
import Comment from '../../db/entities/Comment'
import { InjectModel } from 'nestjs-typegoose'
import { ModelType } from 'typegoose'
import User from '../../db/entities/User'
import Movie from '../../db/entities/Movie'

@Injectable()
export class CommentService {
	constructor(@InjectModel(Comment) private readonly commentModels: ModelType<Comment>) {}

	async find() {
		return this.commentModels.find()
	}

	async findOne(id: string) {
		return this.commentModels.findById(id)
	}

	async create(commentInput: CommentInput) {
		const comment = CommentInput.toEntity(commentInput)
		comment.date = commentInput.date
		comment.user = (commentInput.user as unknown) as User
		comment.movie = (commentInput.movie as unknown) as Movie

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
