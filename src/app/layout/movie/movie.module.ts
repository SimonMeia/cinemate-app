import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MoviePageRoutingModule } from './movie-routing.module';

import { MoviePage } from './movie.page';
import { ReviewModule } from 'src/app/components/review/review.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MoviePageRoutingModule,
    ReviewModule
  ],
  declarations: [MoviePage]
})
export class MoviePageModule {}
