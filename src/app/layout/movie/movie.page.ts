import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReviewService } from 'src/app/api/review.service';
import { Movie } from 'src/app/models/movie';
import { MoviePeople } from 'src/app/models/moviePeople';
import { Review } from 'src/app/models/review';
import { StoreService } from 'src/app/store/store.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.page.html',
  styleUrls: ['./movie.page.scss'],
})
export class MoviePage implements OnInit {
  movie: Movie;
  reviews: Review[];

  constructor(
    public storeService: StoreService,
    public reviewService: ReviewService,
    public router: Router
  ) {}

  ngOnInit() {
    this.movie = this.storeService.currentMovie;

    this.reviewService.getMovieReviews(this.movie._id).subscribe(
      (reviews) => {
        this.reviews = this.reviewService.dateFormat(
          reviews.filter((r) => r.movie._id == this.movie._id)
        );
      },
      (err) => {
        console.warn('Could not get reviews', err);
      }
    );
  }

  movies() {
    this.router.navigateByUrl('/movies');
  }

  displayReview(review) {
    this.storeService.currentReview = review;
    this.storeService.backPage = '/movie';
    this.router.navigateByUrl('/review');
  }
}
