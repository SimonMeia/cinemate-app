import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ReviewComponent } from './review.component';

@NgModule({
  declarations: [ReviewComponent],
  imports:[IonicModule, CommonModule],
  exports: [ReviewComponent],
})
export class ReviewModule {}
