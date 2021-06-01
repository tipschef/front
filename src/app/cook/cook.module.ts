import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CookComponent} from './cook.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {CookRoutingModule} from './cook-rooting.module';
import { RecipeListComponent } from './components/recipe-list/recipe-list.component';
import { RecipeCreateComponent } from './components/recipe-create/recipe-create.component';
import {MaterialModule} from '../shared/material-module/material.module';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    CookComponent,
    DashboardComponent,
    RecipeListComponent,
    RecipeCreateComponent],
  imports: [
    CookRoutingModule,
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class CookModule {
}
