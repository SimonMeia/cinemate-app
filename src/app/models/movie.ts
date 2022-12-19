import { Genre } from "./genre";
import { MoviePeople } from "./moviePeople";

export type Movie = {
    id: string,
    title: string,
    posterURL: string,
    releaseDate: string,
    tmdbID: number,
    moviePeople: [MoviePeople]
    Genre: [Genre]
};