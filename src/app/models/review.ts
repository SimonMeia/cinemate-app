import { Movie } from "./movie"
import { User } from "./user"

export type Review = {
    id: string,
    rating: number,
    comment: string,
    date: string,
    // location:
    user: User,
    movie: Movie,

    // "location": {
    //     "type": "Point",
    //     "coordinate": [
    //         6.647778558579233,
    //         46.78060279685718
    //     ]
    // },
    // "medias": [],

};