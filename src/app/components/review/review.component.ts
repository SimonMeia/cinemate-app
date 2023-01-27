import { Component, Input, OnInit } from '@angular/core';
import { Review } from 'src/app/models/review';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss'],
})
export class ReviewComponent implements OnInit {
  @Input() review?: Review;
rating: string[]
  constructor() {}

  ngOnInit() {
    // Met en forme les étoiles
    this.rating = [];
    for (let index = 1; index <= 5; index++) {
      if (index <= this.review.rating) {
        this.rating.push('star');
      } else {
        this.rating.push('star-outline');
      }
    }
  }
}
