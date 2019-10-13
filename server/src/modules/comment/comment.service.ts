import { Injectable } from '@nestjs/common'
import CommentInput from './dto/Comment.input'
import Comment from '../../db/entities/Comment'
import { InjectModel } from 'nestjs-typegoose'
import { ModelType } from 'typegoose'

@Injectable()
export class CommentService {
	constructor(@InjectModel(Comment) private readonly commentModels: ModelType<Comment>) {}

	async create(commentInput: CommentInput) {
		const comment = CommentInput.toEntity(commentInput)

		const newComment = new this.commentModels(comment)

		return newComment.save()
	}

	async update(commentInput: CommentInput) {
		return null
	}

	async delete() {
		return null
	}
}
