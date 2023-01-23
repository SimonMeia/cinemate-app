import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateReviewPageRoutingModule } from './create-review-routing.module';

import { CreateReviewPage } from './create-review.page';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateReviewPageRoutingModule,
    LeafletModule
  ],
  declarations: [CreateReviewPage]
})
export class CreateReviewPageModule {}
