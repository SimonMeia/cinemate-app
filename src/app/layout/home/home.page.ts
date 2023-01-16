import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { ViewWillEnter } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { ReviewService } from 'src/app/api/review.service';
import { Review } from 'src/app/models/review';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, ViewWillEnter {
  reviews: Review[];

  constructor(
    // Inject the authentication provider.
    private auth: AuthService,
    // Inject the router
    private router: Router,
    // Inject the HTTP client
    public http: HttpClient,
    // Inject Api Service for request
    public reviewService: ReviewService
  ) {}

  ionViewWillEnter(): void {
    this.reviewService.getReviewsFromMyGroups().subscribe(
      (result) => {
        console.log("reviews : ", result);
        this.reviews = result.data
      },
      (err) => {
        console.warn('Could not get reviews', err);
      }
    );
  }

  ngOnInit() {}

  // Add a method to log out.
  logOut() {
    console.log('logging out...');
    this.auth.logOut();
    this.router.navigateByUrl('/login');
  }

  addReview(){
    this.router.navigateByUrl('/create-review')
  }
}
