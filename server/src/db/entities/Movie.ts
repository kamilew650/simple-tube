import { Typegoose, prop, Ref } from 'typegoose'
import User from './User'

export default class Movie extends Typegoose {
	_id: string

	@prop({ ref: User })
	user: Ref<User>

	@prop({ required: true })
	password: string

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
	pictureUrl: string
}
