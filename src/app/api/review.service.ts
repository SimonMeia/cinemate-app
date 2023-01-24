import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DeleteResponse } from '../models/deleteResponse';
import { Review } from '../models/review';
import { ReviewsFromMyGroups } from '../models/reviewsFromMyGroups';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  constructor(private http: HttpClient) {}

  getAllUserReviews(id: string): Observable<Review[]> {
    const url = `${environment.apiUrl}/reviews/users/${id}`;
    return this.http.get<Review[]>(url);
  }
  getReviewsFromMyGroups(): Observable<ReviewsFromMyGroups> {
    const url = `${environment.apiUrl}/reviews/mygroups`;
    return this.http.get<ReviewsFromMyGroups>(url);
  }

  addReviewToDatabase(reviewData): Observable<Review> {
    const url = `${environment.apiUrl}/reviews`;
    return this.http.post<Review>(url, reviewData);
  }

  deleteReview(id: string): Observable<DeleteResponse> {
    const url = `${environment.apiUrl}/reviews/${id}`;
    return this.http.delete<DeleteResponse>(url);
  }
}
