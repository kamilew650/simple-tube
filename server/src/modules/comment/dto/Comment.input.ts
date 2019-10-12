import { IsEmail, Length, IsDate, IsString, IsNotEmpty } from 'class-validator'
import User from '../../../db/entities/User'
import Comment from '../../../db/entities/Comment'

export default class CommentInput {
	@IsString()
	@IsNotEmpty()
	user: string

	@IsString()
	@IsNotEmpty()
	movie: string

	@IsString()
	@IsNotEmpty()
	content: string

	@IsDate()
	@IsNotEmpty()
	date: Date

	static toEntity(commentInput: CommentInput): Comment {
		const comment = new Comment()
		comment.content = commentInput.content

		return comment
	}
}
