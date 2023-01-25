import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilePageRoutingModule } from './profile-routing.module';

import { ProfilePage } from './profile.page';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { ReviewModule } from 'src/app/components/review/review.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilePageRoutingModule,
    LeafletModule,
    ReviewModule
  ],
  declarations: [ProfilePage]
})
export class ProfilePageModule {}
