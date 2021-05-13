import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {SignUpComponent} from './components/sign-up/sign-up.component';
import {LogInComponent} from './components/log-in/log-in.component';
import {WallComponent} from './components/wall/wall.component';
import {AuthGuard} from './guard/auth.guard';

const routes: Routes = [
  {
    path : 'sign-up',
    component : SignUpComponent,
    pathMatch: 'full'
  },
  {
    path : 'log-in',
    component : LogInComponent,
    pathMatch: 'full'
  },
  {
    path : 'home',
    component : WallComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard]
},
  {
    path : '**',
    redirectTo : 'home',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
