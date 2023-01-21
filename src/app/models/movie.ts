import { Genre } from "./genre";
import { MoviePeople } from "./moviePeople";

export type Movie = {
    id: string,
    title: string,
    posterURL: string,
    backdropURL: string,
    releaseDate: string,
    tmdbID: number,
    moviePeople: MoviePeople[]
    genres: Genre[]
};