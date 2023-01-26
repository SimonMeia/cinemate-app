import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutPage } from './layout.page';

const routes: Routes = [
  {
    path: '',
    component: LayoutPage,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('./home/home.module').then((m) => m.HomePageModule),
      },
      {
        path: 'movies',
        loadChildren: () =>
          import('./movies/movies.module').then((m) => m.MoviesPageModule),
      },
      {
        path: 'groups',
        loadChildren: () =>
          import('./groups/groups.module').then((m) => m.GroupsPageModule),
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'create-review',
    loadChildren: () =>
      import('./create-review/create-review.module').then(
        (m) => m.CreateReviewPageModule
      ),
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./profile/profile.module').then((m) => m.ProfilePageModule),
  },
  {
    path: 'review',
    loadChildren: () =>
      import('./review/review.module').then((m) => m.ReviewPageModule),
  },
  {
    path: 'movie',
    loadChildren: () =>
      import('./movie/movie.module').then((m) => m.MoviePageModule),
  },
  {
    path: 'group',
    loadChildren: () =>
      import('./group/group.module').then((m) => m.GroupPageModule),
  },  {
    path: 'create-group',
    loadChildren: () => import('./create-group/create-group.module').then( m => m.CreateGroupPageModule)
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutPageRoutingModule {}
