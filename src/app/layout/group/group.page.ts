import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ViewWillEnter } from '@ionic/angular';
import { GroupService } from 'src/app/api/group.service';
import { ReviewService } from 'src/app/api/review.service';
import { UserService } from 'src/app/api/user.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Group } from 'src/app/models/group';
import { Review } from 'src/app/models/review';
import { User } from 'src/app/models/user';
import { StoreService } from 'src/app/store/store.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.page.html',
  styleUrls: ['./group.page.scss'],
})
export class GroupPage implements ViewWillEnter {
  members: User[];
  reviews: Review[];
  membre: boolean = false;
  user: User;

  constructor(
    public storeService: StoreService,
    private router: Router,
    private groupService: GroupService,
    private userService: UserService,
    private reviewService: ReviewService,
    private authService: AuthService
  ) {}

  ionViewWillEnter() {
    this.authService.getUser$().subscribe(
      (user) => {
        if (user && this.storeService.currentGroup) {
          this.user = user;
          if (user.groups.includes(this.storeService.currentGroup._id))
            this.membre = true;
        }
      },
      (err) => {
        console.warn('Could not get user', err);
      }
    );
    this.reviewService
      .getGroupReviews(this.storeService.currentGroup._id)
      .subscribe(
        (reviews) => {
          this.reviews = this.reviewService.dateFormat(
            reviews.filter((r) => r.user._id != this.user._id)
          );
        },
        (err) => {
          console.warn('Could not get reviews', err);
        }
      );
    this.groupService
      .getAllUsersFromGroup(this.storeService.currentGroup._id)
      .subscribe(
        (users) => {
          this.members = users;
        },
        (err) => {
          console.warn('Could not get user', err);
        }
      );
  }

  joinGroup() {
    this.userService.joinGroup(this.storeService.currentGroup._id).subscribe(
      (response) => {
        if (response.jointGroups == 1) {
          this.authService
            .addUserToGroup$(this.storeService.currentGroup._id)
            .subscribe(
              (user) => {
                this.membre = true;
                this.storeService.myGroups.push(this.storeService.currentGroup);
                this.members.push(user)
              },
              (err) => {
                console.log('Could not join group', err);
              }
            );
        }
      },
      (err) => {
        console.warn('Could not join group', err);
      }
    );
  }
  quitGroup() {
    this.userService.quitGroup(this.storeService.currentGroup._id).subscribe(
      (response) => {
        if (response.leftGroups == 1) {
          this.authService
            .removeGroupFromUser$(this.storeService.currentGroup._id)
            .subscribe(
              (user) => {
                this.membre = false;
                this.storeService.myGroups.splice(
                  this.storeService.myGroups.indexOf(
                    this.storeService.currentGroup
                  ),
                  1
                );
              },
              (err) => {
                console.log('Could not quit group', err);
              }
            );
        }
      },
      (err) => {
        console.warn('Could not join group', err);
      }
    );
  }

  editGroup() {
    this.storeService.backPage = '/group';
    this.router.navigateByUrl('/create-group');
  }

  groups() {
    this.storeService.currentGroup = null;
    this.router.navigateByUrl('/groups');
  }
  displayReview(review) {
    this.storeService.currentReview = review;
    this.storeService.backPage = '/group';
    this.router.navigateByUrl('/review');
  }
}
