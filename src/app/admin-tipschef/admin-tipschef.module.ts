import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminTipschefComponent } from './admin-tipschef.component';
import { UserAdminComponent } from './components/user-admin/user-admin.component';
import {MaterialModule} from '../shared/material-module/material.module';
import {AdminTipschefRoutingModule} from './admin-tipschef-rooting.module';



@NgModule({
  declarations: [AdminTipschefComponent, UserAdminComponent],
  imports: [
    CommonModule,
    MaterialModule,
    AdminTipschefRoutingModule,
  ]
})
export class AdminTipschefModule { }
