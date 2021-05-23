import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {CookComponent} from './cook.component';
import {AuthGuard} from '../common-tipschef/guard/auth.guard';

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
