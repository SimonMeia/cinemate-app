import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { GroupService } from 'src/app/api/group.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Group } from 'src/app/models/group';
import { StoreService } from 'src/app/store/store.service';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.page.html',
  styleUrls: ['./create-group.page.scss'],
})
export class CreateGroupPage implements OnInit {
  name: string;
  description: string;
  edit: boolean;
  submitButtonText: string;

  constructor(
    public groupService: GroupService,
    public authService: AuthService,
    public router: Router,
    public storeService: StoreService,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    if (this.storeService.currentGroup) {
      this.edit = true;
      this.submitButtonText = 'Modifier le groupe';
      this.name = this.storeService.currentGroup.name;
      this.description = this.storeService.currentGroup.description;
    } else {
      this.edit = false;
      this.submitButtonText = 'Créer le groupe';
    }
  }

  createGroup(form: NgForm) {
    let groupData = {
      name: this.name,
      description: this.description,
    };

    if (this.edit) {
      this.groupService
        .editGroup(this.storeService.currentGroup._id, groupData)
        .subscribe(async (updatedGroup) => {
          this.updateStoreVariables(updatedGroup);
          const toast = await this.toastController.create({
            message: 'Groupe modifié !',
            duration: 1500,
            position: 'top',
          });
          await toast.present();
          this.router.navigateByUrl('/group');
          async (err) => {
            if (err.status == 406) {
              const toast = await this.toastController.create({
                message: 'Nom de groupe déjà utilisé',
                duration: 1500,
                position: 'top',
              });
              await toast.present();
            }
          };
        });
    } else {
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
        async (err) => {
          if (err.status == 406) {
            const toast = await this.toastController.create({
              message: 'Nom de groupe déjà utilisé',
              duration: 1500,
              position: 'top',
            });
            await toast.present();
          }
        }
      );
    }
  }

  updateStoreVariables(updatedGroup: Group) {
    let oldGroup = this.storeService.myGroups.find(
      (g) => g._id == updatedGroup._id
    );
    this.storeService.myGroups[this.storeService.myGroups.indexOf(oldGroup)] =
      updatedGroup;

    oldGroup = this.storeService.allGroups.find(
      (g) => g._id == updatedGroup._id
    );
    this.storeService.allGroups[this.storeService.allGroups.indexOf(oldGroup)] =
      updatedGroup;

    this.storeService.currentGroup = updatedGroup;
  }

  back() {
    this.router.navigateByUrl(this.storeService.backPage);
  }
}
