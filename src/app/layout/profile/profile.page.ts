import { Component, OnInit } from '@angular/core';
import { GroupService } from 'src/app/api/group.service';
import { ReviewService } from 'src/app/api/review.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Group } from 'src/app/models/genre copy';
import { Review } from 'src/app/models/review';
import { User } from 'src/app/models/user';
import { defaultIcon } from 'src/app/default-marker';
import {
  latLng,
  Map,
  MapOptions,
  marker,
  Marker,
  tileLayer,
  LatLngTuple, 
} from 'leaflet';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  id: string;
  firstName: string;
  lastName: string;
  reviews: Review[];
  reviewsCount: number;
  groups: Group[];
  groupsCount: number;
  user: User;
  mapOptions: MapOptions;
  mapMarkers: Marker[];
  map: Map;

  constructor(
    private authService: AuthService,
    private reviewService: ReviewService,
    private groupService: GroupService
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
    this.authService.getUser$().subscribe(
      (user) => {
        console.log(user);
        this.user = user;
        this.loadUserData();
      },
      (err) => {
        console.warn('Could not get user', err);
      }
    );
  }

  loadUserData() {
    this.reviewService.getAllUserReviews(this.user._id).subscribe(
      (reviews) => {
        this.reviews = reviews;
        this.reviewsCount = reviews.length;
        this.loadMap();
      },
      (err) => {
        console.warn('Could not get reviews', err);
      }
    );
    this.groupService.getAllUserGroups(this.user._id).subscribe(
      (groups) => {
        this.groups = groups;
        this.groupsCount = groups.length;
      },
      (err) => {
        console.warn('Could not get reviews', err);
      }
    );
  }

  loadMap() {
    this.mapMarkers = this.reviews.map((r) =>
      marker([r.location.coordinates[0], r.location.coordinates[1]], {
        icon: defaultIcon,
      }).bindTooltip(r.movie.title)
    );
    let latLngArray = this.mapMarkers.map((m) => {
      const latLngTuple: LatLngTuple = [m.getLatLng().lat, m.getLatLng().lng];
      return latLngTuple;
    });
    console.log(latLngArray)
    
    this.map.fitBounds(latLngArray);
  }
  onMapReady(map: Map) {
    setTimeout(() => map.invalidateSize(), 0);
    this.map = map;
  }
}
