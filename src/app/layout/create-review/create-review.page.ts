import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ReviewService } from 'src/app/api/review.service';
import { QimgImage } from 'src/app/models/qimage';
import { PictureService } from 'src/app/picture/picture.service';
import { StoreService } from 'src/app/store/store.service';
import { TmdbService } from 'src/app/tmdb/tmdb.service';
import { Geolocation } from '@capacitor/geolocation';
import { latLng, Map, MapOptions, marker, Marker, tileLayer } from 'leaflet';
import { defaultIcon } from 'src/app/default-marker';
import { ToastController } from '@ionic/angular';

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
  picture: QimgImage;
  public mapOptions: MapOptions;
  mapMarkers: Marker[];
  coordinates: number[] = [];
  map: Map;
  customLocation: string;

  constructor(
    public reviewService: ReviewService,
    // Inject the router
    private router: Router,
    private storeService: StoreService,
    private tmdbService: TmdbService,
    private pictureService: PictureService,
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
    this.mapMarkers = [
      new Marker([46.778186, 6.641524], { icon: defaultIcon }),
    ];
    this.coordinates = [46.778186, 6.641524];
  }

  ngOnInit() {}

  createReviewForm(form: NgForm) {}

  lookForMovie() {
    this.movieProposition = [];
    this.tmdbID = null
    this.tmdbService.getMovie(this.movie).subscribe(
      (result) => {
        let proposition: number;
        if (result.results.length > 5) {
          proposition = 5;
        } else {
          proposition = result.results.length;
        }
        for (let index = 0; index < proposition; index++) {
          this.movieProposition[index] = result.results[index];
        }
      },
      (err) => {
        console.warn('Could not get movies', err);
      }
    );
  }

  addPictureToReview() {
    this.pictureService.takeAndUploadPicture().subscribe(
      (image) => {
        this.picture = image;
      },
      (err) => {
        console.warn('Could not upload image', err);
      }
    );
  }

  createReview(form: NgForm) {
    if (form.valid) {
      let mediaURL = '';
      if (this.picture) {
        mediaURL = this.picture.url;
      }
      let reviewData = {
        rating: this.rating,
        comment: this.comment,
        date: this.date,
        location: {
          type: 'Point',
          coordinates: [this.coordinates[0], this.coordinates[1]],
        },
        medias: mediaURL,
        tmdbID: this.tmdbID,
      };

      this.reviewService.addReviewToDatabase(reviewData).subscribe(
        async (result) => {
          result.date = new Date(result.date)
            .toLocaleDateString('fr')
            .toString();
          this.storeService.addNewReview(result);
          this.storeService.currentReview = result;
          const toast = await this.toastController.create({
            message: 'Review publiée',
            duration: 1500,
            position: 'top',
          });
          await toast.present();

          this.storeService.backPage = '/home';
          this.router.navigateByUrl('/review');
        },
        (err) => {
          console.warn('Could not get reviews', err);
        }
      );
    }
  }

  async printCurrentPosition() {
    Geolocation.getCurrentPosition().then(loc => {
        this.setPinPoint(loc.coords.latitude, loc.coords.longitude);
    }).catch(async error => {
        const toast = await this.toastController.create({
            message: 'Impossible de trouver la position',
            duration: 1500,
            position: 'top',
          });
          await toast.present();
    })
  }

  setPinPoint(lat, long) {
    this.coordinates[0] = lat;
    this.coordinates[1] = long;
    this.mapMarkers[0].setLatLng([lat, long]);
    this.map.setView(latLng(lat, long));
  }

  onMapReady(map: Map) {
    setTimeout(() => map.invalidateSize(), 0);
    this.map = map;
    this.map.on('click', (ev) =>
      this.setPinPoint(
        map.mouseEventToLatLng(ev.originalEvent).lat,
        map.mouseEventToLatLng(ev.originalEvent).lng
      )
    );
  }
}
