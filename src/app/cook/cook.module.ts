import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CookComponent} from './cook.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {CookRoutingModule} from './cook-rooting.module';


@NgModule({
  declarations: [
    CookComponent,
    DashboardComponent],
  imports: [
    CookRoutingModule,
    CommonModule
  ]
})
export class CookModule {
}
