import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../common-tipschef/guard/auth.guard';
import {AdminTipschefComponent} from './admin-tipschef.component';
import {UserAdminComponent} from './components/user-admin/user-admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminTipschefComponent,
    children : [
      {
        path: 'user',
        component : UserAdminComponent,
        canActivate: [AuthGuard],
        data: {roles: ['admin']}
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminTipschefRoutingModule {
}
