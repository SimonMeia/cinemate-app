import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Movie } from '../models/movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

    constructor(private http: HttpClient) { }

    getMovies(): Observable<Movie[]>{
      const url = `${environment.apiUrl}/movies/mygroups`;
      return this.http.get<Movie[]>(url);
    }
}
