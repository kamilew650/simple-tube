import { NgModule } from '@angular/core';
import { Routes, RouterModule, LoadChildren } from '@angular/router';

import { AdminModule } from './admin/admin.module';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { HomeComponent } from './home/home.component';
import { MyMoviesComponent } from './my-movies/my-movies.component';
import { PlayerComponent } from './player/player.component';
import { UsersComponent } from './users/users.component';
import { MoviesComponent } from './movies/movies.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'registration',
    component: RegistrationComponent
  },
  {
    path: 'my-movies',
    component: MyMoviesComponent
  },
  {
    path: 'player/:id',
    component: PlayerComponent
  },
  {
    path: 'users',
    component: UsersComponent
  },
  {
    path: 'movies',
    component: MoviesComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
