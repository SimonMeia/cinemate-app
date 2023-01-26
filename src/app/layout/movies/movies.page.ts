import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ViewWillEnter } from '@ionic/angular';
import { MovieService } from 'src/app/api/movie.service';
import { Movie } from 'src/app/models/movie';
import { Review } from 'src/app/models/review';
import { StoreService } from 'src/app/store/store.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
})
export class MoviesPage implements ViewWillEnter {
  movies: Movie[];
  moviesSearch: Movie[];
  displaySearchResult: boolean = false;
  noResults: boolean;
  recentRelease: Movie[];
  recentReview: Movie[];
  bestMovies: any;

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
        this.movies = result;
        this.setupCategories();
      },
      (err) => {
        console.warn('Could not get movies', err);
      }
    );
  }

  displayMovie(movie) {
    this.storeService.currentMovie = movie;
    this.router.navigateByUrl('movie');
  }

  search(event) {
    let nameToSearch: string = event.detail.value;
    this.moviesSearch = this.movies.filter((m) =>
      m.title.toLowerCase().includes(nameToSearch.toLowerCase())
    );

    if (nameToSearch != '') {
      this.displaySearchResult = true;
    } else {
      this.displaySearchResult = false;
    }
  }
  setupCategories() {
    this.recentRelease = [...this.movies].sort((a, b) => {
      let date1 = new Date(a.releaseDate);
      let date2 = new Date(b.releaseDate);
      if (date1.getTime() < date2.getTime()) return 1;
      if (date1.getTime() > date2.getTime()) return -1;
      return 0;
    });

    this.bestMovies = [...this.movies].sort((a, b) => {
      if (a.popularity < b.popularity) return 1;
      if (a.popularity > b.popularity) return -1;
      return 0;
    });
  }
}
