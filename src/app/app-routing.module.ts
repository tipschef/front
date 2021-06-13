import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './common-tipschef/components/home/home.component';
import {SignUpComponent} from './common-tipschef/components/sign-up/sign-up.component';
import {LogInComponent} from './common-tipschef/components/log-in/log-in.component';
import {WallComponent} from './common-tipschef/components/wall/wall.component';
import {AuthGuard} from './common-tipschef/guard/auth.guard';
import {CookComponent} from './cook/cook.component';
import {DashboardComponent} from './cook/components/dashboard/dashboard.component';
import {ProfileComponent} from "./common-tipschef/components/profile/profile.component";
import {RecipeDetailComponent} from "./common-tipschef/components/recipe-detail/recipe-detail.component";

const routes: Routes = [
  {
    path: 'sign-up',
    component: SignUpComponent,
    pathMatch: 'full'
  },
  {
    path: 'log-in',
    component: LogInComponent,
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: WallComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'cook',
    loadChildren: () => import('./cook/cook.module').then(m => m.CookModule),
    canActivate: [AuthGuard],
  },
  {
    path: ':username/recipe/:recipe_id',
    component: RecipeDetailComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: ':username',
    component: ProfileComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
