import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './components/profile/profile.component';
import {MatGridListModule} from "@angular/material/grid-list";
import { RecipeCardComponent } from './components/recipe-card/recipe-card.component';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatTabsModule} from "@angular/material/tabs";
import { BookCardComponent } from './components/book-card/book-card.component';
import {MatListModule} from "@angular/material/list";



@NgModule({
  declarations: [ProfileComponent, RecipeCardComponent, BookCardComponent],
  exports: [
    RecipeCardComponent
  ],
  imports: [
    CommonModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    MatTabsModule,
    MatListModule
  ]
})
export class CommonTipschefModule { }
