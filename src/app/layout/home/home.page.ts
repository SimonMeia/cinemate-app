import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { ViewWillEnter } from '@ionic/angular';
import { ReviewService } from 'src/app/api/review.service';
import { StoreService } from 'src/app/store/store.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements ViewWillEnter {

  constructor(
    // Inject the authentication provider.
    private auth: AuthService,
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
        result.data.sort((a, b) => {
          let date1 = new Date(a.date);
          let date2 = new Date(b.date);
          if (date1.getTime() < date2.getTime()) {
            return 1;
          } else if (date1.getTime() > date2.getTime()) {
            return -1;
          }
          return 0;
        });
        result.data.forEach(
          (review) =>
            (review.date = new Date(review.date)
              .toLocaleDateString('fr')
              .toString())
        );
        this.storeService.reviews = result.data;
      },
      (err) => {
        console.warn('Could not get reviews', err);
      }
    );
  }

  // Add a method to log out.
  logOut() {
    console.log('logging out...');
    this.auth.logOut();
    this.router.navigateByUrl('/login');
  }

  addReview() {
    this.router.navigateByUrl('/create-review');
  }

  displayReview(review) {
    this.storeService.currentReview = review;
    this.storeService.backPage = "/home"
    this.router.navigate(['/review']);
  }
}
