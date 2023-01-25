import { Injectable } from '@angular/core';
import { Group } from '../models/genre copy';
import { Movie } from '../models/movie';
import { Review } from '../models/review';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  currentReview: Review;
  currentMovie: Movie;
  currentGroup: Group;
  reviews: Review[] = [];
  groups: Group[] = [];
  backPage: string;
  constructor() {}

  addNewReview(review: Review) {
    this.reviews.push(review);
    this.reviews.sort((a, b) => {
      let date1 = new Date(
        parseInt(a.date.split('/')[2]),
        parseInt(a.date.split('/')[1]),
        parseInt(a.date.split('/')[0])
      );
      let date2 = new Date(
        parseInt(b.date.split('/')[2]),
        parseInt(b.date.split('/')[1]),
        parseInt(b.date.split('/')[0])
      );
      if (date1.getTime() < date2.getTime()) {
        return 1;
      } else if (date1.getTime() > date2.getTime()) {
        return -1;
      }
      return 0;
    });
  }

  deleteReview(id: string) {
    for (let i = 0; i < this.reviews.length; i++) {
      if (this.reviews[i]._id == id) {
        this.reviews.splice(i, 1);
        break;
      }
    }
  }
}
