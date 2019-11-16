import { IsNotEmpty, IsDateString } from 'class-validator'
import Comment from '../../../db/entities/Comment'

export default class CommentInput {
	@IsNotEmpty()
	movieId: string

	@IsNotEmpty()
	content: string

	@IsDateString()
	date: Date

	static toEntity(commentInput: CommentInput): Comment {
		const comment = new Comment()
		comment.content = commentInput.content

		return comment
	}
}
