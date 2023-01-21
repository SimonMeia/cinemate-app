import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from 'src/app/models/movie';
import { MoviePeople } from 'src/app/models/moviePeople';
import { StoreService } from 'src/app/store/store.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.page.html',
  styleUrls: ['./movie.page.scss'],
})
export class MoviePage implements OnInit {
  movie: Movie;

  constructor(public storeService: StoreService, public router: Router) {}

  ngOnInit() {
    this.movie = this.storeService.getCurrentMovie();
  }

  movies() {
    this.router.navigateByUrl('movies')
  }
}
