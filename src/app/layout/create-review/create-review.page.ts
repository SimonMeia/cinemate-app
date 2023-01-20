import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ReviewService } from 'src/app/api/review.service';
import { StoreService } from 'src/app/store/store.service';
import { TmdbService } from 'src/app/tmdb/tmdb.service';

@Component({
  selector: 'app-create-review',
  templateUrl: './create-review.page.html',
  styleUrls: ['./create-review.page.scss'],
})
export class CreateReviewPage implements OnInit {
  movie: string = '';
  movieProposition: Array<any> = [];
  date: Date;
  rating: string = '1';
  comment: string;
  tmdbID: string;
  disablePublishButton: boolean = true;

  constructor(
    public reviewService: ReviewService,
    // Inject the router
    private router: Router,
    public storeService: StoreService,
    public tmdbService: TmdbService
  ) {}

  ngOnInit() {}

  createReviewForm(form: NgForm) {}

  lookForMovie() {
    console.log(this.movie);
    this.movieProposition = [];
    this.tmdbService.getMovie(this.movie).subscribe(
      (result) => {
        console.log('movie : ', result);
        let proposition: number;
        if (result.results.length > 5) {
          proposition = 5;
        } else {
          proposition = result.results.length;
        }

        for (let index = 0; index < proposition; index++) {
          this.movieProposition[index] = result.results[index];
        }
        console.log(this.movieProposition);
      },
      (err) => {
        console.warn('Could not get movies', err);
      }
    );
  }

  createReview(form: NgForm) {
    if (form.valid) {
      console.log('Form is valid');
      let reviewData = {
        rating: this.rating,
        comment: this.comment,
        date: this.date,
        location: {
          type: 'Point',
          coordinate: [6.647778558579233, 46.78060279685718],
        },
        medias: [],
        tmdbID: this.tmdbID,
      };
      console.log('add movie', reviewData);

      this.reviewService.addReviewToDatabase(reviewData).subscribe(
        (result) => {
          console.log('new review : ', result);
          result.date = new Date(result.date)
            .toLocaleDateString('fr')
            .toString();
          this.storeService.setCurrentReview(result);
          this.router.navigateByUrl('/review');
        },
        (err) => {
          console.warn('Could not get reviews', err);
        }
      );
    }
  }
}
