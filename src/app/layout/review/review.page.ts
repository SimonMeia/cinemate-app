import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Review } from 'src/app/models/review';
import { StoreService } from 'src/app/store/store.service';
import { latLng, Map, MapOptions, marker, Marker, tileLayer } from 'leaflet';
import { defaultIcon } from 'src/app/default-marker';
import { AuthService } from 'src/app/auth/auth.service';
import { ReviewService } from 'src/app/api/review.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-review',
  templateUrl: './review.page.html',
  styleUrls: ['./review.page.scss'],
})
export class ReviewPage implements OnInit {
  review: Review;
  rating: Array<string>;
  mapOptions: MapOptions;
  mapMarkers: Marker[];
  showDeleteButton: boolean = false;
  backPage: string;

  constructor(
    public storeService: StoreService,
    private router: Router,
    private authService: AuthService,
    private reviewService: ReviewService,
    private toastController: ToastController
  ) {
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

  ngOnInit(): void {
    this.loadReview();
    this.backPage = this.storeService.backPage;
  }

  loadReview() {
    // Get la review

    this.review = this.storeService.currentReview;
    // Ajoute le marker et déplace la carte
    this.mapMarkers = [
      marker(
        [
          this.review.location.coordinates[0],
          this.review.location.coordinates[1],
        ],
        { icon: defaultIcon }
      ),
    ];
    this.mapOptions.center = latLng(
      this.review.location.coordinates[0],
      this.review.location.coordinates[1]
    );
    // Met en forme les étoiles
    this.rating = [];
    for (let index = 1; index <= 5; index++) {
      if (index <= this.review.rating) {
        this.rating.push('star');
      } else {
        this.rating.push('star-outline');
      }
    }
    // Affiche ou non la supression
    this.authService.getUser$().subscribe(
      (user) => {
        if (user && this.review.user._id == user._id) {
          this.showDeleteButton = true;
        } else {
          this.showDeleteButton = false;
        }
      },
      (err) => {
        console.warn('Could not get user', err);
      }
    );
  }

  home() {
    this.router.navigateByUrl(this.backPage);
  }

  delete() {
    this.reviewService.deleteReview(this.review._id).subscribe(
      async (response) => {
        if (response.deleteCount == 1) {
          this.storeService.deleteReview(this.review._id);
          const toast = await this.toastController.create({
            message: 'Review supprimée',
            duration: 1500,
            position: 'top',
          });
          await toast.present();
          this.home();
        }
      },
      (err) => {
        console.warn('Could not get user', err);
      }
    );
  }

  onMapReady(map: Map) {
    setTimeout(() => map.invalidateSize(), 0);
  }
}
