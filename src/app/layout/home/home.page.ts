import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { InfiniteScrollCustomEvent, ViewWillEnter } from '@ionic/angular';
import { ReviewService } from 'src/app/api/review.service';
import { StoreService } from 'src/app/store/store.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements ViewWillEnter {
  currentPage;
  lastPage;
  disableInfiniteScroll: boolean = false;

  constructor(
    // Inject the router
    private router: Router,
    // Inject the HTTP client
    public http: HttpClient,
    // Inject Api Service for request
    public reviewService: ReviewService,
    public storeService: StoreService
  ) {}

  ionViewWillEnter(): void {
    this.reviewService.getReviewsFromMyGroups().subscribe(
      (result) => {
        this.storeService.reviews = this.reviewService.dateFormat(result.data);
        this.currentPage = result.page;
        this.lastPage = result.lastPage;
      },
      (err) => {
        console.warn('Could not get reviews', err);
      }
    );
  }

  addReview() {
    this.router.navigateByUrl('/create-review');
  }

  displayReview(review) {
    this.storeService.currentReview = review;
    this.storeService.backPage = '/home';
    this.router.navigate(['/review']);
  }

  onIonInfinite(event) {
    if (this.currentPage == this.lastPage) {
      console.log('tru');

      this.disableInfiniteScroll = true;
      return;
    }
    console.log('current ' + this.currentPage, 'last' + this.lastPage);
    this.currentPage++;
    console.log('next ', this.currentPage);

    this.reviewService
      .getReviewsFromMyGroups({ page: this.currentPage })
      .subscribe(
        (result) => {
          this.reviewService
            .dateFormat(result.data)
            .forEach((r) => this.storeService.reviews.push(r));
            (event as InfiniteScrollCustomEvent).target.complete();
        },
        (err) => {
          console.warn('Could not get reviews', err);
        }
      );
  }
}
