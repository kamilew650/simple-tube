import { Typegoose, prop, Ref } from 'typegoose'
import User from './User'
import Movie from './Movie'

export default class Like extends Typegoose {
    _id: string

    @prop({ ref: User, required: true })
    user: Ref<User>

    @prop({ ref: Movie, required: true })
    movie: Ref<Movie>

    @prop({ required: true })
    like: boolean
}
