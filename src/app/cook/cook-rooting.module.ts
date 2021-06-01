import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {CookComponent} from './cook.component';
import {AuthGuard} from '../common-tipschef/guard/auth.guard';
import {RecipeListComponent} from './components/recipe-list/recipe-list.component';
import {RecipeCreateComponent} from './components/recipe-create/recipe-create.component';

const routes: Routes = [
  {
    path: '',
    component: CookComponent,
    children : [
      {
        path: 'dashboard',
        component : DashboardComponent,
        canActivate: [AuthGuard],
        data : {
          roles : ['cook']
        }
      },
      {
        path: 'recipe',
        component : RecipeListComponent,
        canActivate: [AuthGuard],
        data : {
          roles : ['cook']
        }
      },
      {
        path: 'recipe-create',
        component : RecipeCreateComponent,
        canActivate: [AuthGuard],
        data : {
          roles : ['cook']
        }
      },
      {
        path: '**',
        component : DashboardComponent,
        canActivate: [AuthGuard],
        data : {
          roles : ['cook']
        }
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
