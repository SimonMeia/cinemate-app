import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ReviewsFromMyGroups } from '../models/reviewsFromMyGroups';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private http: HttpClient) { }

  getReviewsFromMyGroups(): Observable<ReviewsFromMyGroups>{
    const url = `${environment.apiUrl}/reviews/mygroups`;
    return this.http.get<ReviewsFromMyGroups>(url);
  }
}
