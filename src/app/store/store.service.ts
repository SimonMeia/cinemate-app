import { Injectable } from '@angular/core';
import { Review } from '../models/review';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private currentReview: Review;
  constructor() {
    
  }

  getCurrentReview() {
    return this.currentReview;
  }

  setCurrentReview(review: Review) {
    this.currentReview = review;
  }
}
