import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {CookComponent} from './cook.component';
import {AuthGuard} from '../common-tipschef/guard/auth.guard';
import {RecipeListComponent} from './components/recipe-list/recipe-list.component';
import {RecipeCreateComponent} from './components/recipe-create/recipe-create.component';
import {UserInformationComponent} from "./components/user-information/user-information.component";

const routes: Routes = [
  {
    path: '',
    component: CookComponent,
    children : [
      {
        path: 'dashboard',
        component : DashboardComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'recipe',
        component : RecipeListComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'recipe-create',
        component : RecipeCreateComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'info',
        component : UserInformationComponent,
        canActivate: [AuthGuard]
      },
      {
        path: '**',
        component : DashboardComponent,
        canActivate: [AuthGuard]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CookRoutingModule {
}
