import { Movie } from "./movie"
import { User } from "./user"
import { Location } from "./location";

export type Review = {
    _id: string,
    rating: number,
    comment: string,
    date: string,
    user: User,
    movie: Movie,
    medias: string,
    location: Location
};