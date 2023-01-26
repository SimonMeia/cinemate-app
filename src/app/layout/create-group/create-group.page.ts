import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { GroupService } from 'src/app/api/group.service';
import { AuthService } from 'src/app/auth/auth.service';
import { StoreService } from 'src/app/store/store.service';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.page.html',
  styleUrls: ['./create-group.page.scss'],
})
export class CreateGroupPage implements OnInit {
  name: string;
  description: string;

  constructor(
    public groupService: GroupService,
    public authService: AuthService,
    public router: Router,
    public storeService: StoreService,
    private toastController: ToastController
  ) {}

  ngOnInit() {}

  createGroup(form: NgForm) {
    let groupData = {
      name: this.name,
      description: this.description,
    };
    this.groupService.createNewGroup(groupData).subscribe(
      (group) => {
        this.authService.addUserToGroup$(group._id).subscribe(
          async (result) => {
            this.storeService.currentGroup = group;
            this.storeService.myGroups.push(group);
            this.storeService.allGroups.push(group);
            const toast = await this.toastController.create({
                message: 'Groupe créé !',
                duration: 1500,
                position: 'top',
              });
              await toast.present();
            this.router.navigateByUrl('/group');
          },
          (err) => {
            console.warn('could not add user to group', err);
          }
        );
      },
      (err) => {
        console.warn('Could not create group', err);
      }
    );
  }
}
