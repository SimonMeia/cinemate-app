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

  getAllUserReviews(userId: string): Observable<Review[]> {
    const url = `${environment.apiUrl}/reviews/users/${userId}`;
    return this.http.get<Review[]>(url);
  }
  getGroupReviews(groupId: string): Observable<Review[]> {
    const url = `${environment.apiUrl}/reviews/groups/${groupId}`;
    return this.http.get<Review[]>(url);
  }
  getReviewsFromMyGroups({
    pageSize = 10,
    page = 1,
  } = {}): Observable<ReviewsFromMyGroups> {
    const url = `${environment.apiUrl}/reviews/mygroups?pageSize=${pageSize}&page=${page}`;
    return this.http.get<ReviewsFromMyGroups>(url);
  }

  addReviewToDatabase(reviewData): Observable<Review> {
    const url = `${environment.apiUrl}/reviews`;
    return this.http.post<Review>(url, reviewData);
  }

  deleteReview(reviewId: string): Observable<DeleteResponse> {
    const url = `${environment.apiUrl}/reviews/${reviewId}`;
    return this.http.delete<DeleteResponse>(url);
  }
  getMovieReviews(movieId: string): Observable<Review[]> {
    const url = `${environment.apiUrl}/reviews/movies/${movieId}`;
    return this.http.get<Review[]>(url);
  }

  dateFormat(review: Review[]): Review[] {
    review.sort((a, b) => {
      let date1 = new Date(a.date);
      let date2 = new Date(b.date);
      if (date1.getTime() < date2.getTime()) {
        return 1;
      } else if (date1.getTime() > date2.getTime()) {
        return -1;
      }
      return 0;
    });
    review.forEach(
      (review) =>
        (review.date = new Date(review.date)
          .toLocaleDateString('fr')
          .toString())
    );
    return review;
  }
}
