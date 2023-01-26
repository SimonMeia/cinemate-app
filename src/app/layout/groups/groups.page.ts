import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ViewWillEnter } from '@ionic/angular';
import { GroupService } from 'src/app/api/group.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Group } from 'src/app/models/group';
import { StoreService } from 'src/app/store/store.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.page.html',
  styleUrls: ['./groups.page.scss'],
})
export class GroupsPage implements ViewWillEnter {
  groupsSearch: Group[];
  displaySearchResult: boolean = false;
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
        this.groupService.getAllGroups().subscribe(
          (groups) => {
            this.storeService.allGroups = groups;
            this.storeService.myGroups = [...this.storeService.allGroups].filter((g) =>
              user.groups.includes(g._id)
            );
            this.storeService.currentGroup = null
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
  displayGroup(group: Group) {
    this.storeService.currentGroup = group;
    this.router.navigateByUrl('/group');
}

createGroup(){
    this.storeService.backPage = '/groups'
    this.router.navigateByUrl('/create-group');
  }

  search(event) {
    let nameToSearch: string = event.detail.value;
    this.groupsSearch = this.storeService.allGroups.filter((g) =>
      g.name.toLowerCase().includes(nameToSearch.toLowerCase())
    );

    if (nameToSearch != '') {
      this.displaySearchResult = true;
    } else {
      this.displaySearchResult = false;
    }
  }
}
