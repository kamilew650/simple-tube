import { IsNotEmpty, IsDateString } from 'class-validator'
import Comment from '../../../db/entities/Comment'

export default class CommentInput {
	_id?: string

	@IsNotEmpty()
	movieId: string

	@IsNotEmpty()
	content: string

	static toEntity(commentInput: CommentInput): Comment {
		const comment = new Comment()
		comment.content = commentInput.content

		return comment
	}
}
