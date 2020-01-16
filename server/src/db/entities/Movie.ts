import { Typegoose, prop, Ref } from 'typegoose'
import User from './User'

export default class Movie extends Typegoose {
	_id: string

	@prop({ ref: User })
	user: Ref<User>

	@prop()
	title: string

	@prop()
	description: string

	@prop()
	likes: number

	@prop()
	dislikes: number

	@prop()
	videoToken: string

	@prop()
	uploadDate: Date
}
