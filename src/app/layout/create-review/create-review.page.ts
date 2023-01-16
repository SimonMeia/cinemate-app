import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ReviewService } from 'src/app/api/review.service';
import { StoreService } from 'src/app/store/store.service';

@Component({
  selector: 'app-create-review',
  templateUrl: './create-review.page.html',
  styleUrls: ['./create-review.page.scss'],
})
export class CreateReviewPage implements OnInit {
  movie: string;
  date: Date;
  rating: string = '1';
  comment: string;
  tmdbID: string;
  disablePublishButton: boolean = true;

  constructor(
    public reviewService: ReviewService,
    // Inject the router
    private router: Router,
    public storeService: StoreService
  ) {}

  ngOnInit() {}

  createReviewForm(form: NgForm) {}

  lookForMovie() {
    console.log(this.movie);
  }

  createReview(form: NgForm) {
    if (form.valid) {
      console.log('Form is valid');
      console.log('add movie', this.movie, this.date, this.rating);
      let reviewData = {
        rating: this.rating,
        comment: this.comment,
        date: this.date,
        location: {
          type: 'Point',
          coordinate: [6.647778558579233, 46.78060279685718],
        },
        medias: [],
        tmdbID: 19995,
      };
      this.reviewService.addReviewToDatabase(reviewData).subscribe(
        (result) => {
          console.log('new review : ', result);
          this.storeService.setCurrentReview(result)
          this.router.navigateByUrl('/review')
        },
        (err) => {
          console.warn('Could not get reviews', err);
        }
      );
    }
  }
}
