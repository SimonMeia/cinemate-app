import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GroupService } from 'src/app/api/group.service';
import { Group } from 'src/app/models/genre copy';
import { Review } from 'src/app/models/review';
import { User } from 'src/app/models/user';
import { StoreService } from 'src/app/store/store.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.page.html',
  styleUrls: ['./group.page.scss'],
})
export class GroupPage implements OnInit {
  group: Group;
  members: User[];
  reviews: Review[];

  constructor(
    private storeService: StoreService,
    private router: Router,
    private groupService: GroupService
  ) {}

  ngOnInit() {
    this.group = this.storeService.currentGroup;
    this.reviews = this.storeService.reviews.filter((r) =>
      r.user.groups.includes(this.group._id)
    );
    this.groupService.getAllUsersFromGroup(this.group._id).subscribe(
      (users) => {
        this.members = users;
      },
      (err) => {
        console.warn('Could not get user', err);
      }
    );
  }

  groups() {
    this.router.navigateByUrl('/groups');
  }
  displayReview(review) {
    this.storeService.currentReview = review;
    this.storeService.backPage = '/group';
    this.router.navigateByUrl('/review');
  }
}
