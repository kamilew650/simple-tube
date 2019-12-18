import User from './User'

export default class Comment {
    _id: string

    user: User

    movie: string

    content: string

    date: Date
}