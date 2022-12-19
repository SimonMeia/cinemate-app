import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Review } from '../models/review';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private http: HttpClient) { }

  getMyGroups(): Observable<[Review]>{
    const url = `${environment.apiUrl}/reviews/mygroups`;
    return this.http.get<[Review]>(url);
  }
}