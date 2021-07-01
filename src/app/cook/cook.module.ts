import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CookComponent} from './cook.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {CookRoutingModule} from './cook-rooting.module';
import {RecipeListComponent} from './components/recipe-list/recipe-list.component';
import {RecipeCreateComponent} from './components/recipe-create/recipe-create.component';
import {MaterialModule} from '../shared/material-module/material.module';
import {ReactiveFormsModule} from '@angular/forms';
import {UserInformationComponent} from './components/user-information/user-information.component';
import {BookListComponent} from './components/book-list/book-list.component';
import {BookCreateComponent} from './components/book-create/book-create.component';
import {BookPreviewComponent} from './components/book-preview/book-preview.component';
import {CommonTipschefModule} from '../common-tipschef/common-tipschef.module';


@NgModule({
  declarations: [
    CookComponent,
    DashboardComponent,
    RecipeListComponent,
    RecipeCreateComponent,
    UserInformationComponent,
    BookListComponent,
    BookCreateComponent,
    BookPreviewComponent],
  imports: [
    CookRoutingModule,
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    CommonTipschefModule]
})
export class CookModule {
}
