import { IsString, IsNotEmpty, IsBooleanString } from 'class-validator'
import Movie from '../../../db/entities/Movie'
import Like from '../../../db/entities/Like'

export default class LikeInput {
    _id?: string

    @IsString()
    @IsNotEmpty()
    movieId: string

    @IsBooleanString()
    @IsNotEmpty()
    like: boolean

    static toEntity(movieInput: LikeInput): Like {
        const like = new Like()
        like.like = movieInput.like

        return like
    }
}
