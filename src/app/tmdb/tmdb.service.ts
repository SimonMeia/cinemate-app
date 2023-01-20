import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TmdbService {

  constructor(private http:HttpClient) { }

  getMovie(movieName): Observable<any>{
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${environment.tmdbApiKey}&query=${movieName.replace(' ', '+')}`;
    return this.http.get<any>(url);
  }
}
