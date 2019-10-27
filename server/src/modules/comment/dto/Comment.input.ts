import { IsNotEmpty, IsDateString } from 'class-validator'
import Comment from '../../../db/entities/Comment'

export default class CommentInput {
	@IsNotEmpty()
	user: string

	@IsNotEmpty()
	movie: string

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
