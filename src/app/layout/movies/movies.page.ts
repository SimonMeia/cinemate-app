import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ViewWillEnter } from '@ionic/angular';
import { MovieService } from 'src/app/api/movie.service';
import { Movie } from 'src/app/models/movie';
import { StoreService } from 'src/app/store/store.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
})
export class MoviesPage implements ViewWillEnter {
  movies: Movie[];

  constructor(
    // Inject the HTTP client
    public http: HttpClient,
    // Inject Api Service for request
    public movieService: MovieService,
    public storeService: StoreService,
    public router: Router
  ) {}

  ionViewWillEnter(): void {
    this.movieService.getMovies().subscribe(
      (result) => {
        console.log('movies : ', result);
        this.movies = result;
      },
      (err) => {
        console.warn('Could not get reviews', err);
      }
    );
  }

  displayMovie(movie) {
    this.storeService.setCurrentMovie(movie)
    this.router.navigateByUrl('movie')
  }
}
