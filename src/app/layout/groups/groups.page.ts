import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ViewWillEnter } from '@ionic/angular';
import { GroupService } from 'src/app/api/group.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Group } from 'src/app/models/genre copy';
import { StoreService } from 'src/app/store/store.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.page.html',
  styleUrls: ['./groups.page.scss'],
})
export class GroupsPage implements ViewWillEnter {


  constructor(
    // Inject the HTTP client
    public http: HttpClient,
    // Inject Api Service for request
    public groupService: GroupService,
    // public storeService: StoreService,
    public router: Router,
    public authService: AuthService,
    public storeService: StoreService
  ) {}

  ionViewWillEnter(): void {
    this.authService.getUser$().subscribe(
      (user) => {
        this.groupService.getAllUserGroups(user._id).subscribe(
            (groups) => {
              console.log('groups : ', groups);
              this.storeService.groups = groups;
            },
            (err) => {
              console.warn('Could not get groups', err);
            }
          );
      },
      (err) => {
        console.warn('Could not get user', err);
      }
    );
  }
  displayGroup(group : Group){
    this.storeService.currentGroup = group
    this.router.navigateByUrl("/group")
  }
}
