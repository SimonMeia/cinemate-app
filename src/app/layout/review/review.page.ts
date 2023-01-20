import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Review } from 'src/app/models/review';
import { StoreService } from 'src/app/store/store.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.page.html',
  styleUrls: ['./review.page.scss'],
})
export class ReviewPage implements OnInit {
  public review: Review;
  public rating: Array<string>;

  constructor(public storeService: StoreService, private router: Router) {}

  ngOnInit() {
    this.review = this.storeService.getCurrentReview();
    // this.review = {
    //   id: 'id',
    //   comment: 'Pas mal',
    //   date: '10.10.2022',
    //   movie: {
    //     id: 'id',
    //     moviePeople: [{ id: 'id', name: 'nom' }],
    //     posterURL: '/jRXYjXNq0Cs2TcJjLkki24MLp7u.jpg',
    //     title: 'Avatar',
    //     releaseDate: '2009-12-15T00:00:00.000Z',
    //     tmdbID: 12121212,
    //     Genre: [{ id: 'id', name: 'nom' }],
    //   },
    //   rating: 4,
    //   user: {
    //     email:'email',
    //     firstName: 'Simon',
    //     lastName: 'Meia',
    //     groups:['id group'],
    //     id:'id',
    //     password: '1234',
    //     registrationDate:'date',
    //     role:'admin'
    //   }
    // };
    this.rating = [];
    for (let index = 1; index <= 5; index++) {
      if (index <= this.review.rating) {
        this.rating.push('star');
      } else {
        this.rating.push('star-outline');
      }
    }
  }
  home() {
    this.router.navigateByUrl('/home');
  }
}
