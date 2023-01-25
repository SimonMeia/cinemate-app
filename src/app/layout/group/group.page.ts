import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Group } from 'src/app/models/genre copy';
import { StoreService } from 'src/app/store/store.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.page.html',
  styleUrls: ['./group.page.scss'],
})
export class GroupPage implements OnInit {
  group: Group;

  constructor(private storeService: StoreService, private router: Router) {}

  ngOnInit() {
    this.group = this.storeService.currentGroup;
    console.log(this.group);
  }

  groups() {
    this.router.navigateByUrl('/groups');
  }
}
