import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Review } from 'src/app/models/review';
import { StoreService } from 'src/app/store/store.service';
import { latLng, Map, MapOptions, marker, Marker, tileLayer } from 'leaflet';
import { defaultIcon } from 'src/app/default-marker';

@Component({
  selector: 'app-review',
  templateUrl: './review.page.html',
  styleUrls: ['./review.page.scss'],
})
export class ReviewPage implements OnInit {
  public review: Review;
  public rating: Array<string>;
  public mapOptions: MapOptions;
  mapMarkers: Marker[];

  constructor(public storeService: StoreService, private router: Router) {
    this.mapOptions = {
      layers: [
        tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 18,
        }),
      ],
      zoom: 13,
      center: latLng(46.778186, 6.641524),
    };
  }

  ngOnInit() {
    this.review = this.storeService.currentReview;
    if (this.review.location) {
      this.mapMarkers = [
        marker(
          [
            this.review.location.coordinates[0],
            this.review.location.coordinates[1],
          ],
          { icon: defaultIcon }
        ),
      ];
    }
    this.mapOptions.center = latLng(
      this.review.location.coordinates[0],
      this.review.location.coordinates[1]
    );
    console.log(this.review);

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

  onMapReady(map: Map) {
    setTimeout(() => map.invalidateSize(), 0);
  }
}
