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
        loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'movies',
        loadChildren: () => import('./movies/movies.module').then(m => m.MoviesPageModule)
      },
      {
        path: 'groups',
        loadChildren: () => import('./groups/groups.module').then(m => m.GroupsPageModule)
      },
      {
        path: "",
        redirectTo: "home",
        pathMatch: "full",
      },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutPageRoutingModule { }
