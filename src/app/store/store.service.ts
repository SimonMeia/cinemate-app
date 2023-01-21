import { Injectable } from '@angular/core';
import { Movie } from '../models/movie';
import { Review } from '../models/review';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private currentReview: Review;
  private currentMovie: Movie;
  constructor() {
    
  }

  getCurrentReview() {
    return this.currentReview;
  }
  setCurrentReview(review: Review) {
    this.currentReview = review;
  }

  getCurrentMovie() {
    return this.currentMovie;
  }
  setCurrentMovie(movie: Movie) {
    this.currentMovie = movie;
  }
}
