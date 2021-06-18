import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './components/profile/profile.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { RecipeCardComponent } from './components/recipe-card/recipe-card.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import { BookCardComponent } from './components/book-card/book-card.component';
import {MatListModule} from '@angular/material/list';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { RecipeScrollComponent } from './components/recipe-scroll/recipe-scroll.component';
import { RecipeDetailComponent } from './components/recipe-detail/recipe-detail.component';


@NgModule({
  declarations: [
    ProfileComponent,
    RecipeCardComponent,
    BookCardComponent,
    RecipeScrollComponent,
    RecipeDetailComponent
  ],
  exports: [
    RecipeCardComponent
  ],
    imports: [
        CommonModule,
        MatGridListModule,
        MatCardModule,
        MatButtonModule,
        MatTabsModule,
        MatListModule,
        ScrollingModule
    ]
})
export class CommonTipschefModule { }
