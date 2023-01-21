import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ReviewModule } from '../review/review.module';
import { MovieComponent } from './movie.component';

@NgModule({
  declarations: [MovieComponent],
  imports: [IonicModule, ReviewModule],
  exports: [MovieComponent],
})
export class MovieModule {}
